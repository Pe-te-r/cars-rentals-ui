
import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {  format } from 'date-fns';

interface CalendarComponentProps {
  selectedDate: any | null;
  setSelectedDate: React.Dispatch<React.SetStateAction<any | null>>;
  disabledDates: string[];
  bookedDays?: string[];
}

const CalendarComponent: React.FC<CalendarComponentProps> = ({
  selectedDate,
  setSelectedDate,
  disabledDates,
  bookedDays
}) => {
  const today = new Date();

  // Check if a given date is disabled
  const isDateDisabled = (date: Date) => {
    const formattedDate = format(date, 'yyyy-MM-dd');
    return disabledDates.includes(formattedDate);
  };

  // Check if a given date is in the past
  const isPastDate = (date: Date) => {
    return date < today;
  };

  // check if a given date is in booking range
  const isBookingDays = (date: Date)=>{
    return bookedDays && bookedDays.includes(format(date, 'yyyy-MM-dd'));
  }

  // Handle date change
  const handleDateChange = (date: Date | null) => {
    if (date && !isDateDisabled(date) && !isPastDate(date)) {
      setSelectedDate(date);
    }
  };

  return (
    <div className="calendar-container p-4 bg-gray-900 rounded-lg shadow-lg text-white">
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        inline
        minDate={today}
        calendarClassName="custom-calendar bg-gray-900"
        dayClassName={(date) => {
          if (isPastDate(date)) return 'bg-gray-800 text-gray-500';
          if (isDateDisabled(date)) return 'bg-red-500 text-white';
          if (selectedDate && format(date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')) return 'bg-blue-500 text-white';
          if(isBookingDays(date)) return 'bg-blue-500 text-white';
          return 'bg-gray-600 text-white hover:bg-yellow-500';
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
