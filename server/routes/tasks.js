const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Task route (tasks.js)
router.get('/', async (req, res) => {
  const { date } = req.query;
  console.log('Fetching tasks for date:', date);  // Log the requested date

  try {
    const tasks = await Task.find({ date });
    if (tasks.length === 0) {
      // If no tasks exist for the requested date, return an empty array
      return res.json([]);
    }
    res.json(tasks);  // Return the tasks found
  } catch (error) {
    console.error('Error fetching tasks:', error);  // Log the error
    res.status(500).json({ message: 'Internal server error' });
  }
});




router.post('/', async (req, res) => {
  try {
    const newTask = new Task(req.body);
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTask) return res.status(404).json({ message: 'Task not found' });
    res.json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const result = await Task.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
