// import { useDetails } from "../../../../context/LocalStorageContext"
// import InputDiv from "../../../../components/InputDiv"
// import { useEffect, useState } from "react"
// import { FaUser } from "react-icons/fa";
// import { MdEmail } from "react-icons/md";
// import { MdOutlineContactPhone } from "react-icons/md";
// import { FaLock } from "react-icons/fa";
// import { UseChangeInfo, useFetchOneUserQuery, UseResetCode } from "../../../../features/login_slice";
// import { useAuth } from "../../../../context/authContext";



// const Settings = () => {
//     const {user} = useDetails()
//     const [userInfo,setUserInfo] =useState<any>({
//         name:'',
//         email:'',
//         contact_phone:'',
//     })
//     const id = user?.id

//     const [resetCode,{data,isSuccess,isError,isLoading}]= UseResetCode()
//     const [updateDetails,{data:updateDataResults,isSuccess:updateSuccess,isLoading:updateLoading}] = UseChangeInfo()
//     const { data:userData,isSuccess:userSuccess,refetch,isLoading:userLoading } = useFetchOneUserQuery({id:id,details:false},{refetchOnReconnect:true,pollingInterval:10000});
//     useEffect(()=>{
//         if(userData?.results && userSuccess){
//             setUserInfo(
//             {  name: userData?.results['name'],
//                 email: userData?.results['email'],
//                 contact_phone: userData?.results['contact_phone']
//             }
//             )
//             console.log(userData?.results)
//             console.log('here1')
//             console.log(userInfo)
//             console.log('here')
//         }
//     },[userData?.results,userSuccess])
//     const [readOnly,setReadOnly] =useState(true)
//     const [showSubmit,setShowSubmit] = useState(false)
//     const [userDetails,setUserDetails] = useState(userInfo)
//     const [edited,setEdited]= useState(false)
//     const[passwordValue,setPasswordValue]= useState('')
//     const[code,setCode]=useState('')
//     const{setResponseToast} = useAuth()
//     // console.log(userDetails)
//     const changeReadOnly =()=>{
//         setReadOnly(!readOnly)
//     }

//     const handleChange = (key: string, value: string) => {
//         console.log(`Changing ${key} to ${value}`);
//         setEdited(true)
//         setUserDetails((prevDetails: any) => ({
//           ...prevDetails,
//         [key]: typeof value === 'boolean' ? value : value,
//         }));
//       };

//     const handlePasswordChange =(value:string)=>{
//         setEdited(true)
//         setPasswordValue(value)
//     }
//     const handleCodeChange =(value:string)=>{
//         setCode(value)
//     }
//     const getCode = ()=>{
//         const info={
//             email: user?.email
//         }
//         resetCode(info)
//     }
//     useEffect(()=>{
//         if(isSuccess && data?.message=='success'){
//             setResponseToast({ message: `Code sent successfully! Check your Email`, type:'success' });
//             setShowSubmit(true)
//         }else if(data?.message=='error'){
//             setResponseToast({ message: `Failed to send code`, type:'error' });
//         }
//         if(isError){
//             setResponseToast({ message: `Something went wrong`, type:'error' });
//         }
//     },[data,isSuccess,isError])


//     const updateData=(e: React.FormEvent)=>{
//         e.preventDefault();
//         console.log('here')
//         const info = {
//             user_id: user?.id,
//             name: userDetails.name,
//             email: userDetails.email,
//             contact_phone: userDetails.contact_phone,
//             code:code,
//             ...(passwordValue && { password: passwordValue }) 
//         }
//         console.log(info)
        
//         updateDetails(info)
//     }
//     useEffect(()=>{
//         if(updateSuccess && updateDataResults?.message === 'success'){
//             setResponseToast({ message: `User details updated successfully!`, type:'success' });
//             setReadOnly(true)
//             setEdited(false)
//             setShowSubmit(false)
//             setCode('')
//             setPasswordValue('')
//         }else if(updateDataResults?.message == 'error'){
//             setResponseToast({ message: `Failed to update user details`, type:'error' });
//         }else if(updateDataResults?.error == 'Invalid'){
//             setResponseToast({ message: `Invalid code`, type:'error' });
//             setReadOnly(true)
//             setEdited(false)
//             setShowSubmit(false)
//             setCode('')
//         }
//     },[updateDataResults,updateSuccess])

//     return (
//         <form className="bg-gray-800 text-[22px]">
//             <h1 className="w-min mx-auto text-center font-bold text-[30px] border-b">Settings</h1>
            
//             {userLoading ? <span className="loading loading-dots loading-lg fixed top-1/2 left-1/2"></span> :
//                 <div>
//                     <div className="w-full gap-3 mt-3 justify-evenly flex p-3">
//                         <div className="flex w-1/3 flex-col font-mono">
//                             <InputDiv label="Name" placeholder="" setData={(value:string)=>handleChange('name',value)} icon={<FaUser size={30} className="mr-2"/>} value={userDetails.name} type="text" readOnly={readOnly} />
//                         </div>
//                         <div className="flex w-1/3 flex-col font-mono">
//                             <InputDiv label="Email" placeholder="" setData={(value:string)=>handleChange('email',value)} icon={<MdEmail size={30} className="mr-2"/>} value={userDetails?.email} type="email" readOnly={readOnly} />
//                         </div>
//                         <div className="flex w-1/3 flex-col font-mono">
//                             <InputDiv label="Contact" placeholder="" setData={(value: string)=> handleChange('contact_phone',value)} icon={<MdOutlineContactPhone size={36} className="mr-2"/>} value={userDetails?.contact_phone} type="number" readOnly={readOnly} />
//                         </div>
//                     </div>
//                     <div className="flex gap-3 p-3">
//                         <div className="flex w-1/3 flex-col font-mono">
//                             <InputDiv label="Password" placeholder="" setData={(value: string)=> handlePasswordChange(value)} icon={<FaLock size={30} className="mr-2"/>} value={passwordValue} type="password" required={false} />
//                         </div>
//                         <div className="flex w-1/3 flex-col font-mono">
//                             <InputDiv label="Code" placeholder="" setData={(value: string)=> handleCodeChange(value)} value={code} type="text" required={false}/>
//                         </div>
//                     </div>
//                     <div>
//                         <div className="flex items-center m-3 gap-2">
//                             <input type="checkbox" checked={readOnly} onChange={changeReadOnly} className="w-6 h-6 text-white"/>
//                             <label className="text-white">Read Only Mode</label>
//                         </div>
//                     </div>
//                     <div className="m-3 flex gap-2 justify-center p-2 relative">
//                         <button onClick={changeReadOnly} className={`px-6 py-3 text-white border-none bg-blue-500 rounded hover:bg-blue-600 transition-all duration-300`} type="button">
//                             {readOnly ? 'Edit Details' : 'Save Details'}
//                         </button>
//                         {edited &&
//                             <button type="button" className="btn bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 absolute right-3" onClick={getCode}>
//                                 {isLoading ? <span className="loading loading-spinner loading-xs"></span> : "Get Code"}
//                             </button>
//                         }
//                         {showSubmit &&
//                             <button type="submit" className="btn bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 absolute left-3" onClick={updateData}>
//                                 {updateLoading ? <span className="loading loading-spinner loading-xs"></span> : "Submit"}
//                             </button>
//                         }
//                     </div>
//                 </div>
//             }
//         </form>
//     );
// }    

// export default Settings



import { useDetails } from "../../../../context/LocalStorageContext"
import InputDiv from "../../../../components/InputDiv"
import { useEffect, useState } from "react"
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { MdOutlineContactPhone } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { UseChangeInfo, useFetchOneUserQuery, UseResetCode } from "../../../../features/login_slice";
import { useAuth } from "../../../../context/authContext";

const Settings = () => {
    const { user } = useDetails()
    const id = user?.id

    const [userInfo, setUserInfo] = useState({
        name: '',
        email: '',
        contact_phone: '',
    })

    const [resetCode, { data, isSuccess, isError, isLoading }] = UseResetCode()
    const [updateDetails, { data: updateDataResults, isSuccess: updateSuccess, isLoading: updateLoading }] = UseChangeInfo()
    const { data: userData, isSuccess: userSuccess, refetch, isLoading: userLoading } = useFetchOneUserQuery({ id: id, details: false }, { refetchOnReconnect: true });

    useEffect(() => {
        if (userData?.results && userSuccess) {
            setUserInfo({
                name: userData['results']['name'],
                email: userData['results']['email'],
                contact_phone: userData['results']['contact_phone']
            })
        }
    }, [userData, userSuccess])

    useEffect(() => {
        setUserDetails(userInfo);
    }, [userInfo]);

    const [readOnly, setReadOnly] = useState(true)
    const [showSubmit, setShowSubmit] = useState(false)
    const [userDetails, setUserDetails] = useState(userInfo)
    const [edited, setEdited] = useState(false)
    const [passwordValue, setPasswordValue] = useState('')
    const [code, setCode] = useState('')
    const { setResponseToast } = useAuth()

    const changeReadOnly = () => {
        setReadOnly(!readOnly)
    }

    const handleChange = (key: string, value: string) => {
        setEdited(true)
        setUserDetails((prevDetails) => ({
            ...prevDetails,
            [key]: value,
        }));
    };

    const handlePasswordChange = (value: string) => {
        setEdited(true)
        setPasswordValue(value)
    }

    const handleCodeChange = (value: string) => {
        setCode(value)
    }

    const getCode = () => {
        const info = {
            email: user?.email
        }
        resetCode(info)
    }

    useEffect(() => {
        if (isSuccess && data?.message == 'success') {
            setResponseToast({ message: `Code sent successfully! Check your Email`, type: 'success' });
            setShowSubmit(true)
        } else if (data?.message == 'error') {
            setResponseToast({ message: `Failed to send code`, type: 'error' });
        }
        if (isError) {
            setResponseToast({ message: `Something went wrong`, type: 'error' });
        }
    }, [data, isSuccess, isError])

    const updateData = (e: React.FormEvent) => {
        e.preventDefault();
        const info = {
            user_id: user?.id,
            name: userDetails.name,
            email: userDetails.email,
            contact_phone: userDetails.contact_phone,
            code: code,
            ...(passwordValue && { password: passwordValue })
        }
        updateDetails(info)
    }

    useEffect(() => {
        if (updateSuccess && updateDataResults?.message === 'success') {
            setResponseToast({ message: `User details updated successfully!`, type: 'success' });
            setReadOnly(true)
            setEdited(false)
            setShowSubmit(false)
            setCode('')
            setPasswordValue('')
            refetch()
            if(user){
                user.contact_phone=userInfo.contact_phone
                user.name=userDetails.name
                user.email=userDetails.email
            }
            // setUserInfo({...userInfo, contact_phone: userDetails.contact_phone })

        } else if (updateDataResults?.message == 'error') {
            setResponseToast({ message: `Failed to update user details`, type: 'error' });
        } else if (updateDataResults?.error == 'Invalid') {
            setResponseToast({ message: `Invalid code`, type: 'error' });
            setReadOnly(true)
            setEdited(false)
        }
    }, [updateDataResults, updateSuccess])

    return (
        <form className="bg-gray-800 text-[22px]">
            <h1 className="w-min mx-auto text-center font-bold text-[30px] border-b">Settings</h1>
            
            {userLoading ? <span className="loading loading-dots loading-lg fixed top-1/2 left-1/2"></span> :
                <div>
                    <div className="w-full gap-3 mt-3 justify-evenly flex p-3">
                        <div className="flex w-1/3 flex-col font-mono">
                            <InputDiv label="Name" placeholder="" setData={(value: string) => handleChange('name', value)} icon={<FaUser size={30} className="mr-2" />} value={userDetails.name} type="text" readOnly={readOnly} />
                        </div>
                        <div className="flex w-1/3 flex-col font-mono">
                            <InputDiv label="Email" placeholder="" setData={(value: string) => handleChange('email', value)} icon={<MdEmail size={30} className="mr-2" />} value={userDetails?.email} type="email" readOnly={readOnly} />
                        </div>
                        <div className="flex w-1/3 flex-col font-mono">
                            <InputDiv label="Contact" placeholder="" setData={(value: string) => handleChange('contact_phone', value)} icon={<MdOutlineContactPhone size={36} className="mr-2" />} value={userDetails?.contact_phone} type="number" readOnly={readOnly} />
                        </div>
                    </div>
                    <div className="flex gap-3 p-3">
                        <div className="flex w-1/3 flex-col font-mono">
                            <InputDiv label="Password" placeholder="" setData={(value: string) => handlePasswordChange(value)} icon={<FaLock size={30} className="mr-2" />} value={passwordValue} type="password" required={false} />
                        </div>
                        <div className="flex w-1/3 flex-col font-mono">
                            <InputDiv label="Code" placeholder="" setData={(value: string) => handleCodeChange(value)} value={code} type="text" required={false} />
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center m-3 gap-2">
                            <input type="checkbox" checked={readOnly} onChange={changeReadOnly} className="w-6 h-6 text-white" />
                            <label className="text-white">Read Only Mode</label>
                        </div>
                    </div>
                    <div className="m-3 flex gap-2 justify-center p-2 relative">
                        <button onClick={changeReadOnly} className={`px-6 py-3 text-white border-none bg-blue-500 rounded hover:bg-blue-600 transition-all duration-300`} type="button">
                            {readOnly ? 'Edit Details' : 'Save Details'}
                        </button>
                        {edited &&
                            <button type="button" className="btn bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 absolute right-3" onClick={getCode}>
                                {isLoading ? <span className="loading loading-spinner loading-xs"></span> : "Get Code"}
                            </button>
                        }
                        {showSubmit &&
                            <button type="submit" className="btn bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 absolute left-3" onClick={updateData}>
                                {updateLoading ? <span className="loading loading-spinner loading-xs"></span> : "Submit"}
                            </button>
                        }
                    </div>
                </div>
            }
        </form>
    );
}

export default Settings
