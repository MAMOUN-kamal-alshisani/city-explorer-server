require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const PORT = process.env.PORT || 3000;
const server = express();
server.use(express.json());
server.use(cors());
// const weather = require('./data/weather.json')

server.get("/", (req, res) => {
  res.status(200).send(`<h1>Home Page</h1>`);
});
/// weather Api End Point + WeatherApi express Functionality
server.get("/weather", GetWeatherApi);
/// Movies Api End Point + MoviesApi express Functionality
server.get("/movies", GetMoviesApi);


///// Weather-Api express Functionality /////
function GetWeatherApi(req, res) {
  let cityQuery = req.query.cityWeather;
  try {
    
    //// https://api.weatherbit.io/v2.0/forecast/daily?city=$Amman&key=df63b6be79c7449887363eb55cd2eec1&days=6
    let url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${cityQuery}&key=${process.env.WEATHER_API_KEY_SECOND}&days=6`;
    axios.get(url).then((api) => {
      let apiData = api.data.data.map((allData) => {
        return new ForeCast(allData.valid_date, allData.weather.description);
      });
      console.log(apiData);
      res.status(201).send(apiData);
    });
  } catch (err) {
    console.log(err);
  }
}


///// Movies-Api express Functionality /////
function GetMoviesApi(req, res) {
  let cityName = req.query.cityName;
  try {
    // let moviesUrl = `https://api.themoviedb.org/3/search/movie?api_key=220df3e1b427989999446f230e82613d&query=${cityName}`;
    let moviesUrl = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIES_API_KEY}&query=${cityName}`;
    axios.get(moviesUrl).then((response) => {
        console.log(response.data.results);
      let allData = response.data.results.map((ApiData) => {
        return new Movies(ApiData);
      });
      res.status(201).send(allData);
    });
  } catch (err) {
    console.error(err);
  }
}


//// Movies Api class object paradigm
class Movies {
  constructor(MoviesInfo) {
    this.id = MoviesInfo.id;
    this.title = MoviesInfo.title;
    this.overview = MoviesInfo.overview;
    this.average_votes = MoviesInfo.vote_average;
    this.total_votes = MoviesInfo.vote_count;
    this.image_url =`https://image.tmdb.org/t/p/w500${MoviesInfo.poster_path}`
    this.popularity = MoviesInfo.popularity;
    this.release_date = MoviesInfo.release_date;
  }
}

//// ForeCast Api class object paradigm
class ForeCast {
  constructor(datetime, description) {
    this.datetime = datetime;
    this.description = description;
  }
}

server.listen(PORT, () => console.log(`server Running on port ${PORT}`));
