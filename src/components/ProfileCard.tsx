import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { useDetails } from "../context/LocalStorageContext";


interface profileType{
    isProfileVisible: boolean;
    toggleProfileVisibility: () => void;
}

//Profile Card Component to display user profile and logout functionality
const ProfileCard = ({isProfileVisible,toggleProfileVisibility}: profileType) => {
  const {user,clearUserDetail}=useDetails()
  const navigate = useNavigate()
  
  const {setResponseToast } = useAuth();

  const handleLogout =()=>{
    clearUserDetail();
    toggleProfileVisibility();
    navigate('/')
    setResponseToast({ message: `Sad to see you leave`, type: '' });

  }

  return (
    <div className="relative">

      {isProfileVisible && (
        <div className="profileDisplay z-50 absolute top-12 right-0 bg-gray-900 text-white p-4 rounded-lg shadow-lg w-64 p-2">
          <div className="flex items-center mb-4">
            <img
              src="https://avatars.githubusercontent.com/u/106557118?v=4"
              alt="Profile"
              className="w-10 h-10 m-2 rounded-full mr-4"
            />
            <div>
              <h2 className="text-lg m-2 text-white font-semibold">{user?.name}</h2>
              <p className="text-md m-1 text-gray-300">{user?.email}</p>
              <p className="text-sm m-1 text-gray-400">{user?.contact_phone}</p>
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
            className="bg-yellow-500 mt-2 text-gray-800 hover:bg-yellow-400 w-full py-2 rounded"

          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;
