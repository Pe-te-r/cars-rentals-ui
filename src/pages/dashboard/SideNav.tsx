import { Link } from 'react-router-dom';

const SideNav = () => {
  return (
    <div className="bg-gray-800 text-white w-64 p-4 fixed top-16 left-0 h-full overflow-y-auto">
      <h2 className="text-lg font-bold mb-4">Dashboard</h2>
      <ul>
        <li>
          <Link to="content" className="block py-2 px-4 rounded hover:bg-gray-700">Content</Link>
        </li>
        <li>
          <Link to="settings" className="block py-2 px-4 rounded hover:bg-gray-700">Settings</Link>
        </li>
        <li>
          <Link to="users" className="block py-2 px-4 rounded hover:bg-gray-700">Users</Link>
        </li>
        <li>
          <Link to="vehicles" className="block py-2 px-4 rounded hover:bg-gray-700">Vehicles</Link>
        </li>
        <li>
          <Link to="history" className="block py-2 px-4 rounded hover:bg-gray-700">History</Link>
        </li>
      </ul>
    </div>
  );
};

export default SideNav;
