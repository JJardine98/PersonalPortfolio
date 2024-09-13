const mongoose = require('mongoose');

const dateSchema = new mongoose.Schema({
  date: String,    // Date field in 'YYYY-MM-DD' format
});

const Date = mongoose.model('Date', dateSchema, 'dates'); // Specify 'dates' collection
module.exports = Date;
