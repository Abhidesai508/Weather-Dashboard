// API KEY
var Key = '&appid=64711a3a34371e60842ce5f4745dc7bf';

// Selecting html elements
var inputElement = document.querySelector('.Entry');
var searchBtnElement = document.querySelector('.search-button');
var citiesListElement = document.querySelector(".list");

// Using local storage to get city name
var city = localStorage.getItem('cityNameStore');

// Getting URL links for current city weather forecast
var Weatherurl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + '&units=imperial' + Key;

var forecasturl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + '&units=imperial' + Key;
// creating fucntion to create input in local storage

function Citydata() {
    localStorage.setItem('cityNameStore', inputElement.value);
}
// Using for loop to create child in city list

for (var i = 0; i < localStorage.length; i++) {
    $(".list").append("<p>" + localStorage.getItem(localStorage.key(i)) + "</p>");
}

// using ajax method to get url from server side API
$.ajax ({
    url: Weatherurl,
    method: "GET"
})
// .THEN (promise) to make call back return function
    .then(function(response) {

        // Adding weather properties 
        $('.city').html("<h2>" + response.name + "</h2>");
        $('.symbol').html("<img src='https://openweathermap.org/img/w/" + response.weather[0].icon + ".png' >");
        $('.breeze').text("Wind Speed: " + response.wind.speed + " MPH");
        $('.humidity').text("Humidity: " + response.main.humidity + "%");
        $(".degree").text("Degree: " + response.main.temp + " F");

        // URL for UV
        var latitude = response.coord.lat;
        var longitude = response.coord.lon;
        var URLUV = "https://api.openweathermap.org/data/2.5/uvi?lat=" + latitude + "&lon=" + longitude + Key;

        $.ajax ({
            url: URLUV,
            method: "GET"
        })
            .then(function(response) {
                var uvValue = response.value

                $('.UV').text("UV: " + response.value);
                $('.UV').css("background-color", Color(uvValue));
            });
        })
        // Setting color for UV
function Color(uvValue, colorbgd) {
    var colorbgd = "";
    if (uvValue <= 2) {
        colorbgd = "green";
    }
    else if (uvValue <= 5 && uvValue > 2) {
        colorbgd = "yellow";
    }
    else if (uvValue >= 6 && uvValue > 5) {
        colorbgd = "red";
    }
    return colorbgd;
}
// Current date
var currentDay = moment().format("dddd, D MMMM ");

function date() {
    $(".Date").text(currentDay);
};
date();

// 5 days forecast
$.ajax ({
    url: forecasturl,
    method: "GET"
})

.then(function (response) {

    var One = moment(response.list[0].dt_txt).format("ddd, MMM D");

        $(".day-1-degree").text("Temp: " + response.list[0].main.temp + " F");
        $(".day-1-Date").html("<h6>" + One + "</h6>");
        $(".day-1-symbol").html("<img src='https://openweathermap.org/img/w/" + response.list[0].weather[0].icon + ".png' alt='Icon depicting current weather.'>");
        $(".day-1-humidity").text("Humidity: " + response.list[0].main.humidity + "%");

    var Two = moment(response.list[8].dt_txt).format("ddd, MMM D");
        $(".day-2-degree").text("Temp: " + response.list[8].main.temp + " F");
        $(".day-2-Date").html("<h6>" + Two + "</h6>");
        $(".day-2-symbol").html("<img src='https://openweathermap.org/img/w/" + response.list[8].weather[0].icon + ".png' alt='Icon depicting current weather.'>");
        $(".day-2-humidity").text("Humidity: " + response.list[8].main.humidity + "%");

    var Three = moment(response.list[16].dt_txt).format("ddd, MMM D");
        // Adds day 3 data to page
        $(".day-3-degree").text("Temp: " + response.list[16].main.temp + " F");
        $(".day-3-Date").html("<h6>" + Three + "</h6>");
        $(".day-3-symbol").html("<img src='https://openweathermap.org/img/w/" + response.list[16].weather[0].icon + ".png' alt='Icon depicting current weather.'>");
        $(".day-3-humidity").text("Humidity: " + response.list[16].main.humidity + "%");

    var Four = moment(response.list[24].dt_txt).format("ddd, MMM D");

        // Adds day 4 data to page
        $(".day-4-degree").text("Temp: " + response.list[24].main.temp + " F");
        $(".day-4-Date").html("<h6>" + Four + "</h6>");
        $(".day-4-symbol").html("<img src='https://openweathermap.org/img/w/" + response.list[24].weather[0].icon + ".png' alt='Icon depicting current weather.'>");
        $(".day-4-humidity").text("Humidity: " + response.list[24].main.humidity + "%");

    var Five = moment(response.list[32].dt_txt).format("ddd, MMM D");

        // Adds day 5 data to page
        $(".day-5-degree").text("Temp: " + response.list[32].main.temp + " F");
        $(".day-5-Date").html("<h6>" + Five + "</h6>");
        $(".day-5-symbol").html("<img src='https://openweathermap.org/img/w/" + response.list[32].weather[0].icon + ".png' alt='Icon depicting current weather.'>");
        $(".day-5-humidity").text("Humidity: " + response.list[32].main.humidity + "%");

    });
    // Click event for search button
    searchBtnElement.addEventListener('click', Citydata);
