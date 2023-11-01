const apiKey = "82bca403ade5d13b867e3303153c868c";

function getWeather() {
    const city = document.getElementById('js-city-name').value;
    
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
       .then(response => response.json())
        .then(data => {
            const kelvinTemperature = data.main.temp;
            const celsiusTemperature = kelvinTemperature - 273.15;
            const roundedCelsiusTemperature = Math.round(celsiusTemperature.toFixed(2));
            
            document.querySelector('.temperature')
                .innerHTML =`${roundedCelsiusTemperature}°C`;
            
            document.querySelector('.city-name')
                .innerHTML= `${city}`;

            const weatherDescription = data.weather[0].description;
            document.querySelector('.weather-description')
                .innerHTML= `${weatherDescription}`;
            
            const sunriseTimestamp = data.sys.sunrise;
            const sunriseDate = new Date(sunriseTimestamp * 1000);
            const options = { hour: 'numeric', minute: '2-digit', hour12: true };
            const sunriseTime = sunriseDate.toLocaleTimeString('en-US', options);
            document.querySelector('.sunrise')
                .innerHTML=`${sunriseTime}`;
            
            const sunsetTimestamp = data.sys.sunset;
            const sunsetDate = new Date(sunsetTimestamp * 1000);
            const sunsetTime = sunsetDate.toLocaleTimeString('en-US', options);
            document.querySelector('.sunset')
                .innerHTML=`${sunsetTime}`;

            const weatherIcon = document.querySelector('.weather-icons');
            if (data.weather[0].main === 'Clouds') {
                weatherIcon.src = "weather-icons/icons8-clouds-96.png";
            } else if (data.weather[0].main === 'Clear') {
                weatherIcon.src = "weather-icons/icons8-sun-96.png";
            } else if (data.weather[0].main === 'Rain') {
                weatherIcon.src = "weather-icons/rainy-weather.png";
            } else if (data.weather[0].main === 'Drizzle') {
                weatherIcon.src = "weather-icons/icons8-rain-cloud-96.png";
            } else if (data.weather[0].main === 'Mist') {
                weatherIcon.src = "weather-icons/icons8-partly-cloudy-day-96.png";
            } else if (data.weather[0].main === 'Snow') {
                weatherIcon.src = "weather-icons/icons8-snow-96.png";
            };

        document.querySelector('.weather').style.display = "block";

        })
        .catch(error => {
             console.error('Error fetching weather data: ', error);
        });
}

function pressEnter(event){
    if ( event.key === 'Enter'){
      getWeather();
    };
  }   