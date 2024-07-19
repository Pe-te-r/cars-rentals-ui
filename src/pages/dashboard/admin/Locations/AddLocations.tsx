import { useState } from "react"
import InputDiv from "../../../../components/InputDiv"
const AddLocations = ({close}: any) => {
    const initialDetails = {
        name: '',
        address: '',
        contact: ''
    }
    const [locationDetails,setLocationDetails]=useState(initialDetails)
    const handleChange = ()=>{
        setLocationDetails((prevDetails)=>({...prevDetails, [e.target.name]: e.target.value}))
    }
    const handleSubmit=()=>{

    }

    return (
            <div className="w-full">  
                <form className="bg-gray-900 mx-auto w-1/2 p-4 mb-4 rounded-lg" onSubmit={handleSubmit}>
                    <h2 className="text-center text-[21px]">Add Locations Details</h2>
                    <div className="m-4 p-2 font-mono mb-4">
                        <InputDiv label="Location" placeholder="Location name" setData={()=>''} value='' type="text"/>
                    </div>
                    <div className="m-4 p-2 font-mono">
                        <InputDiv label="Address" placeholder="Address" setData={()=>''} value='' type="text"/>
                    </div>
                    <div className="m-4 p-2 font-mono">
                        <InputDiv label="Contact" placeholder="phone number" setData={()=>''} value='' type="number"/>
                    </div>
                    <div className="m-4 p-2 w-full font-mono">
                        <button className="btn bg-blue-900 hover:bg-blue-800 font-mono mr-3" onClick={close}>Close</button>
                        <button className="btn bg-blue-900 hover:bg-blue-800 font-mono ml-3">Add</button>
                    </div> 
                </form>
            </div>            
    )
}

export default AddLocations
