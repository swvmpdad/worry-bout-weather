var searchFormEl = document.querySelector('#search');
var currentWeatherEl = document.querySelector('#current-weather');
var futureWeatherEl = document.querySelector('#future-weather');
var weatherDocEl = document.querySelector('.weather-content');
var latlonApi = "b2e5f00a4ae1d8bc662c377493172660";
var weatherApi = "676e062b36d3433830f8fc2196aa276e";
var searchHistoryEl = document.querySelector('.search-history')

var locations = [];

var storedLocationString = localStorage.getItem("locations");
var storedLocations = JSON.parse(storedLocationString);
locations = JSON.parse(storedLocationString);
console.log(storedLocations);


for (var i = 0; i < storedLocations.length; i++) {
    var newButton = document.createElement("button");
    newButton.classList.add('search-button');
    newButton.innerText = storedLocations[i];
    searchHistoryEl.appendChild(newButton);
}

var displayWeather = function(weather) {
    var currentTemp = weather.list[0].main.temp.toFixed(0) + " °F";
    var currentwind = weather.list[0].wind.speed + "mph";
    var currentHumidity = weather.list[0].main.humidity + "%";

    document.querySelector('#current-temp').innerHTML = currentTemp;
    document.querySelector('#current-wind').innerHTML = currentwind;
    document.querySelector('#current-humidity').innerHTML = currentHumidity;
    
    var day1High = weather.list[8].main.temp_max.toFixed(0) + " °F";
    var day1wind = weather.list[8].wind.speed + "mph";
    var day1Humidity = weather.list[8].main.humidity + "%";

    document.querySelector('#day1-high').innerHTML = day1High;
    document.querySelector('#day1-wind').innerHTML = day1wind;
    document.querySelector('#day1-humidity').innerHTML = day1Humidity;

    var day2High = weather.list[16].main.temp_max.toFixed(0) + " °F";
    var day2wind = weather.list[16].wind.speed + "mph";
    var day2Humidity = weather.list[16].main.humidity + "%";

    document.querySelector('#day2-high').innerHTML = day2High;
    document.querySelector('#day2-wind').innerHTML = day2wind;
    document.querySelector('#day2-humidity').innerHTML = day2Humidity;

    var day3High = weather.list[24].main.temp_max.toFixed(0) + " °F";
    var day3wind = weather.list[24].wind.speed + "mph";
    var day3Humidity = weather.list[24].main.humidity + "%";

    document.querySelector('#day3-high').innerHTML = day3High;
    document.querySelector('#day3-wind').innerHTML = day3wind;
    document.querySelector('#day3-humidity').innerHTML = day3Humidity;

    var day4High = weather.list[32].main.temp_max.toFixed(0) + " °F";
    var day4wind = weather.list[32].wind.speed + "mph";
    var day4Humidity = weather.list[32].main.humidity + "%";

    document.querySelector('#day4-high').innerHTML = day4High;
    document.querySelector('#day4-wind').innerHTML = day4wind;
    document.querySelector('#day4-humidity').innerHTML = day4Humidity;

    var day5High = weather.list[39].main.temp_max.toFixed(0) + " °F";
    var day5wind = weather.list[39].wind.speed + "mph";
    var day5Humidity = weather.list[39].main.humidity + "%";

    document.querySelector('#day5-high').innerHTML = day5High;
    document.querySelector('#day5-wind').innerHTML = day5wind;
    document.querySelector('#day5-humidity').innerHTML = day5Humidity;

    weatherDocEl.append(currentWeatherEl);
    weatherDocEl.append(futureWeatherEl);
}

var getWeather = function(location) {
    document.getElementById('current-city').innerText = `Current Weather for ${location[0].name}`;
    console.log(location);
    var lat = location[0].lat.toFixed(2);
    var lon = location[0].lon.toFixed(2);

    var weatherUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${weatherApi}&units=imperial`;

    fetch(weatherUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data);
                displayWeather(data);
            })
        }
    });
};

var getLatlon = function(city) {
    var latlonUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${latlonApi}`;
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
    locations.push(cityEl);
    localStorage.setItem("locations", JSON.stringify(locations));
    
    getLatlon(cityEl);
});

document.querySelector('#button-wrapper').addEventListener('click', function(event) {
    var isButton = event.target.nodeName === 'BUTTON';
    if (!isButton) {
        return;
    }
    let cityName = event.target.innerText;

    getLatlon(cityName);
});