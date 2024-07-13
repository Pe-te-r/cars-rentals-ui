import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { DeleteUserRequest, DeleteUserResponse, LoginRequest, LoginResponse, RegisterRequest, RegisterResponse, UpdateUserRequest, UpdateUserResponse, User} from '../types/types';

export const authApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/',
    prepareHeaders: (headers)=>{
      headers.set('Content-Type', 'application/json');
      const data = JSON.parse(localStorage.getItem('user')|| '{}')
      const token = data['token']
      if (token) {
        headers.set('Authorization', `${token}`);
      }
      return headers;
    } 
    }),
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
    deleteUser: builder.mutation<DeleteUserResponse, DeleteUserRequest>({
      query: ({ id }) => ({
        url: `users/${id}`,
        method: 'DELETE',
      }),
    }),
    updateUser: builder.mutation<UpdateUserResponse, UpdateUserRequest>({
        query: ({ id, ...data }) => ({
          url: `users/${id}`,
          method: 'PUT',
          body: data,
        }),
      }),
    fetchAllUsers: builder.query<User[], void>({
        query: ()=> 'users',
        
      }),
    fetchOneUser: builder.query<any,string>({
      query: (id) => `users/${id}`,
    })
  }),
});

type UseLoginMutation = typeof authApi.endpoints.login.useMutation;
type UseRegisterMutation = typeof authApi.endpoints.register.useMutation;
type UseDeleteUserMutation = typeof authApi.endpoints.deleteUser.useMutation;
type UseUpdateUserMutation = typeof authApi.endpoints.updateUser.useMutation;
type UseFetchAllUsersQuery = typeof authApi.endpoints.fetchAllUsers.useQuery;
type useFetchOneUserQuery = typeof authApi.endpoints.fetchOneUser.useQuery


export const useLoginMutation: UseLoginMutation = authApi.endpoints.login.useMutation;
export const useRegisterMutation: UseRegisterMutation = authApi.endpoints.register.useMutation;
export const useDeleteUserMutation: UseDeleteUserMutation = authApi.endpoints.deleteUser.useMutation;
export const useUpdateUserMutation: UseUpdateUserMutation = authApi.endpoints.updateUser.useMutation;
export const useFetchAllUsersQuery: UseFetchAllUsersQuery = authApi.endpoints.fetchAllUsers.useQuery;
export const useFetchOneUserQuery: useFetchOneUserQuery = authApi.endpoints.fetchOneUser.useQuery;