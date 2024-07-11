import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { vehicleResponse } from "../types/types";

const baseUrl = 'http://localhost:3000/api/'

export const vechiclesApi = createApi({
    reducerPath: 'vehicleAPi',
    baseQuery: fetchBaseQuery({baseUrl: baseUrl}),
    endpoints: (builder) => ({
        getVehicles: builder.query<any,void>({
            query: () => 'vehicles',
        }),
        updateVehicle: builder.mutation<vehicleResponse,any>({
            query: ({id,any})=>({
                url:`vehicles/${id}`,
                method: 'PUT',
                body: any
            })
        }),
        deleteVehicle: builder.mutation<vehicleResponse,any>({
            query: ({id})=>({
                url:`vehicles/${id}`,
                method: 'DELETE',
            })
        }),
    })
})


type useVehicleQuery = typeof vechiclesApi.endpoints.getVehicles.useQuery
type useDeleteVehicleMutations=typeof vechiclesApi.endpoints.deleteVehicle.useMutation
type useUpdateVehicleMutation=typeof vechiclesApi.endpoints.updateVehicle.useMutation


export const useVehicleQuery: useVehicleQuery = vechiclesApi.endpoints.getVehicles.useQuery
export const useDeleteVehicleMutations: useDeleteVehicleMutations = vechiclesApi.endpoints.deleteVehicle.useMutation
export const useUpdateVehicleMutation: useUpdateVehicleMutation = vechiclesApi.endpoints.updateVehicle.useMutation