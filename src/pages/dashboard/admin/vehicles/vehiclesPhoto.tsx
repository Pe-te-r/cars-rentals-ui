
import { useState, useEffect } from "react";
import { useVehicleDetailsQuery } from "../../../../features/vehiclesSlice";
import { getRandomImage } from "../../images";
import { Link } from "react-router-dom";
import AddVehicleForm from "./addVehicleForm";
import { IoMdAddCircle } from "react-icons/io";


const VehiclesPhoto = () => {
    const [vehicles, setVehicles] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const { data, isSuccess, isLoading } = useVehicleDetailsQuery(undefined, { pollingInterval: 6000 });

    useEffect(() => {
        if (isSuccess && data) {
            setVehicles(data['results']);
            console.log(data['results'][0]);
        }
    }, [isSuccess, data]);

    const handleAddVehicleClick = () => {
        setShowForm(true);
      };

    const handleCloseForm = () => {
        setShowForm(false);
      };

    return (
        <div className="flex  flex-wrap gap-4 relative">
            <button
                className="fixed bottom-5 right-5 bg-yellow-600 text-black font-mono text-[21px] px-6 py-4 rounded-full shadow-lg hover:bg-yellow-700 focus:outline-none"
                    onClick={handleAddVehicleClick}>
                    <IoMdAddCircle size={30} className="text-grey-800"/></button>
            {isLoading ? (
                <span className="loading fixed bottom-1/2 right-1/2 loading-ball loading-lg"></span>
            ) : (
                vehicles.map((vehicle: any, index) => (
                    <div className="mx-auto flex rounded-md flex-col rounded-lg " key={index}>
                        <div className="bg-white">
                        <img
                        height='250px'
                        width='350px'
                            src={getRandomImage()}
                            alt={`${vehicle['vehicleSpecification'].model} image`}
                            />
                        </div>
                        <div className="p-4 bg-gray-400">
                            <h2 className="text-xl font-semibold text-gray-800">
                                {vehicle['vehicleSpecification'].manufacturer} {vehicle['vehicleSpecification'].model}
                            </h2>
                        </div>
                        <div className="p-4 flex flex-col bg-gray-700">
                            <p className="text-white text-xl mb-2 font-normal font-mono">Location Name: <span className="ml-2 text-gray-400">{vehicle.location.name}</span></p>
                            <p className="text-white text-xl mb-2 font-normal font-mono">Available: <span className="ml-2 text-gray-400">{vehicle['availability'].toString()}</span></p>
                            <p className="text-white text-xl mb-2 font-normal font-mono">Seating Capacity: <span className="ml-2 text-gray-400">{vehicle.vehicleSpecification.seating_capacity}</span></p>
                        <div className="flex justify-center gap-3">
                            <Link to={`${vehicle.vehicle_id}`}
                                className="mt-2 font-mono text-lg px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-800 hover:text-gray-400">
                                    More details
                            </Link>
                        </div>
                        </div>
                    </div>
                ))
            )}
            <AddVehicleForm close={handleCloseForm} display={showForm}/>
        </div>
    );
};

export default VehiclesPhoto;

