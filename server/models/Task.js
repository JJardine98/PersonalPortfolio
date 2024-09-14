const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  date: {
    type: String,  // Date for the task
    required: true,
  },
  time: {
    type: String,  // Time slot
  },
  text: {
    type: String,  // Task description
    required: true,
  },
  completed: {
    type: Boolean,  // Whether the task has been completed
    default: false,
  },
  inProgress: {
    type: Boolean,  // Whether the task is in progress
    default: false,
  },
  dueDate: {
    type: Date,  // Due date for the task
  },
  priority: {
    type: Number,  // Priority of the task (1: High, 2: Medium, 3: Low)
    default: 3,
  },
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
