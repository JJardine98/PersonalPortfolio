const mongoose = require('mongoose');

const dateSchema = new mongoose.Schema({
  date: { type: String, required: true, unique: true },
});

const DateModel = mongoose.model('Date', dateSchema);

module.exports = DateModel;
