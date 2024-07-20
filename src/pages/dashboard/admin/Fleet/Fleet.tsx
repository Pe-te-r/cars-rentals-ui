import { useEffect, useState } from "react"
import { useGetFleetQuery } from "../../../../features/fleetSlice"
import { useNavigate } from "react-router-dom"

const Fleet = () => {
    const {data, isSuccess} = useGetFleetQuery({details:true})
    const [fleetDetails,setFleetDetails]= useState([])
    const navigate= useNavigate()
    useEffect(()=>{
        if(isSuccess){
            setFleetDetails(data['results'])
            console.log(data)
        }
    },[isSuccess,data])

    const handleDetails=(id: number)=>{
        navigate(`${id}`)
    }
    return (
        <div>
            <div className="overflow-x-auto">
  <table className="table table-zebra font-mono rounded-lg">
    {/* head */}
    <thead>
      <tr className="bg-gray-700 text-gray-400">
        <th></th>
        <th>Car</th>
        <th>Location</th>
        <th>Acuqisition Date</th>
        <th>Depreciation Date</th>
        <th>Status</th>
        <th>Maintance Cost</th>
        <th>Year</th>
        <th className="text-center">Actions</th>
      </tr>
    </thead>
    <tbody >
        {isSuccess && fleetDetails.map((item: any,index)=>(
            <tr key={index} className="bg-gray-800">
                <td>{index+1}</td>
                <td>{item.vehicle.vehicleSpecification.manufacturer} {" "} {item.vehicle.vehicleSpecification.model}</td>
                <td>{item.vehicle.location.name}</td>
                <td>{item.acquisition_date}</td>
                <td>{item.depreciation_date}</td>
                <td>{item.status}</td>
                <td>{item.maintances_cost}</td>
                <td>{item.vehicle.vehicleSpecification.year}</td>
                <td className="text-center">
                    <button className="btn mr-4 bg-red-800 hover:bg-red-900">Delete</button>
                    <button className="btn ml-4 bg-blue-800 hover:bg-blue-900" onClick={()=>handleDetails(item.id)} type="button">Details</button>
                </td>
            </tr>
        ))}
    </tbody>
  </table>
</div>
        </div>
    )
}

export default Fleet
