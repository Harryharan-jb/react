import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCity, faTemperatureHigh, faTemperatureLow, faThermometerHalf, faWind, faTint, faCompass, faCloud, faEye, faClock } from '@fortawesome/free-solid-svg-icons';
import { faSun } from '@fortawesome/free-solid-svg-icons/faSun';
import { faMoon } from '@fortawesome/free-solid-svg-icons/faMoon';
import './Weather.css';
import './App.css';

const Weather = ({ weatherData, forecastData }) => {
  const [isCelsius, setIsCelsius] = useState(true);

  const toggleTemperatureUnit = () => {
    setIsCelsius(!isCelsius);
  };

  const convertToFahrenheit = (temp) => {
    return (temp * 9/5) + 32;
  };

  const getTemperature = (temp) => {
    return isCelsius ? temp : convertToFahrenheit(temp);
  };

  const temperatureUnit = isCelsius ? "°C" : "°F";

  const getWeatherIconUrl = (iconCode) => {
    return `https://openweathermap.org/img/wn/${iconCode}.png`;
  };

  const isDaytime = () => {
    const currentTime = new Date().getTime() / 1000;
    return currentTime >= weatherData.sys.sunrise && currentTime < weatherData.sys.sunset;
  };

  return (
    <div className="weather-container center">
      {weatherData && (
        <div className='w-report text-start'>
          
          <h2><FontAwesomeIcon icon={faCity} /> Weather Information</h2>
          <h3 className="location">{weatherData.weather && weatherData.weather[0].icon && (
            <img src={getWeatherIconUrl(weatherData.weather[0].icon)} alt="Weather Icon" style={{ marginLeft: '35%' }} />
          )} {weatherData.name}</h3>
          <div style={{ marginLeft: '22%' }}>
            <div className='row'>
              <div className='col-lg-6'>
                <h5><FontAwesomeIcon icon={faThermometerHalf} /> Temperature <br /> <span className='spanfonts' style={{ fontSize: '35px', cursor: 'pointer' }} onClick={toggleTemperatureUnit}>{getTemperature(weatherData.main.temp)}{temperatureUnit}</span></h5>
                <h5><FontAwesomeIcon icon={faThermometerHalf} /> Feels Like: <br /> <span className='spanfonts' style={{ fontSize: '35px', cursor: 'pointer' }} onClick={toggleTemperatureUnit}>{getTemperature(weatherData.main.feels_like)}{temperatureUnit}</span></h5>
              </div>
              <div className='col-lg-6'>
                <h5><FontAwesomeIcon icon={faTemperatureLow} /> Min Temperature: <br /> <span className='spanfonts' style={{ fontSize: '35px', cursor: 'pointer' }} onClick={toggleTemperatureUnit}>{getTemperature(weatherData.main.temp_min)}{temperatureUnit}</span></h5>
                <h5><FontAwesomeIcon icon={faTemperatureHigh} /> Max Temperature: <br /> <span className='spanfonts' style={{ fontSize: '35px', cursor: 'pointer' }} onClick={toggleTemperatureUnit}>{getTemperature(weatherData.main.temp_max)}{temperatureUnit}</span></h5>
              </div>
            </div>
            <div className='row'>
              <div className='col-lg-6'>
                <h5><FontAwesomeIcon icon={faCloud} /> Description:  <span style={{ fontSize: '25px', textTransform: 'capitalize' }}>{weatherData.weather[0].description}</span></h5>
                <h5><FontAwesomeIcon icon={faTint} /> Humidity:  <span style={{ fontSize: '35px' }}>{weatherData.main.humidity}%</span></h5>
              </div>
              <div className='col-lg-6'>
                <h5><FontAwesomeIcon icon={faWind} /> Wind Speed: <span style={{ fontSize: '35px' }}>{weatherData.wind.speed} m/s</span></h5>
                <h5><FontAwesomeIcon icon={faCompass} /> Wind Direction: <span style={{ fontSize: '35px' }}>{weatherData.wind.deg}°</span></h5>
              </div>
            </div>
            <div className='row'>
              <div className='col-lg-6'>
                <h5><FontAwesomeIcon icon={faEye} /> Visibility: <span style={{ fontSize: '35px' }}>{weatherData.visibility / 1000} km</span></h5>
                <h5>{isDaytime() ? <FontAwesomeIcon icon={faSun} /> : <FontAwesomeIcon icon={faMoon} />} Sunrise/Sunset: <span style={{ fontSize: '35px' }}>{new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}</span></h5>
              </div>
              <div className='col-lg-6 mt-5'>
                <h5><FontAwesomeIcon icon={faClock} /> Current Time: <span style={{ fontSize: '35px' }}>{new Date().toLocaleTimeString()}</span></h5>
              </div>
            </div>
          </div>
        </div>
      )}
      {forecastData && (
        <div className="forecast">
          <h2>3-Day Forecast</h2>
          {forecastData.list.slice(1, 4).map((forecast, index) => (
            <div key={index} className="forecast-item">
              <p>Date: {new Date(forecast.dt * 1000).toDateString()}</p>
              <p>Temperature: {forecast.main.temp}°C</p>
              <p>Description: {forecast.weather[0].description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Weather;
