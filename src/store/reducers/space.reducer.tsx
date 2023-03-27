import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getSpaces, createSpace, getSpace, joinSpace, leaveSpace, updateSpace,
  createPost, getPost, updatePost, getPosts,
  getComments, createComment
} from '../../service/spaceService';
import { uploadImage } from '../../service/uploadService';
import { singleSpace, singlePost, singleComment } from '../../interface';

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

export const createPostAction = createAsyncThunk(
  'space/createPost',
  async (params: {
    spaceId: string,
    title: string,
    description: string,
  }, { rejectWithValue }) => {
    try {
      const response = await createPost(params.spaceId, params.title, params.description);
      return response.data;
    } catch(err: any) {
      return rejectWithValue(err.response.data);
    }
  }
)

export const getPostAction = createAsyncThunk(
  'space/getPost',
  async (params: {
    postId: string,
  }, { rejectWithValue }) => {
    try {
      const response = await getPost(params.postId);
      return response.data;
    } catch(err: any) {
      return rejectWithValue(err.response.data);
    }
  }
)

export const updatePostAction = createAsyncThunk(
  'space/updatePost',
  async (params: {
    postId: string,
    title: string,
    description: string,
  }, { rejectWithValue }) => {
    try {
      const response = await updatePost(params.postId,
        params.title, params.description);
      return response.data;
    } catch(err: any) {
      return rejectWithValue(err.response.data);
    }
  }
)

export const getPostsAction = createAsyncThunk(
  'space/getPosts',
  async (params: {
    spaceId: string,
  }, { rejectWithValue }) => {
    try {
      const response = await getPosts(params.spaceId);
      return {spaceId: params.spaceId, postsList: response.data};
    } catch(err: any) {
      return rejectWithValue(err.response.data);
    }
  }
)

export const getCommentsAction = createAsyncThunk(
  'space/getComments',
  async (params: {
    postId: string,
  }, { rejectWithValue }) => {
    try {
      const response = await getComments(params.postId);
      return {postId: params.postId, commentsList: response.data};
    } catch(err: any) {
      return rejectWithValue(err.response.data);
    }
  }
)

export const createCommentAction = createAsyncThunk(
  'space/createComment',
  async (params: {
    postId: string,
    content: string,
  }, { rejectWithValue }) => {
    try {
      const response = await createComment(params.postId, params.content);
      return {postId: params.postId, commentsList: response.data};
    } catch(err: any) {
      return rejectWithValue(err.response.data);
    }
  }
)

// Define a type for the slice state
interface spaceState {
  getSpaces: string,
  spacesList: singleSpace[],

  createSpace: string,
  createSpaceErr: string,
  updateSpace: string,
  updateSpaceErr: string,

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

  getPosts: string,
  posts : {
    spaceId: string,
    postsList: singlePost[]
  },

  createPost: string,
  createPostErr: string,
  updatePost: string,
  updatePostErr: string,

  getPost: string,
  post: singlePost,

  getComments: string,
  comments : {
    postId: string,
    commentsList: singleComment[]
  },

  createComment: string,
  createCommentErr: string,
}

// Define the initial state using that type
const initialState: spaceState = {
  getSpaces: 'init',
  spacesList: [],

  createSpace: 'init',
  createSpaceErr: '',
  updateSpace: 'init',
  updateSpaceErr: '',

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

  getPosts: 'init',
  posts : {
    spaceId: '',
    postsList: []
  },

  createPost: 'init',
  createPostErr: '',
  updatePost: 'init',
  updatePostErr: '',

  getPost: 'init',
  post: {
    _id: '',
    title: '',
    description: '',
    createdAt: '',
    updatedAt: '',
  },

  getComments: 'init',
  comments: {
    postId: '',
    commentsList: [],
  },

  createComment: 'init',
  createCommentErr: '',
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

    builder.addCase(createPostAction.pending, (state, action) => {
      state.createPost = 'pending';
    });
    builder.addCase(createPostAction.fulfilled, (state, action) => {
      state.createPost = 'success';
      state.post = action.payload;
    });
    builder.addCase(createPostAction.rejected, (state, action) => {
      state.createPost = 'failed';
    });

    builder.addCase(getPostAction.pending, (state, action) => {
      state.getPost = 'pending';
    });
    builder.addCase(getPostAction.fulfilled, (state, action) => {
      state.getPost = 'success';
      state.post = action.payload;
      state.space.space = action.payload.space;
    });
    builder.addCase(getPostAction.rejected, (state, action) => {
      state.getPost = 'failed';
    });

    builder.addCase(updatePostAction.pending, (state, action) => {
      state.updatePost = 'pending';
    });
    builder.addCase(updatePostAction.fulfilled, (state, action) => {
      state.updatePost = 'success';
      state.post = action.payload;
      state.space.space = action.payload.space;
    });
    builder.addCase(updatePostAction.rejected, (state, action) => {
      state.updatePost = 'failed';
    });

    builder.addCase(getPostsAction.pending, (state, action) => {
      state.getPosts = 'pending';
    });
    builder.addCase(getPostsAction.fulfilled, (state, action) => {
      state.getPosts = 'success';
      state.posts = action.payload;
    });
    builder.addCase(getPostsAction.rejected, (state, action) => {
      state.getPosts = 'failed';
    });

    builder.addCase(getCommentsAction.pending, (state, action) => {
      state.getComments = 'pending';
    });
    builder.addCase(getCommentsAction.fulfilled, (state, action) => {
      state.getComments = 'success';
      state.comments = action.payload;
    });
    builder.addCase(getCommentsAction.rejected, (state, action) => {
      state.getComments = 'failed';
    });

    builder.addCase(createCommentAction.pending, (state, action) => {
      state.createComment = 'pending';
    });
    builder.addCase(createCommentAction.fulfilled, (state, action) => {
      state.createComment = 'success';
      state.comments = action.payload;
    });
    builder.addCase(createCommentAction.rejected, (state, action) => {
      state.createComment = 'failed';
    });
  }
});

export default spaceSlice.reducer;
