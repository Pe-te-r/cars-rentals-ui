import { Link } from 'react-router-dom';
import { FaUsers } from "react-icons/fa";
import { BsTaxiFrontFill } from "react-icons/bs";
import { TbBrandBooking } from "react-icons/tb";
import { IoLocation } from "react-icons/io5";
import { IoSettings } from "react-icons/io5";
import { LuUserCircle } from "react-icons/lu";



const SideNav = ({ className }: { className?: string }) => {
  return (
    <div className={`side-nav relative bg-gray-800 text-white fixed left-0  overflow-y-auto ${className}`}>
      <nav className="flex flex-col p-4 space-y-2">
      <h2 className='py-2 rounded px-4 font-bold text-yellow-800'>ADMIN DASHBOARD</h2>
        <Link to="/admin" className="py-2 px-4 rounded hover:bg-yellow-500 hover:text-gray-900">Dashboard Home</Link>
        <Link to="/admin/content" className="py-2 px-4 rounded hover:bg-yellow-500 hover:text-gray-900">Content</Link>
        <Link to="/admin/users" className="py-2 px-4 rounded hover:bg-yellow-500 hover:text-gray-900"><span className='flex items-center'><FaUsers className='mr-2' size={30}/>Users</span></Link>
        <Link to="/admin/vehicles" className="py-2 px-4 rounded hover:bg-yellow-500 hover:text-gray-900"><span className='flex items-center'><BsTaxiFrontFill className='mr-2' size={30}/>Vehicles</span></Link>
        <Link to="/admin/bookings" className="py-2 px-4 rounded hover:bg-yellow-500 hover:text-gray-900"><span className='flex items-center'><TbBrandBooking className='mr-2' size={30}/>Bookings</span></Link>
        <Link to="/admin/locations" className="py-2 px-4 rounded hover:bg-yellow-500 hover:text-gray-900 mt-auto bottom-0"><span className='flex items-center'><IoLocation className='mr-2' size={30}/> Locations</span></Link>
        <Link to="/admin/fleets" className="py-2 px-4 rounded hover:bg-yellow-500 hover:text-gray-900 mt-auto bottom-0">Fleet</Link>
        <Link to="/admin/settings" className="py-2 px-4 rounded hover:bg-yellow-500 hover:text-gray-900"><span className='flex items-center'><IoSettings className='mr-2' size={30}/>Settings</span></Link>
        <Link to="/admin/profile" className="py-2 px-4 rounded hover:bg-yellow-500 hover:text-gray-900 mt-auto bottom-0"><span className='flex items-center'><LuUserCircle className='mr-2' size='30'/> Profile</span></Link>
      </nav>
    </div>
  );
};

export default SideNav;

