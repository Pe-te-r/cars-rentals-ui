
const CarProfile = ({booking,index}: any) => {
  return (
<div key={index} className="font-serif text-[.9rem] p-1 flex flex-col gap-3 text-white rounded-md car-card">
                        <div className="w-full">
                        <img
                            className="w-full h-48  object-cover"
                            src="https://i.pinimg.com/564x/e6/97/c0/e697c0917344c185ea4a51dd82f61493.jpg"
                            alt={`${booking['vehicleSpecification']} image`}
                            />
                        </div>
                        <div className="mt-0 bg-blue-800 p-2 text-center font-bold">
                            <h4>{booking['vehicle']['vehicleSpecification']['manufacturer']}  {booking['vehicle']['vehicleSpecification']['model']}</h4>
                        </div>
                        <div className="flex gap-2 flex-col p-4">

                        <p>Vehicle Name: <span className="text-gray-400">{booking['vehicle']['vehicleSpecification']['manufacturer']}  {booking['vehicle']['vehicleSpecification']['model']}</span></p>
                        <p>Available: <span className="text-gray-400">{booking['vehicle']['availability'].toString()}</span></p>
                        <p>Location: <span className="text-gray-400">{booking['vehicle']['location']['name']}</span></p>
                        <p>Contact: <span className="text-gray-400">{booking['vehicle']['location']['contact']}</span></p>
                        <p>Booking Date: <span className="text-gray-400">{booking['booking_date']}</span></p>
                        <p>Return Date: <span className="text-gray-400">{booking['return_date']}</span></p>
                        </div>
                        <div className="flex p-2">
                            <button className="buttons btn mr-3 hover:bg-yellow-800 text-black">More details</button>
                        {
                            booking['vehicle']['availability']?
                            <button className="buttons btn text-black hover:bg-yellow-800">Book</button> :
                            null
                            }
                        </div>
                    </div>  )
}

export default CarProfile