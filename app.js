
const express = require("express");

const ejs = require("ejs");
const fetch = require("node-fetch");
const config = require("./config");

const app = express();

function convertKtoF(temp){
  return Math.floor(1.8 * (temp - 273) + 32);
}

// m/s to f/s
function convertMeterstoMiles(velocity){
  return Math.floor(velocity * 2.23694);
}

function hours12(date){
  return (date.getHours() + 24) % 12 || 12;
}


app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/location", async (req, res) => {

  // Handle missing query parameter
  if(!req.query.q) return res.status(400).json({
    status : 400,
    message : "Missing required parameter q."
  });

  if(typeof(req.query.q) !== "string") return res.status(400).json({
    status : 400,
    message : "Invalid parameter q."
  });

  const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${req.query.q}&appid=${config.apikey}`

  let response = await fetch(apiURL);
  let weatherData = await response.json();

  if(weatherData.cod !== 200) return res.status(400).json({
    status : 400,
    message : "Location not found."
  });
  return res.status(200).json({
    status : 200,
    name : weatherData.name,
    country : weatherData.sys.country,
    weatherSymbol : weatherData.weather[0].main,
    temp : convertKtoF(weatherData.main.temp),
    humidity: weatherData.main.humidity,
    windSpeed: convertMeterstoMiles(weatherData.wind.speed),
  });
});

app.get("/forecast", async (req, res) => {

  if(!req.query.q) return res.status(400).json({
    status : 400,
    message : "Missing required parameter q."
  });

  if(typeof(req.query.q) !== "string") return res.status(400).json({
    status : 400,
    message : "Invalid parameter q."
  });

  const apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${req.query.q}&appid=${config.apikey}`

  let response = await fetch(apiURL);
  let weatherData = await response.json();

  if(weatherData.cod !== "200") return res.status(400).json({
    status : 400,
    message : "Location not found."
  });

  weatherData.list.forEach(forecast => {
    forecast.main.temp = convertKtoF(forecast.main.temp);
  });

  return res.status(200).json({
    status : 200,
    forecast : weatherData.list
  });

});

app.listen(3000, () => {
  console.log("Server started at port 3000!");
});
