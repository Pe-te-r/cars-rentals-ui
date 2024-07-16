import { useEffect, useState } from "react";
import DynamicTable from "../../../../components/Table";
import { useDeleteVehicleMutations, useUpdateVehicleMutation, useVehicleQuery } from "../../../../features/vehiclesSlice";
import DynamicForm from "../../../../components/DynamicForm";

const VehiclesTable=()=>{
  const {data,refetch, isLoading,isSuccess}= useVehicleQuery({id:undefined},{pollingInterval:50000})
  const [vehicles,setVehicles]= useState([])
  const[updateVehicle]= useUpdateVehicleMutation()
  const [deleteVehicle]= useDeleteVehicleMutations()
  const [editableRowId, setEditableRowId] = useState<number>(-1);
  const [rental_rate, setRentalRate] = useState('')
  const [availability, setAvailability] = useState('')
  const [location,setLocation] = useState('')



  useEffect(() => {
    if (isSuccess && data?.results) {
      setVehicles(data.results);
    }
  }, [isSuccess, data]);

  const headers= ['rental_rate','availability','location_id']
  const vehiclesDetails: any =vehicles || []

  const shareUpdateFunctionality =[
    {
      text: 'rental_rate',
      value: rental_rate,
      changeValue: setRentalRate
    },
    {
      text: 'availability',
      value: availability ? "true" : "false",
      changeValue: setAvailability
    },
    {
      text: 'location',
      value: location,
      changeValue: setLocation
    },
  ]
  
  const handleCancelClick = () => {
    setEditableRowId(-1);
  };

  const handleSaveClick = async () => {
    const info = {
      id: editableRowId.toString(),
      rental_rate: rental_rate,
      availability: availability,
      location_id: location,
    };
    await updateVehicle(info);
    setEditableRowId(-1);
    refetch(); // Fetch the latest data after update
  };

  const handleEditClick = (vehicle: any) => {
    setEditableRowId(vehicle.vehicle_id);
    setRentalRate(vehicle.rental_rate);
    setAvailability(vehicle.availability);
    setLocation(vehicle.location_id);
    

  }

  const handleDeleteClick=async(id: string) => {
    await deleteVehicle(id)
    refetch()
  }

  console.log(vehiclesDetails)

  return(
    <>
    <div>
      {isLoading ? <span className="loading fixed top-1/2 left-1/2 loading-bars loading-lg"></span> : '' }
       <DynamicTable headers={headers} data={vehiclesDetails} onEdit={handleEditClick} onDelete={handleDeleteClick} /> 
       {editableRowId > 0 &&<> <DynamicForm heading='Edit vehicle' shareFunctions={shareUpdateFunctionality} handleCancelClick={handleCancelClick} handleSaveClick={handleSaveClick}/></>}
    </div>
    </>
  )
}

export default VehiclesTable;