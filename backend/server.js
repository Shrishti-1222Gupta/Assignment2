// backend/server.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cron = require('node-cron');
const weatherController = require('./controllers/weatherController');
const config = require('./config/config');

// Initialize app
const app = express();
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/weather-monitoring', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Weather routes
const weatherRoutes = require('./routes/weather');
app.use('/api/weather', weatherRoutes);

// Cron job to fetch weather data every 5 minutes
cron.schedule('*/5 * * * *', () => {
    weatherController.fetchWeatherData();
});

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
