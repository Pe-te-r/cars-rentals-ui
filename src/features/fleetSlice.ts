import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = 'http://localhost:3000/api/'
export const fleetApi = createApi({
    reducerPath: 'fleetApi',
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
      getFleet: builder.query<any, {details?: boolean}>({
        query: ({details}) =>({
            url: details ? 'fleet?details=true' : 'fleet'
          }),
      }),
      getOneFleet: builder.query<any,{id: number,details:boolean}>({
        query: ({id,details})=> !details?`fleet/${id}`: `fleet/${id}?details=true`
      }),
      deleteFleet: builder.mutation<void, any>({
        query: ({ id }) => ({
          url: `fleet/${id}`,
          method: 'DELETE',
        }),
      }),
    updateFleet: builder.mutation<void, any>({
        query: ({ id, ...data }) => ({
          url: `fleet/${id}`,
          method: 'PUT',
          body: data,
        }),
      }),
      addFleet: builder.mutation<void, any>({
        query: (data) => ({
          url: 'fleet',
          method: 'POST',
          body: data,
        }),
      }),
    }),
  });
  


type UseGetFleetQuery = typeof fleetApi.endpoints.getFleet.useQuery;
type UseOneFleetQuery = typeof fleetApi.endpoints.getOneFleet.useQuery;
type UseDeleteFleetMutation = typeof fleetApi.endpoints.deleteFleet.useMutation;
type UseUpdateFleetMutation = typeof fleetApi.endpoints.updateFleet.useMutation;
type UseAddFleetMutation = typeof fleetApi.endpoints.addFleet.useMutation;

export const useGetFleetQuery: UseGetFleetQuery = fleetApi.endpoints.getFleet.useQuery;
export const useOneFleetQuery: UseOneFleetQuery = fleetApi.endpoints.getOneFleet.useQuery;
export const useDeleteFleetMutation: UseDeleteFleetMutation = fleetApi.endpoints.deleteFleet.useMutation;
export const useUpdateFleetMutation: UseUpdateFleetMutation = fleetApi.endpoints.updateFleet.useMutation;
export const useAddFleetMutation: UseAddFleetMutation = fleetApi.endpoints.addFleet.useMutation;

