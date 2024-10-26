// backend/services/openWeatherMapService.js

const https = require('https');
const config = require('../config/config');

function fetchWeatherDataForCity(city) {
    return new Promise((resolve, reject) => {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${config.apiKey}`;

        https.get(url, (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                resolve(JSON.parse(data));
            });
        }).on('error', (err) => {
            reject(err);
        });
    });
}

module.exports = { fetchWeatherDataForCity };
