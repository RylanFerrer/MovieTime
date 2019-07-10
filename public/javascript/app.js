//jshint esversion:6
 const imgURL = "https://image.tmdb.org/t/p/w154";

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


//get
function getnowPlaying() {
  settings.url = "/api/nowplaying";
  $.ajax(settings).done(function(response){

        $.each(response.results, function(i,item){

            $nowPlaying.slick('slickAdd',"<div><img src='" + imgURL +  item.poster_path + "'/img>" + "<p>" + item.original_title +"</p>" + " </div>");

        });
    });

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
