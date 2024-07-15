import { Link } from 'react-router-dom';

const UserSideNav = ({ className }: { className?: string }) => {
  return (
    <div className={`side-nav relative bg-gray-800 text-white overflow-y-auto ${className}`}>
      <nav className="flex flex-col p-4 space-y-2">
      <h2 className='py-2 rounded px-4 font-bold text-yellow-800'>USER DASHBOARD</h2>
        <Link to="/dashboard" className="py-2 px-4 rounded hover:bg-yellow-500 hover:text-gray-900">Dashboard Home</Link>
        <Link to="/dashboard/vehicles" className="py-2 px-4 rounded hover:bg-yellow-500 hover:text-gray-900">Vehicles</Link>
        <Link to="/dashboard/settings" className="py-2 px-4 rounded hover:bg-yellow-500 hover:text-gray-900">Settings</Link>
        <Link to="/dashboard/profile" className="py-2 px-4 rounded hover:bg-yellow-500 hover:text-gray-900 mt-auto bottom-0">Profile</Link>
      </nav>
    </div>
  );
};

export default UserSideNav;
