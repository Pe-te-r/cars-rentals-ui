import { useParams } from "react-router-dom";
import { useVehicleQuery } from "../../../../features/vehiclesSlice";
import { useEffect, useState } from "react";

const VehiclesDetails = () => {
  const [vehicle,setVehicle]=useState<any>({})
  const { id } = useParams();
  const {data,refetch, isLoading,isSuccess}= useVehicleQuery({id:id,details:true},{pollingInterval:5000})
  
  useEffect(() => {
    if (isSuccess && data) {
        setVehicle(data['result']);
        console.log(data['result']);
    }
  }, [isSuccess, data]);

    return (
      <>
        {isLoading ? <span className="fixed left-1/2 top-1/2 loading loading-spinner text-primary"></span>: 
        <div className="bg-gray-600 p-5 h-screen">
          {vehicle.vehicleSpecification? 
            <h3 className="text-center text-white p-2 font-mono text-[28px] font-bold">{vehicle.vehicleSpecification.manufacturer}{' '}{vehicle.vehicleSpecification.model}</h3>
            : null}
          <div className="">
            <div className=""></div>
            <div className=""></div>
          </div>
          <div className="">

          </div>
        </div>
        }
      </>
    )
}

export default VehiclesDetails
