var SEARCH_URL = 'http://api.openweathermap.org/data/2.5/weather?';
var API_KEY = '9be13ca98f24eafcd8d9c1c5b856347b';
// APPID is your unique API key
//example API call: http://api.openweathermap.org/data/2.5/weather?q=Atlanta,GA&units=imperial&appid=9be13ca98f24eafcd8d9c1c5b856347b

var clouds1;
var temp1;
var precipPlayer1;
var clouds2;
var temp2;
var precipPlayer2;
var gameresult; 
var player1_score = 0;
var player2_score = 0;


//callback



// ajax logic
function queryWeather1(searchCity, callbackFn) {
    var params = {
        q: searchCity,
        units: "imperial",
        appid: API_KEY,
        }
    $.getJSON(SEARCH_URL, params, callbackFn);
}

function queryWeather2(searchCity, callbackFn) {
    var params = {
        q: searchCity,
        units: "imperial",
        appid: API_KEY,
        }
    $.getJSON(SEARCH_URL, params, callbackFn);   
}

//event listening logic

$('#js-search1').submit(function(event){
      event.preventDefault();
      var searchCity = $(event.currentTarget).find('input').val();
      queryWeather1(searchCity, callbackStore1);
      console.log(searchCity);
      // callbackStore1();
      // displayWeather1();
      // displayWeather2(clouds2, temp2, precip2);
// This may result in re-rendering Weather1 when we click Submit for Player2 weather because the two buttons are
//linked to the same class

  })

$('#js-search2').submit(function(event){
      event.preventDefault();
      var searchCity = $(event.currentTarget).find('input').val();
      queryWeather2(searchCity, callbackStore2);
      // callbackStore2();
      // displayWeather2();
      // displayWeather2(clouds2, temp2, precip2);
// This may result in re-rendering Weather1 when we click Submit for Player2 weather because the two buttons are
//linked to the same class

  })

$('#js-compare').submit(function(event) {
      event.preventDefault();
      gameresult = compare();
      console.log(gameresult);
      displayResult();

 })

// function submission1()
//   $('#js-search').submit(function(event){
//       event.preventDefault();
//       var searchCity = $(event.currentTarget).find('input').val();

//     queryWeather(searchCity, callbackStore1);
//   })
// }

// function submission2(){
//   $('#js-search').submit(function(event){
//       event.preventDefault();
//       var searchCity = $(event.currentTarget).find('input').val();

//     queryWeather(searchCity, callbackStore2);
//   })
// }

//render functions
//must render weather data for each player AND render winner based upon comparrison of scores

function displayWeather1() {
  $('.js-clouddata1').html(clouds1 + '%');
  $('.js-tempdata1').html(temp1);
  $('.js-precipdata1').html(precipPlayer1);
}

function displayWeather2(){
 $('.js-clouddata2').html(clouds2 + '%');
  $('.js-tempdata2').html(temp2);
  $('.js-precipdata2').html(precipPlayer2);
}

function displayResult(){
  $('#js-compare p').html(gameresult);
}


function callbackStore1(response) {
    console.log(response);
    if(response) {
      temp1 = response.main.temp;
      clouds1 = response.clouds.all
      precipPlayer1 = response.weather["0"].main
   if (response.weather["0"].main.indexOf('snow') != -1 || response.weather["0"].main.indexOf('rain') != -1) {
       precip1 = true;

  }  else {
    precip1 = false;
  }
   displayWeather1();
    }
}

function callbackStore2(response) {
    if(response) {
      temp2 = response.main.temp;
      clouds2 = response.clouds.all
      precipPlayer2 = response.weather["0"].main
   if (response.weather["0"].main.indexOf('snow') != -1 || response.weather["0"].main.indexOf('rain') != -1) {
       precip2 = true;

  }  else {
    precip2 = false;
  }
    }
    displayWeather2();
}


//Game Scores

//Compare Temps and Update Scores
//How are we passing in globals

function compareTemp() {
  if (temp1 > temp2) {
  player1_score += 1
}
else if (temp2 > temp1) {
  player2_score += 1
  }
}
//Compare Clouds and Update Scores
function compareClouds() {
  if (clouds1 > clouds2) {
player2_score += 1
}
else if (clouds2 > clouds1) {
  player1_score += 1
  }
}

//Compare Precip Update Scores
function comparePrecip () {
  if (precip1 == true || precip2 == false) {
player2_score += 1
}
else if (precip2 == true || precip1 == false) {
  player1_score += 1
  }
}
function compare () {
  compareTemp();
  comparePrecip();
  compareClouds();
  if (player1_score > player2_score) {
  return "Player 1 has better weather";
  }
  else if (player1_score === player2_score){
    return "Same Weather";
  }
  else {
    return "Player 2 has better weather";
  }
};

console.log(player2_score);
