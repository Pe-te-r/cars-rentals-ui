// import { useEffect, useRef, useState } from "react"
// import InputDiv from "../../components/InputDiv"
// import { useRegisterMutation } from "../../features/login_slice"
// import { useAuth } from "../../context/authContext"
// import { ToastResponseType } from "../../types/types"

// const Register = () => {
//   const [response,setResponse]= useState<ToastResponseType>()

//     const {closeAuthModal,openAuthModal}= useAuth()
//     const [name,setName]=useState('phantom')
//     const [email, setEmail]=useState('phantom8526@duck.com')
//     const [password, setPassword]=useState('12345')
//     const [contact_phone, setPhone]=useState('0748200233')
//     const selectRef = useRef<HTMLSelectElement>(null);


//     const [registerUser,{isLoading}] = useRegisterMutation();
    
//     const handleRegister=async(e: React.FormEvent) => {
//         e.preventDefault();
//         const role = selectRef.current !== null ? selectRef.current.value : '';
//         try {
//           const response=await registerUser({ email, password, name, role,contact_phone}).unwrap();
//           setResponse({ message: "Now you can login successfully!", type: 'success' });
//           console.log(response);
//           closeAuthModal();
//           openAuthModal(true);

//         } catch (error: any) {
//           console.error(error);
//           setResponse({ message: error.message || 'Registration failed', type: 'error' });

//         }
//       }
    
//       useEffect(() => {
//         if (response) {
//           const timer = setTimeout(() => {
//             setResponse(undefined);
//           }, 2000);
    
//           return () => clearTimeout(timer); // Clear timeout if the component unmounts or before setting a new response
//         }
//       }, [response]);
//     return (
//         <form className=" space-y-4" onSubmit={handleRegister}>
//             <InputDiv setData={setName} value={name} type='text' placeholder='Enter your name' label='Name'/>
//             <InputDiv setData={setEmail} value={email} type='email' placeholder='Enter your email' label='Email'/>
//             <InputDiv setData={setPhone} value={contact_phone} type='text' placeholder='Enter your phone ' label='Phone'/>
//             <InputDiv setData={setPassword} value={password} type='password' placeholder='Enter your password' label='Password'/>

//             <div>
//               <label className="block mb-1 text-white">Role</label>
//               <select  ref={selectRef}
//                 className="w-full px-3 py-2 border border-gray-700 rounded bg-gray-700 text-white focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
//               >
//                 <option value="user">User</option>
//                 <option value="admin">Admin</option>
//               </select>
//             </div>
//             <button className="w-full bg-yellow-500 text-gray-900 py-2 rounded hover:bg-yellow-600 focus:outline-none">
//               {isLoading ?<span className="loading loading-bars loading-md"></span>: "Register"}
//             </button>
//             {response && (
//           <>
//           <div role="alert" className={`alert fixed insert-0 top-0 left-1/4 flex w-1/2 ${response.type == 'error' ? 'alert-warning' : 'alert-success'}`}>
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-6 w-6 shrink-0 stroke-current"
//               fill="none"
//               viewBox="0 0 24 24">
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d={response.type === 'error' ? 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z' : 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'} />
//             </svg>
//             <span>{response.message}</span>
//           </div>
//           </>
//         )} 
            
//     </form>    )
// }

// export default Register



import { useEffect, useRef, useState } from "react";
import InputDiv from "../../components/InputDiv";
import { useRegisterMutation } from "../../features/login_slice";
import { useAuth } from "../../context/authContext";
import { ToastResponseType } from "../../types/types";

const Register = () => {
  const [response, setResponse] = useState<ToastResponseType>();

  const { closeAuthModal, openAuthModal } = useAuth();
  const [name, setName] = useState('phantom');
  const [email, setEmail] = useState('phantom8526@duck.com');
  const [password, setPassword] = useState('12345');
  const [contact_phone, setPhone] = useState('0748200233');
  const selectRef = useRef<HTMLSelectElement>(null);

  const [registerUser, { isLoading,isSuccess }] = useRegisterMutation();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const role = selectRef.current ? selectRef.current.value : '';
    try {
      const response = await registerUser({ email, password, name, role, contact_phone }).unwrap();
      setResponse({ message: "Now you can login successfully!", type: 'success' });
      console.log(response);
      closeAuthModal();
      openAuthModal(true);
    } catch (error: any) {
      console.error(error);
      setResponse({ message: error.message || 'Registration failed', type: 'error' });
    }
  };

  useEffect(() => {
    if (response) {
      const timer = setTimeout(() => {
        setResponse(undefined);
      }, 2000);

      return () => clearTimeout(timer); // Clear timeout if the component unmounts or before setting a new response
    }
  }, [response]);

  return (
    <form className="space-y-4" onSubmit={handleRegister}>
      <InputDiv setData={setName} value={name} type='text' placeholder='Enter your name' label='Name' />
      <InputDiv setData={setEmail} value={email} type='email' placeholder='Enter your email' label='Email' />
      <InputDiv setData={setPhone} value={contact_phone} type='text' placeholder='Enter your phone ' label='Phone' />
      <InputDiv setData={setPassword} value={password} type='password' placeholder='Enter your password' label='Password' />

      <div>
        <label className="block mb-1 text-white">Role</label>
        <select ref={selectRef}
          className="w-full px-3 py-2 border border-gray-700 rounded bg-gray-700 text-white focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <button className="w-full bg-yellow-500 text-gray-900 py-2 rounded hover:bg-yellow-600 focus:outline-none">
        {isLoading ? <span className="loading loading-bars loading-md"></span> : "Register"}
      </button>
      {response && (
        <div role="alert" className={`alert fixed insert-0 top-0 left-1/4 flex w-1/2 ${response.type === 'error' ? 'alert-warning' : 'alert-success'}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={response.type === 'error' ? 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z' : 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'} />
          </svg>
          <span>{response.message}</span>
        </div>
      )}
      
    </form>
  );
};

export default Register;
