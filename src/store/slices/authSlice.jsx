import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  user: null,
  balance: 0,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.balance = action.payload.balance || 0;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.balance = 0;
    },
    updateBalance: (state, action) => {
      state.balance = action.payload;
    }
  },
});

export const { login, logout, updateBalance } = authSlice.actions;
export default authSlice.reducer;