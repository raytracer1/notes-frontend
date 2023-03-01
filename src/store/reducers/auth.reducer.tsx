import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loginUser, logoutUser, signupUser } from '../../service/authService';

export const loginUserAction = createAsyncThunk(
  'users/loginUser',
  async (params: { userName: string, passWord: string }, { rejectWithValue }) => {
    try {
      const response = await loginUser(params.userName, params.passWord);
      return { userName: params.userName, data: response.data};
    } catch(err: any) {
      return rejectWithValue(err.response.data);
    }
  }
)

export const logoutUserAction = createAsyncThunk(
  'users/logoutUser',
  async () => {
    const response = await logoutUser();
    return response.data;
  }
)

export const signupUserAction = createAsyncThunk(
  'users/signupUser',
  async (params: { userName: string, email: string, passWord: string },
    { rejectWithValue }) => {
    try {
      const response = await signupUser(params.userName, params.email, params.passWord);
      return response.data;
    } catch(err: any) {
      return rejectWithValue(err.response.data);
    }
  }
)

// Define a type for the slice state
interface authState {
  authenticated: boolean;
  login: string;
  loginErr: string;
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
  loginErr: '',
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
    autoLogoutAction: (state) => {
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
    },
    clearLoginAction: (state) => {
      state.login = 'init';
      state.loginErr = '';
    },
    clearSignupAction: (state) => {
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
      state.loginErr = (action.payload as any)?.err.message;
    });
    builder.addCase(logoutUserAction.fulfilled, (state, action) => {
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
    builder.addCase(logoutUserAction.rejected, (state, action) => {
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
      state.signupErr = (action.payload as any)?.err.message;
    });
  }
});

export const {
  autoLogoutAction,
  clearLoginAction,
  clearSignupAction,
} = authSlice.actions;

export default authSlice.reducer;
