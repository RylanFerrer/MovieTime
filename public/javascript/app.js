//jshint esversion:6
 const imgURL = "https://image.tmdb.org/t/p/";

const settings = {
  async:true,
  crossDomain:true,
  url:'',
  method: 'GET',
  headers:{},
  data: {}
}

getnowPlaying();

var $nowPlaying = $('#nowPlaying');

function getnowPlaying() {
  settings.url = "/api/nowplaying";
  $.ajax(settings).done(function(response){

        $.each(response.results, function(i,item){

            $nowPlaying.slick('slickAdd',"<div><img src='" + imgURL + "w154" + item.poster_path + "'/img>" + "<p>" + item.original_title +"</p>" + " </div>");

        });
    });

}
displayPopular();
function displayPopular() {
  settings.url = "/api/popular";

  $.ajax(settings).done(function(response){
    var i = 0;
    while (i != 3)
    {
          random = getRandom(response.results.length);
          if( i == 0)
          {
             img = imgURL + "original"+ response.results[random].backdrop_path;
             console.log(img);
             $("#populardisplay").append( "<div class='carousel-inner'>  <div class='carousel-item active '><div class = 'droptext'> <h2>" + response.results[random].original_title +  " </h2></div>  <img class='d-block w-10 img-fluid display-img' src=" +img +" alt='First slide'>  </div>");
          }
          else
          {
              img = imgURL + "original"+ response.results[random].backdrop_path;
             $(".carousel-inner").append( " <div class='carousel-item display-img'> <div class = 'droptext'> <h2>" + response.results[random].original_title +  " </h2></div> <img class='d-block w-10 img-fluid' src=" +img +" alt='First slide'</div>");
          }
        i++;
    }



    });
}



//get random num function
function getRandom(length)
{
    var random = Math.floor((Math.random() * length) + 1);
    return random;
}

// settings for the carousel for movies
$('.titles-slider').slick({
 infinite: false,
 speed: 400,
 dots:true,
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
