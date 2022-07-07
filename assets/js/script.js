var searchFormEl = document.querySelector('#search');
var currentWeatherEl = document.querySelector('#current-weather');
var futureWeatherEl = document.querySelector('#future-weather');
var latlonApi = "b2e5f00a4ae1d8bc662c377493172660"

var getWeather = function(latLon) {

};

var getLatlon = function(city, state) {
    var latlonUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + state + "US&limit=1&appid=" + latlonApi;
};