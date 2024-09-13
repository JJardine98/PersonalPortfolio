// src/components/WeatherCard.js
import React from 'react';
import './WeatherThemes.css';


const WeatherCard = ({ data }) => {
  const { main, weather, name, sys, dt } = data;
  const temperature = main.temp;
  const description = weather[0].description;
  const icon = `http://openweathermap.org/img/wn/${weather[0].icon}.png`;
  const country = sys.country;
  const countryName = getCountryName(country);
  
  // Format the date and time
  const date = new Date(dt * 1000).toLocaleString();

  function getCountryName(code) {
    const countries = {
      'US': 'United States',
      'GB': 'United Kingdom',
      'FR': 'France',
      'DE': 'Germany',
      'JP': 'Japan',
      'IN': 'India',
      
      // Add more country codes and names as needed
    };
    return countries[code] || code;
  }

  return (
    <div className="weather-card">
      <h2>{name}, {countryName}</h2>
      <p>{date}</p> {/* Display date and time */}
      <img src={icon} alt={description} />
      <p>{temperature}°C</p>
      <p>{description}</p>
    </div>
  );
};

export default WeatherCard;
