var express = require('express');
const https = require('https');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {

  const api = "";
  const units = "metric";
  var input = req.body.city;

  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + input + "&appid=" + api + "&units=" + units;

  https.get(url, function(response) {

    console.log('statusCode:', response.statusCode);
    response.on("data", function(data) {
      const weather = JSON.parse(data);
      const temprature = weather.main.temp;
      const description = weather.weather[0].description;
      const icon = weather.weather[0].icon;
      var imgURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

      res.write("<p>escription : " + description + "....</p>");
      res.write("<h1>The current temprature is " + temprature + "degree</h1>");
      res.write("<img src=" + imgURL + ">");
      res.send();

    })
  })
});


app.listen(3000, function() {
  console.log("server running at port 3000");
});
