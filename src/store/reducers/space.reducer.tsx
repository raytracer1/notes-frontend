import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getSpace, addSpace } from '../../service/spaceService';

export const getSpaceAction = createAsyncThunk(
  'auth/getSpace',
  async (params, { rejectWithValue }) => {
    try {
      const response = await getSpace();
      return response.data;
    } catch(err: any) {
      return rejectWithValue(err.response.data);
    }
  }
)

export const addSpaceAction = createAsyncThunk(
  'auth/addSpace',
  async (params: {
    name: string,
    description: string,
    imageUrl: string,
    prerequisites: string[],
    keywords: string[]
  }, { rejectWithValue }) => {
    try {
      const response = await addSpace(params.name, params.description, params.imageUrl, params.prerequisites, params.keywords);
      return response.data;
    } catch(err: any) {
      return rejectWithValue(err.response.data);
    }
  }
)

// Define a type for the slice state
interface spaceState {
  getSpace: string;
  addSpace: string;
  spaceList: {
    name: string,
    description: string,
    imageUrl: string,
    prerequisites: string[],
    keywords: string[],
    updatedAt: string,
    author: {},
    _id: string,
  }[];
}

// Define the initial state using that type
const initialState: spaceState = {
  getSpace: 'init',
  addSpace: 'init',
  spaceList: [],
};

export const spaceSlice = createSlice({
  name: 'space',
  initialState,
  reducers: {},

  extraReducers: builder => {

    builder.addCase(getSpaceAction.pending, (state, action) => {
      state.getSpace = 'pending';
      state.spaceList = [];
    });
    builder.addCase(getSpaceAction.fulfilled, (state, action) => {
      state.getSpace = 'success';
      state.spaceList = action.payload;
    });
    builder.addCase(getSpaceAction.rejected, (state, action) => {
      state.getSpace = 'failed';
      state.spaceList = [];
    });

    builder.addCase(addSpaceAction.pending, (state, action) => {
      state.addSpace = 'pending';
    });
    builder.addCase(addSpaceAction.fulfilled, (state, action) => {
      state.addSpace = 'success';
    });
    builder.addCase(addSpaceAction.rejected, (state, action) => {
      state.addSpace = 'failed';
    });
  }
});

export default spaceSlice.reducer;
