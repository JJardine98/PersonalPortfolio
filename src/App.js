import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import { QueryClient, QueryClientProvider } from 'react-query';

// Import other components
import WeatherWidget from './WeatherWidget/WeatherWidget';
import HomePage from './HomePage/HomePage';
import VideoLoader from './Youtube/VideoLoader'; 
import TaskList from './Task/TaskList';
import Calculator from './Calculator/Calculator';

// Create a QueryClient instance
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
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
            <Route path="/calc" element={<Calculator />} />
          </Routes>
        </div>
      </div>
    </Router>
  </QueryClientProvider>
);

export default App;
