$(document).ready(fuction())
    console.log("connected")

// API key generated
    let apiKey = "8ae1cbcf432e978890179005eaec9e01";

$("#searchbtn").on("click", function(event){
    event.preventDefault();

// get the value of the users input
    let userSearch = $("#cities").val();
    console.log("userSearch", userSearch)

getCurrentWeather(userSearch);

})

function getCurrentWeather(userSearch){
    console.log("userSearch in getCurrentWeather function", userSearch)

let queryUrl = 'http://api.openweathermap.org/data/2.5/weather?q={userSeach}&appid={apiKey}'

console.log("queryUrl", queryUrl)
fetch(queryUrl)
.then(response => response.json())
.then(function(data){
    console.log("GET CURRENT WEATHER CALL, data")
})

// assiging bootstrap classes to h2 and div elements and storing in variables
let cityName = $("h2 class = 'card-title'>").text(data.name);
let temperature = $("div class = 'card-text'>").text("Temperature: " + data.main.temp + "F");
let humidity = $("<div class = 'card-text'>").text("Humidity: " + data.main.humidity + "%");
let wind = $("<div class = 'card-text'>").text("Wind Speed: " + data.wind.speed + "mph");
let icon = $("<img src = 'http://openweathermap.org/img/wn/${data.weather[0].icon}.pn'>");

// combine the dynamically created elements to currentweather
$("currentWeather").append(cityName, icon, temp, humidity, wind);

let coords = {
    lat: data.coord.lat,
    lon: data.coord.lon
}

getUVIndex(coords)
}

function getUVIndex(coords){
    let queryUrl = 'http://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lon}appid=${APIkey}';

    fetch(queryUrl)
    .then(response => response.json())
    .then(function(data){
        console.log("ONE CALL API", data)

        for(var i = 1; 1<6; i++){
            console.log('Looping through five day forecast', data.daily[i])
            console.log(i)
            
            let card = $("<div class = 'card col-md-2'>")
            // add the next five days from moment.js
            let cardTitle = $("div class = 'card-title'>").text(moment().add(5, 'days').format('DOMQuad,MM,YYYY'))

            card.append(cardTitle)
            $("#forecast").append(card)

            let temp = $("<div class = 'card-text'>").text("Temperature: " + data.daily[i].temp.day + "F")
            card.append(temp)
            $("#forecast").append(card)

            let windSpeed = $("<div class = 'card-text'>").text("Wind Speed: " + data.daily[i].wind_speed.day + "mph")
            card.append(windSpeed)
            $("#forecast").append(card)

            let humidity = $("<div class = 'card-text'>").text("Humidity: " + data.daily[i].humidity.day + "%")
            card.append(humidity)
            $("#forecast").append(card)

        }

        // Renders the UV data Index

        let UVIndex = data.current.uvi;
        let UVIndexElement = $("button class = 'card-text btn btn-sm'>").text("UV Index: " + UVIndex)

        if(UVIndex < 3){
            UVIndexElement.addClass("btn-success");
        } else if(UVIndex < 7){
            UVIndexElement.addClass("btn-warning");
        } else{
            UVIndexElement.addClass("btn-danger");
        }
    
        $('#currentWeather').append(UVIndexElement);
    })

}



