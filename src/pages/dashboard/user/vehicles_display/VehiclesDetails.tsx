import  { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { eachDayOfInterval, format, parseISO,differenceInHours } from 'date-fns';
import { useVehicleQuery } from '../../../../features/vehiclesSlice';
import CalendarComponent from '../../datesHandle/DatesShow';
import { getRandomImage } from '../../images';
import { useDetails } from '../../../../context/LocalStorageContext';

const VehiclesDetails = () => {
  const {user}= useDetails()
  const [vehicle, setVehicle] = useState<any>({});
  const [startDate, setStartDate] = useState('2024-07-23');
  const [endDate, setEndDate] = useState('2024-07-23');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isValidBooking, setIsValidBooking] = useState<boolean>(false);
  const { id } = useParams();

  const { data, isLoading, isSuccess } = useVehicleQuery({ id: id, details: true }, { pollingInterval: 5000 });

  useEffect(() => {
    if (isSuccess && data) {
      setVehicle(data['result']);
    }
  }, [isSuccess, data]);

  // const bookedDates = [
  //   '2024-07-30',
  //   '2024-07-31',
  //   // Add more dates as needed
  // ];

  // const bookedDateRanges = [
  //   { start: '2024-07-25', end: '2024-07-30' },
  //   { start: '2024-08-05', end: '2024-08-10' },
  // ];

  const getDatesInRange = (start: any, end: any) => {
    try {
      // Ensure that start and end are valid ISO date strings
      if (typeof start !== 'string' || typeof end !== 'string') {
        throw new Error("Start and end dates must be ISO date strings.");
      }
  
      const startDate = parseISO(start);
      const endDate = parseISO(end);

      return eachDayOfInterval({ start: startDate, end: endDate }).map(date =>
        format(date, 'yyyy-MM-dd')
      );
    } catch (error: any) {
      console.error("Error in getDatesInRange:", error.message);
      return [];
    }
  };
  const bookedDates=getDatesInRange('2024-07-25','2024-07-30' )

  const calculateDifferenceInHours = () => {
    if (startDate && endDate) {
      return differenceInHours(endDate, startDate);
    }
    return 0;
  };

  const calculateAmount = () => {
    const hrs = calculateDifferenceInHours();
    if (hrs === null) return 0;
    return Math.max(hrs, 0) * parseFloat(vehicle.rental_rate || '0');
  };
  const validateBooking=()=>{
    if (!startDate ||!endDate) {
      setErrorMessage('Please select a start and end date.');
      return false;
    }
    const startISO = format(startDate, 'yyyy-MM-dd');
    const endISO = format(endDate, 'yyyy-MM-dd');
    
    if (calculateDifferenceInHours()<0) {
      setErrorMessage('Start date should be before end date.');
      return false;
    }
    if (calculateDifferenceInHours()=== 0) {
      setErrorMessage('Start date should be different from end date.');
      return false;
    }

    const bookingDatesRange = getDatesInRange(startISO, endISO)
    const existInBoth = bookingDatesRange.some(date => bookedDates.includes(date));
    console.log('Found dates')
    console.log(existInBoth)
    if(existInBoth){
      setErrorMessage('Selected dates are already booked.');
      return false;
    }


    setErrorMessage(null);
    setIsValidBooking(true)
    return true;
  }
 

  useEffect(() => {
    validateBooking();
  }, [startDate, endDate]);

  const to = user?.role == 'admin' ? "/admin/vehicles" : "/dashboard/vehicles"

  return (
    <div>
      {isLoading ? (
        <span className="fixed left-1/2 top-1/2 loading loading-spinner text-primary"></span>
      ) : isSuccess ? (
        <div className="bg-gray-800 p-5 ">
          {/* {
            user?.role === 'admin'?
            <Link to="/admin/vehicles" className="btn">Back</Link>
            :
            } */}

            <Link to={to} className="btn bg-blue-800 hover:bg-blue-900">Back</Link>
          {vehicle.vehicleSpecification ? (
            <>
              <h3 className="text-center text-white p-2 font-mono text-[28px] font-bold">
                {vehicle.vehicleSpecification.manufacturer} {vehicle.vehicleSpecification.model}
              </h3>
              <div className="carInfo flex h-[500px]">
                <div className="carInfoDetails flex text-[1.5rem] text-white rounded-md flex-row bg-gray-800 font-mono w-2/3">
                  <div className="carInfoDetailsContainer p-4 flex flex-col">
                    <p>Available: <span className="text-gray-400">{vehicle.availability.toString()}</span></p>
                    <p>Location: <span className="text-gray-400">{vehicle.location.name}</span></p>
                    <p>Rental Rate: <span className="text-gray-400">{vehicle.rental_rate}/hr</span></p>
                    <p>Seating Capacity: <span className="text-gray-400">{vehicle.vehicleSpecification.seating_capacity}</span></p>
                    <p>Transmission Capacity: <span className="text-gray-400">{vehicle.vehicleSpecification.transmission_capacity}</span></p>
                  </div>
                  <div className="carInfoDetailsContainer p-2 flex flex-col">
                    <p>Year: <span className="text-gray-400">{vehicle.vehicleSpecification.year}</span></p>
                    <p>Color: <span className="text-gray-400">{vehicle.vehicleSpecification.color}</span></p>
                    <p>Engine Capacity: <span className="text-gray-400">{vehicle.vehicleSpecification.engine_capacity}</span></p>
                    <p>Contact: <span className="text-gray-400">{vehicle.location.contact}</span></p>
                    <p>Fuel: <span className="text-gray-400">{vehicle.vehicleSpecification.fuel_type}</span></p>
                  </div>
                </div>
                <div className="w-1/3 p-1 rounded-md bg-gray-800 flex text-center justify-center">
                  <img src={getRandomImage()} className='block object-fit w-full' alt="" />
                </div>
              </div>
              <div className="bg-gray-800 flex-row flex justify-evenly mt-5 rounded-md p-4 text-[20px] text-gray-200">
                <div className="flex flex-col font-mono text-[21px]">
                  <p>Starting Date: {format(startDate, 'MMMM do, yyyy')}</p>
                  <CalendarComponent
                    selectedDate={startDate}
                    setSelectedDate={setStartDate}
                    disabledDates={bookedDates}
                  />
                </div>
                <div className="flex flex-col font-mono text-[21px]">
                  <p>Return Date: {format(endDate, 'MMMM do, yyyy')}</p>
                  <CalendarComponent
                  selectedDate={endDate}
                  setSelectedDate={setEndDate}
                  disabledDates={bookedDates}
                  />
                </div>
                <div className="flex flex-col justify-evenly font-mono text-[1.6rem]">
                  {errorMessage ? (
                    <p className="text-red-500">{errorMessage}</p>
                  ) : (
                    <>
                      <p>Hours of Ride: <span className="font-normal">{calculateDifferenceInHours()} hrs</span></p>
                      <p>Amount: Kes <span className="font-normal">{calculateAmount()}</span></p>
                      {isValidBooking && calculateDifferenceInHours() > 0 ? (
                        <div className="btn-container flex">
                          <button className="btn hover:bg-blue-900 bg-blue-800">Book for a ride</button>
                        </div>
                      ) : null}
                    </>
                  )}
                </div>
              </div>
            </>
          ) : (
            <p className="text-[2.1rem] text-center mt-5 text-gray-300">Vehicle details not available</p>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default VehiclesDetails;
