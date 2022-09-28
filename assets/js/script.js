var searchFormEl = document.querySelector('#search');
var currentWeatherEl = document.querySelector('#current-weather');
var futureWeatherEl = document.querySelector('#future-weather');
var weatherDocEl = document.querySelector('.weather-content');
var latlonApi = "b2e5f00a4ae1d8bc662c377493172660";
var weatherApi = "676e062b36d3433830f8fc2196aa276e"

var displayWeather = function(weather) {
    console.log(weather);
    var currentTemp = weather.list[0].main.temp.toFixed(0);
    var currentHigh = weather.list[0].main.temp_max.toFixed(0);
    var currentLow = weather.list[0].main.temp_min.toFixed(0);
    var currentConditions = weather.list[0].weather[0].description;

    document.querySelector('#current-temp').innerHTML = currentTemp;
    document.querySelector('#current-high').innerHTML = currentHigh;
    document.querySelector('#current-low').innerHTML = currentLow;
    document.querySelector('#current-conditions').innerHTML = currentConditions;
    
    var day1High = weather.list[8].main.temp_max.toFixed(0);
    var day1Low = weather.list[8].main.temp_min.toFixed(0);
    var day1Conditions = weather.list[8].weather[0].description;

    document.querySelector('#day1-high').innerHTML = day1High;
    document.querySelector('#day1-low').innerHTML = day1Low;
    document.querySelector('#day1-conditions').innerHTML = day1Conditions;

    var day2High = weather.list[16].main.temp_max.toFixed(0);
    var day2Low = weather.list[16].main.temp_min.toFixed(0);
    var day2Conditions = weather.list[16].weather[0].description;

    document.querySelector('#day2-high').innerHTML = day2High;
    document.querySelector('#day2-low').innerHTML = day2Low;
    document.querySelector('#day2-conditions').innerHTML = day2Conditions;

    var day3High = weather.list[24].main.temp_max.toFixed(0);
    var day3Low = weather.list[24].main.temp_min.toFixed(0);
    var day3Conditions = weather.list[24].weather[0].description;

    document.querySelector('#day3-high').innerHTML = day3High;
    document.querySelector('#day3-low').innerHTML = day3Low;
    document.querySelector('#day3-conditions').innerHTML = day3Conditions;

    var day4High = weather.list[32].main.temp_max.toFixed(0);
    var day4Low = weather.list[32].main.temp_min.toFixed(0);
    var day4Conditions = weather.list[32].weather[0].description;

    document.querySelector('#day4-high').innerHTML = day4High;
    document.querySelector('#day4-low').innerHTML = day4Low;
    document.querySelector('#day4-conditions').innerHTML = day4Conditions;

    var day5High = weather.list[39].main.temp_max.toFixed(0);
    var day5Low = weather.list[39].main.temp_min.toFixed(0);
    var day5Conditions = weather.list[39].weather[0].description;

    document.querySelector('#day5-high').innerHTML = day5High;
    document.querySelector('#day5-low').innerHTML = day5Low;
    document.querySelector('#day5-conditions').innerHTML = day5Conditions;

    weatherDocEl.append(currentWeatherEl);
    weatherDocEl.append(futureWeatherEl);
}

var getWeather = function(location) {
    console.log(location);
    var lat = location[0].lat.toFixed(2);
    var lon = location[0].lon.toFixed(2);

    var weatherUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${weatherApi}&units=imperial`;

    fetch(weatherUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                displayWeather(data);
            })
        }
    });
};

var getLatlon = function(city, state) {
    var latlonUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "," + state + "," + "US&limit=1&appid=" + latlonApi;
    fetch(latlonUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                getWeather(data)
            })
        } else {
            alert("unable to connect");
        }
    });
};

document.querySelector('#searchBtn').addEventListener('click', function() {
    let cityEl = document.querySelector('textarea[id="city"]').value.trim();
    let stateEl = document.querySelector('#state').value.trim();
    
    getLatlon(cityEl, stateEl);
});