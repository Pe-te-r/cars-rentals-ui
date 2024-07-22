import { useEffect, useState } from "react";
import { useGetBookingsQuery } from "../../../../features/bookingsSlice";
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { FaCircleInfo } from "react-icons/fa6";



const Bookings = () => {
  const { data, isSuccess, isError, isLoading }: any = useGetBookingsQuery({
    details: true,
  },{pollingInterval:2000});
  const [bookings, setBookings] = useState<any[]>([]);
  
  useEffect(() => {
    if (isSuccess) {
      const allBookings = data.results || [];
      
      const pendingBookings = allBookings.filter((booking: any) => booking.status === 'pending');
      const returnedBookings = allBookings.filter((booking: any) => booking.status === 'returned');
      
      const orderedBookings = [...pendingBookings, ...returnedBookings];
      
      setBookings(orderedBookings);
    }
  }, [isSuccess, data]);

  return (
    <>
      {isLoading ? (
        <span className="loading loading-bars fixed top-1/2 left-1/2 loading-lg"></span>
      ) : isError ? (
        <p>Error occurred</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table bg-gray-800">
            {/* head */}
            <thead className="bg-gray-700 text-white">
              <tr className="text-center">
                <th></th>
                <th>Vehicle</th>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Amount</th>
                <th>Booking Date</th>
                <th>Return Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* Render rows */}
              {bookings.map((booking: any, index) => (
                <tr key={index} className="text-center">
                  <th>{index + 1}</th>
                  <td>
                    {booking.vehicle.vehicleSpecification.manufacturer}{' '}
                    {booking.vehicle.vehicleSpecification.model}
                  </td>
                  <td>{booking.user.name}</td>
                  <td>{booking.user.email}</td>
                  <td>{booking.status}</td>
                  <td>{booking.totalAmount}</td>
                  <td>{booking.booking_date}</td>
                  <td>{booking.return_date}</td>
                  <td>
                    <button className="text-white px-4 py-2 bg-blue-500 rounded hover:bg-blue-700">
                      <MdModeEdit size={22}/>
                    </button>
                    <button className="text-white px-4 py-2 ml-2 bg-red-500 rounded hover:bg-red-700">
                      <MdDelete size={22}/>
                    </button>
                    <button className="text-white px-4 py-2 ml-2 bg-green-500 rounded hover:bg-green-700">
                      <FaCircleInfo size={22}/>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default Bookings;
