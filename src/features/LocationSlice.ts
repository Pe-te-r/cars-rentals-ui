import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { urlApi } from "./url";

const baseUrl = urlApi
export const locationsAPi = createApi({
    reducerPath: 'locationsAPi',
    baseQuery: fetchBaseQuery({
      baseUrl,
      prepareHeaders: (headers) => {
        headers.set('Content-Type', 'application/json');
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        const token = user['token'];
        if (token) {
          headers.set('Authorization', `${token}`);
        }
        return headers;
      },
    }),
    endpoints: (builder) => ({
        getLocations: builder.query<any[], {details?: boolean}>({
        query: ({details}) =>({
            url: details ? 'location?details=true' : 'location'
          }),
      }),
      deleteLocations: builder.mutation<any, any>({
        query: ({ id }) => ({
          url: `location/${id}`,
          method: 'DELETE',
        }),
      }),
      getAllLocations: builder.query<any,void>({
        query: ()=> 'location'
      }),
    updateLocations: builder.mutation<void, any>({
        query: ({ id, ...data }) => ({
          url: `location/${id}`,
          method: 'PUT',
          body: data,
        }),
      }),
      addLocations: builder.mutation<void, any>({
        query: (data) => ({
          url: 'location',
          method: 'POST',
          body: data,
        }),
      }),
    }),
  });
  


type useGetLocationsQuery = typeof locationsAPi.endpoints.getLocations.useQuery;
type useGetAllLocationsQuery = typeof locationsAPi.endpoints.getAllLocations.useQuery;
type UseDeleteLocationsMutation = typeof locationsAPi.endpoints.deleteLocations.useMutation;
type UseUpdateLocationsMutation = typeof locationsAPi.endpoints.updateLocations.useMutation;
type UseAddLocationsMutation = typeof locationsAPi.endpoints.addLocations.useMutation;

export const useGetLocationsQuery: useGetLocationsQuery = locationsAPi.endpoints.getLocations.useQuery;
export const useGetAllLocationsQuery: useGetAllLocationsQuery = locationsAPi.endpoints.getAllLocations.useQuery;
export const useDeleteLocationsMutation: UseDeleteLocationsMutation = locationsAPi.endpoints.deleteLocations.useMutation;
export const useUpdateLocationsMutation: UseUpdateLocationsMutation = locationsAPi.endpoints.updateLocations.useMutation;
export const useAddLocationsMutation: UseAddLocationsMutation = locationsAPi.endpoints.addLocations.useMutation;

