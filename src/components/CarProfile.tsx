import { Link } from "react-router-dom"
import { getRandomImage } from "../pages/dashboard/images"

const CarProfile = ({booking,index}: any) => {
    console.log(booking)
    console.log('here')
    return (
        <div className="mx-auto flex rounded-md flex-col rounded-lg " key={index}>
        <div className="bg-white">
        <img
        height='250px'
        width='350px'
            src={getRandomImage()}
            alt={`${booking.vehicle['vehicleSpecification'].model} image`}
            />
        </div>
        <div className="p-4 bg-gray-400">
            <h2 className="text-xl font-semibold text-gray-800">
                {booking.vehicle['vehicleSpecification'].manufacturer} {booking.vehicle['vehicleSpecification'].model}
            </h2>
        </div>
        <div className="p-4 flex flex-col bg-gray-700">
            <p className="text-white text-xl mb-2 font-normal font-mono">Location Name: <span className="ml-2 text-gray-400">{booking.vehicle.location.name}</span></p>
            <p className="text-white text-xl mb-2 font-normal font-mono">Available: <span className="ml-2 text-gray-400">{booking.vehicle['availability'].toString()}</span></p>
            <p className="text-white text-xl mb-2 font-normal font-mono">Seating Capacity: <span className="ml-2 text-gray-400">{booking.vehicle.vehicleSpecification.seating_capacity}</span></p>
        <div className="flex justify-center gap-3">
            <Link to={`/admin/vehicles/${booking.vehicle.vehicle_id}`}
                className="mt-2 font-mono text-lg px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-800 hover:text-gray-400">
                    More details
            </Link>
        </div>
        </div>
    </div> )
  }
  
  export default CarProfile









//   vehicles.map((vehicle: any, index) => (
    // 
// ))