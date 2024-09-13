const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  date: { type: String, required: true },  // Ensure 'date' is required
  time: String,
  text: { type: String, required: true },  // Ensure 'text' is required
  completed: { type: Boolean, default: false },
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
