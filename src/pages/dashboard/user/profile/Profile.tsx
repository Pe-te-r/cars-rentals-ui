
import { useNavigate } from "react-router-dom";
import { useDetails } from "../../../../context/LocalStorageContext";
import { useFetchOneUserQuery } from "../../../../features/login_slice";
import { useAuth } from "../../../../context/authContext";

const UserProfile = () => {
  const navigate=useNavigate()
  const user = useDetails();
  const {setResponseToast } = useAuth();
  const { data,isSuccess, isError,isLoading } = useFetchOneUserQuery(user.user?.id!,{refetchOnReconnect:true});

  if (isLoading) {
    return<span className="loading fixed top-1/2 left-1/2 loading-dots loading-lg"></span>;
  }
  if(isSuccess){
    console.log(data['results']);
  }

  const handleLogout =()=>{
    user.clearUserDetail();
    navigate('/')
    setResponseToast({ message: `Sad to see you leave`, type: '' });

  }
  
  return (<>
  {isSuccess? 
          <div className=" flex bg-gray-800 p-2 h-max">
<div className="m-2">

            <div className="avatar online m-3">
                <div className="w-24 rounded-full">
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            </div>
        </div>
    </div>
<div className="flex flex-col  w-full justify-center ml-4 items-center"> 
        <h1 className="text-center w-4/5 font-bold font-serif font-bold  text-[2.1rem]">Welcome <span className="italic text-white ml-2">{data['results'].name}</span></h1> 
        <div className="w-full flex flex-col  justify-center items-center"> 
            {/* personal info */}
          <div className="w-4/5 flex bg-gray-900 relative p-2 mb-3 rounded-md">
            <div className="mr-3">
                <p className="text-[1.5rem] mt-2 mb-2 text-gray-200  font-san pt-2  text-gray-500">Name: <span className="text-gray-400"> {data['results'].name}</span></p>
                <p className="text-[1.5rem] mt-2 mb-2 text-gray-200  font-san pt-2  text-gray-500">Email: <span className="text-gray-400"> {data['results'].email}</span></p>
            </div>
            <div className="ml-3">
                <p className="text-[1.5rem] mt-2 mb-2 text-gray-200  font-san pt-2  text-gray-500">Phone: <span className="text-gray-400"> {data['results'].contact_phone}</span></p>
                <p className="text-[1.5rem] mt-2 mb-2 text-gray-200  font-san pt-2 text-gray-500">Role: <span className="text-gray-400">{data['results'].role}</span></p>
            </div>
            <div className="absolute top-1/2 right-0">
              <button className="btn hover:bg-blue-900 bg-blue-800 m-2" onClick={handleLogout}>Logout</button>
            </div>
          </div>
            {/* end of personal info  */}

        {/* ticket validation */}
        {data['results']['customerSupportTickets'].length > 0 && data['results']['customerSupportTickets'] ?
          <div className="w-full mt-3 ">
            <h3 className="text-center font-mono font-bold text-[2.1rem]">Your Support tickets</h3>
          <div className="w-full flex flex-wrap bg-gray-800 rounded-md">
            {data['results']['customerSupportTickets'].map((ticket: any,index:number)=>(
            
                <div key={index} className="flex m-2 bg-gray-900 rounded-md flex-col gap-2 w-max p-4">
                    <p className="font-serif text-[1.5rem] text-gray-300" >Subject: <span  className="text-gray-500">{ticket['subject']}</span></p>
                    <p className="font-serif text-[1.5rem] text-gray-300" >Description: <span className="text-gray-500">{ticket['description']}</span></p>
                    <p  className="font-serif text-[1.5rem] text-gray-300">Status: <span className="text-gray-500">{ticket['status']}</span></p>
                </div>
                
            ))}
          </div>
        </div>: null}
        {/* ticket end */}

        {/* start bookings */}
        {data['results']['bookings'].length > 0 && data['results']['bookings']?
            <div className="flex flex-col pt-2 mt-2 gap-2">
                <h2 className="text-center font-serif text-[2.1rem] font-bold">Booking history</h2>
                <div className="flex flex-wrap gap-3">

                {data['results']['bookings'].map((booking: any,index: number)=>(
                    <div key={index} className="font-mono text-[1.5rem] p-1 flex flex-col gap-3 text-gray-300 rounded-md bg-gray-900">
                        <div className="w-full">
                        <img
                            className="w-full h-48  object-cover"
                            src="https://i.pinimg.com/564x/e6/97/c0/e697c0917344c185ea4a51dd82f61493.jpg"
                            alt={`${booking['vehicleSpecification']} image`}
                            />
                        </div>
                        <div className=" p-4">

                        <p>Vehicle Name: <span className="text-gray-400">{booking['vehicle']['vehicleSpecification']['manufacturer']}  {booking['vehicle']['vehicleSpecification']['model']}</span></p>
                        <p>Available: <span className="text-gray-400">{booking['vehicle']['availability'].toString()}</span></p>
                        <p>Location: <span className="text-gray-400">{booking['vehicle']['location']['name']}</span></p>
                        <p>Contact: <span className="text-gray-400">{booking['vehicle']['location']['contact']}</span></p>
                        <p>Booking Date: <span className="text-gray-400">{booking['booking_date']}</span></p>
                        <p>Return Date: <span className="text-gray-400">{booking['return_date']}</span></p>
                        </div>
                        {
                            booking['vehicle']['availability']?
                        <button className="btn bg-blue-700 text-[1.2rem]">Book again</button> :
                        null
                        }
                    </div>
                ))}
            </div>
            </div>
        : isError? <h2>Error occured</h2> :null}
        {/* end bookings */}

        </div>
    </div>
</div>
:null}
</>
);
};

export default UserProfile;
