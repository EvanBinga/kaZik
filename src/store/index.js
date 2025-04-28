import { configureStore } from '@reduxjs/toolkit';
import gamesReducer from './slices/gamesSlice';
import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    games: gamesReducer,
    auth: authReducer,
  },
});