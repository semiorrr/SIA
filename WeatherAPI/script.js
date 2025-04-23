const API_KEY = '8ffbc6232ed97599f02a52fb16c330fd';
const BASE_URL = 'http://api.weatherstack.com/current';

const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const weatherResult = document.getElementById('weather-result');
const loading = document.getElementById('loading');
const error = document.getElementById('error');
const cityName = document.getElementById('city-name');
const weatherIcon = document.getElementById('weather-icon');
const temperature = document.getElementById('temperature');
const weatherDescription = document.getElementById('weather-description');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');

searchBtn.addEventListener('click', fetchWeather);

async function fetchWeather() {
    const city = cityInput.value.trim();
    
    if (!city) {
        showError('Please enter a city name');
        return;
    }
    
    loading.classList.remove('hidden');
    weatherResult.classList.add('hidden');
    error.classList.add('hidden');
    
    try {
        const response = await fetch(`${BASE_URL}?access_key=${API_KEY}&query=${city}`);
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        
        if (data.error) {
            throw new Error(data.error.info || 'Weather data not available');
        }
        
        displayWeather(data);
    } catch (err) {
        showError(err.message || 'Failed to fetch weather data');
    } finally {
        loading.classList.add('hidden');
    }
}

function displayWeather(data) {
    cityName.textContent = `${data.location.name}, ${data.location.country}`;
    temperature.textContent = `${data.current.temperature}°C`;
    weatherDescription.textContent = data.current.weather_descriptions[0];
    humidity.textContent = `Humidity: ${data.current.humidity}%`;
    windSpeed.textContent = `Wind: ${data.current.wind_speed} km/h`;
    
    const weatherGif = getWeatherGif(data.current.weather_descriptions[0]);
    weatherIcon.src = `images/${weatherGif}`;
    weatherIcon.alt = data.current.weather_descriptions[0];
    
    weatherResult.classList.remove('hidden');
}

function getWeatherGif(description) {
    const desc = description.toLowerCase();

    if (desc.includes('sunny') || desc.includes('clear')) {
        return `sunny.gif`;
    } else if (desc.includes('partly cloudy')) {
        return `partly-cloudy.gif`;
    } else if (desc.includes('cloud')) {
        return `cloudy.gif`;
    } else if (desc.includes('rain')) {
        return `rainy.gif`;
    } else if (desc.includes('snow')) {
        return `snowy.gif`;
    } else if (desc.includes('thunder') || desc.includes('storm')) {
        return `thunderstorm.gif`;
    } else if (desc.includes('fog') || desc.includes('mist')) {
        return `foggy.gif`;
    }else if (desc.includes('overcast')) {
            return `overcast.gif`;
    } else {
        return `default.gif`;
    }

function showError(message) {
    error.textContent = message;
    error.classList.remove('hidden');
}
}
