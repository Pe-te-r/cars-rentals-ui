import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";


interface profileType{
    isProfileVisible: boolean;
    toggleProfileVisibility: () => void;
}
interface profileTypeDetails{
    name: string;
    email: string;
    contact_phone: string;
}

const ProfileCard = ({isProfileVisible,toggleProfileVisibility}: profileType) => {
  const navigate = useNavigate()
  
  const {setResponseToast } = useAuth();

  const handleLogout =()=>{
    localStorage.removeItem('details');
    toggleProfileVisibility();
    navigate('/')
    setResponseToast({ message: `Sad to see you leave`, type: '' });

  }
  

  return (
    <div className="relative">

      {isProfileVisible && (
        <div className="absolute top-12 right-0 bg-gray-800 text-white p-4 rounded-lg shadow-lg w-64">
          <div className="flex items-center mb-4">
            <img
              src="https://avatars.githubusercontent.com/u/106557118?v=4"
              alt="Profile"
              className="w-10 h-10 rounded-full mr-4"
            />
            <div>
              {/* <h2 className="text-lg text-white font-semibold">{name}</h2> */}
              {/* <p className="text-md text-gray-300">{user?.email}</p> */}
              {/* <p className="text-sm text-gray-500">{user?.contact_phone}</p> */}
            </div>
          </div>
          <button
            onClick={toggleProfileVisibility}
            className="bg-yellow-500 text-gray-800 hover:bg-yellow-400 w-full py-2 rounded mb-2"
          >
            Close
          </button>
          <button
            onClick={() => handleLogout()}
            className="bg-yellow-500 text-gray-800 hover:bg-yellow-400 w-full py-2 rounded"

          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;
