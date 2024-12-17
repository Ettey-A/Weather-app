document.querySelector(".search").addEventListener("click", function () {
    const city = document.querySelector(".txtbox").value;
    fetchWeather(city);
  });
  
  document.querySelector(".txtbox").addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      const city = document.querySelector(".txtbox").value;
      fetchWeather(city);
    }
  });
  
  async function fetchWeather(city) {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ffa31ac7a5dfa278b91aa76944e587f3&units=metric`
      );
      if (!response.ok) {
        showWeatherResult("error", `Error fetching data. Please try again.`);
        return;
      }
  
      const data = await response.json();
  
      if (data.cod === 400 || data.cod === 404) {
        showWeatherResult(
          "error",
          `City "${city}" not found. Please enter a valid city name.`
        );
      } else {
        const { name } = data;
        const { temp, humidity } = data.main;
        const { description } = data.weather[0];
        showWeatherResult(
          "success",
          `City: ${name}<br>Temperature: ${temp}°C<br>Humidity: ${humidity}%<br>Weather: ${description}`
        );
      }
    } catch (error) {
      console.error("Error:", error);
      showWeatherResult(
        "error",
        `An unexpected error occurred. Please try again later.`
      );
    }
  }
  
  function showWeatherResult(status, content) {
    const weatherResult = document.querySelector(".weather-output");
  
    if (!weatherResult) {
      console.error("Missing .weather-output element in HTML");
      return;
    }
  
    if (status === "error") {
      weatherResult.innerHTML = `<div class="error">${content}</div>`;
    } else {
      weatherResult.innerHTML = `<div class="success">${content}</div>`;
    }
  }
  