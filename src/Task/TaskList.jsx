import React from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import DateDropdown from './DateDropdown';
import './TaskStyle.css';

const fetchTasks = async (date) => {
  const response = await fetch(`http://localhost:5000/tasks?date=${date}`);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

const TaskList = () => {
  const [taskText, setTaskText] = React.useState('');
  const [dueDate, setDueDate] = React.useState(''); // New state for due date
  const [selectedDate, setSelectedDate] = React.useState(new Date().toISOString().split('T')[0]);
  const [editingTaskId, setEditingTaskId] = React.useState(null);
  const [editTaskText, setEditTaskText] = React.useState('');
  const [editDueDate, setEditDueDate] = React.useState('');

  const queryClient = useQueryClient();

  const { data: tasks = [], error: tasksError, isLoading: tasksLoading } = useQuery(['tasks', selectedDate], () => fetchTasks(selectedDate));

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

  const updateTaskMutation = useMutation(
    (updatedTask) => fetch(`http://localhost:5000/tasks/${updatedTask._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedTask),
    }).then(res => res.json()),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['tasks', selectedDate]);
        setEditingTaskId(null);
      },
    }
  );

  const handleInputChange = (e) => setTaskText(e.target.value);

  const addTask = async () => {
    if (taskText.trim()) {
      const newTask = {
        text: taskText,
        completed: false,
        inProgress: false,
        date: selectedDate,
        dueDate: dueDate, // Add due date here
      };

      try {
        await addTaskMutation.mutateAsync(newTask);
        setTaskText('');
        setDueDate(''); // Clear due date after adding
      } catch (error) {
        console.error('Error adding task:', error.message);
      }
    }
  };

  const toggleTaskInProgress = async (taskId) => {
    try {
      const task = tasks.find(task => task._id === taskId);
      const updatedTask = { ...task, inProgress: !task.inProgress };
      await updateTaskMutation.mutateAsync(updatedTask);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const toggleTaskCompletion = async (taskId) => {
    try {
      const task = tasks.find(task => task._id === taskId);
      const updatedTask = { ...task, completed: !task.completed };
      await updateTaskMutation.mutateAsync(updatedTask);
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

  const startEditing = (task) => {
    setEditingTaskId(task._id);
    setEditTaskText(task.text);
    setEditDueDate(task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '');
  };

  const handleEditSave = async () => {
    if (editTaskText.trim()) {
      const updatedTask = {
        _id: editingTaskId,
        text: editTaskText,
        completed: false, // Or maintain existing state
        inProgress: false, // Or maintain existing state
        date: selectedDate,
        dueDate: editDueDate,
      };

      try {
        await updateTaskMutation.mutateAsync(updatedTask);
      } catch (error) {
        console.error('Error updating task:', error.message);
      }
    }
  };

  const handleEditCancel = () => {
    setEditingTaskId(null);
  };

  const todoTasks = tasks.filter(task => !task.completed && !task.inProgress);
  const inProgressTasks = tasks.filter(task => task.inProgress && !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  if (tasksLoading) return <div>Loading...</div>;
  if (tasksError) return <div>Error: {tasksError.message}</div>;

  return (
    <div className="task-list-container">
      <DateDropdown onDateChange={setSelectedDate} />
      <div className="task-input">
        <input
          type="text"
          value={taskText}
          onChange={handleInputChange}
          placeholder="Enter a new task..."
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <button onClick={addTask}>Add Task</button>
        <button onClick={() => {
          setTaskText('');
          setDueDate(''); // Clear due date when clearing input
        }}>Clear</button>
      </div>

      {/* To Do Section */}
      <h3>To Do</h3>
      <ul className="task-list">
        {todoTasks.map((task) => (
          <li key={task._id} className={task.completed ? 'completed' : ''}>
            {editingTaskId === task._id ? (
              <div>
                <input
                  type="text"
                  value={editTaskText}
                  onChange={(e) => setEditTaskText(e.target.value)}
                />
                <input
                  type="date"
                  value={editDueDate}
                  onChange={(e) => setEditDueDate(e.target.value)}
                />
                <button onClick={handleEditSave}>Save</button>
                <button onClick={handleEditCancel}>Cancel</button>
              </div>
            ) : (
              <>
                <span>{task.text}</span>
                <div className="task-controls">
                  <button onClick={() => startEditing(task)}>Edit</button>
                  <button onClick={() => toggleTaskInProgress(task._id)}>
                    {task.inProgress ? 'Stop Progress' : 'Start Progress'}
                  </button>
                  <button onClick={() => toggleTaskCompletion(task._id)}>
                    Complete
                  </button>
                  <button onClick={() => deleteTask(task._id)}>Delete</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>

      {/* In Progress Section */}
      <h3>In Progress</h3>
      <ul className="task-list">
        {inProgressTasks.map((task) => (
          <li key={task._id}>
            {editingTaskId === task._id ? (
              <div>
                <input
                  type="text"
                  value={editTaskText}
                  onChange={(e) => setEditTaskText(e.target.value)}
                />
                <input
                  type="date"
                  value={editDueDate}
                  onChange={(e) => setEditDueDate(e.target.value)}
                />
                <button onClick={handleEditSave}>Save</button>
                <button onClick={handleEditCancel}>Cancel</button>
              </div>
            ) : (
              <>
                <span>{task.text}</span>
                <div className="task-controls">
                  <button onClick={() => startEditing(task)}>Edit</button>
                  <button onClick={() => toggleTaskInProgress(task._id)}>
                    {task.inProgress ? 'Stop Progress' : 'Start Progress'}
                  </button>
                  <button onClick={() => toggleTaskCompletion(task._id)}>
                    Complete
                  </button>
                  <button onClick={() => deleteTask(task._id)}>Delete</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>

      {/* Completed Section */}
      <h3>Completed</h3>
      <ul className="task-list">
        {completedTasks.map((task) => (
          <li key={task._id} className="completed">
            {editingTaskId === task._id ? (
              <div>
                <input
                  type="text"
                  value={editTaskText}
                  onChange={(e) => setEditTaskText(e.target.value)}
                />
                <input
                  type="date"
                  value={editDueDate}
                  onChange={(e) => setEditDueDate(e.target.value)}
                />
                <button onClick={handleEditSave}>Save</button>
                <button onClick={handleEditCancel}>Cancel</button>
              </div>
            ) : (
              <>
                <span>{task.text}</span>
                <div className="task-controls">
                  <button onClick={() => startEditing(task)}>Edit</button>
                  <button onClick={() => deleteTask(task._id)}>Delete</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
