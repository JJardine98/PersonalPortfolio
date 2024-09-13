const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const taskRoutes = require('./routes/tasks');
const dateRoutes = require('./routes/dates');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:3000'  // Allow React app to access API
}));
app.use(express.json());

// MongoDB connection setup using Mongoose
const uri = process.env.MONGODB_URI || "mongodb+srv://jarodj98:5b2pGiN66123$@portfoliodb.4ktsy.mongodb.net/?retryWrites=true&w=majority&appName=PortfolioDB";

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("Connected to MongoDB Atlas!"))
.catch(error => console.error("Error connecting to MongoDB: ", error));

// Routes
app.use('/tasks', taskRoutes);
app.use('/dates', dateRoutes);

// Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
