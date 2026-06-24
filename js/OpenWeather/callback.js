import APIKEY from './config.js';
// const APIKEY = require('./config.js');
const apiKey = APIKEY;


// import fetch from 'node-fetch';
const fetch = require('node-fetch');

function getWeatherCallback(city, callback) {
  const apiKey = 'your_api_key';
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }
      return response.json();
    })
    .then(data => callback(null, data))
    .catch(error => callback(error, null));
}

const city = 'London'; // User input city
getWeatherCallback(city, (error, weatherData) => {
  if (error) {
    console.error('Error fetching weather data:', error);
  } else {
    console.log('Weather data:', weatherData);
  }
});
