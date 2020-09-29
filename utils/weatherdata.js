const request = require('request');
const constants = require('../config');

const weatherdata = (address, callback) => {
    const url = constants.Openweathermap.BaseUrl + encodeURIComponent(address) + '&appid=' + constants.Openweathermap.Key;
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("Can't fetch weather data from Open weather map", undefined);
        } else if (!body.main || !body.main.temp || !body.name || !body.weather) {
            callback("Unable to fetch data , try another location !!!!", undefined);
        } else {
            callback(undefined, {
                temprature: body.main.temp,
                description: body.weather[0].description,
                cityname: body.name
            })
        }
    })
}

module.exports = weatherdata;