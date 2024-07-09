import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from '../types/types';

export const authApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/' }),
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: 'login',
        method: 'POST',
        body: credentials,
      }),
    }),
    register: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (credentials) => ({
        url: 'register',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

type UseLoginMutation = typeof authApi.endpoints.login.useMutation;
type UseRegisterMutation = typeof authApi.endpoints.register.useMutation;

export const useLoginMutation: UseLoginMutation = authApi.endpoints.login.useMutation;
export const useRegisterMutation: UseRegisterMutation = authApi.endpoints.register.useMutation;
