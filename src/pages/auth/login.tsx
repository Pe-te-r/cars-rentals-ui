import {  useState } from "react";
import { useAuth } from "../../context/authContext";
import { useLoginMutation } from "../../features/login_slice";
import InputDiv from "../../components/InputDiv";
// import { ToastResponseType } from "../../types/types";

const Login = ({setResponse}: any) => {
    const [loginUser, {isLoading}] = useLoginMutation();
    const [email, setEmail] = useState('mburupeter@duck.com');
    const [password, setPassword] = useState('12345');
    const { closeAuthModal } = useAuth();
    const handleLogin=async(e: React.FormEvent) => {
        e.preventDefault();
        try {
          const response =await loginUser({ email, password }).unwrap();
          setResponse({ message: `Login successfully! ${response['name']} `, type: 'success' });
          console.log(response);
          closeAuthModal();
          } catch (error) {
            console.error(error);
            setResponse({ message: `Login failed`, type: 'error' });
        }
        }
    return (

              <>
<form className="space-y-4" onSubmit={handleLogin}>
            <InputDiv setData={setEmail} value={email} type='email' placeholder='Enter you email' label='Email'/>
            <InputDiv setData={setPassword} value={password} type='password' placeholder='Enter you password' label='Password'/>
            <button type='submit' className="w-full bg-yellow-500 text-gray-900 py-2 rounded hover:bg-yellow-600 focus:outline-none">
              {isLoading ? <span className="loading loading-infinity loading-xs"></span>: "login"}
            </button>
          </form>
            
            
            
          </>
    )
}

export default Login

