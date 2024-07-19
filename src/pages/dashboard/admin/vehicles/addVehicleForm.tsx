import { useEffect, useState } from "react";
import InputDiv from "../../../../components/InputDiv";
import CustomDropdown from "../../../../components/CustomDropDown";
import { useGetAllLocationsQuery } from "../../../../features/LocationSlice";
import { useAuth } from "../../../../context/authContext";

const AddVehicleForm = ({ close, display }: any) => {
  const {data,isSuccess} =useGetAllLocationsQuery()
  const [locationsNames,setLocatins]=useState([])
  const{ setResponseToast }=useAuth()
const initialCarDetails={

    rental: null,
    availability: "true",
    manufacturer: '',
    model: '',
    year: '',
    fuel_type: '',
    engine_capacity: '',
    transmission_capacity: '',
    seating_capacity: '',
    color: '',
    features: '',
    location: 'All',

}
  useEffect(()=>{
    
    function createObject(key:string, value: string) {
      return { label:[key], value:value };
    }


    if(isSuccess){
      const locationsInfo = data['results']
      const locationsName = locationsInfo.map((location: any)=> location.name)
      const locations = locationsName.map((location: any) =>createObject(location,location)   );
      setLocatins(locations)
      }
      
      },[isSuccess,data])
  const [carDetails, setCarDetails] = useState(initialCarDetails);


  const handleChange = (key: string, value: string) => {
    console.log(`Changing ${key} to ${value}`);
    setCarDetails((prevDetails) => ({
      ...prevDetails,
    [key]: typeof value === 'boolean' ? value : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); 
    if(carDetails.location === 'All'){
      setResponseToast({ message: `Location cannot be all`, type: '' });
    }else{
      close()
      console.log("User Details:", carDetails);
      setCarDetails(initialCarDetails)
    }
    
  };


  console.log(carDetails)

  return (
    <div>
      {display ?  
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <form className="bg-gray-900 p-8 rounded-lg shadow-lg relative" onSubmit={handleSubmit}>
            <h2 className="font-mono text-[20px] text-center mb-4">Add Car Details for Booking</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className='m-3 p-2 font-mono rounded-md'>
                <InputDiv
                  label="Rental Price"
                  placeholder="Rental Price"
                  type="number"
                  setData={(value: string) => handleChange('rental', value)}
                  value={carDetails.rental}
                />
              </div>
              <div className='m-3 p-2 font-mono rounded-md'>
                <InputDiv
                  label="Manufacturer"
                  placeholder="Car Manufacturer"
                  type="text"
                  setData={(value: string) => handleChange('manufacturer', value)}
                  value={carDetails.manufacturer}
                />
              </div>
              <div className='m-3 p-2 font-mono rounded-md'>
                <InputDiv
                  label="Model"
                  placeholder="Car Model"
                  type="text"
                  setData={(value: string) => handleChange('model', value)}
                  value={carDetails.model}
                />
              </div>
              <div className='m-3 p-2 font-mono rounded-md'>
                <InputDiv
                  label="Year"
                  placeholder="Car Year"
                  type="number"
                  setData={(value: string) => handleChange('year', value)}
                  value={carDetails.year}
                />
              </div>
              <div className='m-3 p-2 font-mono rounded-md'>
                <InputDiv
                  label="Fuel Type"
                  placeholder="Fuel Type"
                  type="text"
                  setData={(value: string) => handleChange('fuel_type', value)}
                  value={carDetails.fuel_type}
                />
              </div>
              <div className='m-3 p-2 font-mono rounded-md'>
                <InputDiv
                  label="Engine Capacity"
                  placeholder="Engine Capacity"
                  type="number"
                  setData={(value: string) => handleChange('engine_capacity', value)}
                  value={carDetails.engine_capacity}
                />
              </div>
              <div className='m-3 p-2 font-mono rounded-md'>
                <InputDiv
                  label="Transmission Capacity"
                  placeholder="Transmission Capacity"
                  type="number"
                  setData={(value: string) => handleChange('transmission_capacity', value)}
                  value={carDetails.transmission_capacity}
                />
              </div>
              <div className='m-3 p-2 font-mono rounded-md'>
                <InputDiv
                  label="Seating Capacity"
                  placeholder="Seating Capacity"
                  type="number"
                  setData={(value: string) => handleChange('seating_capacity', value)}
                  value={carDetails.seating_capacity}
                />
              </div>
              <div className='m-3 p-2 font-mono rounded-md'>
                <InputDiv
                  label="Color"
                  placeholder="Color"
                  type="text"
                  setData={(value: string) => handleChange('color', value)}
                  value={carDetails.color}
                />
              </div>
              <div className='m-3 p-2 font-mono rounded-md'>
                <InputDiv
                  label="Features"
                  placeholder="Features"
                  type="text"
                  required={false}
                  setData={(value: string) => handleChange('features', value)}
                  value={carDetails.features}
                />
              </div>
            <div className="m-3 p-2 font-mono rounded-md">
                <label className="block mb-1 text-white">Locations</label>
                <CustomDropdown
                  value={carDetails.location}
                  onChange={(value: any) => handleChange('location', value)}
                  options={locationsNames}
                />
            </div>
            <div className="m-3 p-2 font-mono rounded-md">
                <label className="block mb-1 text-white">Availability</label>
                <CustomDropdown
                  value={carDetails.availability}
                  onChange={(value: any) => handleChange('availability', value)}
                  options={[
                    { label: 'True', value: 'true' },
                    { label: 'False', value: 'false' },
                  ]}
                />
            </div>


            </div>
            <div className="flex justify-end gap-4">
              <button className="btn bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-900" onClick={() => close()}>Close</button>
              <button className="btn bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-900" type="submit" >Submit</button>
            </div>
          </form>
        </div>
      : null}
    </div>
  );
};

export default AddVehicleForm;
