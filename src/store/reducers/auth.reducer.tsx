import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loginUser } from '../../service/authService';

// First, create the thunk
export const loginUserAction = createAsyncThunk(
  'users/loginUser',
  async (params: { userName: string, passWord: string }) => {
    const response = await loginUser(params.userName, params.passWord);
    return { userName: params.userName, data: response.data};
  }
)

// Define a type for the slice state
interface authState {
  login: string;
  users: {
    userName: string,
    token: string,
  };
}

// Define the initial state using that type
const initialState: authState = {
  login: 'init',
  users: {
    userName: '',
    token: '',
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
      state = {
        login: "success",
        users: {
          userName: action.payload.userName,
          token: action.payload.data.token,
        }
      };
    });
    builder.addCase(loginUserAction.rejected, (state, action) => {
      state.login = 'failed';
    });
  }
});


export default authSlice.reducer;
