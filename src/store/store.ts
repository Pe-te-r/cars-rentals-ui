// import { configureStore } from '@reduxjs/toolkit';
// import authReducer from '../features/authSlice';
// import { apiSlice } from '../features/login_features';
// import { setupListeners } from '@reduxjs/toolkit/query/react';
//
// export const store = configureStore({
//   reducer: {
//     auth: authReducer,
//     [apiSlice.reducerPath]: apiSlice.reducer
//     // api: apiSlice.reducer,
//     // Add other reducers here
//
//   },
//   middleware:(getDefaultMiddleware)=>
//     getDefaultMiddleware().concat(apiSlice.middleware)
// });
//
// setupListeners(store.dispatch);
//
// export type RootState=ReturnType<typeof store.getState>
// export type AppDispatch=typeof store.dispatch


import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '../features/login_slice';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>