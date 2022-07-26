///// Weather-Api express Functionality /////
const axios = require("axios");
let DataMemory = {}
function GetWeatherApi(req, res) {
    let cityQuery = req.query.cityWeather;
    /// Weather Api with Key and search Query by cite's name ///
      //// https://api.weatherbit.io/v2.0/forecast/daily?city=$Amman&key=df63b6be79c7449887363eb55cd2eec1&days=6
      let url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${cityQuery}&key=${process.env.WEATHER_API_KEY_SECOND}&days=6`;

    try {
      if(DataMemory[cityQuery] != undefined){
console.log('server already has the data in memory!');
res.send(DataMemory[cityQuery])
      }else{
        
        axios.get(url).then((api) => {
          let ApiData = api.data.data.map((allData) => {
            return new ForeCast(allData.valid_date, allData.weather.description);
          });
          // console.log(apiData);
          console.log('API Data has been hit !');
          DataMemory[cityQuery] = ApiData
          // console.log(DataMemory[cityQuery]);
          res.status(501).send(ApiData);
        });
      }

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