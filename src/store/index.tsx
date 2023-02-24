import { configureStore } from '@reduxjs/toolkit';
import auth from './reducers/auth.reducer';

const store = configureStore({
  reducer: {
    auth: auth,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
