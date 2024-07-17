import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';

const CalendarComponent = ({ startDate, setStartDate }: any) => {
  const handleDateChange = (date: any) => {
    setStartDate(date);
    console.log(format(date, 'MMMM do, yyyy'));
  };

  return (
    <div className="calendar-container p-4 bg-gray-800 rounded-lg shadow-lg text-white">
      <DatePicker
        selected={startDate}
        onChange={handleDateChange}
        inline
        calendarClassName="custom-calendar bg-gray-800 text-white"
        dayClassName={(date) =>
          date.getDate() === startDate.getDate() &&
          date.getMonth() === startDate.getMonth() &&
          date.getFullYear() === startDate.getFullYear()
            ? 'bg-blue-500 text-white'
            : 'hover:bg-yellow-500'
        }
        renderCustomHeader={({
          monthDate,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => (
          <div className="flex bg-gray-600 justify-between items-center mb-2 p-2 rounded-lg">
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
