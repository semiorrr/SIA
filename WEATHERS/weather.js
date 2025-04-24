const apiKey = '6d1cd35267f44374b69224025241112';
const baseUrl = 'https://api.weatherapi.com/v1/current.json';

document.getElementById('get-weather-btn').addEventListener('click', () => {
    const city = document.getElementById('city').value.trim();
    if (city) {
        getWeather(city);
    }
});

function getWeather(city) {
    const url = `${baseUrl}?key=${apiKey}&q=${encodeURIComponent(city)}`;

    fetch(url)
        .then(res => {
            if (!res.ok) throw new Error('City not found');
            return res.json();
        })
        .then(data => {
            document.getElementById('weather-result').style.display = 'block';
            document.getElementById('error-message').style.display = 'none';

            const condition = data.current.condition.text.toLowerCase();
            let imageSrc = '';

    
            if (condition.includes('sunny')) {
                imageSrc = 'images/sun.gif';
            } else if (condition.includes('cloudy')) {
                imageSrc = 'images/clouds.gif';
            } else if (condition.includes('rain')) {
                imageSrc = 'images/rain.gif';
            } else if (condition.includes('thunder')) {
                imageSrc = 'images/storm.gif';
            } else if (condition.includes('snow')) {
                imageSrc = 'images/snow.png';
            } else {
                imageSrc = 'images/default.png'; 
            }

            document.getElementById('city-name').textContent = data.location.name;
            document.getElementById('temperature').textContent = data.current.temp_c;
            document.getElementById('description').textContent = data.current.condition.text;
            document.getElementById('humidity').textContent = data.current.humidity;
            document.getElementById('wind-speed').textContent = data.current.wind_kph;
            document.getElementById('weather-icon').src = imageSrc;
        })
        .catch(error => {
            document.getElementById('weather-result').style.display = 'none';
            document.getElementById('error-message').style.display = 'block';
            document.getElementById('error-text').textContent = 'Could not find weather for that city.';
            console.error('Error:', error);
        });
}
