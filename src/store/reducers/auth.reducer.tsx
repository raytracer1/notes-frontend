import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loginUser } from '../../service/authService';

// First, create the thunk
export const loginUserAction = createAsyncThunk(
  'users/loginUser',
  async (params: { userName: string, passWord: string }) => {
    const response = await loginUser(params.userName, params.passWord);
    return response.data;
  }
)

// Define a type for the slice state
interface authState {
  login: string;
}

// Define the initial state using that type
const initialState: authState = {
  login: 'init',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: { },
  extraReducers: {
    [loginUserAction.pending.type]: (state, action) => {
      console.log("pending");
      state = {
        login: "loading",
      };
    },
    [loginUserAction.fulfilled.type]: (state, action) => {
      console.log("fulfilled");
      state = {
        login: "success",
      };
    },
    [loginUserAction.rejected.type]: (state, action) => {
      console.log("rejected");
      state = {
        login: "failed",
      };
    },
  }
});


export default authSlice.reducer;
