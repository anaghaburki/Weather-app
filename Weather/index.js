    async function fetchWeather() {
       
        let searchInput = document.getElementById('search').value;
        const weatherDataSection = document.getElementById("weather-data");
        weatherDataSection.style.display = "block";
      
        const apiKey = "eb268bfca0c4bdf6c4b0b327e841ca4e";

      
      
        if(searchInput == "") {
          weatherDataSection.innerHTML = `
          <div>
          <h2>Empty Input!</h2>
          <p>Please try again with a valid <u>city name</u>.</p>
          </div>
          `;
          return;
        }
      
        
        async function getLonAndLat() {
          const countryCode = 1
          geocodeURL = `http://api.openweathermap.org/geo/1.0/direct?q=${searchInput.replace(" ", "%20")},${countryCode}&limit=1&appid=${apiKey}`
      
          const response = await fetch(geocodeURL);
          if(!response.ok) {
            console.log("Bad response! ", response.status);
            return;
          }
      
          const data = await response.json();
          if(data.length == 0) {
            console.log("Something went wrong here.");
            weatherDataSection.innerHTML = `
            <div>
            <h2>Invalid Input: "${searchInput}"</h2>
            <p>Please try again with a valid <u>city name</u>.</p>
            </div>
            `;
            return;
          } else {
            return data[0];
          }
        }
      
        async function getWeatherData(lon, lat) {
         
          const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
          const response = await fetch(weatherURL);
      
         
          const data = await response.json();
          weatherDataSection.style.display = "flex";
          weatherDataSection.innerHTML = `
          <div>
            <h2>${data.name}</h2>
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="${data.weather[0].description}" width= 80" />
            <p><strong>Temperature:</strong> ${Math.round(data.main.temp - 273.15)}°C</p>

            <p><strong>Description:</strong> ${data.weather[0].description}</p>
            <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
            <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
            <p><strong>Visibility:</strong> ${data.visibility} meters</p>
            <p><strong>Sunrise:</strong> ${new Date(data.sys.sunrise * 1000).toLocaleTimeString()}</p>
            <p><strong>Sunset:</strong> ${new Date(data.sys.sunset * 1000).toLocaleTimeString()}</p>
            <p><strong>Pressure:</strong> ${data.main.pressure} hPa</p>
            <p><strong>Cloudiness:</strong> ${data.clouds.all}%</p>
            <p><strong>Timezone:</strong> ${data.timezone / 3600} hours from UTC</p>
          </div>
          `
        }
      
       
        document.getElementById("search").value = "";
        const geocodeData = await getLonAndLat();
        getWeatherData(geocodeData.lon, geocodeData.lat);
      }

      function changeBackground(gradient) {
        document.body.style.background = gradient;
      }
      
