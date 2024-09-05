const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  date: String,    // Date for the task (e.g., '2024-08-28')
  time: String,    // Time slot (e.g., '09:00 AM')
  text: String,    // Task description
  completed: Boolean,    // Whether the task has been completed
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
