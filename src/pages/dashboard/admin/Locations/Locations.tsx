import { useEffect, useState } from "react";
import { useDeleteLocationsMutation, useGetAllLocationsQuery } from "../../../../features/LocationSlice";
import AddLocations from "./AddLocations";
import EditLocation from "./EditLocation";
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";
import { useToast } from "../../../../context/smallToast";


const Locations = () => {
    const { data, isSuccess, refetch } = useGetAllLocationsQuery();
    const [locations, setLocations] = useState([]);
    const [showAddLocation, setShowAddLocation] = useState(false);
    const [showEditLocation, setShowEditLocation]= useState(false);
    const [locationEditing,setEditingLocation]= useState([])
    const { addToast } = useToast();
    const [deleteLocationDetails, { isLoading,data:deleteData,isSuccess:deleteSuccess }] = useDeleteLocationsMutation();
    const [deletingRowId, setDeletingRowId] = useState<string | null>(null);



    useEffect(() => {
        if (isSuccess) {
            setLocations(data['results']);
        }
        console.log(data);
    }, [data, isSuccess]);

    const toggleAddLocation = () => {
        setShowAddLocation(!showAddLocation);
    };

    const handleDeleteClick = async (id: string) => {
        setDeletingRowId(id);
        await deleteLocationDetails({ id });
        setDeletingRowId(null);
        
    };
    useEffect(()=>{
        if(deleteSuccess&&deleteData?.result==='success'){
            addToast('Location deleted successfully','success')
            refetch()
        }
    },[deleteSuccess,deleteData])

    const handleEdit = (id: number)=>{
        setShowEditLocation(true);
        const location = locations.filter((location: any)=> Number(location?.id)===Number(id))
        setEditingLocation(location)
    }

    useEffect(()=>{},[])

    return (
        <div>
            {isSuccess ? (
                <div className="overflow-x-auto">
                    <table className="table font-mono bg-gray-800">
                        {/* head */}
                        <thead>
                            <tr className="bg-gray-600 text-[18px] text-gray-300">
                                <th></th>
                                <th>Name</th>
                                <th>Address</th>
                                <th>Contact</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {locations && locations.map((location: any, index: number) => (
                                <tr key={index} className="text-gray-400 text-[18px] font-serif">
                                    <td>{index + 1}</td>
                                    <td>{location.name}</td>
                                    <td>{location.address}</td>
                                    <td>{location.contact}</td>
                                    <td>
                                        <button className={`btn text-white font-normal mr-2 bg-blue-500 hover:bg-blue-900 ${isLoading && location.id == deletingRowId ?  'bg-gray-800 cursor-not-allowed' : null}`} onClick={()=>handleEdit(location.id)}><MdModeEdit size={22}/></button>
                                        <button className="btn text-white font-normal ml-2 bg-red-500 hover:bg-red-900" onClick={() => handleDeleteClick(location.id)}>{deletingRowId === location.id && isLoading  ? (
                        <span className="loading loading-spinner loading-sm"></span>
                      ) : (
                        <MdDelete size={21}/>
                      )}</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button
                        className="fixed bottom-5 right-5 bg-yellow-600 text-black font-mono text-[21px] px-6 py-4 rounded-full shadow-lg hover:bg-yellow-700 focus:outline-none"
                        onClick={toggleAddLocation}
                    >
                       <IoIosAddCircle size={30}/>
                    </button>
                </div>
            ) : (
                <span className="loading bg-gray-100 fixed top-1/2 left-1/2 loading-dots loading-lg"></span>
            )}
            {showAddLocation && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <AddLocations close={toggleAddLocation} refetch={refetch} />
                </div>
            )}

            {
                showEditLocation && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        
                        <EditLocation close={setShowEditLocation} values={locationEditing[0]} refetch={refetch} />
                    </div>
                )
            }
        </div>
    );
};

export default Locations;
