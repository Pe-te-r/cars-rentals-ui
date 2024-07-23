import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { urlApi } from './url';

export const paymentApi = createApi({
  reducerPath: 'paymentApi',
  baseQuery: fetchBaseQuery({ baseUrl: urlApi,
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
    createPayment: builder.mutation<any, any>({
      query: (credentials) => ({
        url: 'payment',
        method: 'POST',
        body: credentials,
      }),
    }),
    deletePayment: builder.mutation<any, any>({
      query: ({ id }) => ({
        url: `payment/${id}`,
        method: 'DELETE',
      }),
    }),
    updatePayment: builder.mutation<any, any>({
      query: ({ id, ...data }) => ({
        url: `payment/${id}`,
        method: 'PUT',
        body: data,
      }),
    }),
    fetchAllPayments: builder.query<any, any>({
        query: ()=> 'payment',
        
      }),
    fetchOnePayment: builder.query<any,string>({
      query: (id) => `payment/${id}`,
    })
  }),
});

type UsepaymentMutation = typeof paymentApi.endpoints.createPayment.useMutation;
type UseDeletePaymentMutation = typeof paymentApi.endpoints.deletePayment.useMutation;
type UseUpdatePaymentMutation = typeof paymentApi.endpoints.updatePayment.useMutation;
type UseFetchAllPaymentsQuery = typeof paymentApi.endpoints.fetchAllPayments.useQuery;
type useFetchOnePaymentQuery = typeof paymentApi.endpoints.fetchOnePayment.useQuery


export const usepaymentMutation: UsepaymentMutation = paymentApi.endpoints.createPayment.useMutation;
export const useDeletePaymentMutation: UseDeletePaymentMutation = paymentApi.endpoints.deletePayment.useMutation;
export const useUpdatePaymentMutation: UseUpdatePaymentMutation = paymentApi.endpoints.updatePayment.useMutation;
export const useFetchAllPaymentsQuery: UseFetchAllPaymentsQuery = paymentApi.endpoints.fetchAllPayments.useQuery;
export const useFetchOnePaymentQuery: useFetchOnePaymentQuery = paymentApi.endpoints.fetchOnePayment.useQuery;