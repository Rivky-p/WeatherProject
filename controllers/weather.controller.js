const request = require('request');
const User = require('../models/User.model');
const Weather = require('../models/Weather.model');

const newWeather = async (userId, city, temp, wind) => {
    console.log("****new Weather***");
    try {
        let weather = new Weather();
        weather.city = city;
        weather.user = userId;
        weather.wind = JSON.stringify(wind);
        weather.temp = temp;
        weather.date = new Date();
        await weather.save();
        return weather._id;
    } catch (error) {
        console.log("an error acured while trying to add a new weather", error)
        return;
    }
}


const getWeatherByCityName = async (req, res) => {
    console.log("*******getWeatherBtCityName********");
    try {
        let user = await User.findById(req.userId);
        let city = req.params.cityName;
        let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=0972692ba056cd6785e116e5f3ac9d69&lang=he`;
        request(url, { json: true }, async (err, response, body) => {
            if (err) { res.status(500).send(err); }
            let weatherId = await newWeather(user._id, city, body.main.temp, body.wind);
            user.requestsHistory.push(weatherId);
            user.save();
            res.status(200).send(body);
        });
    } catch (error) {
        res.status(500).json({ error });
    }
}


const deleteFromHistoryByWeatherId = async (req, res) => {
    try {
        let weather = await Weather.findById(req.body.weatherId);
        console.log("weather found: ", weather.city);
        if (weather) {
            let userForDelete = await User.findByIdAndUpdate(req.userId, { $pull: { requestsHistory: weather._id } })
            await userForDelete.save();
            await weather.remove();
            res.status(200).send('weather from history was deleted')
        }
        else res.status(404).send('weather from history was not found')
    } catch (error) {
        res.status(500).json({ error });
    }
}


const getWeatherById = async (req, res) => {
    try {
        let weather = await Weather.findById(req.params.weatherId).populate('user');
        res.status(200).json({ weather })
    } catch (error) {
        res.status(500).json({ error });
    }
}

module.exports = { getWeatherByCityName, deleteFromHistoryByWeatherId, getWeatherById }