import { useNavigate, useParams } from "react-router-dom";
import { useOneFleetQuery } from "../../../../features/fleetSlice";
import { useEffect, useState } from "react";

const FleetDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate()
    const { data, isSuccess, isLoading } = useOneFleetQuery({ id: Number(id), details: true });
    const [fleetDetails, setFleetDetails] = useState<any>();

    useEffect(() => {
        if (isSuccess) {
            setFleetDetails(data['result']);
        }
    }, [data, isSuccess]);

    const handleNavigate = () => {
        navigate(`/admin/fleets`);
    }


    return (
        <>
            {!isLoading && fleetDetails ? (
                <>
                <div className="vehicle-details font-mono">
                    <h2 className="font-mono text-xl mb-4 text-center">Vehicle Details</h2>
                    <div className="bg-gray-800 p-4 rounded-lg mb-4">
                        <h3 className="text-lg font-semibold text-white text-center">General Information</h3>
                        <p className="text-gray-300">Acquisition Date: {fleetDetails.acquisition_date}</p>
                        <p className="text-gray-300">Depreciation Date: {fleetDetails.depreciation_date}</p>
                        <p className="text-gray-300">Maintenance Cost: {fleetDetails.maintances_cost}</p>
                        <p className="text-gray-300">Status: {fleetDetails.status}</p>
                        <p className="text-gray-300">Availability: {fleetDetails.availability ? 'Available' : 'Not Available'}</p>
                        <p className="text-gray-300">Location: {fleetDetails.vehicle.location.name}</p>
                    </div>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg font-mono mb-4">
                    <h3 className="text-lg font-semibold text-white text-center">Specifications</h3>
                    <p className="text-gray-300">Manufacturer: {fleetDetails.vehicle.vehicleSpecification.manufacturer}</p>
                    <p className="text-gray-300">Model: {fleetDetails.vehicle.vehicleSpecification.model}</p>
                    <p className="text-gray-300">Year: {fleetDetails.vehicle.vehicleSpecification.year}</p>
                    <p className="text-gray-300">Color: {fleetDetails.vehicle.vehicleSpecification.color}</p>
                </div> 
                <div className="bg-gray-800 p-4 rounded-lg font-mono">
        <h3 className="text-lg font-semibold text-white">Bookings</h3>
        {fleetDetails.vehicle.bookings.map((booking: any) => (
            <div key={booking.id} className="mb-4 p-2 border-b border-gray-700">
                {/* {console.log(booking.payment)} */}
            <p className="text-gray-300">Booking Date: {booking.booking_date}</p>
            <p className="text-gray-300">Return Date: {booking.return_date}</p>
            <p className="text-gray-300">Status: {booking.status}</p>
            <p className="text-gray-300">Total Amount: {booking.totalAmount}</p>
            {booking.payment? 
                <p className="text-gray-300">Payment Status: {booking.payment.payment_status}</p>
            : null}
            <p className="text-gray-300">User: {booking.user.name} ({booking.user.email})</p>
            <p className="text-gray-300">Contact: {booking.user.contact_phone}</p>
          </div>
        ))} 
       </div>
                    <button
                        className="fixed bottom-5 right-5 bg-yellow-600 text-black font-mono text-[21px] px-6 py-4 rounded-full shadow-lg hover:bg-yellow-700 focus:outline-none"
                        onClick={handleNavigate}
                    >
                        Back
                    </button>
                </>
            ) : null}
        </>
    );
};

export default FleetDetails;
