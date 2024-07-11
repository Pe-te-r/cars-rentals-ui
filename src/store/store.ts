import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '../features/login_slice';
import { vechiclesApi } from '../features/vehiclesSlice';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [vechiclesApi.reducerPath]: vechiclesApi.reducer
  },
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware().concat(authApi.middleware,vechiclesApi.middleware),

});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>