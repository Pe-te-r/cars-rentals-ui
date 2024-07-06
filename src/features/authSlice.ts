import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { AuthState, Credentials, AuthResponse, ErrorResponse, User } from '../types/types';

// Initial state
const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

// Async thunk for login
export const login = createAsyncThunk<AuthResponse, Credentials, { rejectValue: ErrorResponse }>(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post<AuthResponse>('http://localhost:3000/api/login', credentials);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for register
export const register = createAsyncThunk<AuthResponse, User, { rejectValue: ErrorResponse }>(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post<AuthResponse>('http://localhost:3000/api/register', userData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Create the slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(login.rejected, (state, action: PayloadAction<ErrorResponse | undefined>) => {
        state.loading = false;
        state.error = action.payload?.message ?? 'An unknown error occurred';
      })
      // Handle register
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(register.rejected, (state, action: PayloadAction<ErrorResponse | undefined>) => {
        state.loading = false;
        state.error = action.payload?.message ?? 'An unknown error occurred';
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
