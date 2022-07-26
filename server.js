require("dotenv").config();
const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 3000;
const server = express();
server.use(express.json());
server.use(cors());
// const weather = require('./data/weather.json')

const  GetWeatherApi= require('./modules/weather')
const GetMoviesApi = require('./modules/movies')

server.get("/", (req, res) => {
  res.status(200).send(`<h1>Home Page</h1>`);
});
/// weather Api End Point + WeatherApi express Functionality
server.get("/weather", GetWeatherApi);
/// Movies Api End Point + MoviesApi express Functionality
server.get("/movies", GetMoviesApi);

server.listen(PORT, () => console.log(`server Running on port ${PORT}`));
