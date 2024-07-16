import { Outlet, Route, Routes } from 'react-router-dom';
import SideNav from './SideNav';
import Navbar from '../../../components/NavBar';
import UsersTable from './users/Users';
import VehiclesPhoto from './vehicles/vehiclesPhoto';
import Bookings from './bookings/Bookings';

const Dashboard = () => {
  return (
    <div className='dashboardDiv'>
      <Navbar />
      <div className="flex h-screen">
        <SideNav className="" />
        <div className="flex-1 overflow-y-auto h-min p-4 ml-2">
          <Routes>
            <Route path="/" element={<div>Welcome to the Dashboard</div>} />
            {/* <Route path="/content" element={<Content />} /> */}
            <Route path="/users" element={<UsersTable />} />
            <Route path="/vehicles" element={<VehiclesPhoto />} />
            <Route path="/bookings" element={<Bookings />} />
          </Routes>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;



