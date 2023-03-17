import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getProfile } from '../../service/profileService';
import { singleUser, singleSpace } from '../../interface';

export const getProfileAction = createAsyncThunk(
  'profile/getProfile',
  async (params: {userName: string}, { rejectWithValue }) => {
    try {
      const response = await getProfile(params.userName);
      return response.data;
    } catch(err: any) {
      return rejectWithValue(err.response.data);
    }
  }
)

// Define a type for the slice state
interface profileState {
  getProfile: string,
  profile: {
    user: singleUser,
    createdSpaces: singleSpace[],
  },
}

// Define the initial state using that type
const initialState: profileState = {
  getProfile: 'init',
  profile: {
    user: {
      email: '',
      userName: '',
      gender: '',
      country: '',
      imageUrl: '',
      timeStamp: '',
      interests: [],
    },
    createdSpaces: [],
  },
};

export const spaceSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},

  extraReducers: builder => {

    builder.addCase(getProfileAction.pending, (state, action) => {
      state.getProfile = 'pending';
    });
    builder.addCase(getProfileAction.fulfilled, (state, action) => {
      state.getProfile = 'success';
      state.profile = {
        user: {
          email: action.payload.email,
          userName: action.payload.userName,
          gender: action.payload.gender,
          country: action.payload.country,
          imageUrl: action.payload.imageUrl,
          timeStamp: action.payload.timeStamp,
          interests: action.payload.interests,
        },
        createdSpaces: action.payload.createdSpaces,
      };
    });
    builder.addCase(getProfileAction.rejected, (state, action) => {
      state.getProfile = 'failed';
    });;
  }
});

export default spaceSlice.reducer;
