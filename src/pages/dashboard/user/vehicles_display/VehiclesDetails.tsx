import { useParams } from "react-router-dom";
import { useVehicleQuery } from "../../../../features/vehiclesSlice";

const VehiclesDetails = () => {
  const { id } = useParams();
  const {data,refetch, isLoading,isSuccess}= useVehicleQuery({id:id},{pollingInterval:50000})
  if(isSuccess){
    console.log(data)
    
  }

    return (
        <div>
            <h3>hello</h3>
        </div>
    )
}

export default VehiclesDetails
