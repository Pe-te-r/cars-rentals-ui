import { useState } from "react"
import InputDiv from "../../../../components/InputDiv"
import { useAddLocationsMutation } from "../../../../features/LocationSlice"
const AddLocations = ({close,refetch}: any) => {
    const [ sendLocation,{isLoading,data}] = useAddLocationsMutation()
    const initialDetails = {
        name: '',
        address: '',
        contact: ''
    }
    const [locationDetails,setLocationDetails]=useState(initialDetails)
    
    const handleChange = (key: string, value: string) => {
        console.log(`Changing ${key} to ${value}`);
        setLocationDetails((prevDetails) => ({
          ...prevDetails,
        [key]: typeof value === 'boolean' ? value : value,
        }));
      };
    const handleSubmit=(e: any)=>{
        e.preventDefault()
        sendLocation(locationDetails)
        if(!isLoading){
            console.log(data)
            setLocationDetails(initialDetails)
            refetch()
            close()
        }

    }

    return (
            <div className="w-full">  
                <form className="bg-gray-900 mx-auto w-1/2 p-4 mb-4 rounded-lg" onSubmit={handleSubmit}>
                    <h2 className="text-center text-[21px]">Add Locations Details</h2>
                    <div className="m-4 p-2 font-mono mb-4">
                        <InputDiv label="Location" placeholder="Location name" setData={(value: string) => handleChange('name', value)} value={locationDetails.name} type="text"/>
                    </div>
                    <div className="m-4 p-2 font-mono">
                        <InputDiv label="Address" placeholder="Address" setData={(value: string) => handleChange('address', value)} value={locationDetails.address} type="text"/>
                    </div>
                    <div className="m-4 p-2 font-mono">
                        <InputDiv label="Contact" placeholder="phone number" setData={(value: string) => handleChange('contact', value)} value={locationDetails.contact} type="number"/>
                    </div>
                    <div className="m-4 p-2 w-full font-mono">
                        <button className="btn bg-blue-900 hover:bg-blue-800 font-mono mr-3" onClick={close}>Close</button>
                        <button className="btn bg-blue-900 hover:bg-blue-800 font-mono ml-3" type="submit">{isLoading ? <span className="loading loading-spinner loading-xs"></span> : 'Add'}</button>
                    </div> 
                </form>
            </div>            
    )
}

export default AddLocations
