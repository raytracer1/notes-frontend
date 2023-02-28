import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loginUser, logoutUser, signupUser } from '../../service/authService';

const getToken = () => {
  const token = localStorage.getItem('user') &&
    JSON.parse(localStorage.getItem('user')!).token;

  return token;
}

export const loginUserAction = createAsyncThunk(
  'users/loginUser',
  async (params: { userName: string, passWord: string }) => {
    const response = await loginUser(params.userName, params.passWord);
    return { userName: params.userName, data: response.data};
  }
)

export const logoutUserAction = createAsyncThunk(
  'users/logoutUser',
  async () => {
    const response = await logoutUser(getToken());
    return response.data;
  }
)

export const signupUserAction = createAsyncThunk(
  'users/signupUser',
  async (params: { userName: string, email: string, passWord: string }) => {
    const response = await signupUser(params.userName, params.email, params.passWord);
    return response.data;
  }
)

// Define a type for the slice state
interface authState {
  authenticated: boolean;
  login: string;
  user: {
    userName: string,
    token: string,
    email: string,
    country: string,
    imageUrl: string,
  };
  signup: string;
  signupErr: string;
}

// Define the initial state using that type
const initialState: authState = {
  authenticated: localStorage.getItem('user') ? true : false,
  login: 'init',
  user: localStorage.getItem('user') ?
    JSON.parse(localStorage.getItem('user')!) : {
      userName: '',
      token: '',
      email: '',
      country: '',
      imageUrl: '',
    },
  signup: 'init',
  signupErr: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearSignup: (state) => {
      state.signup = 'init';
      state.signupErr = '';
    },
  },
  extraReducers: builder => {
    builder.addCase(loginUserAction.pending, (state, action) => {
      state.login = 'pending';
    });
    builder.addCase(loginUserAction.fulfilled, (state, action) => {
      state.authenticated = true;
      state.login = 'success';
      state.user = {
        userName: action.payload.userName,
        token: action.payload.data.token,
        email: action.payload.data.email,
        country: action.payload.data.country,
        imageUrl: action.payload.data.imageUrl,
      };
      localStorage.setItem('user', JSON.stringify(state.user));
    });
    builder.addCase(loginUserAction.rejected, (state, action) => {
      state.login = 'failed';
    });
    builder.addCase(logoutUserAction.fulfilled ||
      logoutUserAction.rejected, (state, action) => {
      state.authenticated = false;
      state.login = 'init';
      state.user = {
        userName: '',
        token: '',
        email: '',
        country: '',
        imageUrl: '',
      };
      localStorage.removeItem('user');
    });
    builder.addCase(signupUserAction.pending, (state, action) => {
      state.signup = 'pending';
    });
    builder.addCase(signupUserAction.fulfilled, (state, action) => {
      state.signup = 'success';
    });
    builder.addCase(signupUserAction.rejected, (state, action) => {
      state.signup = 'failed';
      state.signupErr = action.error.message!;
    });
  }
});

export const {
  clearSignup,
} = authSlice.actions;

export default authSlice.reducer;
