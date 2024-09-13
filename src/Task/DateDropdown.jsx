import React, { useState, useEffect } from 'react';
//Import DateDropdown.css
import './DateDropdown.css';

const DateDropdown = ({ onDateChange }) => {
  const [dates, setDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [newDate, setNewDate] = useState('');

  // Fetch dates when the component mounts
  useEffect(() => {
    const fetchDates = async () => {
      try {
        const response = await fetch('http://localhost:5000/dates');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Fetched dates:', data);
      } catch (error) {
        console.error('Error fetching dates:', error);
      }
    };
    

    fetchDates();
  }, []);

  // Notify parent component of date change
  useEffect(() => {
    if (selectedDate) onDateChange(selectedDate);
  }, [selectedDate, onDateChange]);

  // Handle new date input change
  const handleNewDateChange = (e) => setNewDate(e.target.value);

  // Add a new date
  const addDate = async () => {
    if (newDate.trim()) {
      try {
        const response = await fetch('http://localhost:5000/dates', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ date: newDate }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
        }

        const addedDate = await response.json();
        setDates([...dates, addedDate.date]); // Update the dropdown with the new date
        setNewDate(''); // Clear the input field
        if (dates.length === 0) setSelectedDate(addedDate.date); // Set new date as selected if it's the first date
      } catch (error) {
        console.error('Error adding date:', error.message);
      }
    }
  };

  const handleDeleteDate = async () => {
    if (!selectedDate) return;

    try {
      const response = await fetch(`http://localhost:5000/dates/${selectedDate}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete date');

      // Update the dates list after deletion
      setDates((prevDates) => prevDates.filter((date) => date !== selectedDate));
      
      // Set the selected date to the next available date or clear it
      if (dates.length > 1) {
        setSelectedDate(dates[1]);
      } else {
        setSelectedDate('');
        onDateChange(''); // Notify parent of the change
      }
    } catch (error) {
      console.error('Error deleting date:', error);
    }
  };


  // Handle date selection
  const handleDateSelect = (e) => setSelectedDate(e.target.value);

  return (
    <div className="date-dropdown-container">
      <select
        value={selectedDate}
        onChange={handleDateSelect}
      >
        {dates.map((date) => (
          <option key={date} value={date}>
            {date}
          </option>
        ))}
      </select>
      <div className="add-date-container">
        <input
          type="date"
          value={newDate}
          onChange={handleNewDateChange}
          placeholder="Enter new date"
        />
        <button onClick={addDate}>Add Date</button>
      </div>
      <button onClick={handleDeleteDate} disabled={!selectedDate}>
        Delete Date
      </button>
    </div>
    
  );
};

export default DateDropdown;
