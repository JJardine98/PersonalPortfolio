const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  date: String,  // Date for the task
  time: String,  // Time slot
  text: String,  // Task description
  completed: Boolean,  // Whether the task has been completed
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
