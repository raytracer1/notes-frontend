import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loginUser, logoutUser, signupUser, updateUser, refreshUser } from '../../service/authService';
import { uploadImage } from '../../service/uploadService';

export const loginUserAction = createAsyncThunk(
  'auth/loginUser',
  async (params: { email: string, passWord: string }, { rejectWithValue }) => {
    try {
      const response = await loginUser(params.email, params.passWord);
      return response.data;
    } catch(err: any) {
      return rejectWithValue(err.response.data);
    }
  }
)

export const logoutUserAction = createAsyncThunk(
  'auth/logoutUser',
  async () => {
    const response = await logoutUser();
    return response.data;
  }
)

export const signupUserAction = createAsyncThunk(
  'auth/signupUser',
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

export const updateUserAction = createAsyncThunk(
  'auth/updateUser',
  async (params: { gender: string, country: string, interests: string[], imgFile?: File },
    { rejectWithValue }) => {
    try {
      let imgUrl = '';
      if (params.imgFile) {
        const uploadResponse = await uploadImage(params.imgFile);
        imgUrl = uploadResponse?.data?.url;
      }

      const response = await updateUser(params.gender, params.country, params.interests,
        imgUrl !== '' ? imgUrl : undefined);
      return response.data;
    } catch(err: any) {
      return rejectWithValue(err.response.data);
    }
  }
)

export const refreshUserAction = createAsyncThunk(
  'auth/refreshUser',
  async () => {
    const response = await refreshUser();
    return response.data;
  }
)

// Define a type for the slice state
interface authState {
  authenticated: boolean;
  token: string,
  login: string;
  loginErr: string;
  user: {
    email: string,
    userName: string,
    gender: string,
    country: string,
    imageUrl: string,
    interests: string[],
  };
  signup: string;
  signupErr: string;
  update: string;
  updateErr: string;
  refresh: string;
  refreshErr: string;
}

// Define the initial state using that type
const initialState: authState = {
  authenticated: localStorage.getItem('user') ? true : false,
  token: localStorage.getItem('token') ?
    localStorage.getItem('token')! : '',
  login: 'init',
  loginErr: '',
  user: localStorage.getItem('user') ?
    JSON.parse(localStorage.getItem('user')!) : {
      email: '',
      userName: '',
      gender: '',
      country: '',
      imageUrl: '',
      interests: [],
    },
  signup: 'init',
  signupErr: '',
  update: 'init',
  updateErr: '',
  refresh: 'init',
  refreshErr: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    autoLogoutAction: (state) => {
      state.authenticated = false;
      state.token = '';
      state.login = 'init';
      state.user = {
        email: '',
        userName: '',
        gender: '',
        country: '',
        imageUrl: '',
        interests: [],
      };
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
    clearLoginErrAction: (state) => {
      state.login = 'init';
      state.loginErr = '';
    },
    clearSignupErrAction: (state) => {
      state.signup = 'init';
      state.signupErr = '';
    },
    clearUpdateErrAction: (state) => {
      state.update = 'init';
      state.updateErr = '';
    },
    clearRefreshErrAction: (state) => {
      state.refresh = 'init';
      state.refreshErr = '';
    },
  },

  extraReducers: builder => {

    builder.addCase(loginUserAction.pending, (state, action) => {
      state.login = 'pending';
    });
    builder.addCase(loginUserAction.fulfilled, (state, action) => {
      state.authenticated = true;
      state.token = action.payload.token;
      state.login = 'success';
      state.user = {
        email: action.payload.email,
        userName: action.payload.userName,
        gender: action.payload.gender,
        country: action.payload.country,
        imageUrl: action.payload.imageUrl,
        interests: action.payload.interests,
      };
      localStorage.setItem('user', JSON.stringify(state.user));
      localStorage.setItem('token', state.token);
    });
    builder.addCase(loginUserAction.rejected, (state, action) => {
      state.login = 'failed';
      state.loginErr = (action.payload as any)?.err?.message;
    });

    builder.addCase(logoutUserAction.fulfilled, (state, action) => {
      state.authenticated = false;
      state.login = 'init';
      state.token = '';
      state.user = {
        email: '',
        userName: '',
        gender: '',
        country: '',
        imageUrl: '',
        interests: [],
      };
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    });
    builder.addCase(logoutUserAction.rejected, (state, action) => {
      state.authenticated = false;
      state.token = '';
      state.login = 'init';
      state.user = {
        email: '',
        userName: '',
        gender: '',
        country: '',
        imageUrl: '',
        interests: [],
      };
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    });

    builder.addCase(signupUserAction.pending, (state, action) => {
      state.signup = 'pending';
    });
    builder.addCase(signupUserAction.fulfilled, (state, action) => {
      state.signup = 'success';
    });
    builder.addCase(signupUserAction.rejected, (state, action) => {
      state.signup = 'failed';
      state.signupErr = (action.payload as any)?.err?.message;
    });

    builder.addCase(updateUserAction.pending, (state, action) => {
      state.update = 'pending';
    });
    builder.addCase(updateUserAction.fulfilled, (state, action) => {
      state.update = 'success';
      state.user.gender = action.payload.gender;
      state.user.country = action.payload.country;
      state.user.imageUrl = action.payload.imageUrl;
      state.user.interests = action.payload.interests;
      localStorage.setItem('user', JSON.stringify(state.user));
    });
    builder.addCase(updateUserAction.rejected, (state, action) => {
      state.update = 'failed';
      state.updateErr = (action.payload as any)?.err?.message;
    });

    builder.addCase(refreshUserAction.pending, (state, action) => {
      state.refresh = 'pending';
    });
    builder.addCase(refreshUserAction.fulfilled, (state, action) => {
      state.refresh = 'success';
      state.refreshErr = '';
      state.user = {
        email: action.payload.email,
        userName: action.payload.userName,
        gender: action.payload.gender,
        country: action.payload.country,
        imageUrl: action.payload.imageUrl,
        interests: action.payload.interests,
      };
      localStorage.setItem('user', JSON.stringify(state.user));
    });
    builder.addCase(refreshUserAction.rejected, (state, action) => {
      state.refresh = 'failed';
      state.refreshErr = (action.payload as any)?.err?.message;
    });
  }
});

export const {
  autoLogoutAction,
  clearLoginErrAction,
  clearSignupErrAction,
  clearUpdateErrAction,
  clearRefreshErrAction,
} = authSlice.actions;

export default authSlice.reducer;
