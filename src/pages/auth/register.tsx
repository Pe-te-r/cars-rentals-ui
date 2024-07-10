import InputDiv from "../../components/InputDiv"
import { useRegisterMutation } from "../../features/login_slice"
import { useAuth } from "../../context/authContext"
import { useRef, useState } from "react"

const Register = () => {
    const {closeAuthModal,setResponseToast,openAuthModal}= useAuth()
    const [name,setName]=useState('')
    const [email, setEmail]=useState('')
    const [password, setPassword]=useState('')
    const [contact_phone, setPhone]=useState('')
    const selectRef = useRef<HTMLSelectElement>(null);


    const [registerUser,{isLoading}] = useRegisterMutation();
    
    const handleRegister=async(e: React.FormEvent) => {
        e.preventDefault();
        const role = selectRef.current !== null ? selectRef.current.value : '';
        try {
          const response=await registerUser({ email, password, name, role,contact_phone}).unwrap();
          setResponseToast({ message: "Now you can login successfully!", type: 'success' });
          console.log(response);
          closeAuthModal();
          openAuthModal(true);

        } catch (error: any) {
          console.error(error);
          setResponseToast({ message: error.message || 'Registration failed', type: 'error' });

        }
      }
    return (
        <form className=" space-y-4" onSubmit={handleRegister}>
            <InputDiv setData={setName} value={name} type='text' placeholder='Enter your name' label='Name'/>
            <InputDiv setData={setEmail} value={email} type='email' placeholder='Enter your email' label='Email'/>
            <InputDiv setData={setPhone} value={contact_phone} type='text' placeholder='Enter your phone ' label='Phone'/>
            <InputDiv setData={setPassword} value={password} type='password' placeholder='Enter your password' label='Password'/>

            <div>
              <label className="block mb-1 text-white">Role</label>
              <select  ref={selectRef}
                className="w-full px-3 py-2 border border-gray-700 rounded bg-gray-700 text-white focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <button className="w-full bg-yellow-500 text-gray-900 py-2 rounded hover:bg-yellow-600 focus:outline-none">
              {isLoading ?<span className="loading loading-bars loading-md"></span>: "Register"}
            </button>
    </form>    )
}

export default Register