///// Weather-Api express Functionality /////
const axios = require("axios");
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


  //// ForeCast Api class object paradigm
class ForeCast {
    constructor(datetime, description) {
      this.datetime = datetime;
      this.description = description;
    }
  }



  module.exports = GetWeatherApi