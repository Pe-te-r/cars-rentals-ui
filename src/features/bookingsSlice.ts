import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = 'http://localhost:3000/api/'
export const bookingsApi = createApi({
    reducerPath: 'bookingsAPi',
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
      getBookings: builder.query<any[], {details?: boolean}>({
        query: ({details}) =>({
            url: details ? 'bookings?details=true' : 'bookings'
          }),
      }),
      deleteBookings: builder.mutation<void, any>({
        query: ({ id }) => ({
          url: `bookings/${id}`,
          method: 'DELETE',
        }),
      }),
    updateBookings: builder.mutation<void, any>({
        query: ({ id, ...data }) => ({
          url: `bookings/${id}`,
          method: 'PUT',
          body: data,
        }),
      }),
      addBookings: builder.mutation<any, any>({
        query: (data) => ({
          url: 'bookings',
          method: 'POST',
          body: data,
        }),
      }),
      searchBookings: builder.query<any, {id?: number}>({
        query: ({id}) =>({
            url: `bookings/search/${id}`
          }),
      }),
    }),
  });
  


type UseGetBookingsQuery = typeof bookingsApi.endpoints.getBookings.useQuery;
type UseSearchBookingsQuery = typeof bookingsApi.endpoints.searchBookings.useQuery;
type UseDeleteBookingsMutation = typeof bookingsApi.endpoints.deleteBookings.useMutation;
type UseUpdateBookingsMutation = typeof bookingsApi.endpoints.updateBookings.useMutation;
type UseAddBookingsMutation = typeof bookingsApi.endpoints.addBookings.useMutation;

export const useGetBookingsQuery: UseGetBookingsQuery = bookingsApi.endpoints.getBookings.useQuery;
export const useSearchBookingsQuery: UseSearchBookingsQuery = bookingsApi.endpoints.searchBookings.useQuery;
export const useDeleteBookingsMutation: UseDeleteBookingsMutation = bookingsApi.endpoints.deleteBookings.useMutation;
export const useUpdateBookingsMutation: UseUpdateBookingsMutation = bookingsApi.endpoints.updateBookings.useMutation;
export const useAddBookingsMutation: UseAddBookingsMutation = bookingsApi.endpoints.addBookings.useMutation;

