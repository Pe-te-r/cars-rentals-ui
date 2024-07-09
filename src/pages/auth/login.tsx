import { useState } from "react";
import { useAuth } from "../../context/authContext";
import { useLoginMutation } from "../../features/login_slice";
import InputDiv from "../../components/InputDiv";

const Login = () => {
    const [loginUser, {isLoading,isSuccess,isError}] = useLoginMutation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { closeAuthModal } = useAuth();
    const handleLogin=async(e: React.FormEvent) => {
        e.preventDefault();
        try {
          const response =await loginUser({ email, password }).unwrap();
          console.log(response)
          closeAuthModal();
        } catch (error) {
          console.error(error);
        }
        }
    return (

<form className="space-y-4" onSubmit={handleLogin}>
            <InputDiv setData={setEmail} value={email} type='email' placeholder='Enter you email' label='Email'/>
            <InputDiv setData={setPassword} value={password} type='password' placeholder='Enter you password' label='Password'/>
            <button type='submit' className="w-full bg-yellow-500 text-gray-900 py-2 rounded hover:bg-yellow-600 focus:outline-none">
              {isLoading ? <span className="loading loading-infinity loading-xs"></span>: "login"}
            </button>
            {isError ?
             <div role="alert" className="alert alert-warning">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span>Warning: Invalid Details for login!</span>
        </div>: null}
            
            
          </form>
            
    )
}

export default Login

