import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import ContactPage from '../pages/Contact';
import ProfileCard from './ProfileCard';
import { useDetails } from '../context/LocalStorageContext';
import AuthController from '../pages/auth/authComponent';
import { VscAccount } from "react-icons/vsc";
import { IoHome } from "react-icons/io5";



const Navbar = () => {
  const [isProfileVisible, setIsProfileVisible] = useState(false);
  const { user } = useDetails();

  const toggleProfileVisibility = () => {
    setIsProfileVisible(!isProfileVisible);
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { openAuthModal } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleClickAuth = (value: boolean) => {
    openAuthModal(value);
    setIsDropdownOpen(false);
  };

  return (
    <>
      <nav className="bg-blue-900 p-4 navBar">
        <div className="container mx-auto flex items-center justify-between">
          <div className="text-white text-xl font-bold mb-1">Phantom</div>
          <div className="hidden md:flex space-x-6 items-center">
            <Link to="/" className="text-gray-300 hover:bg-yellow-500 hover:text-gray-900 py-2 px-4 rounded">
              <span className='flex items-center justify-center'><IoHome className='mr-2' size={21}/>Home</span>
            </Link>
            <Link to="/about" className="text-gray-300 hover:bg-yellow-500 hover:text-gray-900 py-2 px-4 rounded">
              About Us
            </Link>
            <Link to="/service" className="text-gray-300 hover:bg-yellow-500 hover:text-gray-900 py-2 px-4 rounded">
              Services
            </Link>
            {user?.login && 
            <button
              className="text-gray-300 font-medium py-2 px-4 rounded focus:outline-none hover:bg-yellow-500 hover:text-gray-900"
              onClick={openModal}
            >
              Contact Us
            </button>}
            {user ? 
            <>
            <div className="avatar">
              <div className="w-10 cursor-pointer h-10 rounded-full">
                <img src="https://avatars.githubusercontent.com/u/106557118?v=4" onClick={toggleProfileVisibility}/>
              </div>
            </div>
            {isProfileVisible ? <ProfileCard isProfileVisible={isProfileVisible} toggleProfileVisibility={toggleProfileVisibility}/> : ''}
            </>
            :
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              <VscAccount size={21} color='red'/>
                {/* Login/Register */}
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 z-50 mt-2 w-48 bg-gray-800 border border-gray-700 rounded shadow-lg">
                  <button
                    className="block w-full px-4 py-2 text-gray-300 hover:bg-yellow-500 hover:text-gray-900 rounded"
                  onClick={() => handleClickAuth(true)}
                >
                    Login
                  </button>
                  <button
                    className="block w-full px-4 py-2 text-gray-300 hover:bg-yellow-500 hover:text-gray-900 rounded"
                  onClick={() => handleClickAuth(false)}
                >
                    Register
                  </button>
                </div>
              )}
            </div> 
            }
          </div>
          <button className="md:hidden text-gray-300 hover:text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
        {isMenuOpen && (
          <div className="md:hidden">
            <Link to="/" className="block px-4 py-2 text-gray-300 hover:bg-yellow-500 hover:text-gray-900 rounded">
              Home
            </Link>
            <Link to="/about" className="block px-4 py-2 text-gray-300 hover:bg-yellow-500 hover:text-gray-900 rounded">
              About Us
            </Link>
            <Link to="/service" className="block w-full px-4 py-2 text-gray-300 hover:bg-yellow-500 hover:text-gray-900 rounded">
              Services
            </Link>
            <button
              className="block w-full text-gray-300 font-medium py-2 px-4 rounded focus:outline-none hover:bg-yellow-500 hover:text-gray-900 rounded"
              onClick={openModal}
            >
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
                    onClick={() => openAuthModal(true)}
                  >
                    Login
                  </button>
                  <button
                    className="block w-full px-4 py-2 text-gray-300 hover:bg-yellow-500 hover:text-gray-900 rounded"
                    onClick={() => openAuthModal(false)}
                  >
                    Register
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
      {isModalOpen && <ContactPage isOpen={isModalOpen} closeModal={closeModal} />}
      <AuthController/>
    </>
  );
};

export default Navbar;
