import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loginUser, logoutUser } from '../../service/authService';

const getToken = () => {
  return localStorage.getItem('user') &&
    JSON.parse(localStorage.getItem('user')!).token;
}

// First, create the thunk
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
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: { },
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
    builder.addCase(logoutUserAction.pending ||
      logoutUserAction.fulfilled ||
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
  }
});


export default authSlice.reducer;
