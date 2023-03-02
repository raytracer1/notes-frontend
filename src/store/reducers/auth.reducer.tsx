import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loginUser, logoutUser, signupUser, updateUser } from '../../service/authService';

export const loginUserAction = createAsyncThunk(
  'auth/loginUser',
  async (params: { email: string, passWord: string }, { rejectWithValue }) => {
    try {
      const response = await loginUser(params.email, params.passWord);
      return { data: response.data};
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
  async (params: { gender: string, country: string, imageUrl: string },
    { rejectWithValue }) => {
    try {
      const response = await updateUser(params.gender, params.country, params.imageUrl);
      return response.data;
    } catch(err: any) {
      return rejectWithValue(err.response.data);
    }
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
  };
  signup: string;
  signupErr: string;
  update: string;
  updateErr: string;
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
    },
  signup: 'init',
  signupErr: '',
  update: 'init',
  updateErr: '',
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
  },

  extraReducers: builder => {

    builder.addCase(loginUserAction.pending, (state, action) => {
      state.login = 'pending';
    });
    builder.addCase(loginUserAction.fulfilled, (state, action) => {
      state.authenticated = true;
      state.token = action.payload.data.token;
      state.login = 'success';
      state.user = {
        email: action.payload.data.email,
        userName: action.payload.data.userName,
        gender: action.payload.data.gender,
        country: action.payload.data.country,
        imageUrl: action.payload.data.imageUrl,
      };
      localStorage.setItem('user', JSON.stringify(state.user));
      localStorage.setItem('token', state.token);
    });
    builder.addCase(loginUserAction.rejected, (state, action) => {
      state.login = 'failed';
      state.loginErr = (action.payload as any)?.err.message;
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
      state.signupErr = (action.payload as any)?.err.message;
    });

    builder.addCase(updateUserAction.pending, (state, action) => {
      state.update = 'pending';
    });
    builder.addCase(updateUserAction.fulfilled, (state, action) => {
      state.update = 'success';
    });
    builder.addCase(updateUserAction.rejected, (state, action) => {
      state.update = 'failed';
      state.updateErr = (action.payload as any)?.err.message;
    });
  }
});

export const {
  autoLogoutAction,
  clearLoginErrAction,
  clearSignupErrAction,
  clearUpdateErrAction,
} = authSlice.actions;

export default authSlice.reducer;
