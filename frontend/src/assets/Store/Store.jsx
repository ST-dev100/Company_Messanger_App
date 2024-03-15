import { configureStore } from '@reduxjs/toolkit';
import UserProfileReducer from './UserProfileSlice';

export const store = configureStore({
  reducer: {
    user: UserProfileReducer
  }
});
