import { useState } from "react";
import InputDiv from "../../../../components/InputDiv";
import { useUpdateLocationsMutation } from "../../../../features/LocationSlice";

const EditLocation = ({ close, refetch, values}: any) => {
    const [editingDetails,setEditingDetails]=useState(values)
    const [updateLocation,{isLoading}] = useUpdateLocationsMutation()
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateLocation({ id: editingDetails.id,...editingDetails });
        if(!isLoading){
            refetch();
            close();
        }
    };
    const handleChange = (key: string, value: string) => {
        console.log(`Changing ${key} to ${value}`);
        setEditingDetails((prevDetails: any) => ({
            ...prevDetails,
            [key]: value,
        }));
    };

    return (
        <div className="bg-gray-900 rounded-lg p-4 w-1/2 font-mono">
            <h2 className="m-4 p-2">Edit Location's Details</h2>
            <form onSubmit={handleSubmit}>
                <div className="m-4 p-2">
                    <InputDiv 
                        label="Name"
                        placeholder=""
                        value={editingDetails.name}
                        setData={(value: string) => handleChange('name', value)}
                        type="text"
                    />
                </div>
                <div className="m-4 p-2">
                    <InputDiv 
                        label="Address"
                        placeholder=""
                        value={editingDetails.address}
                        setData={(value: string) => handleChange('address', value)}
                        type="text"
                    />
                </div>
                <div className="m-4 p-2">
                    <InputDiv 
                        label="Contact"
                        placeholder=""
                        value={editingDetails.contact}
                        setData={(value: string) => handleChange('contact', value)}
                        type="text"
                    />
                </div>
                <div className="m-4 p-2"> 
                    <button className="btn bg-blue-800 mr-4" onClick={close}>Close</button>
                    <button className="btn bg-blue-800 ml-4" type="submit">{isLoading ?<span className="loading loading-spinner loading-xs"></span> : 'Add'}</button>
                </div>
            </form>            
        </div>
    );
};

export default EditLocation;
