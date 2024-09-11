const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const taskRoutes = require('./routes/tasks');
const dateRoutes = require('./routes/dates');
const bodyParser = require('body-parser');
const { MongoClient, ServerApiVersion } = require('mongodb');

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

// MongoDB connection setup
const uri = process.env.MONGO_URI; // Use environment variable for security
let db;

// Create a MongoClient with MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function connectDB() {
  try {
    await client.connect();
    db = client.db('tasklist'); // Store reference to the database
    console.log("Connected to MongoDB Atlas!");
  } catch (error) {
    console.error("Error connecting to MongoDB: ", error);
  }
}

// Call the function to connect to MongoDB
connectDB();

// Middleware to pass database to routes
app.use((req, res, next) => {
  req.db = db; // Attach database object to every request
  next();
});

// Routes
app.use('/tasks', taskRoutes);
app.use('/dates', dateRoutes);

// Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
