import { Outlet, Route, Routes } from 'react-router-dom';
import SideNav from './SideNav';
import Navbar from '../../../components/NavBar';
import UsersTable from './users/Users';
import VehiclesPhoto from './vehicles/vehiclesPhoto';
import Bookings from './bookings/Bookings';
import VehiclesDetails from '../user/vehicles_display/VehiclesDetails';

const Dashboard = () => {
  return (
    <div className='dashboardDiv bg-gray-900'>
      <Navbar />
      <div className="flex ">
        <SideNav className="" />
        <div className="flex-1 p-4 ml-2">
          <Routes>
            <Route path="/" element={<div>Welcome to the Dashboard</div>} />
            {/* <Route path="/content" element={<Content />} /> */}
            <Route path="/users" element={<UsersTable />} />
            <Route path="/vehicles" element={<VehiclesPhoto />} />
            <Route path="/vehicles/:id" element={<VehiclesDetails />} />
            <Route path="/bookings" element={<Bookings />} />
          </Routes>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;



