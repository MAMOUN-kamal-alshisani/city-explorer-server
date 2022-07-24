const axios = require("axios");



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

  module.exports = GetMoviesApi