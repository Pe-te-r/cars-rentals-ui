import { useEffect, useState } from "react"
import { useGetAllLocationsQuery } from "../../../../features/LocationSlice"
import AddLocations from "./AddLocations"

const Locations = () => {
    const{data,isSuccess} =useGetAllLocationsQuery()
    const [locations ,setLocatins] = useState([])
    const [showAddLocation, setShowAddLocation] = useState(false);

    useEffect(()=>{
        if(isSuccess){
            setLocatins(data['results'])
        }
        console.log(data)
    },[data,isSuccess])

    const toggleAddLocation = () => {
        setShowAddLocation(!showAddLocation);
    };
    return (
        <div>
            {isSuccess ? 
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
              
              {
               locations && locations.map((location: any, index: number) => (
                                <tr key={index} className="text-gray-400 text-[18px] font-serif">
                                    <td>{index + 1}</td>
                                    <td>{location.name}</td>
                                    <td>{location.address}</td>
                                    <td>{location.contact}</td>
                                    <td >
                                        <button className="btn text-white font-normal mr-2 bg-blue-500 hover:bg-blue-900">Edit</button>
                                        <button className="btn text-white font-normal ml-2 bg-red-500 hover:bg-red-900">Delete</button>
                                    </td>
                                </tr>
                            ))}
              </tbody>
            </table>
            <button
                className="fixed bottom-5 right-5 bg-yellow-600 text-black font-mono text-[21px] px-6 py-4 rounded-full shadow-lg hover:bg-yellow-700 focus:outline-none"
                    onClick={toggleAddLocation}>
                    Add Location</button>
          </div>
            : <span className="loading bg-gray-100 fixed top-1/2 left-1/2 loading-dots loading-lg"></span>
}
    {
        showAddLocation && 
        (<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <AddLocations close={toggleAddLocation} />
    </div>)
    }
        </div>
    )
}

export default Locations
