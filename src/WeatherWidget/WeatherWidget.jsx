// src/components/WeatherWidget.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WeatherCard from './WeatherCard';
import ForecastCard from './ForecastCard';
import './WeatherThemes.css';



const WeatherWidget = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [city, setCity] = useState('');
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const fetchWeather = async (lat, lon) => {
      try {
        const apiKey = 'b8b3fa05ae0555858683cebb58599938'; // Replace with your actual API key

        // Fetch current weather
        const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
          params: {
            lat,
            lon,
            appid: apiKey,
            units: 'metric',
          },
        });
        setWeather(weatherResponse.data);

        // Fetch forecast data
        const forecastResponse = await axios.get(`https://api.openweathermap.org/data/2.5/forecast`, {
          params: {
            lat,
            lon,
            appid: apiKey,
            units: 'metric',
          },
        });
        setForecast(forecastResponse.data);
        setError(null);
      } catch (error) {
        console.error('Error fetching the weather data:', error);
        setWeather(null);
        setForecast(null);
        setError('Unable to fetch weather data. Please try again later.');
      }
    };

    const fetchWeatherByCity = async () => {
      try {
        const apiKey = 'b8b3fa05ae0555858683cebb58599938';


        // Fetch coordinates using the Geocoding API
        const geoResponse = await axios.get(`https://api.openweathermap.org/geo/1.0/direct`, {
          params: {
            q: city,
            appid: apiKey,
            limit: 1, // Limit to one result
          },
        });

        if (geoResponse.data.length === 0) {
          setError('Location not found');
          setWeather(null);
          setForecast(null);
          return;
        }

        const { lat, lon } = geoResponse.data[0]; // Extract the first result's coordinates

        // Fetch weather and forecast data based on coordinates
        fetchWeather(lat, lon);
      } catch (error) {
        console.error('Error fetching the weather data:', error);
        setWeather(null);
        setForecast(null);
        setError('Unable to fetch weather data. Please try again later.');
      }
    };

    const handleGeolocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            // Fetch weather and forecast data based on geolocation
            fetchWeather(latitude, longitude);
          },
          (error) => {
            console.error('Error getting geolocation:', error);
            setError('Unable to retrieve your location. Please enter a city.');
          }
        );
      } else {
        setError('Geolocation is not supported by this browser.');
      }
    };

    if (city) {
      fetchWeatherByCity();
    } else {
      handleGeolocation();
    }
  }, [city]);

  const toggleTheme = () => {
    setDarkMode(prevMode => !prevMode);
  };

  return (
    <div className={`weather-widget ${darkMode ? 'dark-theme' : ''}`}>
      <button onClick={toggleTheme}>
        {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      </button>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city"
        className="city-input"
      />
      {error && <p className="error-message">{error}</p>}
      {weather && <WeatherCard data={weather} />}
      {forecast && <ForecastCard data={forecast} />}
      {!error && !weather && !forecast && city === '' && <p>Loading...</p>}
    </div>
  );
};

export default WeatherWidget;
