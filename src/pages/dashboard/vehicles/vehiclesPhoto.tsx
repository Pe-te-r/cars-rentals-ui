
import { useState, useEffect } from "react";
import { useVehicleDetailsQuery } from "../../../features/vehiclesSlice";

const VehiclesPhoto = () => {
    const [vehicles, setVehicles] = useState([]);
    const [expanded, setExpanded] = useState<any>({});
    const { data, isSuccess, isLoading } = useVehicleDetailsQuery(undefined, { pollingInterval: 10000 });

    useEffect(() => {
        if (isSuccess && data) {
            setVehicles(data['results']);
        }
    }, [isSuccess, data]);

    const toggleExpand = (index: any) => {
        setExpanded((prevState: any) => ({ ...prevState, [index]: !prevState[index] }));
    };

    return (
        <div className="flex flex-wrap gap-4">
            {isLoading ? (
                <span className="loading fixed bottom-1/2 right-1/2 loading-ball loading-lg"></span>
            ) : (
                vehicles.map((vehicle: any, index) => (
                    <div className="max-w-sm border h-min border-white mx-auto bg-white rounded-lg shadow-md overflow-hidden" key={index}>
                        <img
                            className="w-full h-48 object-cover"
                            src="https://i.pinimg.com/236x/d5/13/af/d513afdc29e4069784885af86d5479c8.jpg"
                            alt={`${vehicle['vehicleSpecification'].model} image`}
                        />
                        <div className="p-4 bg-gray-400">
                            <h2 className="text-xl font-semibold text-gray-800">
                                {vehicle['vehicleSpecification'].manufacturer} {vehicle['vehicleSpecification'].model}
                            </h2>
                        </div>
                        <div className="p-4 bg-gray-700">
                            <p className="text-white text-xl mb-2 font-normal font-mono">Location Name: <span className="ml-2 text-black">{vehicle.location.name}</span></p>
                            <p className="text-white text-xl mb-2 font-normal font-mono">Available: <span className="ml-2 text-black">{vehicle['availability'].toString()}</span></p>
                            <p className="text-white text-xl mb-2 font-normal font-mono">Seating Capacity: <span className="ml-2 text-black">{vehicle['vehicleSpecification'].seating_capacity}</span></p>
                            <p className="text-white text-xl mb-2 font-normal font-mono">Year: <span className="ml-2 text-black">{vehicle['vehicleSpecification'].year}</span></p>
                            <p className="text-white text-xl mb-2 font-normal font-mono">Engine Capacity: <span className="ml-2 text-black">{vehicle['vehicleSpecification'].engine_capacity}L</span></p>
                            <p className="text-white text-xl mb-2 font-normal font-mono">Fuel Type: <span className="ml-2 text-black">{vehicle['vehicleSpecification'].fuel_type}</span></p>
                            <p className="text-white text-xl mb-2 font-normal font-mono">Transmission: <span className="ml-2 text-black">{vehicle['vehicleSpecification'].transmission_capacity}</span></p>
                            {expanded[index] && (
                                <div className="mt-4 text-white">
                                    <p className="text-white text-xl mb-2 font-normal font-mono">Address: <span className="ml-2 text-black">{vehicle.location.address}</span></p>
                                    <p className="text-white text-xl mb-2 font-normal font-mono">Contact: <span className="ml-2 text-black">{vehicle.location.contact}</span></p>
                                    <p className="text-white text-xl mb-2 font-normal font-mono">Manufacturer: <span className="ml-2 text-black">{vehicle['vehicleSpecification'].manufacturer}</span></p>
                                    <p className="text-white text-xl mb-2 font-normal font-mono">Model: <span className="ml-2 text-black">{vehicle['vehicleSpecification'].model}</span></p>
                                </div>
                            )}
                            <button
                                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
                                onClick={() => toggleExpand(index)}
                            >
                                {expanded[index] ? "Show Less" : "Show More Details"}
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default VehiclesPhoto;

