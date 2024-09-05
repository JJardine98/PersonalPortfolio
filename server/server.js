const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const taskRoutes = require('./routes/tasks'); // Import consolidated routes
const dateRoutes = require('./routes/dates');
const bodyParser = require('body-parser');

dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

// Use consolidated routes
app.use('/tasks', taskRoutes);
app.use('/dates', dateRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Could not connect to MongoDB', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
