import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import './TaskList.css';

const fetchTasks = async (date) => {
  const response = await fetch(`http://localhost:5000/tasks?date=${date}`);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

const TaskList = ({ selectedDate }) => {
  const [taskText, setTaskText] = useState('');
  const queryClient = useQueryClient();

  const { data: tasks, error: tasksError, isLoading: tasksLoading } = useQuery(
    ['tasks', selectedDate],
    () => fetchTasks(selectedDate),
    { enabled: !!selectedDate } // Only fetch if a date is selected
  );

  const addTaskMutation = useMutation(
    (newTask) => fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTask),
    }).then(res => res.json()),
    {
      onSuccess: () => queryClient.invalidateQueries(['tasks', selectedDate]),
    }
  );

  const toggleTaskCompletion = async (taskId) => {
    try {
      const task = tasks.find(task => task._id === taskId);
      const updatedTask = { ...task, completed: !task.completed };
      await fetch(`http://localhost:5000/tasks/${taskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTask),
      });
      queryClient.invalidateQueries(['tasks', selectedDate]);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await fetch(`http://localhost:5000/tasks/${taskId}`, {
        method: 'DELETE',
      });
      queryClient.invalidateQueries(['tasks', selectedDate]);
    } catch (error) {
      console.error('Error deleting task:', error);
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
        await addTaskMutation.mutateAsync(newTask);
        setTaskText('');
      } catch (error) {
        console.error('Error adding task:', error.message);
      }
    }
  };

  if (tasksLoading) return <div>Loading...</div>;
  if (tasksError) return <div>Error: {tasksError.message}</div>;

  return (
    <div className="task-list-container">
      <h1>Tasks for {selectedDate ? new Date(selectedDate).toLocaleDateString() : 'Select a Date'}</h1>
      <div className="task-input">
        <input
          type="text"
          value={taskText}
          onChange={handleInputChange}
          placeholder="Enter a new task..."
        />
        <button onClick={addTask}>Add Task</button>
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
