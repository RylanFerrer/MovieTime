//jshint esversion:6

const express = require("express");
const axios = require("axios");
var bodyParser = require("body-parser");
const request = require("request");
const config = require(__dirname + "/config.js");
const app = express();


//exported from config.js
const key = config.API_KEY;
const url = config.BASE_URL;



app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));


app.get("/", (req,res) => {
  res.sendFile(__dirname + "/index.html");
});
app.get("/main", (req,res) => {
  res.sendFile(__dirname + "/main.html");
});
app.get("/movie", (req,res)=>{

  res.sendFile(__dirname + "/movie.html");

});
app.get("/actor", (req,res)=>{

  res.sendFile(__dirname + "/cast.html");

});
app.get('/television', (req,res) => {
  res.sendFile(__dirname + "/television.html");
});
app.get("/search", (req,res) =>{
  res.sendFile(__dirname + "/search.html");
});




//endpoints
app.get("/api/television/:tv/cast", (req,res) => {
  var tvId = req.params.tv;
  axios.get(url + '/tv/' + tvId + "/credits" + key + '&language=en-US').then(response => {
    res.status(200).json(response.data);
  });
});



app.get("/api/tv/:tv" , (req,res) => {
  var tvId = req.params.tv;

  axios.get(url + '/tv/' + tvId + key + '&language=en-US').then(response => {
    res.status(200).json(response.data);
  });
});
app.get("/api/search/:search", (req,res) =>{

    var search = req.params.search;

    axios.get(url + '/search/multi' + key + '&language=en-US&query=' + search + "&page=1&include_adult=false" ).then(response => {
      res.status(200).json(response.data);
    });

});



app.get("/api/actor/:actor", (req,res) => {
  var actor = req.params.actor;
  var actorId = actor.replace(/\s+/g, '');
  axios.get(url + '/person/' + actorId +  key + '&language=en-US').then(response =>{
    res.status(200).json(response.data);
  });

});
app.get("/api/actor/:actor/credits", (req,res) => {
  var actor = req.params.actor;
  var actorId = actor.replace(/\s+/g, '');
  axios.get(url + '/person/' + actorId +"/combined_credits" + key + '&language=en-US').then(response =>{
    res.status(200).json(response.data);
  });
});

app.get("/api/movies/:movie", (req,res) =>{
  var movie = req.params.movie;

  axios.get(url + '/movie/' + movie + key + '&language=en-US').then(response =>{
    res.status(200).json(response.data);
 });
});
app.get("/api/movies/:movie/similar", (req,res) => {
    var movie = req.params.movie;

  axios.get(url + '/movie/' + movie + "/similar" + key + '&language=en-US').then(response =>{
    res.status(200).json(response.data);
  });
});
app.get("/api/movies/:movie/cast", (req,res) =>{
  var movie = req.params.movie;

  axios.get(url + '/movie/' + movie + "/credits" +  key + '&language=en-US').then(response =>{
    res.status(200).json(response.data);
  });
});

app.get("/api/movies/:movie/video", (req,res) => {
  var movie = req.params.movie;
  axios.get(url + '/movie/' + movie + "/videos" +  key + '&language=en-US').then(response =>{
    res.status(200).json(response.data);
  });
});
app.get("/api/television/:tv/video", (req,res) => {
  var tvId = req.params.tv;
  axios.get(url + '/tv/' + tvId + "/videos" +  key + '&language=en-US').then(response =>{
    res.status(200).json(response.data);
  });
});
app.get("/api/featured/:movie", (req,res,next) => {
  var movie = req.params.movie;
  axios.get(url + "/movie/" + movie+ key).then(response =>{
    res.status(200).json(response.data);
  });
});
app.get("/api/featured/tv/:television", (req,res,next) => {
  var television = req.params.television;

  axios.get(url + "/tv/" + television+ key).then(response =>{
    res.status(200).json(response.data);
  });
});
app.get("/api/featured/tv/:television/similar", (req,res,next) => {
  var television = req.params.television;

  axios.get(url + "/tv/" + television + "/similar" + key).then(response =>{
    res.status(200).json(response.data);
  });
});

app.get("/api/popular" , (req,res,next) => {
  axios.get("https://api.themoviedb.org/3/movie/popular?api_key=75e79240a355e64e98c79872558f6b0b").then(response =>{
    res.status(200).json(response.data);
  });
});


// Port call
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
