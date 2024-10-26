// backend/controllers/weatherController.js

const WeatherSummary = require('../models/WestherSummary.js');
const openWeatherService = require('../services/openWeatherMapService.js');
const config = require('../config/config.js');

// Function to fetch weather data and store rollup in the database
async function fetchWeatherData() {
    const cities = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];

    for (const city of cities) {
        const weatherData = await openWeatherService.fetchWeatherDataForCity(city);
        
        // Convert temperatures from Kelvin to Celsius
        const temp = weatherData.main.temp - 273.15;
        const feels_like = weatherData.main.feels_like - 273.15;
        
        const weatherSummary = new WeatherSummary({
            city: city,
            date: new Date(),
            averageTemp: temp,
            maxTemp: weatherData.main.temp_max - 273.15,
            minTemp: weatherData.main.temp_min - 273.15,
            dominantWeather: weatherData.weather[0].main
        });

        // Store in DB
        await weatherSummary.save();
    }
}

module.exports = { fetchWeatherData };
