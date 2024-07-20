import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getVehicleRequest, vehicleResponse } from "../types/types";

const baseUrl = 'http://localhost:3000/api/'

export const vechiclesApi = createApi({
    reducerPath: 'vehicleAPi',
    baseQuery: fetchBaseQuery({baseUrl: baseUrl,
        prepareHeaders:(headers)=>{
            headers.set('Content-Type', 'application/json')
            const user =JSON.parse(localStorage.getItem('user') || '{}');
            const token = user['token'];
            if(token){
                headers.set('Authorization', `${token}`)
            }
            return headers
        }},  
    ),
    endpoints: (builder) => ({
        getVehicles: builder.query<any,getVehicleRequest>({
            query: ({id,details}) => id && details? `vehicles/${id}?details=true `: `vehicles/${id}`,
        }),
        updateVehicle: builder.mutation<vehicleResponse,any>({
            query: ({id,...data})=>({
                url:`vehicles/${id}`,
                method: 'PUT',
                body: data
            })
        }),
        deleteVehicle: builder.mutation<vehicleResponse,any>({
            query: ({id})=>({
                url:`vehicles/${id}`,
                method: 'DELETE',
            })
        }),
        getVehiclesDetails: builder.query<any,void>({
            query: () => 'vehicles?details=true',
        }),
        addVehicleDetails: builder.mutation<any,any>({
            query:(newVehicle)=>({
                url:'vehicles',
                method: 'POST',
                body: newVehicle
            })
        })
        
    })
})


type useVehicleQuery = typeof vechiclesApi.endpoints.getVehicles.useQuery
type useVehicleDetails = typeof vechiclesApi.endpoints.getVehiclesDetails.useQuery
type useDeleteVehicleMutations=typeof vechiclesApi.endpoints.deleteVehicle.useMutation
type useUpdateVehicleMutation=typeof vechiclesApi.endpoints.updateVehicle.useMutation
type addVehicleMutation=typeof vechiclesApi.endpoints.addVehicleDetails.useMutation



export const useVehicleQuery: useVehicleQuery = vechiclesApi.endpoints.getVehicles.useQuery
export const useVehicleDetailsQuery: useVehicleDetails = vechiclesApi.endpoints.getVehiclesDetails.useQuery
export const useDeleteVehicleMutations: useDeleteVehicleMutations = vechiclesApi.endpoints.deleteVehicle.useMutation
export const useUpdateVehicleMutation: useUpdateVehicleMutation = vechiclesApi.endpoints.updateVehicle.useMutation
export const useAddVehicleMutation: addVehicleMutation = vechiclesApi.endpoints.addVehicleDetails.useMutation
