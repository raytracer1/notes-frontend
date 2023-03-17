import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getSpaces, addSpace, getSpace, joinSpace, leaveSpace
} from '../../service/spaceService';
import { singleSpace } from '../../interface';

export const getSpacesAction = createAsyncThunk(
  'space/getSpaces',
  async (params, { rejectWithValue }) => {
    try {
      const response = await getSpaces();
      return response.data;
    } catch(err: any) {
      return rejectWithValue(err.response.data);
    }
  }
)

export const addSpaceAction = createAsyncThunk(
  'space/addSpace',
  async (params: {
    name: string,
    description: string,
    imageUrl: string,
    prerequisites: string[],
    keywords: string[]
  }, { rejectWithValue }) => {
    try {
      const response = await addSpace(params.name, params.description,
        params.imageUrl, params.prerequisites, params.keywords);
      return response.data;
    } catch(err: any) {
      return rejectWithValue(err.response.data);
    }
  }
)

export const getSpaceAction = createAsyncThunk(
  'space/getSpace',
  async (params: { spaceId : string }, { rejectWithValue }) => {
    try {
      const response = await getSpace(params.spaceId);
      return response.data;
    } catch(err: any) {
      return rejectWithValue(err.response.data);
    }
  }
)

export const joinSpaceAction = createAsyncThunk(
  'space/joinSpace',
  async (params: { spaceId : string }, { rejectWithValue }) => {
    try {
      const response = await joinSpace(params.spaceId);
      return {space: params.spaceId, join: response.data};
    } catch(err: any) {
      return rejectWithValue(err.response.data);
    }
  }
)

export const leaveSpaceAction = createAsyncThunk(
  'space/leaveSpace',
  async (params: { spaceId : string }, { rejectWithValue }) => {
    try {
      const response = await leaveSpace(params.spaceId);
      return {space: params.spaceId, join: response.data};
    } catch(err: any) {
      return rejectWithValue(err.response.data);
    }
  }
)

// Define a type for the slice state
interface spaceState {
  getSpaces: string,
  addSpace: string,
  spacesList: singleSpace[],
  getSpace: string,
  space: singleSpace,
}

// Define the initial state using that type
const initialState: spaceState = {
  getSpaces: 'init',
  addSpace: 'init',
  spacesList: [],
  getSpace: 'init',
  space: {
    name: '',
    description: '',
    imageUrl: '',
    prerequisites: [],
    keywords: [],
    createdAt: '',
    updatedAt: '',
    author: {
      email: '',
      userName: '',
      gender: '',
      country: '',
      imageUrl: '',
      timeStamp: '',
      interests: [],
    },
    join: [],
    joinSpace: '',
    _id: '',
  },
};

export const spaceSlice = createSlice({
  name: 'space',
  initialState,
  reducers: {},

  extraReducers: builder => {

    builder.addCase(getSpacesAction.pending, (state, action) => {
      state.getSpaces = 'pending';
      state.spacesList = [];
    });
    builder.addCase(getSpacesAction.fulfilled, (state, action) => {
      state.getSpaces = 'success';
      state.spacesList = action.payload;
    });
    builder.addCase(getSpacesAction.rejected, (state, action) => {
      state.getSpaces = 'failed';
      state.spacesList = [];
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

    builder.addCase(getSpaceAction.pending, (state, action) => {
      state.getSpace = 'pending';
    });
    builder.addCase(getSpaceAction.fulfilled, (state, action) => {
      state.getSpace = 'success';
      state.space = action.payload;
    });
    builder.addCase(getSpaceAction.rejected, (state, action) => {
      state.getSpace = 'failed';
    });

    builder.addCase(joinSpaceAction.pending, (state, action) => {
      state.space.joinSpace = 'pending';
    });
    builder.addCase(joinSpaceAction.fulfilled, (state, action) => {
      state.space.joinSpace = 'success';
      if (action.payload.space === state.space._id) {
        state.space.join = action.payload.join;
      }
    });
    builder.addCase(joinSpaceAction.rejected, (state, action) => {
      state.space.joinSpace = 'failed';
    });

    builder.addCase(leaveSpaceAction.pending, (state, action) => {
      state.space.joinSpace = 'pending';
    });
    builder.addCase(leaveSpaceAction.fulfilled, (state, action) => {
      state.space.joinSpace = 'success';
      if (action.payload.space === state.space._id) {
        state.space.join = action.payload.join;
      }
    });
    builder.addCase(leaveSpaceAction.rejected, (state, action) => {
      state.space.joinSpace = 'failed';
    });
  }
});

export default spaceSlice.reducer;
