

var cityFormEl = document.querySelector('#city-search-form');
var cityInputEl = document.querySelector('#city');
var weatherContainerEL = document.querySelector('#current-weather-container');
var citySearchInputEl = document.querySelector("#searched-city");
var forecastTitle = document.querySelector("#forecast");
var forecastContainerEl = document.querySelector("#fiveday-container");
var pastSearchButtonEl = document.querySelector("#past-search-buttons");
var cities = [];

var formSubmitHandler = function(event){
    event.preventDefault();
    var city = cityInputEl.ariaValueMax.trim()
    if(city) {
        getCityWeather(city);
        get5Day(city);
        cities.unshift({city})
    }
    else {
        alert('Enter City Name');
    }
    saveSearch();
    pastSearch(city);
}

var saveSearch = function(){
    localStorage.setItem(cities, JSON.stringify(cities));
}

var getCityWeather = function(weather, searchCity) {
    weatherContainerEL.textContent='';
    citySearchInputEl.textContent=searchCity;


    var currentDate = document.createElement('span');
    currentDate.textContent=" (" + moment(weather.dt.value).format("MMM D, YYYY") + ") ";
    citySearchInputEl.appendChild(currentDate);



    var tempatureEL = document.createElement('span');
    tempatureEL.textContent = 'Temp: ' + weather.main.temp + "Fahrenheit";
    tempatureEL.classList.add('list-group-item')

    var humidityEL = document.createElement('span');
    humidityEL.textContent = "Humidity Percentage " + weather.main.humidity;
    humidityEL.classList.add('list-group-item');
}