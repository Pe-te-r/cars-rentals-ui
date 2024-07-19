import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '../features/login_slice';
import { vechiclesApi } from '../features/vehiclesSlice';
import { bookingsApi } from '../features/bookingsSlice';
import { locationsAPi } from '../features/LocationSlice';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [vechiclesApi.reducerPath]: vechiclesApi.reducer,
    [bookingsApi.reducerPath]: bookingsApi.reducer,
    [locationsAPi.reducerPath]: locationsAPi.reducer,
  },
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware().concat(authApi.middleware,vechiclesApi.middleware,bookingsApi.middleware,locationsAPi.middleware),

});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>