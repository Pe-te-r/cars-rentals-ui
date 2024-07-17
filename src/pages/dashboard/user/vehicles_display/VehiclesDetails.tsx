import { Link, useParams } from "react-router-dom";
import { useVehicleQuery } from "../../../../features/vehiclesSlice";
import { useEffect, useState } from "react";
import { getRandomImage } from "../../images";
import { format,differenceInHours } from 'date-fns';

import CalendarComponent from "../../datesHandle/DatesShow";



const VehiclesDetails = () => {
  const [vehicle,setVehicle]=useState<any>({})
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const { id } = useParams();
  const img=getRandomImage()
  const {data, isLoading,isSuccess}= useVehicleQuery({id:id,details:true},{pollingInterval:5000})
  
  const calculateDifferenceInHours = () => {
    if (startDate && endDate) {
      const diffHours = differenceInHours(endDate, startDate);
      console.log(`Difference in hours: ${diffHours}`);
      return diffHours;
    }
    return null;
  };

  const calculateAmount=()=>{
    const hrs = calculateDifferenceInHours()
    const rate = vehicle.rental_rate
    return Number(hrs)* parseFloat(rate)
  }

  useEffect(() => {
    if (isSuccess && data) {
        setVehicle(data['result']);
        console.log(data['result']);
    }
  }, [isSuccess, data]);

    return (
      <>
        {isLoading ? <span className="fixed left-1/2 top-1/2 loading loading-spinner text-primary"></span>: 
          isSuccess ? (<div className="bg-gray-600 p-5 h-screen">
            <Link to='/admin/vehicles' className="btn">back</Link>
            {vehicle.vehicleSpecification?
              <h3 className="text-center text-white p-2 font-mono text-[28px] font-bold">{vehicle.vehicleSpecification.manufacturer}{' '}{vehicle.vehicleSpecification.model}</h3>
               : null} 
              
              {vehicle.vehicleSpecification? 
            <div className="carInfo flex h-[500px]">
              <div className="carInfoDetails flex text-[1.5rem] text-white rounded-md flex-row bg-gray-800 font-mono w-2/3">
                <div className="carInfoDetailsContainer p-4 flex flex-col">
                  <p>Available: <span className="text-gray-400">{vehicle.availability.toString()}</span></p>
                <p>Location: <span className="text-gray-400">{vehicle.location.name}</span></p>
                <p>Rental Rate: <span className="text-gray-400">{vehicle.rental_rate}/hr</span></p>
                  <p>Seating Capacity: <span className="text-gray-400">{vehicle.vehicleSpecification.seating_capacity}</span></p>
                  <p>transmission capacity <span className="text-gray-400">{vehicle.vehicleSpecification.transmission_capacity}</span></p>
                </div>
                <div className="carInfoDetailsContainer p-2 flex flex-col">
                <p>Year: <span className="text-gray-400">{vehicle.vehicleSpecification.year}</span></p>
                  <p>Color:<span className="text-gray-400"> {vehicle.vehicleSpecification.color}</span></p>
                  <p>Engine Capacity <span className="text-gray-400">{vehicle.vehicleSpecification.engine_capacity}</span></p>
                  <p>Contact: <span className="text-gray-400">{vehicle.location.contact}</span></p>
                  <p>Fuel: <span className="text-gray-400">{vehicle.vehicleSpecification.fuel_type}</span></p>
                </div>
              </div>
              <div className="w-1/3 p-1 rounded-md bg-gray-800 flex text-center justify-center ">
                <img src={img} className='block object-fit w-full'   alt="" />
              </div>

              
            </div>
              :<p>Vehicle details not available</p>}
            { vehicle.availability? 
                <div className=" bg-gray-800 flex-row flex justify-evenly mt-5 rounded-md p-4 text-[20px] text-gray-200">
                    <div className="">
                      <p>Starting Date: {format(startDate,'MMMM do, yyyy')} </p>
                      <CalendarComponent startDate={startDate} setStartDate={setStartDate}/>
                    </div>
                    <div>
                      <p>Return Date: {format(endDate,'MMMM do, yyyy')} </p>
                      <CalendarComponent startDate={endDate} setStartDate={setEndDate}/>
                    </div>
                    <div className="flex flex-col justify-evenly font-mono text-[1.6rem]">
                      <p>Hours of Ride: <span className="font-normal">{calculateDifferenceInHours()}hrs </span></p>
                      <p>Amount: Kes <span className="font-normal">{calculateAmount()}</span></p>
                    </div>
                </div>

                : <p className="text-[2.1rem] text-center mt-5 text-gray-300">Vehicle not available at the moment for booking</p>
            }
          </div>) : (null)       
          
        }
      </>
    )
}

export default VehiclesDetails
