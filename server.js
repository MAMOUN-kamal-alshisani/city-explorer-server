const express = require('express')
const cors = require('cors')


require('dotenv').config()
const PORT = process.env.PORT || 3000
const server = express()

const weather = require('./data/weather.json')

server.use(express.json())
server.use(cors())
server.get('/',(req,res)=>{


res.status(200).send(`<h1>Home Page</h1>`)

})



server.get('/weather',(req,res)=>{
try{
    let selectedData = weather.find(data=>{

        if(data.city_name == req.query.cityName){
// let weather = new ForeCast(data.data.datetime, data.data.description)
console.log(req.query);
console.log(data);

return data
        }
    })
    const weatherData = selectedData.data.map(forItem=>{


        return new ForeCast(forItem.datetime,forItem.weather.description)
    })
    
    
    res.status(201).send(weatherData)


}catch(err){console.log(err);}


})

class ForeCast{
   
    constructor(datetime,description){


    this.datetime = datetime;
    this.description = description;

    }
}


server.listen(PORT,()=> console.log(`server Running on port ${PORT}`))