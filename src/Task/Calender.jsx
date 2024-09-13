import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Calender.css'; // Make sure this is the correct path

const Calendar = ({ onDateChange }) => {
  const navigate = useNavigate();
  const [currentMonth, setCurrentMonth] = React.useState(new Date());

  // Calculate the number of days in the current month and the starting day of the month
  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const startDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();

  // Create an array of days in the month
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const handleDateClick = (day) => {
    // Format the selected date to match the expected format (e.g., YYYY-MM-DD)
    const selectedDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day).toISOString().split('T')[0];
    if (onDateChange) onDateChange(selectedDate); // Call onDateChange if defined
    navigate(`/tasks?date=${selectedDate}`); // Use query parameter for date
  };

  const handlePreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const monthYear = `${currentMonth.toLocaleString('default', { month: 'long' })} ${currentMonth.getFullYear()}`;

  return (
    <div className="calendar-container">
      <button onClick={handlePreviousMonth}>Previous</button>
      <span>{monthYear}</span>
      <button onClick={handleNextMonth}>Next</button>
      <div className="calendar-grid">
        {[...Array(startDay).fill(null), ...days].map((day, index) => (
          <div
            key={index}
            className={`calendar-day ${!day ? 'disabled' : ''}`}
            onClick={() => day && handleDateClick(day)}
          >
            {day || ''}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
