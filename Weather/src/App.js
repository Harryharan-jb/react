// App.js
import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import InputForm from './InputForm';
import Weather from './Weather';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeatherData = async (city) => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c9f12348f077c00bd30bc30dec7c4cb7&units=metric`);
      setWeatherData(response.data);
      setError(null);
    } catch (error) {
      setError('City not found. Please enter a valid city name.');
      setWeatherData(null);
    }
  };

  return (
    <div className="App">
      <h1 className='w-font mb-5'><i>Weather App</i></h1>
      <InputForm onSearch={fetchWeatherData} />
      {error && <p className="error">{error}</p>}
      <Weather weatherData={weatherData} />
    </div>
  );
}

export default App;
