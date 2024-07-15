
import { useNavigate } from "react-router-dom";
import { useDetails } from "../../../../context/LocalStorageContext";
import { useFetchOneUserQuery } from "../../../../features/login_slice";
import { useAuth } from "../../../../context/authContext";
import CarProfile from "../../../../components/CarProfile";

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
          <div className="profile flex p-2 h-max">
<div className="m-2 h-max">

            <div className="avatar online m-3">
                <div className="w-24 rounded-full">
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            </div>
        </div>
    </div>
<div className="flex flex-col  w-full justify-center ml-4 items-center"> 
        <h1 className="text-center text-white w-4/5 font-bold font-serif font-bold  text-[2.1rem]">Welcome <span className="italic  ml-2">{data['results'].name}</span></h1> 
        <div className="w-full flex flex-col  justify-center items-center"> 
            {/* personal info */}
          <div className="personal-details w-full flex relative p-2 mb-3 rounded-md">
            <div className="mr-3 card-info p-2">
                <p className="text-[1.5rem] mt-2 mb-2 text-white  font-san pt-2  text-gray-500">Name: <span className="text-gray-300"> {data['results'].name}</span></p>
                <p className="text-[1.5rem] mt-2 mb-2 text-white  font-san pt-2  text-gray-500">Email: <span className="text-gray-300"> {data['results'].email}</span></p>
            </div>
            <div className="ml-3 card-info p-2">
                <p className="text-[1.5rem] mt-2 mb-2 text-white  font-san pt-2  text-gray-500">Phone: <span className="text-gray-300"> {data['results'].contact_phone}</span></p>
                <p className="text-[1.5rem] mt-2 mb-2 text-white  font-san pt-2 text-gray-500">Role: <span className="text-gray-300">{data['results'].role}</span></p>
            </div>
          </div>
        {/* btns logic */}
          <div className="w-full personal-btns mt-3 mb-4 flex">
            <div className="">
              <button className="buttons btn hover:bg-yellow-800 text-black m-2" >Edit Details</button>
            </div>
            <div className="">
              <button className="buttons btn hover:bg-yellow-800 text-black m-2" onClick={handleLogout}>Logout</button>
            </div>
          </div>
            {/* end of personal info  */}

        {/* ticket validation */}
        {data['results']['customerSupportTickets'].length > 0 && data['results']['customerSupportTickets'] ?
          <div className="w-full mt-3 ">
            <h3 className="text-center text-white font-mono font-bold text-[2.1rem]">Your Support tickets</h3>
          <div className="w-full flex flex-row flex-wrap rounded-md">
            {data['results']['customerSupportTickets'].map((ticket: any,index:number)=>(
                <div key={index} className="flex m-2 w-max card-info rounded-md flex-col gap-2 w-max p-4">
                    <p className="font-serif text-[1rem] font-normal text-white" >Subject: <span  className="text-white text-[0.9rem]">{ticket['subject']}</span></p>
                    <p className="font-serif text-[1rem] font-normal text-white" >Description: <span className="text-white">{ticket['description']}</span></p>
                    <p  className="font-serif text-[1rem]font-normal  text-white">Status: <span className="text-white">{ticket['status']}</span></p>
                    {ticket['status'] === 'pending'? 
                    <div className="mt-3">
                      <button className="buttons btn hover:bg-yellow-800 text-black"> Edit</button>
                    </div>
                    :null}
                </div>
            ))}
          </div>
        </div>: null}
        {/* ticket end */}

        {/* start bookings */}
        {data['results']['bookings'].length > 0 && data['results']['bookings']?
            <div className="flex flex-col pt-2 mt-2 gap-2">
                <h2 className="text-center font-serif text-[2.1rem] text-white font-bold">Booking history</h2>
                <div className="flex flex-wrap gap-3">

                {data['results']['bookings'].map((booking: any,index: number)=>(
                    <CarProfile key={index} booking={booking}/>
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
