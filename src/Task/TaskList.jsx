import React from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import DateDropdown from './DateDropdown';
import '../CSS/TaskStyle.css';

const fetchTasks = async (date) => {
  const response = await fetch(`http://localhost:5000/tasks?date=${date}`);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

const TaskList = () => {
  const [taskText, setTaskText] = React.useState('');
  const [priority, setPriority] = React.useState(3); // New state for priority (default to Low)
  const [selectedDate, setSelectedDate] = React.useState(new Date().toISOString().split('T')[0]);
  const [editingTaskId, setEditingTaskId] = React.useState(null);
  const [editTaskText, setEditTaskText] = React.useState('');
  const [editPriority, setEditPriority] = React.useState(3);

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
  const handlePriorityChange = (e) => setPriority(parseInt(e.target.value));

  const addTask = async () => {
    if (taskText.trim()) {
      const newTask = {
        text: taskText,
        completed: false,
        inProgress: false,
        date: selectedDate,
        priority: priority, // Use priority instead of dueDate
      };

      try {
        await addTaskMutation.mutateAsync(newTask);
        setTaskText('');
        setPriority(3); // Reset priority after adding
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
    setEditPriority(task.priority);
  };

  const handleEditSave = async () => {
    if (!editTaskText.trim()) {
      console.error('Task text is required');
      return;
    }
  
    const updatedTask = {
      _id: editingTaskId,  // Ensure this is valid
      text: editTaskText,
      completed: false,  // Adjust based on your state
      inProgress: false,  // Adjust based on your state
      date: selectedDate,  // Ensure it's valid
      priority: editPriority,
    };
  
    console.log('Sending updated task:', updatedTask);
  
    try {
      await updateTaskMutation.mutateAsync(updatedTask);
    } catch (error) {
      console.error('Error updating task:', error.message);
    }
  };

  const handleEditCancel = () => {
    setEditingTaskId(null);
  };

  const sortByPriority = (tasks) => {
    return [...tasks].sort((a, b) => a.priority - b.priority);
  };

  // Split tasks into sections
  const todoTasks = sortByPriority(tasks.filter(task => !task.completed && !task.inProgress));
  const inProgressTasks = sortByPriority(tasks.filter(task => task.inProgress && !task.completed));
  const completedTasks = sortByPriority(tasks.filter(task => task.completed));

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
        <select value={priority} onChange={handlePriorityChange}>
          <option value={1}>High</option>
          <option value={2}>Medium</option>
          <option value={3}>Low</option>
        </select>
        <button onClick={addTask}>Add Task</button>
        <button onClick={() => {
          setTaskText('');
          setPriority(3); // Reset priority when clearing input
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
                <select value={editPriority} onChange={(e) => setEditPriority(parseInt(e.target.value))}>
                  <option value={1}>High</option>
                  <option value={2}>Medium</option>
                  <option value={3}>Low</option>
                </select>
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
                <select value={editPriority} onChange={(e) => setEditPriority(parseInt(e.target.value))}>
                  <option value={1}>High</option>
                  <option value={2}>Medium</option>
                  <option value={3}>Low</option>
                </select>
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
          <li key={task._id}>
            {editingTaskId === task._id ? (
              <div>
                <input
                  type="text"
                  value={editTaskText}
                  onChange={(e) => setEditTaskText(e.target.value)}
                />
                <select value={editPriority} onChange={(e) => setEditPriority(parseInt(e.target.value))}>
                  <option value={1}>High</option>
                  <option value={2}>Medium</option>
                  <option value={3}>Low</option>
                </select>
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
