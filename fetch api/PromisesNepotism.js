/**
 * Capturing the Result of the Quickest Operation

 Another cool thing you can easily do with promises is executing a number of operations and moving on as soon as one of them finishes. A real scenario would be requesting the same data from a primary service and a secondary service. A response is received even when one of the services is unavailable.

 In the example below, I retrieve the current weather in Sydney (Australia) from two weather services: OpenWeatherMap and MetaWeather. Each service returns the data in its own specific format, but they both provide the information we need: temperature and weather condition. In this case, OpenWeatherMap happens to be quicker, so we usually use its data. If we had a favorite service, we could delay the other one using the setTimeout() function..
 */


var fetch = require('node-fetch');

Promise.race([
    fetchSydneyWeatherFromOpenWeatherMap(),
    fetchSydneyWeatherFromMetaWeather()
])
    .then(printResults)
    .catch(handleError);

function fetchSydneyWeatherFromOpenWeatherMap() {
    var id = 2147714;
    var appid = '2de143494c0b295cca9337e1e96b00e0';
    var openWeatherMapUrl = `http://api.openweathermap.org/data/2.5/weather?id=${id}&units=metric&appid=${appid}`;
    return fetch(openWeatherMapUrl)
        .then(response => response.json())
        .then(function (response) {
            return {
                location: response.name,
                temperature: response.main.temp,
                condition: response.weather[0].main,
                source: 'OpenWeatherMap'
            };
        });
}

function fetchSydneyWeatherFromMetaWeather() {
    var woeid = 1105779;
    var metaWeatherUrl = `https://www.metaweather.com/api/location/${woeid}/`;
    return fetch(metaWeatherUrl)
        .then(response => response.json())
        .then(function (response) {
            return {
                location: response.title,
                temperature: Math.round(response.consolidated_weather[0].the_temp),
                condition: response.consolidated_weather[0].weather_state_name,
                source: 'MetaWeather'
            };
        });
}

function printResults(weather) {
    console.log(`Current weather in ${weather.location}: ${weather.temperature}C ${weather.condition}`);
    console.log(`Source: ${weather.source}`);
}

function handleError(err) {
    console.log(err);
}
