import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

interface AuthState {
  isAuthenticated: boolean;
}

const token = Cookies.get('authToken');

const initialState: AuthState = token
  ? { isAuthenticated: true } // If token exists, set as authenticated
  : { isAuthenticated: false }; // Otherwise, set as not authenticated

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state) {
      state.isAuthenticated = true;
    },
    logout(state) {
      state.isAuthenticated = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
