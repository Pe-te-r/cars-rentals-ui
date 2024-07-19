import { useState } from "react";
import InputDiv from "../../../../components/InputDiv";

const AddVehicleForm = ({ close, display }: any) => {
  const [carDetails, setCarDetails] = useState({
    rental: '',
    availability: true,
    manufacturer: '',
    model: '',
    year: '',
    fuel_type: '',
    engine_capacity: '',
    transmission_capacity: '',
    seating_capacity: '',
    color: '',
    features: ''
  });

  const handleChange = (key: string, value: string) => {
    console.log(`Changing ${key} to ${value}`);
    setCarDetails((prevDetails) => ({
      ...prevDetails,
      [key]: value,
    }));
  };

  console.log(carDetails.manufacturer);

  return (
    <div>
      {display ?  
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-700 p-8 rounded-lg shadow-lg relative">
            <h2 className="font-mono text-[20px] text-center">Add car details for booking</h2>
            <div>
                <InputDiv
                label="Manufacturer"
                placeholder="Car Manufacturer"
                type="text"
                setData={(value: string) => handleChange('manufacturer', value)}
                value={carDetails.manufacturer}
                />
            </div>
            <div>
                <InputDiv
                label="Model"
                placeholder="Car Model"
                type="text"
                setData={(value: string) => handleChange('model', value)}
                value={carDetails.model}
                />
            </div>
            <div>
                <InputDiv
                label="Year"
                placeholder="Car Year"
                type="number"
                setData={(value: string) => handleChange('year', value)}
                value={carDetails.year}
                />
            </div>
            <div>
                <InputDiv
                label="Fuel Type"
                placeholder="Fuel Type"
                type="text"
                setData={(value: string) => handleChange('fuel_type', value)}
                value={carDetails.fuel_type}
                />
            </div>
            <div>
                <InputDiv
                label="Engine Capacity"
                placeholder="Engine Capacity"
                type="number"
                setData={(value: string) => handleChange('engine_capacity', value)}
                value={carDetails.engine_capacity}
                />
            </div>
            <div>
                <InputDiv
                label="Transmission Capacity"
                placeholder="Transmission Capacity"
                type="number"
                setData={(value: string) => handleChange('transmission_capacity', value)}
                value={carDetails.transmission_capacity}
                />
            </div>
            <div>
                <InputDiv
                label="Seating Capacity"
                placeholder="Seating Capacity"
                type="number"
                setData={(value: string) => handleChange('seating_capacity', value)}
                value={carDetails.seating_capacity}
                />
            </div>
            <div>
                <InputDiv
                label="Color"
                placeholder="Color"
                type="text"
                setData={(value: string) => handleChange('color', value)}
                value={carDetails.color}
                />
            </div>
            <div>
                <InputDiv
                label="Features"
                placeholder="Features"
                type="text"
                setData={(value: string) => handleChange('features', value)}
                value={carDetails.features}
                />
            </div>


            <div className="flex justify-end mt-4">
              <button className="btn bg-blue-700 mr-2" onClick={() => close()}>Close</button>
              <button className="btn bg-blue-700">Submit</button>
            </div>
          </div>
        </div>
      : null}
    </div>
  );
};

export default AddVehicleForm;
