import { useDetails } from "../../../../context/LocalStorageContext"
import InputDiv from "../../../../components/InputDiv"
import { useState } from "react"
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { MdOutlineContactPhone } from "react-icons/md";
import { FaLock } from "react-icons/fa";



const Settings = () => {
    const {user} = useDetails()
    const userInfo = {
        name:user?.name,
        email:user?.email,
        contact_phone:user?.contact_phone,
    }
    const [readOnly,setReadOnly] =useState(true)
    const [userDetails,setUserDetails] = useState(userInfo)
    const [Password,editPassword]= useState(false)
    const[passwordValue,setPasswordValue]= useState('')
    const[code,setCode]=useState('')
    console.log(userDetails)
    const changeReadOnly =()=>{
        setReadOnly(!readOnly)
    }

    const handleChange = (key: string, value: string) => {
        console.log(`Changing ${key} to ${value}`);
        setUserDetails((prevDetails: any) => ({
          ...prevDetails,
        [key]: typeof value === 'boolean' ? value : value,
        }));
      };

    const toggleEditPassword = ()=>{
        editPassword(!Password)
    }
    const handlePasswordChange =(value:string)=>{
        setPasswordValue(value)
    }
    const handleCodeChange =(value:string)=>{
        setCode(value)
    }

    return (
        <div className="bg-gray-800 text-[22px]">
            <h1 className="w-min mx-auto text-center font-bold text-[30px] border-b">Settings</h1>
            <div className="w-full gap-3 mt-3 justify-evenly  flex p-3">
                <div className="flex w-1/3 flex-col font-mono">
                    <InputDiv label="Name" placeholder="" setData={(value:string)=>handleChange('name',value)} icon={<FaUser size={30} className="mr-2"/>} value={userDetails.name} type="text" readOnly={readOnly} />
                </div>
                <div className="flex w-1/3 flex-col font-mono">
                    <InputDiv label="Email" placeholder="" setData={(value:string)=>handleChange('email',value)} icon={<MdEmail size={30} className="mr-2"/>} value={userDetails?.email} type="email" readOnly={readOnly} />
                </div>
                <div className="flex w-1/3 flex-col font-mono">
                    <InputDiv label="Contact" placeholder="" setData={(value: string)=> handleChange('contact_phone',value)} icon={<MdOutlineContactPhone size={36} className="mr-2"/>} value={userDetails?.contact_phone} type="number" readOnly={readOnly} />
                </div>
            </div>
            <div className="flex gap-3 p-3">
                {Password ?
                <>
                    <div className="flex w-1/3 flex-col font-mono">
                        <InputDiv label="Password" placeholder="" setData={(value: string)=> handlePasswordChange(value)} icon={<FaLock size={30} className="mr-2"/>} value={passwordValue} type="password" />
                    </div>
                    <div className="flex w-1/3 flex-col font-mono">
                        <InputDiv label="Code" placeholder="" setData={(value: string)=> handleCodeChange(value)} value={code} type="text" />
                    </div>
                </>
                : null}
            </div>
            <div>
                <div className="flex items-center m-3 gap-2">
                    <input type="checkbox" checked={readOnly} onChange={changeReadOnly} className="w-6 h-6 text-white"/>
                    <label className="text-white">Read Only Mode</label>
                </div>
                <div>
                    
                </div>
                

            </div>
            <div className="m-3 flex gap-2 justify-center p-2">
                <button onClick={changeReadOnly} className={`px-6 py-3 text-white border-none bg-blue-500 rounded hover:bg-blue-600 transition-all duration-300`}>
                    {readOnly? 'Edit Details' : 'Save Details'}
                </button>
                <button onClick={toggleEditPassword} className={`px-6 py-3 text-white border-none bg-blue-500 rounded hover:bg-blue-600 transition-all duration-300}`}>
                    {!Password ? 'Reset Password' : 'Save Password' }
                    
                </button>
            </div>
        </div>
    )
}

export default Settings
