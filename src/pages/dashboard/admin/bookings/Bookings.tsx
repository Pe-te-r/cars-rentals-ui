import { useEffect, useState } from "react"
import { useGetBookingsQuery } from "../../../../features/bookingsSlice"

const Bookings = () => {
    const {data,isSuccess,isError,isLoading}: any = useGetBookingsQuery({details:true})
    const [bookings, setBookings] = useState([])
    useEffect(()=>{
        if(isSuccess){
            setBookings(data['results'])
        }
    },[isSuccess,data])
    if(isSuccess) {
        console.log(bookings[0])
    }
    return (
        <>
        {isLoading ? (<span className="loading loading-bars fixed top-1/2 left-1/2 loading-lg"></span>)  : 
        isError ? <p>Erro occured</p> :

 <div className="overflow-x-auto">
  <table className="table bg-gray-800">
    {/* head */}
    <thead className="bg-gray-700 text-white">
    <tr >
      <th></th>
      <th>Name</th>
      <th>Email</th>
      <th>status</th>
      <th>Amount</th>
      <th>Booing Date</th>
      <th>Return Date</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
    {/* row 1 */}
    {bookings.map((booking: any, index) => (
    <tr key={index}>
      <th>{index + 1}</th>
      <td>{booking}</td>
      <td>{booking.email}</td>
      <td>{booking.status}</td>
      <td>{booking.amount}</td>
      <td>{booking.bookingDate}</td>
      <td>{booking.returnDate}</td>
      <td>
          <button className="text-white px-4 py-2 bg-blue-500 rounded hover:bg-blue-700">
            Edit
          </button>
          <button className="text-white px-4 py-2 ml-2 bg-red-500 rounded hover:bg-red-700">
            Delete
          </button>
          <button className="text-white px-4 py-2 ml-2 bg-green-500 rounded hover:bg-green-700">
            Details
          </button>
      </td>
    </tr>
))}    {/* <tr>
      <th>1</th>
      <td>peter</td>
      <td>peter@gmail.com</td>
      <td>Pending</td>
      <td>kes 270</td>
      <td>12/03/2021</td>
      <td>13/03/2021</td>
      <td>
          <button className="text-white px-4 py-2 bg-blue-500 rounded hover:bg-blue-700">
            Edit
          </button>
          <button className="text-white px-4 py-2 ml-2 bg-red-500 rounded hover:bg-red-700">
            Delete
          </button>
          <button className="text-white px-4 py-2 ml-2 bg-green-500 rounded hover:bg-green-700">
            details
          </button>
      </td>
    </tr> */}
  </tbody>
</table>
</div> 
    }
        </>
       )
}

export default Bookings

