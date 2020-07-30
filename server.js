const express = require('express');
const app = express()
const bodyParser = require('body-parser');
const request = require('request');
const apiKey = 'bd55a79e1c8787eaf6276b4f341522bd';

app.use(express.static('public'));
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
  res.render('index', {weather: null, error: null});
})

app.post('/', function (req, res) {
	let city = req.body.city;
	let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
	request(url, function (err, response, body) {
		if(err){
			res.render('index', {weather: null, error: 'Error, please try again'});
		} else {
			let weather = JSON.parse(body)
			if(weather.main == undefined){
				res.render('index', {weather: null, error: 'Error, please try again'});
			} else {
				let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
				res.render('index', {weather: weatherText, error: null});
			}
		}
	});
})

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}

app.listen(port, function () {
  console.log('Example app listening on port ' + port)
})