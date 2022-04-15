var cities = [];
var city = document.querySelector('#city')
var cityFormEl = document.querySelector('#city-search-form');
var cityInputEl = document.querySelector('#city');
var weatherContainer = document.querySelector('#current-weather-container');
var citySearch = document.querySelector("#searched-city");
var forecastTitle = document.querySelector("#forecast");
var forecastContainer = document.querySelector("#fiveday-container");
var pastSearchButton = document.querySelector("#past-search-buttons");
var lat = 0.0;
var long = 0.0;
var apiKey = "b593b8f7d2b3fb75befb732897df7d93"

var submitForm = function(event){
    event.preventDefault();
    var city = cityInputEl.value.trim();
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

// this is so it says in the browser and saves to localstorage
var saveSearch = function(){
    localStorage.setItem(cities, JSON.stringify(cities));
};


// this is where we get our current weather
var getCityWeather = function(city){
    var apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

    fetch(apiURL).then
    (function(response){
        response.json().then(function(data){
            displayWeather(data, city);
console.log('response', data)
            lat = data.coord.lat;
            long = data.coord.lon;
        })
    })
}


// this is where we display our current weather.
var displayWeather = function(weather, searchCity) {
    weatherContainer.textContent="";
    citySearch.textContent=searchCity;

    var weatherIcon = document.createElement('img');
    weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`);
    citySearch.appendChild(weatherIcon);

    var tempatureEL = document.createElement('span');
    tempatureEL.textContent = 'Temp: ' + weather.main.temp + " Fahrenheit";
    tempatureEL.classList.add('list-group-item')

    var humidityEL = document.createElement('span');
    humidityEL.textContent = "Humidity Percentage: " + weather.main.humidity;
    humidityEL.classList.add('list-group-item');

    var windSpeedEl = document.createElement('span');
    windSpeedEl.textContent = "Wind Speed: " + weather.wind.speed;
    windSpeedEl.classList.add('list-group-item');

    weatherContainer.appendChild(tempatureEL);
    weatherContainer.appendChild(humidityEL);
    weatherContainer.appendChild(windSpeedEl);



}
// this is where we pull the 5 day forecast
var get5Day = function(city){
    var apiURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&cnt=5&units=imperial&appid=${apiKey}`

    fetch(apiURL)
    .then(function(response){
        response.json().then(function(data){
            display5Day(data);
        });
    });

};
// this is where we display the 5 day forecast
var display5Day = function(weather){
    forecastContainer.textContent = "";
    forecastTitle.textContent = "5 Day Forecast";

    var forecast = weather.list;
    console.log(weather)
        for(var i=0; i < forecast.length; i++){  
        var dailyForecast = forecast[i];

        var forecastEL = document.createElement('div');
        forecastEL.classList = 'card bg-primary text-light m-2';
        
        //creates date
        var forecastDate = document.createElement('h5');
        forecastDate.textContent = moment.unix(dailyForecast.dt).format("MMM D, YYYY");  //how to get the date to work
        forecastDate.classList = 'card-body text-center';
        forecastEL.appendChild(forecastDate);

        //creates images in 5 day forecast
        var weatherIcon = document.createElement('img');
        weatherIcon.classList = 'card-body text-center';
        weatherIcon.setAttribute('src', `https://openweathermap.org/img/wn/${dailyForecast.weather[0].icon}@2x.png`)

        forecastEL.appendChild(weatherIcon);


        var forecastTempEl = document.createElement('span');
        forecastTempEl.classList = 'card-body text-center';
        forecastTempEl.textContent = dailyForecast.main.temp + ' F';  // how to get to math floor

        forecastEL.appendChild(forecastTempEl);

        var forecastHumEl = document.createElement('span');
        forecastHumEl.classList = 'card-body text-center';
        forecastHumEl.textContent = dailyForecast.main.humidity + '% Humidity';

        forecastEL.appendChild(forecastHumEl); 

        forecastContainer.appendChild(forecastEL);
    }

}

var pastSearch = function(pastSearch){
    pastSearchEL = document.createElement('button');
    pastSearchEL.textContent = pastSearch;
    pastSearchEL.classList = 'd-flex w-100 btn-light border p-2';
    pastSearchEL.setAttribute('data-city', pastSearch);
    pastSearchEL.setAttribute('type', 'submit');

    pastSearchButton.prepend(pastSearchEL);
}

var pastSearchHandler = function(event){
    var city = event.target.getAttribute('data-city');
    if(city){
        getCityWeather(city);
        get5Day(city);

    }
}

cityFormEl.addEventListener('submit', submitForm);
pastSearchButton.addEventListener('click', pastSearchHandler)






