import { useAuth } from '../../context/authContext';
import Login from './login';
import Register from './register';

const AuthController = () => {
  const { isAuthModalOpen, closeAuthModal, isLogin } = useAuth();
 
  if (!isAuthModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gray-800 p-8 rounded shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-white text-center">{isLogin ? 'Login' : 'Register'}</h2>

        {isLogin ? (
          // Login Form
          <Login/>
          
        ) : (
          // Register Form
          <Register/>
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
