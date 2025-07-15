// weather app js

document.addEventListener('DOMContentLoaded', function() {
    const getWeatherButton = document.getElementById('getWeather');
    const weatherResult = document.getElementById('weatherResult');

    getWeatherButton.addEventListener('click', function() {
        const city = document.getElementById('city').value;
        if (city) {
            fetchWeather(city);
        } else {
            weatherResult.textContent = 'Please enter a city name.';
        }
    });

    function fetchWeather(city) {
        const apiKey = '24e63da0cfa5cb0c569304f4951ea32b';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.cod === 200) {
                    displayWeather(data);
                } else {
                    weatherResult.textContent = 'City not found.';
                }
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
                weatherResult.textContent = 'Error fetching weather data.';
            });
    }

    function displayWeather(data) {
        const { name, main, weather } = data;
        weatherResult.innerHTML = `
            <h2>Weather in ${name}</h2>
            <p>Temperature: ${main.temp} °C</p>
            <p>Condition: ${weather[0].description}</p>
        `;
    }
});