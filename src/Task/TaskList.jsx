import React, { useState, useEffect } from 'react';
import DateDropdown from './DateDropdown';
import './TaskList.css';

const TaskList = () => {
  const [taskText, setTaskText] = useState('');
  const [tasks, setTasks] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    fetchTasks();
  }, [selectedDate]);

  const fetchTasks = async () => {
    try {
      const response = await fetch(`http://localhost:5000/tasks?date=${selectedDate}`);
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleInputChange = (e) => setTaskText(e.target.value);

  const addTask = async () => {
    if (taskText.trim()) {
      const newTask = {
        text: taskText,
        completed: false,
        date: selectedDate,
      };

      try {
        const response = await fetch('http://localhost:5000/tasks', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newTask),
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
        }

        const data = await response.json();
        setTasks([...tasks, data]);
      } catch (error) {
        console.error('Error adding task:', error.message);
      }

      setTaskText('');
    }
  };

  const toggleTaskCompletion = async (taskId) => {
    try {
      const task = tasks.find(task => task._id === taskId);
      const updatedTask = { ...task, completed: !task.completed };
      await fetch(`http://localhost:5000/tasks/${taskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTask),
      });
      setTasks(tasks.map(task =>
        task._id === taskId ? updatedTask : task
      ));
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await fetch(`http://localhost:5000/tasks/${taskId}`, {
        method: 'DELETE',
      });
      setTasks(tasks.filter(task => task._id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="task-list-container">
      <h1>Interactive Task List</h1>
      <DateDropdown onDateChange={setSelectedDate} />
      <div className="task-input">
        <input
          type="text"
          value={taskText}
          onChange={handleInputChange}
          placeholder="Enter a new task..."
        />
        <button onClick={addTask}>Add Task</button>
        <button onClick={() => setTaskText('')}>Clear</button>
      </div>
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task._id} className={task.completed ? 'completed' : ''}>
            <span>{task.text}</span>
            <div className="task-controls">
              <button onClick={() => toggleTaskCompletion(task._id)}>
                {task.completed ? 'Undo' : 'Complete'}
              </button>
              <button onClick={() => deleteTask(task._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
