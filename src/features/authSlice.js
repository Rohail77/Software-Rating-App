import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: false,
  reducers: {
    login: state => true,
    logout: state => false,
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
