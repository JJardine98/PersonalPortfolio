import React from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import './TaskStyle.css';

const fetchDates = async () => {
  const response = await fetch('http://localhost:5000/dates');
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

const DateDropdown = ({ onDateChange }) => {
  const queryClient = useQueryClient();
  const { data: dates, error, isLoading } = useQuery('dates', fetchDates);

  const addDateMutation = useMutation(
    (newDate) => fetch('http://localhost:5000/dates', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ date: newDate }),
    }).then(res => res.json()),
    {
      onSuccess: () => queryClient.invalidateQueries('dates'),
    }
  );

  const deleteDateMutation = useMutation(
    (date) => fetch(`http://localhost:5000/dates/${date}`, {
      method: 'DELETE',
    }),
    {
      onSuccess: () => queryClient.invalidateQueries('dates'),
    }
  );

  const [selectedDate, setSelectedDate] = React.useState('');
  const [newDate, setNewDate] = React.useState('');

  React.useEffect(() => {
    if (dates && dates.length > 0) {
      setSelectedDate(dates[0].date); // Use the appropriate property
      onDateChange(dates[0].date); // Use the appropriate property
    }
  }, [dates, onDateChange]);

  React.useEffect(() => {
    if (selectedDate) onDateChange(selectedDate);
  }, [selectedDate, onDateChange]);

  const handleNewDateChange = (e) => setNewDate(e.target.value);

  const addDate = async () => {
    if (newDate.trim()) {
      try {
        await addDateMutation.mutateAsync(newDate);
        setNewDate('');
      } catch (error) {
        console.error('Error adding date:', error.message);
      }
    }
  };

  const handleDeleteDate = async () => {
    if (!selectedDate) return;

    try {
      await deleteDateMutation.mutateAsync(selectedDate);
      setSelectedDate('');
      onDateChange('');
    } catch (error) {
      console.error('Error deleting date:', error.message);
    }
  };

  const handleDateSelect = (e) => setSelectedDate(e.target.value);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="date-dropdown-container">
      <h3>Select a Date</h3>
      <select
        className="date-dropdown"
        value={selectedDate}
        onChange={handleDateSelect}
      >
        {dates.map((date) => (
          <option key={date._id} value={date.date}> {/* Use a unique identifier and appropriate property */}
            {date.date}
          </option>
        ))}
      </select>
      <div className="add-date-container">
        <h3>Add a Date</h3>
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
