import { Link, useLocation } from 'react-router-dom';
import { MdDashboard } from "react-icons/md";
import { FaCar } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { CgProfile } from "react-icons/cg";

const UserSideNav = ({ className }: { className?: string }) => {
  const location = useLocation();
  const getLinkClass = (path: string) => 
    `py-2 px-4 rounded ${location.pathname === path ? 'bg-yellow-500 text-gray-900' : 'hover:bg-yellow-500 hover:text-gray-900'}`;

  return (
    <div className={`side-nav relative bg-gray-800 text-white overflow-y-auto ${className}`}>
      <nav className="flex flex-col p-4 space-y-2">
        <h2 className='py-2 rounded px-4 font-bold text-yellow-800'>USER DASHBOARD</h2>
        <Link to="/dashboard" className={getLinkClass("/dashboard")}>
          <span className='flex items-center'>
            <MdDashboard size={30} className='mr-2' />Dashboard Home
          </span>
        </Link>
        <Link to="/dashboard/vehicles" className={getLinkClass("/dashboard/vehicles")}>
          <span className='flex items-center'>
            <FaCar className='mr-2' size={30} />Vehicles
          </span>
        </Link>
        <Link to="/dashboard/settings" className={getLinkClass("/dashboard/settings")}>
          <span className='flex items-center'>
            <IoMdSettings className='mr-2' size={30} />Settings
          </span>
        </Link>
        <Link to="/dashboard/profile" className={getLinkClass("/dashboard/profile")}>
          <span className='flex items-center'>
            <CgProfile className='mr-2' size={30} />Profile
          </span>
        </Link>
      </nav>
    </div>
  );
};

export default UserSideNav;
