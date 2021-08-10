"use strict mode";
// Selecting the elements
const searchEl = document.querySelector(".search-box");
const mainEl = document.querySelector(".main-container");
const cityEl = document.querySelector(".city");
const dateEl = document.querySelector(".date");
const tempEl = document.querySelector(".temp");
const weatherEl = document.querySelector(".weather");
const minMaxEl = document.querySelector(".min-max");
const windEl = document.querySelector(".wind");
const humidityEl = document.querySelector(".humidity");
// Getting key and url for Weather API
const weatherApi = {
  key: "ba802389616b66f97d12cff363d70744",
  url: "https://api.openweathermap.org/data/2.5/weather?",
};
// Getting the Date
const today = new Date();
const now = Intl.DateTimeFormat("en-IN", {
  dateStyle: "full",
}).format(today);

// Event Listener Function
searchEl.addEventListener("keydown", function (e) {
  if (e.keyCode === 13) {
    getWeatherData(searchEl.value);
    // Clearing the input fields
    searchEl.value = "";
  }
});
// Getting weather data
const getWeatherData = async function (city) {
  try {
    const response = await fetch(
      `${weatherApi.url}q=${city}&appid=${weatherApi.key}&units=metric`
    );
    if (!response.ok)
      throw new Error(`City is not found (${response.status}) Try again!😀`);
    const data = await response.json();
    setWeatherData(data);
  } catch (err) {
    alert(`${err.message}`);
  }
};
// Setting weather data
const setWeatherData = function (data) {
  cityEl.textContent = `${data.name}, ${data.sys.country}`;
  dateEl.textContent = `${now}`;
  tempEl.textContent = `${Math.round(data.main.temp)}°c`;
  console.log(tempEl.textContent);
  weatherEl.textContent = `${data.weather[0].main}`;
  minMaxEl.textContent = `${Math.floor(
    data.main.temp_min
  )}°c(min) / ${Math.ceil(data.main.temp_max)}°c(max)`;
  windEl.textContent = `${data.wind.speed}km/h`;
  humidityEl.textContent = `${data.main.humidity}%`;
  mainEl.style.opacity = 1;
};
