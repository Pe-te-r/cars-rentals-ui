// import  { useState } from 'react';
// import { Transition } from '@headlessui/react';

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [showLogin, setShowLogin] = useState(false);
//   const [showRegister, setShowRegister] = useState(false);

//   return (
//     <nav className="bg-gray-800">
//       <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
//         <div className="relative flex items-center justify-between h-16">
//           <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
//             <button
//               onClick={() => setIsOpen(!isOpen)}
//               type="button"
//               className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
//               aria-controls="mobile-menu"
//               aria-expanded="false"
//             >
//               <span className="sr-only">Open main menu</span>
//               {isOpen ? (
//                 <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//                 </svg>
//               ) : (
//                 <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
//                 </svg>
//               )}
//             </button>
//           </div>
//           <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
//             <div className="flex-shrink-0">
//               <a href="/" className="text-white text-2xl font-bold">Phantom</a>
//             </div>
//             <div className="hidden sm:block sm:ml-6">
//               <div className="flex space-x-4">
//                 <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</a>
//                 <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">About Us</a>
//                 <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Services</a>
//                 <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Contact Us</a>
//               </div>
//             </div>
//           </div>
//           <div className="hidden sm:block">
//             <button onClick={() => setShowLogin(!showLogin)} className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Login</button>
//             <button onClick={() => setShowRegister(!showRegister)} className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Register</button>
//           </div>
//         </div>
//       </div>

//       <Transition
//         show={isOpen}
//         enter="transition ease-out duration-100 transform"
//         enterFrom="opacity-0 scale-95"
//         enterTo="opacity-100 scale-100"
//         leave="transition ease-in duration-75 transform"
//         leaveFrom="opacity-100 scale-100"
//         leaveTo="opacity-0 scale-95"
//       >
//         {ref => (
//           <div className="sm:hidden" id="mobile-menu">
//             <div ref={ref as any} className="px-2 pt-2 pb-3 space-y-1">
//               <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Home</a>
//               <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">About Us</a>
//               <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Services</a>
//               <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Contact Us</a>
//               <button onClick={() => setShowLogin(!showLogin)} className="text-gray-300 hover:bg-gray-700 hover:text-white block w-full text-left px-3 py-2 rounded-md text-base font-medium">Login</button>
//               <button onClick={() => setShowRegister(!showRegister)} className="text-gray-300 hover:bg-gray-700 hover:text-white block w-full text-left px-3 py-2 rounded-md text-base font-medium">Register</button>
//             </div>
//           </div>
//         )}
//       </Transition>
// </nav>)
// }

// export default Navbar





import  { useState } from 'react';
import { Link} from 'react-router-dom'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-white text-xl font-bold">
          Phantom
        </div>
        <div className="hidden md:flex space-x-6 items-center">
          <Link to='/' className="text-gray-300 hover:text-white">Home</Link>
          <Link to='/about' className="text-gray-300 hover:text-white">About Us</Link>
          <Link to='/service' className="text-gray-300 hover:text-white">Services</Link>
          <Link to='/contact' className="text-gray-300 hover:text-white">Contact Us</Link>
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Login/Register
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-400 border rounded shadow-lg">
                <Link to='/login' className="block px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>Login</Link>
                <Link to='/register' className="block px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>Register</Link>
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
          <Link to='/'className="block px-4 py-2 text-white-700 hover:bg-gray-100 hover:text-gray-700">Home</Link>
          <Link to='/about' className="block px-4 py-2 text-white-700 hover:bg-gray-100">About Us</Link>
          <Link to='/service' className="block px-4 py-2 text-white-700 hover:bg-gray-100">Services</Link>
          <Link to='/contact' className="block px-4 py-2 text-white-700 hover:bg-gray-100">Contact Us</Link>
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="bg-blue-500 text-white px-4 py-2 rounded w-full"
            >
              Login/Register
            </button>
            {isDropdownOpen && (
              <div className="mt-2 w-full login-register border rounded shadow-lg">
                <Link to="/login" className="block px-4 py-2 text-gray-700 hover:bg-gray-100"  onClick={() => setIsDropdownOpen(!isDropdownOpen)} >Login</Link>
                <Link to="/register" className="block px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>Register</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
