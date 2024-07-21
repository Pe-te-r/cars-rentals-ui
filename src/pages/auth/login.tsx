import {  useState } from "react";
import { useAuth } from "../../context/authContext";
import { useLoginMutation } from "../../features/login_slice";
import InputDiv from "../../components/InputDiv";
import { useDetails } from "../../context/LocalStorageContext";
import { useNavigate } from "react-router-dom";
import { RiLoginBoxFill } from "react-icons/ri";
import { TbPasswordUser } from "react-icons/tb";
import { MdEmail } from "react-icons/md";




const Login = () => {
  // context hook for local storage 
  const {  setUserDetail } = useDetails();
  const navigate = useNavigate()
  const [loginUser, {isLoading}] = useLoginMutation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { closeAuthModal,setResponseToast } = useAuth();
    const handleLogin=async(e: React.FormEvent) => {
        e.preventDefault();
        try {
          const response =await loginUser({ email,password}).unwrap();
          console.log(response)
          setResponseToast({ message: `Login successfully! ${response['name']} `, type: 'success' });
          console.log(response);
          closeAuthModal();
          setUserDetail(
            {
              id:response.id.toString(),
              name: response.name,
              email: response.email,
              login: true,
              role: response.role,
              contact_phone: response.contact_phone,
              token: response.token,
            }
          )
          if(response.role === 'admin'){
            navigate('/admin')
          }else{
            navigate('/dashboard')
          }

          } catch (error) {
            console.error(error);
            setResponseToast({ message: `Login failed`, type: 'error' });
        }
        }
    return (

              <>
<form className="space-y-4" onSubmit={handleLogin}>
            <InputDiv setData={setEmail} value={email} type='email' placeholder='Enter you email' label='Email' icon={<MdEmail className="mr-2" size={20}/>}/>
            <InputDiv setData={setPassword} value={password} type='password' placeholder='Enter you password' label={`Password`} icon={<TbPasswordUser size={20} className="mr-2"/>}/>
            <button type='submit' className="w-full bg-yellow-500 text-gray-900 py-2 rounded hover:bg-yellow-600 focus:outline-none">
              {isLoading ? <span className="loading loading-infinity loading-md"></span>:<span className="flex justify-center items-center text-[20px]"><RiLoginBoxFill size={21}/> Login</span>}
            </button>
          </form>
         
          </>
    )
}

export default Login

