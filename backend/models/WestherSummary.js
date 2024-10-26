// backend/models/WeatherSummary.js

const mongoose = require('mongoose');

const WeatherSummarySchema = new mongoose.Schema({
    city: String,
    date: Date,
    averageTemp: Number,
    maxTemp: Number,
    minTemp: Number,
    dominantWeather: String
});

module.exports = mongoose.model('WeatherSummary', WeatherSummarySchema);
