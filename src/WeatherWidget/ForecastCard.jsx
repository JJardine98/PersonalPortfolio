// src/components/ForecastCard.js
import React from 'react';
import './WeatherThemes.css';

const ForecastCard = ({ data }) => {
  const { list } = data;

  // Filter the list to show forecasts every 5 hours
  const filteredList = list.filter((item, index) => index % 3 === 0);

  

  return (
    <div className="forecast-card">
      <h3>3-Day Forecast</h3>
      <div className="forecast-container">
        {filteredList.map((item) => {
          const { dt, main, weather } = item;
          const dateTime = new Date(dt * 1000);
          const date = dateTime.toLocaleDateString();
          const time = dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          const temperature = main.temp;
          const description = weather[0].description;
          const icon = `http://openweathermap.org/img/wn/${weather[0].icon}.png`;

          return (
            <div key={dt} className="forecast-item">
              <h4>{date}</h4>
              <p>{time}</p> {/* Display time */}
              <img src={icon} alt={description} />
              <p>{temperature}°C</p>
              <p>{description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ForecastCard;
