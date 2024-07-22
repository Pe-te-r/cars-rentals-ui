import { IoIosCloseCircleOutline } from "react-icons/io";
// import CustomDropdown from "../../../../components/CustomDropDown";
import InputDiv from "../../../../components/InputDiv";
import { BsFillSendPlusFill } from "react-icons/bs";
import React, { useEffect, useState } from "react";
import { useGetAllLocationsQuery } from "../../../../features/LocationSlice";
import CustomDropdown from "../../../../components/CustomDropDown";
import { useUpdateVehicleMutation } from "../../../../features/vehiclesSlice";
import { useToast } from "../../../../context/smallToast";

const EditVehicle = ({ isOpen, onClose,vehicle,id ,refetch}: any) => {
    if (!isOpen) return null;
    const [vehicleData,setVehicleData] = useState({
            rental_rate: vehicle.rental_rate,
            availability: "true",
            manufacturer:vehicle.vehicleSpecification.manufacturer,
            model: vehicle.vehicleSpecification.model,
            year: vehicle.vehicleSpecification.year,
            fuel_type: vehicle.vehicleSpecification.fuel_type,
            engine_capacity:vehicle.vehicleSpecification.engine_capacity,
            transmission_capacity: vehicle.vehicleSpecification.transmission_capacity,
            seating_capacity: vehicle.vehicleSpecification.seating_capacity,
            color: vehicle.vehicleSpecification.color,
            features: vehicle.vehicleSpecification.features,
            location: vehicle.location.name,
        
    })
    const [locationsNames,setLocatins]=useState([])
    const {data,isSuccess} =useGetAllLocationsQuery(undefined,{pollingInterval:4000})
    const [updateVehicles,{isLoading:updateLoading,data:updateData,isError:updateError,isSuccess:successUpdate}] = useUpdateVehicleMutation()
    const { addToast} =useToast()
    const handleSubmit = (e:React.FormEvent)=>{
        e.preventDefault();
        updateVehicles({id, ...vehicleData})
    }   

    const handleChange = (key: string, value: string) => {
        setVehicleData((prevDetails: any) => ({
          ...prevDetails,
        [key]: typeof value === 'boolean' ? value : value,
        }));
      };
    

    useEffect(()=>{
        if(isSuccess && data){
            function createObject(key:string, value: string) {
                return { label:[key], value:value };
              }
          
          
              if(isSuccess){
                const locationsInfo = data['results']
                const locationsName = locationsInfo.map((location: any)=> 
                  { 
                    return({name:location.name,id:location.id})
                  }
              )
                const locations = locationsName.map((location: any) =>createObject(location.name,location.id));
                setLocatins(locations)
                }
                
        }
    },[data,isSuccess])

    useEffect(()=>{
        console.log(updateData)
        if((updateData?.updateSpecsResult=='success' || updateData?.updateVehicleResult=='success') && successUpdate){
            addToast('Vehicle Updated Successfully','success')
            refetch();
            onClose();
        }
        if(updateData=='error' ){
            addToast('Failed to update Vehicle','error')
        }
        if(updateError){
            addToast('Error occured Vehicle','error')
        }
    },[updateData,successUpdate])

    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <form className="bg-gray-900 p-8 rounded-lg shadow-lg relative" onSubmit={handleSubmit}>

            <h2 className="font-mono text-[20px] text-center mb-4">Add Car Details for Booking</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className='m-3 p-2 font-mono rounded-md'>
                <InputDiv
                  label="Rental Price"
                  placeholder="Rental Price"
                  type="number"
                  setData={(value: string) => handleChange('rental_rate', value)}
                  value={vehicleData.rental_rate}
                />
              </div>
              <div className='m-3 p-2 font-mono rounded-md'>
                <InputDiv
                  label="Manufacturer"
                  placeholder="Car Manufacturer"
                  type="text"
                  setData={(value: string) => handleChange('manufacturer', value)}
                  value={vehicleData.manufacturer}
                />
              </div>
              <div className='m-3 p-2 font-mono rounded-md'>
                <InputDiv
                  label="Model"
                  placeholder="Car Model"
                  type="text"
                  setData={(value: string) => handleChange('model', value)}
                  value={vehicleData.model}
                />
              </div>
              <div className='m-3 p-2 font-mono rounded-md'>
                <InputDiv
                  label="Year"
                  placeholder="Car Year"
                  type="number"
                  setData={(value: string) => handleChange('year', value)}
                  value={vehicleData.year}
                />
              </div>
              <div className='m-3 p-2 font-mono rounded-md'>
                <InputDiv
                  label="Fuel Type"
                  placeholder="Fuel Type"
                  type="text"
                  setData={(value: string) => handleChange('fuel_type', value)}
                  value={vehicleData.fuel_type}
                />
              </div>
              <div className='m-3 p-2 font-mono rounded-md'>
                <InputDiv
                  label="Engine Capacity"
                  placeholder="Engine Capacity"
                  type="text"
                  setData={(value: string) => handleChange('engine_capacity', value)}
                  value={vehicleData.engine_capacity}
                />
              </div>
              <div className='m-3 p-2 font-mono rounded-md'>
                <InputDiv
                  label="Transmission Capacity"
                  placeholder="Transmission Capacity"
                  type="text"
                  setData={(value: string) => handleChange('transmission_capacity', value)}
                  value={vehicleData.transmission_capacity}
                />
              </div>
              <div className='m-3 p-2 font-mono rounded-md'>
                <InputDiv
                  label="Seating Capacity"
                  placeholder="Seating Capacity"
                  type="number"
                  setData={(value: string) => handleChange('seating_capacity', value)}
                  value={vehicleData.seating_capacity}
                />
              </div>
              <div className='m-3 p-2 font-mono rounded-md'>
                <InputDiv
                  label="Color"
                  placeholder="Color"
                  type="text"
                  setData={(value: string) => handleChange('color', value)}
                  value={vehicleData.color}
                />
              </div>
              <div className='m-3 p-2 font-mono rounded-md'>
                <InputDiv
                  label="Features"
                  placeholder="Features"
                  type="text"
                  required={false}
                  setData={(value: string) => handleChange('features', value)}
                  value={vehicleData.features}
                />
              </div>
            <div className="m-3 p-2 font-mono rounded-md">
                <label className="block mb-2 text-white">Locations</label>
                <CustomDropdown
                  height={'h-[180px]'}
                  value={vehicleData.location}
                  onChange={(value: any) => handleChange('location', value)}
                  options={locationsNames}
                />
            </div>
            </div>
            <div className="flex justify-end gap-4">
              <button className={`btn bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-900 ${updateLoading && 'bg-gray-800 cursor-not-allowed'}`} onClick={() => onClose()}><IoIosCloseCircleOutline size={30}/></button>
              <button className="btn bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-900" type="submit" >{updateLoading ? <span className="loading loading-spinner loading-xs"></span> : <BsFillSendPlusFill size={30} className="text-white"/>}</button>
              {/* <button className="btn bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-900" type="submit" >{<BsFillSendPlusFill size={30} className="text-white"/>}</button> */}
            </div>
          </form>
        </div>
    )
}

export default EditVehicle
