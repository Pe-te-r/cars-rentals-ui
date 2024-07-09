// import { Outlet, Route, Routes } from 'react-router-dom';
// import SideNav from './SideNav';
// import Content from './Content';
// import Users from './Users';
// import Navbar from '../../components/NavBar';

// const Dashboard = () => {
//   return (
//     <>
//       <Navbar/>
//     <div className="flex h-screen">
//       <SideNav />
//         {/* <div> */}
//         <Routes>
//           <Route path="/" element={<div>Welcome to the Dashboard</div>} />
//           <Route path='/content' element={<Content/>}/>
//           <Route path='/users' element={<Users/>}/>
//         </Routes>
//         <div className="flex-1 overflow-y-auto p-4 ml-64">
//           <Outlet />
//         </div>
//       </div>
//     {/* </div> */}
//     </>
//   );
// };

// export default Dashboard;

import { Outlet, Route, Routes } from 'react-router-dom';
import SideNav from './SideNav';
import Content from './Content';
import Navbar from '../../components/NavBar';
import UsersTable from './Users';
import VehiclesTable from './vehicles';

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
          </Routes>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;



