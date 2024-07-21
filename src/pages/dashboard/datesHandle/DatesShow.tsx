// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import { format } from 'date-fns';

// const CalendarComponent = ({ startDate, setStartDate }: any) => {
//   const handleDateChange = (date: any) => {
//     setStartDate(date);
//     console.log(format(date, 'MMMM do, yyyy'));
//   };

//   return (
//     <div className="calendar-container p-4 bg-gray-800 rounded-lg shadow-lg text-white">
//       <DatePicker
//         selected={startDate}
//         onChange={handleDateChange}
//         inline
//         calendarClassName="custom-calendar bg-gray-800 text-white"
//         dayClassName={(date) =>
//           date.getDate() === startDate.getDate() &&
//           date.getMonth() === startDate.getMonth() &&
//           date.getFullYear() === startDate.getFullYear()
//             ? 'bg-blue-500 text-white'
//             : 'hover:bg-yellow-500'
//         }
//         renderCustomHeader={({
//           monthDate,
//           decreaseMonth,
//           increaseMonth,
//           prevMonthButtonDisabled,
//           nextMonthButtonDisabled,
//         }) => (
//           <div className="flex bg-gray-600 justify-between items-center mb-2 p-2 rounded-lg">
//             <button
//               onClick={decreaseMonth}
//               disabled={prevMonthButtonDisabled}
//               className="px-2 py-1 bg-gray-600 text-white rounded-lg hover:bg-yellow-500"
//             >
//               {'<'}
//             </button>
//             <span className="text-lg text-white">
//               {monthDate.toLocaleString('default', { month: 'long' })}{' '}
//               {monthDate.getFullYear()}
//             </span>
//             <button
//               onClick={increaseMonth}
//               disabled={nextMonthButtonDisabled}
//               className="px-2 py-1 bg-gray-600 text-white rounded-lg hover:bg-yellow-500"
//             >
//               {'>'}
//             </button>
//           </div>
//         )}
//       />
//     </div>
//   );
// };

// export default CalendarComponent;



// import React from 'react';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import { format } from 'date-fns';

// const CalendarComponent = ({ startDate, setStartDate }: any) => {
//   const handleDateChange = (date: any) => {
//     setStartDate(date);
//     console.log(format(date, 'MMMM do, yyyy'));
//   };

//   const today = new Date();

//   return (
//     <div className="calendar-container p-4 bg-gray-800 rounded-lg shadow-lg text-white">
//       <DatePicker
//         selected={startDate}
//         onChange={handleDateChange}
//         inline
//         minDate={today}
//         calendarClassName="custom-calendar bg-gray-800 text-white"
//         dayClassName={(date) =>
//           date.getDate() === startDate.getDate() &&
//           date.getMonth() === startDate.getMonth() &&
//           date.getFullYear() === startDate.getFullYear()
//             ? 'bg-blue-500 text-white'
//             : 'hover:bg-yellow-500'
//         }
//         renderCustomHeader={({
//           monthDate,
//           decreaseMonth,
//           increaseMonth,
//           prevMonthButtonDisabled,
//           nextMonthButtonDisabled,
//         }) => (
//           <div className="flex bg-gray-700 justify-between items-center mb-2 p-2 rounded-lg">
//             <button
//               onClick={decreaseMonth}
//               disabled={prevMonthButtonDisabled}
//               className="px-2 py-1 bg-gray-600 text-white rounded-lg hover:bg-yellow-500"
//             >
//               {'<'}
//             </button>
//             <span className="text-lg text-white">
//               {monthDate.toLocaleString('default', { month: 'long' })}{' '}
//               {monthDate.getFullYear()}
//             </span>
//             <button
//               onClick={increaseMonth}
//               disabled={nextMonthButtonDisabled}
//               className="px-2 py-1 bg-gray-600 text-white rounded-lg hover:bg-yellow-500"
//             >
//               {'>'}
//             </button>
//           </div>
//         )}
//       />
//     </div>
//   );
// };

// export default CalendarComponent;

import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';

interface CalendarComponentProps {
  startDate: any | null;
  endDate: any | null;
  setStartDate: React.Dispatch<React.SetStateAction<any | null>>;
  setEndDate: React.Dispatch<React.SetStateAction<any | null>>;
  bookedDates: string[];
  bookedDateRanges: { start: string; end: string }[];
}

const CalendarComponent: React.FC<CalendarComponentProps> = ({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  bookedDates,
  bookedDateRanges,
}) => {
  const today = new Date();

  // Check if a given date is booked
  const isDateBooked = (date: Date) => {
    const formattedDate = format(date, 'yyyy-MM-dd');
    return bookedDates.includes(formattedDate) || 
      bookedDateRanges.some(range => 
        date >= new Date(range.start) && date <= new Date(range.end)
      );
  };

  // Check if a date is in the past
  const isPastDate = (date: Date) => {
    return date < today;
  };

  // Handle start date change
  const handleStartDateChange = (date: Date | null) => {
    if (date && (!endDate || date <= endDate)) {
      setStartDate(date);
    }
  };

  // Handle end date change
  const handleEndDateChange = (date: Date | null) => {
    if (date && (!startDate || date >= startDate)) {
      setEndDate(date);
    }
  };

  return (
    <div className="calendar-container p-4 bg-gray-800 rounded-lg shadow-lg text-white">
      <DatePicker
        selected={startDate}
        onChange={handleStartDateChange}
        inline
        minDate={today}
        maxDate={endDate}
        calendarClassName="custom-calendar"
        dayClassName={(date) => {
          if (isDateBooked(date)) return 'bg-red-600 text-white';
          if (isPastDate(date)) return 'bg-black text-white';
          return 'bg-gray-500 text-white';
        }}
        renderCustomHeader={({
          monthDate,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => (
          <div className="flex bg-gray-700 justify-between items-center mb-2 p-2 rounded-lg">
            <button
              onClick={decreaseMonth}
              disabled={prevMonthButtonDisabled}
              className="px-2 py-1 bg-gray-600 text-white rounded-lg hover:bg-yellow-500"
            >
              {'<'}
            </button>
            <span className="text-lg text-white">
              {monthDate.toLocaleString('default', { month: 'long' })}{' '}
              {monthDate.getFullYear()}
            </span>
            <button
              onClick={increaseMonth}
              disabled={nextMonthButtonDisabled}
              className="px-2 py-1 bg-gray-600 text-white rounded-lg hover:bg-yellow-500"
            >
              {'>'}
            </button>
          </div>
        )}
      />

      <DatePicker
        selected={endDate}
        onChange={handleEndDateChange}
        inline
        minDate={startDate || today}
        calendarClassName="custom-calendar"
        dayClassName={(date) => {
          if (isDateBooked(date)) return 'bg-red-600 text-white';
          if (isPastDate(date)) return 'bg-black text-white';
          return 'bg-gray-500 text-white';
        }}
        renderCustomHeader={({
          monthDate,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => (
          <div className="flex bg-gray-700 justify-between items-center mb-2 p-2 rounded-lg">
            <button
              onClick={decreaseMonth}
              disabled={prevMonthButtonDisabled}
              className="px-2 py-1 bg-gray-600 text-white rounded-lg hover:bg-yellow-500"
            >
              {'<'}
            </button>
            <span className="text-lg text-white">
              {monthDate.toLocaleString('default', { month: 'long' })}{' '}
              {monthDate.getFullYear()}
            </span>
            <button
              onClick={increaseMonth}
              disabled={nextMonthButtonDisabled}
              className="px-2 py-1 bg-gray-600 text-white rounded-lg hover:bg-yellow-500"
            >
              {'>'}
            </button>
          </div>
        )}
      />
    </div>
  );
};

export default CalendarComponent;
