import { useState } from 'react';
import { useAuth } from '../../context/authContext';
import { ToastResponseType } from '../../types/types';
import Toast from './ToastResponse';
import Login from './login';
import Register from './register';

const AuthController = () => {
  const { isAuthModalOpen,openAuthModal, closeAuthModal, isLogin } = useAuth();
  const [responseToast,setResponse]=useState<ToastResponseType>()

  const clearResponse = () => {
    setResponse(undefined);
  };


 
  if (!isAuthModalOpen) return null;

  return (<>
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gray-800 relative p-8 rounded shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-white text-center">{isLogin ? 'Login' : 'Register'}</h2>

        {isLogin ? (
          // Login Form
          <>
          <Login setResponse={setResponse}/>
          </>
          
        ) : (
          // Register Form
          <Register/>
        )}

        {/* Toggle button */}
        <div className="mt-4  text-center p-2">
          <button
            onClick={closeAuthModal}
            className="text-sm text-yellow-500 hover:text-yellow-600 focus:outline-none"
          >
            Close
          </button>

          {/* alternation for login and register redirect */}
          {!isLogin ?
            (<p className="text-gray-500 text-center absolute left-1/4 bottom-0"> Already registered?
              <button className="ml-2 p-2 text-white" onClick={()=>openAuthModal(true)}>
              login
              </button>
            </p>)
            :
            (<p className="text-gray-500 text-center absolute left-1/4 bottom-0"> Not registered?
              <button className="ml-2 p-2 text-white" onClick={()=>openAuthModal(false)}>
              Register
              </button>
            </p>  )
          }
        </div>
      </div>
    </div>
<Toast response={responseToast} clearResponse={clearResponse}/>
  </>
  );
};

export default AuthController;
