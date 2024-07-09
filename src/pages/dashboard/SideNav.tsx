// import { Link } from 'react-router-dom';

// const SideNav = ({ className }: { className?: string }) => {
//   return (
//     <div className={`side-nav bg-gray-800 text-white fixed left-0 h-full overflow-y-auto ${className}`}>
//       <nav className="flex flex-col p-4 space-y-2">
//         <Link to="/dashboard" className="py-2 px-4 rounded hover:bg-yellow-500 hover:text-gray-900">Dashboard Home</Link>
//         <Link to="/dashboard/content" className="py-2 px-4 rounded hover:bg-yellow-500 hover:text-gray-900">Content</Link>
//         <Link to="/dashboard/users" className="py-2 px-4 rounded hover:bg-yellow-500 hover:text-gray-900">Users</Link>
//         <Link to="/dashboard/vehicles" className="py-2 px-4 rounded hover:bg-yellow-500 hover:text-gray-900">Vehicles</Link>
//         <Link to="/dashboard/settings" className="py-2 px-4 rounded hover:bg-yellow-500 hover:text-gray-900">Settings</Link>
//         <Link to="/dashboard/profile" className="py-2 px-4 rounded hover:bg-yellow-500 hover:text-gray-900 mt-auto">Profile</Link>
//       </nav>
//     </div>
//   );
// };

// export default SideNav;

import { Link } from 'react-router-dom';

const SideNav = ({ className }: { className?: string }) => {
  return (
    <div className={`side-nav relative bg-gray-800 text-white fixed left-0  overflow-y-auto ${className}`}>
      <nav className="flex flex-col p-4 space-y-2">
      <h2 className='py-2 rounded px-4 font-bold text-yellow-800'>ADIMIN DASHBOARD</h2>
        <Link to="/dashboard" className="py-2 px-4 rounded hover:bg-yellow-500 hover:text-gray-900">Dashboard Home</Link>
        <Link to="/dashboard/content" className="py-2 px-4 rounded hover:bg-yellow-500 hover:text-gray-900">Content</Link>
        <Link to="/dashboard/users" className="py-2 px-4 rounded hover:bg-yellow-500 hover:text-gray-900">Users</Link>
        <Link to="/dashboard/vehicles" className="py-2 px-4 rounded hover:bg-yellow-500 hover:text-gray-900">Vehicles</Link>
        <Link to="/dashboard/settings" className="py-2 px-4 rounded hover:bg-yellow-500 hover:text-gray-900">Settings</Link>
        <Link to="/dashboard/profile" className="py-2 px-4 rounded hover:bg-yellow-500 hover:text-gray-900 mt-auto bottom-0">Profile</Link>
      </nav>
    </div>
  );
};

export default SideNav;

