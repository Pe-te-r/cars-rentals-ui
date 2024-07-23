import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { DeleteUserRequest, DeleteUserResponse, LoginRequest, LoginResponse, RegisterRequest, RegisterResponse, UpdateUserRequest, UpdateUserResponse, User} from '../types/types';

export const supporthApi = createApi({
  reducerPath: 'supportApi',
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
    deleteSupport: builder.mutation<any, any>({
      query: ({ id }) => ({
        url: `support/${id}`,
        method: 'DELETE',
      }),
    }),
    updateSupport: builder.mutation<any, any>({
      query: ({ id, ...data }) => ({
        url: `support/${id}`,
        method: 'PUT',
        body: data,
      }),
    }),
    fetchAllSupport: builder.query<any, {detailed: boolean}>({
        query: ({detailed})=> detailed? 'support?details=true' : 'support',
        
      }),
    fetchOneSupport: builder.query<any,string>({
      query: (id) => `support/${id}`,
    }),
    createSupport: builder.mutation<any, any>({
        query: (credentials) => ({
          url: 'support',
          method: 'POST',
          body: credentials,
        }),
      }),
  }),
});

type useDeleteSupportMutation = typeof supporthApi.endpoints.deleteSupport.useMutation;
type UseUpdateSupportMutation = typeof supporthApi.endpoints.updateSupport.useMutation
type UseFetchAllSupportQuery = typeof supporthApi.endpoints.fetchAllSupport.useQuery;
type useFetchOneSupportQuery = typeof supporthApi.endpoints.fetchOneSupport.useQuery
type useCreateSupportMutation = typeof supporthApi.endpoints.createSupport.useMutation


export const useDeleteSupportMutation: useDeleteSupportMutation = supporthApi.endpoints.deleteSupport.useMutation;
export const useUpdateSupportMutation: UseUpdateSupportMutation = supporthApi.endpoints.updateSupport.useMutation;
export const useFetchAllSupportQuery: UseFetchAllSupportQuery = supporthApi.endpoints.fetchAllSupport.useQuery;
export const useFetchOneSupportQuery: useFetchOneSupportQuery = supporthApi.endpoints.fetchOneSupport.useQuery;
export const useCreateSupportMutation: useCreateSupportMutation = supporthApi.endpoints.createSupport.useMutation;