import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getSpaces, createSpace, getSpace, joinSpace, leaveSpace, updateSpace
} from '../../service/spaceService';
import { uploadImage } from '../../service/uploadService';
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

export const createSpaceAction = createAsyncThunk(
  'space/createSpace',
  async (params: {
    name: string,
    description: string,
    imgFile?: File
    prerequisites: string[],
    keywords: string[]
  }, { rejectWithValue }) => {
    try {
      let imgUrl = '';
      if (params.imgFile) {
        const uploadResponse = await uploadImage(params.imgFile);
        imgUrl = uploadResponse?.data?.url;
      }

      const response = await createSpace(params.name, params.description,
        params.prerequisites, params.keywords, imgUrl !== '' ? imgUrl : undefined);
      return response.data;
    } catch(err: any) {
      return rejectWithValue(err.response.data);
    }
  }
)

export const updateSpaceAction = createAsyncThunk(
  'space/updateSpace',
  async (params: {
    spaceId: string,
    name: string,
    description: string,
    imgFile?: File
    prerequisites: string[],
    keywords: string[]
  }, { rejectWithValue }) => {
    try {
      let imgUrl = '';
      if (params.imgFile) {
        const uploadResponse = await uploadImage(params.imgFile);
        imgUrl = uploadResponse?.data?.url;
      }

      const response = await updateSpace(params.spaceId, params.name, params.description,
        params.prerequisites, params.keywords, imgUrl !== '' ? imgUrl : undefined);
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
  createSpace: string,
  createSpaceErr: string,
  updateSpace: string,
  updateSpaceErr: string,
  spacesList: singleSpace[],
  getSpace: string,
  space: {
    space: singleSpace,
    join: {
      user: {
        userName: string,
      },
      createdAt: string,
    }[],
  },
  joinSpace: string,
}

// Define the initial state using that type
const initialState: spaceState = {
  getSpaces: 'init',
  createSpace: 'init',
  createSpaceErr: '',
  updateSpace: 'init',
  updateSpaceErr: '',
  spacesList: [],
  getSpace: 'init',
  space: {
    space: {
      _id: '',
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
    },
    join: [],
  },
  joinSpace: 'init',
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

    builder.addCase(createSpaceAction.pending, (state, action) => {
      state.createSpace = 'pending';
    });
    builder.addCase(createSpaceAction.fulfilled, (state, action) => {
      state.createSpace = 'success';
      state.space.space = action.payload;
    });
    builder.addCase(createSpaceAction.rejected, (state, action) => {
      state.createSpace = 'failed';
    });

    builder.addCase(updateSpaceAction.pending, (state, action) => {
      state.updateSpace = 'pending';
    });
    builder.addCase(updateSpaceAction.fulfilled, (state, action) => {
      state.updateSpace = 'success';
      state.space.space = action.payload;
    });
    builder.addCase(updateSpaceAction.rejected, (state, action) => {
      state.updateSpace = 'failed';
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
      state.joinSpace = 'pending';
    });
    builder.addCase(joinSpaceAction.fulfilled, (state, action) => {
      state.joinSpace = 'success';
      if (action.payload.space === state.space.space._id) {
        state.space.join = action.payload.join;
      }
    });
    builder.addCase(joinSpaceAction.rejected, (state, action) => {
      state.joinSpace = 'failed';
    });

    builder.addCase(leaveSpaceAction.pending, (state, action) => {
      state.joinSpace = 'pending';
    });
    builder.addCase(leaveSpaceAction.fulfilled, (state, action) => {
      state.joinSpace = 'success';
      if (action.payload.space === state.space.space._id) {
        state.space.join = action.payload.join;
      }
    });
    builder.addCase(leaveSpaceAction.rejected, (state, action) => {
      state.joinSpace = 'failed';
    });
  }
});

export default spaceSlice.reducer;
