import { Link, useParams } from "react-router-dom";
import { useVehicleQuery } from "../../../../features/vehiclesSlice";
import { useEffect, useState } from "react";
import { getRandomImage } from "../../images";
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';



const VehiclesDetails = () => {
  const [vehicle,setVehicle]=useState<any>({})
  const [startDate, setStartDate] = useState(new Date());
  const { id } = useParams();
  const img=getRandomImage()
  const {data,refetch, isLoading,isSuccess}= useVehicleQuery({id:id,details:true},{pollingInterval:5000})
  
  const handleDateChange = (date: any) => {
    setStartDate(date);
    console.log(format(date, 'MMMM do, yyyy'));
  };

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
                <p>Location: <span className="text-gray-400">{vehicle.location.name}</span></p>
                  <p>Contact: <span className="text-gray-400">{vehicle.location.contact}</span></p>
                  <p>Engine Capacity <span className="text-gray-400">{vehicle.vehicleSpecification.engine_capacity}</span></p>
                  <p>Seating Capacity: <span className="text-gray-400">{vehicle.vehicleSpecification.seating_capacity}</span></p>
                  <p>transmission capacity <span className="text-gray-400">{vehicle.vehicleSpecification.transmission_capacity}</span></p>
                </div>
                <div className="carInfoDetailsContainer p-2 flex flex-col">
                <p>Year: <span className="text-gray-400">{vehicle.vehicleSpecification.year}</span></p>
                  <p>Fuel: <span className="text-gray-400">{vehicle.vehicleSpecification.fuel_type}</span></p>
                  <p>Color:<span className="text-gray-400"> {vehicle.vehicleSpecification.color}</span></p>
                  <p>Fuel: <span className="text-gray-400">{vehicle.vehicleSpecification.fuel_type}</span></p>
                  <p>Available: <span className="text-gray-400">{vehicle.availability.toString()}</span></p>
                </div>
              </div>
              <div className="w-1/3 p-1 rounded-md bg-gray-800 flex text-center justify-center ">
                <img src={img} className='block object-fit w-full'   alt="" />
              </div>

              
            </div>
              :<p>Vehicle details not available</p>}
            { vehicle.availability? 
                <div className=" bg-gray-800 flex-co flex justify-evenly mt-5 rounded-md p-4 text-[20px] text-gray-200">
                    <div>
                      {/* <p>Starting Date: {startDate? startDate: null} </p> */}
                      <div className="calendar-container p-4 bg-gray-800 rounded-lg shadow-lg">
      <DatePicker
        selected={startDate}
        onChange={handleDateChange}
        inline
        calendarClassName="custom-calendar bg-gray-900 text-white"
        dayClassName={() => 'custom-day hover:bg-yellow-500'}
        renderCustomHeader={({
          monthDate,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => (
          <div className="flex justify-between items-center mb-2">
            <button
              onClick={decreaseMonth}
              disabled={prevMonthButtonDisabled}
              className="px-2 py-1 bg-gray-700 text-white rounded-lg hover:bg-yellow-500"
            >
              {'<'}
            </button>
            <span className="text-lg">
              {monthDate.toLocaleString('default', { month: 'long' })}{' '}
              {monthDate.getFullYear()}
            </span>
            <button
              onClick={increaseMonth}
              disabled={nextMonthButtonDisabled}
              className="px-2 py-1 bg-gray-700 text-white rounded-lg hover:bg-yellow-500"
            >
              {'>'}
            </button>
          </div>
        )}
      />
    </div>
                    </div>

                    <p>Return Date:</p>
                </div>

                : <p className="text-[2.1rem] text-center mt-5 text-gray-300">Vehicle not available at the moment for booking</p>
            }
          </div>) : (null)       
          
        }
      </>
    )
}

export default VehiclesDetails
