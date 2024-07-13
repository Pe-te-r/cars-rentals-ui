import { Outlet, Route, Routes } from 'react-router-dom';
import SideNav from './SideNav';
import Content from './Content';
import Navbar from '../../../../components/NavBar';
import UsersTable from './Users';
import VehiclesTable from '../vehicles/vehicles';
import VehiclesPhoto from '../vehicles/vehiclesPhoto';

const Dashboard = () => {
  return (
    <div className='dashboardDiv'>
      <Navbar />
      <div className="flex h-screen">
        <SideNav className="" />
        <div className="flex-1 overflow-y-auto p-4 ml-2">
          <Routes>
            <Route path="/" element={<div>Welcome to the Dashboard</div>} />
            <Route path="/content" element={<Content />} />
            <Route path="/users" element={<UsersTable />} />
            <Route path="/vehicles" element={<VehiclesTable />} />
            <Route path="/photos" element={<VehiclesPhoto />} />
          </Routes>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;



