
var city = document.querySelector('#city')
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

    var windSpeedEl = document.createElement('span');
    windSpeedEl.textContent = "Wind Speed" + weather.wind.speed;
    windSpeedEl.classList.add('list-group-item');

}
var display5Day = function(weather){
    forecastContainerEl.textContent = "";
    forecastTitle.textContent = "5 Day Forecast";

    var forecast = weather.list;
        for(var i=5; i < forecast.length; i++){  // might need to change
        var dailyForecast = forecast[i];

        var forecastEL = document.createElement('div');
        forecastEL.classList.add('card bg-primary text-light m-2')
        
        //creates date
        var forecastEL = document.createElement('h5');
        forecastDate.textContent = moment.unix(dispalForecast.dt).format("MMM D, YYYY");
        forecastEL.appendChild(forecastDate);

        //creates images in 5 day forecast
        var weatherIcon = document.createElement('img');
        weatherIcon.classList.add('card-body text-center');
        weatherIcon.setAttribute('src', `https://openweathermap.org/img/wn/${dailyForecast.weather[0].icon}@2x.png`)

        forecastEL.appendChild(weatherIcon);


        var forecastTempEl = document.createElement('span');
        forecastTempEl.classList.add('card-body text-center');
        forecastTempEl.textContent = dailyForecast.main.temp + 'F';

        forecastEL.appendChild(forecastTempEl);

        var forecastHumEl = document.createElement('span');
        forecastHumEl.classList.add('card-body text-center');
        forecastHumEl.textContent = dailyForecast.main.humidity;

        forecastEL.appendChild(forecastHumEl); 
    }

}








var get5Day = function(city){
    var APIkey = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=b593b8f7d2b3fb75befb732897df7d93";

    fetch(APIkey).then(function(response){
        response.json().ten(function(data){
            display5Day(data);
        })
    })

}