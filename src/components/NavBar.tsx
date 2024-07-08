import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ openContact, openAuthModal, setIsLogin }: any) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleAuthModal = (isLogin: boolean) => {
    setIsLogin(isLogin);
    openAuthModal(isLogin);
    setIsDropdownOpen(false);
  };

  return (
    <nav className="bg-blue-900 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-white text-xl font-bold mb-1">
          Phantom
        </div>
        <div className="hidden md:flex space-x-6 items-center">
          <Link to='/' className="text-gray-300 hover:bg-yellow-500 hover:text-gray-900 py-2 px-4 rounded">Home</Link>
          <Link to='/about' className="text-gray-300 hover:bg-yellow-500 hover:text-gray-900 py-2 px-4 rounded">About Us</Link>
          <Link to='/service' className="text-gray-300 hover:bg-yellow-500 hover:text-gray-900 py-2 px-4 rounded">Services</Link>
          <button className="text-gray-300 font-medium py-2 px-4 rounded focus:outline-none hover:bg-yellow-500 hover:text-gray-900" onClick={openContact}>
            Contact Us
          </button>
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Login/Register
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded shadow-lg">
                <button
                  className="block w-full px-4 py-2 text-gray-300 hover:bg-yellow-500 hover:text-gray-900 rounded"
                  onClick={() => toggleAuthModal(true)}
                >
                  Login
                </button>
                <button
                  className="block w-full px-4 py-2 text-gray-300 hover:bg-yellow-500 hover:text-gray-900 rounded"
                  onClick={() => toggleAuthModal(false)}
                >
                  Register
                </button>
              </div>
            )}
          </div>
        </div>
        <button
          className="md:hidden text-gray-300 hover:text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
      </div>
      {isMenuOpen && (
        <div className="md:hidden">
          <Link to='/' className="block px-4 py-2 text-gray-300 hover:bg-yellow-500 hover:text-gray-900 rounded">Home</Link>
          <Link to='/about' className="block px-4 py-2 text-gray-300 hover:bg-yellow-500 hover:text-gray-900 rounded">About Us</Link>
          <Link to='/service' className="block w-full px-4 py-2 text-gray-300 hover:bg-yellow-500 hover:text-gray-900 rounded">Services</Link>
          <button className="block w-full text-gray-300 font-medium py-2 px-4 rounded focus:outline-none hover:bg-yellow-500 hover:text-gray-900 rounded" onClick={openContact}>
            Contact Us
          </button>
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600"
            >
              Login/Register
            </button>
            {isDropdownOpen && (
              <div className="mt-2 w-full login-register border border-gray-700 rounded shadow-lg bg-gray-800">
                <button
                  className="block w-full px-4 py-2 text-gray-300 hover:bg-yellow-500 hover:text-gray-900 rounded"
                  onClick={() => toggleAuthModal(true)}
                >
                  Login
                </button>
                <button
                  className="block w-full px-4 py-2 text-gray-300 hover:bg-yellow-500 hover:text-gray-900 rounded"
                  onClick={() => toggleAuthModal(false)}
                >
                  Register
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
