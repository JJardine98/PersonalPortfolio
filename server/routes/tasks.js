const express = require('express');
const router = express.Router();
const Task = require('../models/Task'); // Import Task model

// Get tasks for a specific date
router.get('/', async (req, res) => {
  try {
    const { date } = req.query;
    const tasks = await Task.find({ date });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new task
router.post('/', async (req, res) => {
  const { text, completed, inProgress, date, dueDate } = req.body;
  try {
    const newTask = new Task({
      text,
      completed,
      inProgress,
      date,
      dueDate: new Date(dueDate), // Ensure dueDate is in Date format
      priority: calculatePriority(dueDate), // Calculate priority based on due date
    });
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a task
router.put('/:id', async (req, res) => {
  try {
    const { text, completed, inProgress, date, dueDate } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, {
      text,
      completed,
      inProgress,
      date,
      dueDate: new Date(dueDate), // Ensure dueDate is in Date format
      priority: calculatePriority(dueDate), // Calculate priority based on due date
    }, { new: true });
    res.json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a task
router.delete('/:id', async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a task
router.put('/:id', async (req, res) => {
  try {
    const { text, completed, inProgress, date, dueDate } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, {
      text,
      completed,
      inProgress,
      date,
      dueDate: new Date(dueDate), // Ensure dueDate is in Date format
      priority: calculatePriority(dueDate), // Calculate priority based on due date
    }, { new: true });
    res.json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Calculate priority based on due date
function calculatePriority(dueDate) {
  if (!dueDate) return 3; // Default to low priority if no due date
  const now = new Date();
  const taskDate = new Date(dueDate);
  const daysUntilDue = Math.ceil((taskDate - now) / (1000 * 60 * 60 * 24));
  
  if (daysUntilDue <= 1) return 1; // High priority
  if (daysUntilDue <= 7) return 2; // Medium priority
  return 3; // Low priority
}

module.exports = router;
