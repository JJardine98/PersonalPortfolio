// Import CSS and Router library
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 

// Import other components
import WeatherWidget from './WeatherWidget/WeatherWidget';
import HomePage from './HomePage/HomePage';
import VideoLoader from './Youtube/VideoLoader'; 
import TaskList from './Task/TaskList';
import DateDropdown from './Task/DateDropdown';
import Calculator from './Calculator/Calculator';


const App = () => (
  <Router>
    <div className="app">
      <div className="content">
        {/* Routes for different components */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/weather" element={<WeatherWidget />} />
          <Route path="/video" element={<VideoLoader />} />
          <Route path="/video/:videoId" element={<VideoLoader />} /> {/* Route for video ID */}
          <Route path="/task" element={<TaskList />} />
          <Route path="/dates" element={<DateDropdown />} />
          <Route path="/calc" element={<Calculator />} />
        </Routes>
      </div>
      
    </div>
  </Router>
);

export default App;
