import InputDiv from '../components/InputDiv';
import { useAuth } from '../context/authContext';

const AuthController = () => {
  const { isAuthModalOpen, closeAuthModal, isLogin } = useAuth();

  if (!isAuthModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gray-800 p-8 rounded shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-white text-center">{isLogin ? 'Login' : 'Register'}</h2>

        {isLogin ? (
          // Login Form
          <form className="space-y-4">
            <InputDiv type='email' placeholder='Enter you email' label='Email'/>
            <InputDiv type='password' placeholder='Enter you password' label='Password'/>
            <button className="w-full bg-yellow-500 text-gray-900 py-2 rounded hover:bg-yellow-600 focus:outline-none">
              Login
            </button>
          </form>
        ) : (
          // Register Form
          <form className="space-y-4">
            <InputDiv type='text' placeholder='Enter your name' label='Name'/>
            <InputDiv type='email' placeholder='Enter your email' label='Email'/>
            <InputDiv type='password' placeholder='Enter your password' label='Password'/>

            <div>
              <label className="block mb-1 text-white">Role</label>
              <select
                className="w-full px-3 py-2 border border-gray-700 rounded bg-gray-700 text-white focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <button className="w-full bg-yellow-500 text-gray-900 py-2 rounded hover:bg-yellow-600 focus:outline-none">
              Register
            </button>
          </form>
        )}

        {/* Toggle button */}
        <div className="mt-4 text-center">
          <button
            onClick={closeAuthModal}
            className="text-sm text-yellow-500 hover:text-yellow-600 focus:outline-none"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthController;
