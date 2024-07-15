import { Outlet, Route, Routes } from 'react-router-dom';
import Navbar from '../../../components/NavBar';
import UserSideNav from './UserSideNav';
import UserProfile from './profile/Profile';

const UserDashboard = () => {
  return (
    <div className='dashboardDiv '>
      <Navbar />
      <div className="flex h-screen">
        <UserSideNav className="" />
        <div className="flex-1 overflow-y-auto p-4 ml-2">
          <Routes>
            <Route path="/" element={<div>Welcome to User dashboard</div>} />
            <Route path='/profile' element={<UserProfile/>}/>
          </Routes>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
