//jshint esversion:6

const express = require("express");
const axios = require("axios");
var bodyParser = require("body-parser");
const request = require("request");
const config = require(__dirname + "/config.js");
const app = express();

const key = config.API_KEY;
const url = config.BASE_URL;



app.use(express.static("public"));



app.get("/", (req,res) => {
  res.sendFile(__dirname + "/index.html");
});


app.get("/api/nowplaying", (req,res,next) => {
  axios.get(url + "/movie/now_playing" + key).then(response =>{
    res.status(200).json(response.data);
  });

});


//endpoints 
app.get("/api/popular" , (req,res,next) => {
  axios.get("https://api.themoviedb.org/3/movie/popular?api_key=75e79240a355e64e98c79872558f6b0b").then(response =>{
    res.status(200).json(response.data);
  });
});
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
