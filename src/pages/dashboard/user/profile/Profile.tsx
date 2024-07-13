
import { useDetails } from "../../../../context/LocalStorageContext";
import { useFetchOneUserQuery } from "../../../../features/login_slice";

const UserProfile = () => {
  const user = useDetails();
  const { data,isSuccess, isLoading } = useFetchOneUserQuery(user.user?.id!,{refetchOnReconnect:true});

  if (isLoading) {
    return <p>Loading user profile...</p>; // Or display a loading indicator
  }
  if(isSuccess){
    console.log(data['results']['customerSupportTickets'][0]);
  }

  return (
    <div className="border flex bg-gray-800 p-2 h-max">
        <div className="m-2">

            <div className="avatar online m-3">
                <div className="w-24 rounded-full">
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            </div>
        </div>
    </div>
      <div className="flex flex-col w-full justify-center ml-4 items-center"> 
        <h1 className="text-center w-4/5 font-bold font-serif  text-[2.1rem]">{data['results'].name}</h1> 
        <div className="w-full flex flex-col justify-center items-center"> 
            {/* personal info */}
          <div className="w-4/5 flex bg-gray-900 p-2 mb-3 rounded-md">
            <div className="mr-3">
                <p className="text-[1.5rem] mt-2 mb-2 text-gray-200  font-san pt-2  text-gray-500">Name: <span className="text-gray-400"> {data['results'].name}</span></p>
                <p className="text-[1.5rem] mt-2 mb-2 text-gray-200  font-san pt-2  text-gray-500">Email: <span className="text-gray-400"> {data['results'].email}</span></p>
            </div>
            <div className="ml-3">
                <p className="text-[1.5rem] mt-2 mb-2 text-gray-200  font-san pt-2  text-gray-500">Phone: <span className="text-gray-400"> {data['results'].contact_phone}</span></p>
                <p className="text-[1.5rem] mt-2 mb-2 text-gray-200  font-san pt-2 text-gray-500">Role: <span className="text-gray-400">{data['results'].role}</span></p>
            </div>
          </div>
            {/* end of personal info  */}
            
        {/* ticket validation */}
          <div className="w-full mt-3 ">
            <h3 className="text-center font-mono text-[2.1rem]">Your Support tickets</h3>
          <div className="w-full flex flex-wrap bg-gray-800 rounded-md">
            
            {data['results']['customerSupportTickets'].map((ticket: any,index:number)=>(
                <>
                <div key={index} className="flex m-2 bg-gray-900 rounded-md flex-col gap-2 w-max p-4">
                    <h2 className="font-serif text-[1.5rem] text-gray-300" >Subject: <span  className="text-gray-500">{ticket['subject']}</span></h2>
                    <h3 className="font-serif text-[1.5rem] text-gray-300" >Description: <span className="text-gray-500">{ticket['description']}</span></h3>
                    <p  className="font-serif text-[1.5rem] text-gray-300">Status: <span className="text-gray-500">{ticket['status']}</span></p>
                </div>
                </>
            ))}
          </div>
        </div>
        {/* ticket end */}

        </div>
      </div>
    </div>
  );
};

export default UserProfile;
