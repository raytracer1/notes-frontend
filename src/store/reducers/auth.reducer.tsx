import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define a type for the slice state
interface authState {
  login: boolean;
}

// Define the initial state using that type
const initialState: authState = {
  login: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: { 
    setAuth: (
      state: authState,
      action: PayloadAction<boolean>
    ) => {
      state.login = action.payload;
    },
  },
});

export const {
  setAuth,
} = authSlice.actions;

export default authSlice.reducer;
