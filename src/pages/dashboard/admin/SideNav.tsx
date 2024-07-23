

import { Link, useLocation } from 'react-router-dom';
import { FaUsers } from "react-icons/fa";
import { BsTaxiFrontFill } from "react-icons/bs";
import { TbBrandBooking } from "react-icons/tb";
import { IoLocation, IoSettings } from "react-icons/io5";
import { LuUserCircle } from "react-icons/lu";
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { FaTruckFast } from "react-icons/fa6";
import { TiMessages } from "react-icons/ti";

const SideNav = ({ className }: { className?: string }) => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className={`side-nav relative bg-gray-800 text-white fixed left-0 overflow-y-auto ${className}`}>
      <nav className="flex flex-col p-4 space-y-2">
        <h2 className='py-2 rounded px-4 font-bold text-yellow-800'>ADMIN DASHBOARD</h2>
        <Link to="/admin" className={`py-2 px-4 rounded ${isActive('/admin') ? 'bg-yellow-500 text-gray-900' : 'hover:bg-yellow-500 bg-yellow-700 text-gray-900 hover:text-gray-900'}`}>
          <span className='flex items-center'>
            <RiDashboardHorizontalFill size={30} className='mr-2' />Dashboard
          </span>
        </Link>
        <Link to="/admin/users" className={`py-2 px-4 rounded ${isActive('/admin/users') ? 'bg-yellow-500 text-gray-900' : 'hover:bg-yellow-500 hover:text-gray-900'}`}>
          <span className='flex items-center'>
            <FaUsers className='mr-2' size={30} />Users
          </span>
        </Link>
        <Link to="/admin/vehicles" className={`py-2 px-4 rounded ${isActive('/admin/vehicles') ? 'bg-yellow-500 text-gray-900' : 'hover:bg-yellow-500 hover:text-gray-900'}`}>
          <span className='flex items-center'>
            <BsTaxiFrontFill className='mr-2' size={30} />Vehicles
          </span>
        </Link>
        <Link to="/admin/bookings" className={`py-2 px-4 rounded ${isActive('/admin/bookings') ? 'bg-yellow-500 text-gray-900' : 'hover:bg-yellow-500 hover:text-gray-900'}`}>
          <span className='flex items-center'>
            <TbBrandBooking className='mr-2' size={30} />Bookings
          </span>
        </Link>
        <Link to="/admin/locations" className={`py-2 px-4 rounded ${isActive('/admin/locations') ? 'bg-yellow-500 text-gray-900' : 'hover:bg-yellow-500 hover:text-gray-900'}`}>
          <span className='flex items-center'>
            <IoLocation className='mr-2' size={30} /> Locations
          </span>
        </Link>
        <Link to="/admin/messages" className={`py-2 px-4 rounded ${isActive('/admin/messages') ? 'bg-yellow-500 text-gray-900' : 'hover:bg-yellow-500 hover:text-gray-900'}`}>
          <span className='flex items-center'>
            <TiMessages className='mr-2' size={30} />Messages
          </span>
        </Link>
        <Link to="/admin/fleets" className={`py-2 px-4 rounded ${isActive('/admin/fleets') ? 'bg-yellow-500 text-gray-900' : 'hover:bg-yellow-500 hover:text-gray-900'}`}>
          <span className='flex items-center'>
            <FaTruckFast className='mr-2' size={30} />Fleet
          </span>
        </Link>
        <Link to="/admin/settings" className={`py-2 px-4 rounded ${isActive('/admin/settings') ? 'bg-yellow-500 text-gray-900' : 'hover:bg-yellow-500 hover:text-gray-900'}`}>
          <span className='flex items-center'>
            <IoSettings className='mr-2' size={30} />Settings
          </span>
        </Link>
        <Link to="/admin/profile" className={`py-2 px-4 rounded ${isActive('/admin/profile') ? 'bg-yellow-500 text-gray-900' : 'hover:bg-yellow-500 hover:text-gray-900'}`}>
          <span className='flex items-center'>
            <LuUserCircle className='mr-2' size={30} /> Profile
          </span>
        </Link>
      </nav>
    </div>
  );
};

export default SideNav;
