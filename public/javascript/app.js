//jshint esversion:6
const imgURL = "https://image.tmdb.org/t/p/";

const settings = {
  async: true,
  crossDomain: true,
  url: '',
  method: 'GET',
  headers: {},
  data: {}
}




//Event Listeners
//When someone clicks on a movie poster I want to do specific events
$('#test').on('click', '.movie', function() {
  movieID = $(this).children('a').attr('id'); // we want to get the movies id that was set when it was appended
  changePage(); // and then call the changepage function to change the page of the website
  console.log("I got clicked");

});

//Functions

//This function will get the movie id and post it to a route where another function will be able to grab it and use that ids information
function postId(movieID)
{

  $.ajax({
    method:'POST',
    url: "/api/movie",
    data: {movie:movieID},
    success: function (data) {
      console.log(JSON.stringify(data));
    }
  });
}
//This function will change the page when a movie poster is clicked
function changePage() {
  $.ajax({
    url: '/movie',
    method: 'GET',
    success: function(data) {
      console.log(data);
      $("#test").html(data); // we are now going to get the html data that was sent via the route /movie and put it in the main section
      slickinit();
      postId(movieID);
      addMovieDetails(movieID); // and now add the movie details to the new page loaded

    }
  });
}

//This function will add the details of a movie to the page this function is to be used when someone clicks on a movie poster
function addMovieDetails(movie) {
  settings.url = '/api/movie'; // go to the route and grab the information that was sent by the postid function
  $.ajax(settings).done(function(response) {
    console.log(response); // this is for debugging purposes
    $("#Movie-Title").text(response.original_title); // We are going to change the text of the h1 with the id of movie-title to the selected movies title
    let backdrop = imgURL + "original" + response.backdrop_path; // getting the movies backdrop title
    $("#Movie-Backdrop").attr("src", backdrop); // change the src of the id img movie backdrop to the variable backdrop
    $("#Description").text(response.overview); //change the description to the overview of the movie

  });
    getMovie("Related","/api/movie/similar"); // get movies that are similar to this one and put them in a carousel
    getCast();

}
slickinit();
getMovie("nowPlaying","/api/nowplaying");

//this function will get the movies requested and put them into a slick carousel
function getMovie(slider,url) {
  settings.url = url; //get data from the api/nowPlaying route
  $.ajax(settings).done(function(response) {

    $.each(response.results, function(i, item) { //now get each movie
      // add the movie picture and title to a carousel item

      $('#' + slider).slick('slickAdd', "<div class = 'movie' ><a  id =' " + item.id + "'><img  src='" + imgURL + "w154" + item.poster_path + "'/img></a>" + "<p>" + item.original_title + "</p>" + " </div>");


    });
  });
}
displayPopular();

//This function gets three random movies that are currently popular and displays them
function displayPopular() {
  settings.url = "/api/popular"; //get the data from the /api/popular route

  $.ajax(settings).done(function(response) {
    var i = 0;
    //while there is not three items in the carousel keep adding them on
    while (i != 3) {
      random = getRandom(response.results.length); // we are getting a random number from using the getRandom function
        if (i == 0)
      { // I am starting with this so I can get the first movie chosen as the active carousel item
         let img = imgURL + "original" + response.results[random].backdrop_path; // making the image url so I do not have to add it all in the append area
         // for the first item I am going to add the carousel to the empty div with the id popular display
        $("#populardisplay").append("<div class='carousel-inner'>  <div class='carousel-item active '><div class = 'droptext'> <h2>" + response.results[random].original_title + " </h2></div>  <img class='d-block w-10 img-fluid display-img ' src=" + img + " alt='First slide'>  </div>");
      }
         else
      {
        img = imgURL + "original" + response.results[random].backdrop_path;
        //for this part I am now getting the carousel inner class that was added in when we appened the first movie and created the carousel
        // I am now adding two more movies into the carousel
        $(".carousel-inner").append(" <div class='carousel-item display-img'> <div class = 'droptext'> <h2>" + response.results[random].original_title + " </h2></div> <img class='d-block w-10 img-fluid ' src=" + img + " alt='First slide'</div>");
      }
      i++; // increment the i by one
    }
  });
}

function getCast()
{
  settings.url = "/api/movie/cast";
  $.ajax(settings).done(function(response){
    console.log(response);
});
}

//get random num function
function getRandom(length) {
  var random = Math.floor((Math.random() * length) + 1);  // this variable will get a random number between 1 and the length chosen by the function
  return random; // return the randomly chosen number
}



// settings for the carousel for movies
function slickinit()
{
  $('.titles-slider').slick({
    infinite: false,
    speed: 400,
    dots: true,
    slidesToShow: 6,
    slidesToScroll: 6,
    responsive: [{
        breakpoint: 1200,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4
        }
      },
      {

        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      }
    ]
  });

}
