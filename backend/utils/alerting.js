// backend/utils/alerting.js

const nodemailer = require('nodemailer');
const config = require('../config/config');

// Function to send an alert email
function sendAlertEmail(city, temp) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: config.email,
            pass: config.password
        }
    });

    const mailOptions = {
        from: config.email,
        to: config.alertRecipient,
        subject: 'Weather Alert',
        text: `The temperature in ${city} has exceeded the threshold: ${temp}°C`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

// Function to check if threshold is breached
function checkThreshold(weatherData) {
    if (weatherData.averageTemp > config.tempThreshold) {
        sendAlertEmail(weatherData.city, weatherData.averageTemp);
    }
}

module.exports = { checkThreshold };
