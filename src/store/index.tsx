import { configureStore } from '@reduxjs/toolkit';
import auth from './reducers/auth.reducer';
import space from './reducers/space.reducer';
import { autoLogoutAction } from './reducers/auth.reducer';
import axios from 'axios';
import { apiInstance } from '../api/requestInterceptor';
import { baseURL } from '../config';

const getToken = () => {
  const token = localStorage.getItem('token');
  return token;
}
const store = configureStore({
  reducer: {
    auth: auth,
    space: space,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;

apiInstance.interceptors.request.use(
  function (config) {
    const token = getToken();
    if (token) {
      config.headers!.Authorization = 'Bearer ' + token;
    }
    return config;
  },

  function (error) {
    return Promise.reject(error);
  }
)

apiInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    if (!error.response) {
      return Promise.reject(error);
    }
    if (error.response.status !== 401) {
      return Promise.reject(error);
    }
    const store_token = getToken();
    if (!store_token) {
      return Promise.reject(error);
    }
    try {
      const res : any = await axios({
        url: baseURL + '/user/checkJWTToken',
        method: 'GET',
        headers: {
          Authorization: `Bearer ` + store_token,
        }
      });
      return res;
    } catch (err) {
      store.dispatch(autoLogoutAction());
      return Promise.reject(err);
    }
  }
)