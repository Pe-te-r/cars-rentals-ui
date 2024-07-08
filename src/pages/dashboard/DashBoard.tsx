import { Outlet, Route, Routes } from 'react-router-dom';
import SideNav from './SideNav';
import Content from './Content';
// import DashboardRoutes from './DashboardLayout';

const Dashboard = () => {
  return (
    <div className="flex h-screen">
      <SideNav />
        <div>
        <Routes>
          <Route path="/" element={<div>Welcome to the Dashboard</div>} />
          <Route path='/content' element={<Content/>}/>
        </Routes>
      <div className="flex-1 overflow-y-auto p-4 ml-64">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

