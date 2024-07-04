import  { useState } from 'react';
import { Link } from 'react-router-dom';

interface propType {
  isLoginValue: boolean;
}

const AuthController =({isLoginValue}: propType)=>{
    const [isLogin, setIsLogin] = useState(isLoginValue); 

  // Function to toggle between login and register views
  const toggleForm = () => {
    setIsLogin(prevState => !prevState);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <div className="bg-gray-800 p-8 rounded shadow-lg  w-1/2">
        <h2 className="text-2xl font-bold mb-4">{isLogin ? 'Login' : 'Register'}</h2>

        {isLogin ? (
          // Login Form
          <form className="space-y-4">
            <div>
              <label className="block mb-1">Email</label>
              <input type="email" className="w-full px-3 py-2  border rounded" placeholder="Enter your email" />
            </div>
            <div>
              <label className="block mb-1">Password</label>
              <input type="password" className="w-full px-3 py-2 border rounded" placeholder="Enter your password" />
            </div>
            <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Login</button>
          </form>
        ) : (
          // Register Form
          <form className="space-y-4">
            <div>
              <label className="block mb-1">Name</label>
              <input type="text" className="w-full px-3 py-2 border rounded" placeholder="Enter your name" />
            </div>
            <div>
              <label className="block mb-1">Email</label>
              <input type="email" className="w-full px-3 py-2 border rounded" placeholder="Enter your email" />
            </div>
            <div>
              <label className="block mb-1">Password</label>
              <input type="password" className="w-full px-3 py-2 border rounded" placeholder="Enter your password" />
            </div>
            <div>
              <label className="block mb-1">Role</label>
              <select className="w-full px-3 py-2 border rounded">
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <button className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">Register</button>
          </form>
        )}

        {/* Toggle button */}
        <div className="mt-4 text-center">
          <Link to={isLogin? ('/register'): ('/login')}>
          <button
            onClick={toggleForm}
            className="text-sm text-blue-500 hover:text-blue-700 focus:outline-none"
            >
            {isLogin ? 'Create an account' : 'Already have an account? Login'}
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AuthController