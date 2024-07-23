import  { useEffect, useState } from 'react';
import { useParams, Link, Navigate, useNavigate } from 'react-router-dom';
import { eachDayOfInterval, format, parseISO,differenceInHours } from 'date-fns';
import { useDeleteVehicleMutations, useVehicleQuery } from '../../../../features/vehiclesSlice';
import CalendarComponent from '../../datesHandle/DatesShow';
import { getRandomImage } from '../../images';
import { useDetails } from '../../../../context/LocalStorageContext';
import { useAddBookingsMutation } from '../../../../features/bookingsSlice';
import { FaEdit } from "react-icons/fa";
import EditVehicle from './editVehicle';
import { MdDeleteForever } from "react-icons/md";
import { useToast } from '../../../../context/smallToast';



const VehiclesDetails = () => {
  const {user}= useDetails()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [vehicle, setVehicle] = useState<any>({});
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [bookingDays, setBookingDays] = useState<string[]>([]);
  const [bookedDays, setBookedDays] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isValidBooking, setIsValidBooking] = useState<boolean>(false);
  const [addBooking,{isLoading:bookingLoading}] = useAddBookingsMutation()
  const { id } = useParams();
  const navigator = useNavigate()
  const {addToast} = useToast()
  const { data, isLoading, isSuccess, refetch} = useVehicleQuery({ id: id, details: true }, { pollingInterval: 5000 });
  const [deleteVehicle,{data:deleteData,isLoading:deleteLoading,isSuccess:deleteSuccess}]=useDeleteVehicleMutations()

  useEffect(() => {
    if (isSuccess && data) {
      setVehicle(data['result']);
      setBookedDays(data.result.bookings)
    }
  }, [isSuccess, data]);
  const getDatesInRange = (start: any, end: any) => {
    try {
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

  let bookedDates: any=[]
  if(bookedDays){
    bookedDates = bookedDays.flatMap((day: any) => {
    try {
      const startDate = new Date(day.booking_date);
      const endDate = new Date(day.return_date);
  
      if (startDate.getTime() <= endDate.getTime()) {
        const datesInRange = [];
        for (let currentDate = startDate; currentDate <= endDate; currentDate.setDate(currentDate.getDate() + 1)) {
          datesInRange.push(new Date(currentDate).toISOString().slice(0, 10));
        }
        return datesInRange;
      } else {
        
        return [];
      }
    } catch (error) {
      return []; 
    }
  });
  }

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

  // validating selected days
  const validateBooking=()=>{
    if (!startDate ||!endDate) {
      setErrorMessage('Please select a start and end date.');
      setBookingDays([])
      return false;
    }
    const startISO = format(startDate, 'yyyy-MM-dd');
    const endISO = format(endDate, 'yyyy-MM-dd');
    
    if (calculateDifferenceInHours()<0) {
      setErrorMessage('Start date should be before end date.');
      setBookingDays([])
      return false;
    }
    if (calculateDifferenceInHours()=== 0) {
      setErrorMessage('Start date should be different from end date.');
      setBookingDays([])
      return false;
    }

    const bookingDatesRange = getDatesInRange(startISO, endISO)
    const existInBoth = bookingDatesRange.some(date => bookedDates.includes(date));
    if(existInBoth){
      setErrorMessage('Selected dates are already booked.');
      setBookingDays([])
      return false;
    }
    setErrorMessage(null);
    setIsValidBooking(true)
    setBookingDays(bookingDatesRange)
    return true;
  }
 

  useEffect(() => {
    validateBooking();

    
  }, [startDate, endDate]);

  const handleBooking = ()=>{
    if(!isValidBooking){
      return
    }

    const formatDateForDB = (date: any) => {
      return format(date, 'yyyy-MM-dd');
    };


  


    const bookingDetails = {
      user_id: user?.id,
      vehicle_id: id,
      location_id: vehicle.location.id,
      booking_date:formatDateForDB(startDate),
      return_date: formatDateForDB(endDate),
      totalAmount: calculateAmount(),
    }
    addBooking(bookingDetails)
  }


  const to = user?.role == 'admin' ? "/admin/vehicles" : "/dashboard/vehicles"


  const handleEditOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleEditCloseModal = () => {
    setIsModalOpen(false);
  };


  const handleNavigate=()=>{
    navigator('/admin/vehicles')

  }
  
  useEffect(()=>{
    if(deleteSuccess && deleteData.result == 'success'){
      addToast('deleted successfully','success')
      handleNavigate()
    }
    if(deleteData?.result === 'error'){
      addToast('Error while deleting','error')
    }
  },[deleteData,deleteSuccess])

  console.log('here')
  console.log(vehicle.vehicle_id)
  console.log('here')
  
  return (
    <div>
      {isLoading ? (
        <span className="fixed left-1/2 top-1/2 loading loading-spinner text-primary"></span>
      ) : isSuccess ? (
        <div className="bg-gray-800 p-5 ">
            <Link to={to} className="btn bg-blue-800 hover:bg-blue-900">Back</Link>
          {vehicle.vehicleSpecification ? (
            <>
            {user?.role === 'admin' &&
            <>
            
            <button onClick={handleEditOpenModal}
                className="fixed bottom-5 right-5 bg-yellow-600 text-black font-mono text-[21px] px-6 py-4 rounded-lg shadow-lg hover:bg-yellow-700 focus:outline-none"
                >
                  
                    <FaEdit size={30} className="text-grey-800"/></button>
                    <button onClick={()=>deleteVehicle({id})}
                    
                className="fixed bottom-20 mb-5 right-5 bg-yellow-600 text-black font-mono text-[21px] px-6 py-4 rounded-lg shadow-lg hover:bg-yellow-700 focus:outline-none"
                >
                  {deleteLoading ?<span className="loading loading-spinner loading-xs"></span> :
                    <MdDeleteForever size={30} className="text-grey-800"/>
                  }
                    </button>
                      </>}
              <h3 className="text-center text-white p-2 font-mono text-[28px] font-bold">
                {vehicle.vehicleSpecification.manufacturer} {vehicle.vehicleSpecification.model}
              </h3>
              <div className="carInfo  bg-gray-900 flex h-[500px]">
                <div className='carInfoDetails flex flex-col'>
                  <h2 className='text-center font-bold text-[20px]'>More Details</h2>
                <div className="flex w-full text-[1.5rem] h-full text-white rounded-md  bg-gray-800 font-mono bg-gray-900">
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
                </div>
                <div className="w-full lg:w-1/3 p-4 rounded-md flex justify-center items-center">
                  <img src={getRandomImage()} className='object-contain w-full' alt="Vehicle" />
                </div>
              </div>
              <div className="bg-gray-900 mt-5 p-4 text-[20px]">
                <h2 className='text-center mb-3 font-mono font-bold text-[20px]'>Booking Details</h2>
              <div className="bg-gray-800 flex-row flex justify-evenly  bg-gray-900  rounded-md text-gray-200">
                <div className="flex flex-col font-mono text-[21px]">
                  <p>Starting Date: {format(startDate, 'MMMM do, yyyy')}</p>
                  <CalendarComponent
                    selectedDate={startDate}
                    setSelectedDate={setStartDate}
                    disabledDates={bookedDates}
                    bookedDays={bookingDays}
                  />
                </div>
                <div className="flex flex-col font-mono text-[21px]">
                  <p>Return Date: {format(endDate, 'MMMM do, yyyy')}</p>
                  <CalendarComponent
                  selectedDate={endDate}
                  setSelectedDate={setEndDate}
                  bookedDays={bookingDays}
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
                          <button onClick={handleBooking} className="btn hover:bg-blue-900 bg-blue-800">{bookingLoading?<span className="loading loading-spinner loading-xs"></span>:'Book for a ride'}</button>
                        </div>
                      ) : null}
                    </>
                  )}
                </div>
              </div>
              </div>
            </>
          ) : (
            <p className="text-[2.1rem] text-center mt-5 text-gray-300">Vehicle details not available</p>
          )}
        </div>
      ) : null}
      <EditVehicle isOpen={isModalOpen} refetch={refetch} id={id} vehicle={vehicle} onClose={handleEditCloseModal}/>
    </div>
  );
};

export default VehiclesDetails;
