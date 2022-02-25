function liveDate(date) {
  let hour = date.getHours();
  let minutes = date.getMinutes();
  if (hour < 10) {
    hour = `0${hour}`;
  }

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  let day = days[dayIndex];
  return `${day} </br>${hour}:${minutes}`;
}

let todaysDate = document.querySelector("#dates");
let currentTime = new Date();
todaysDate.innerHTML = liveDate(currentTime);

function getTemperature(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#condition").innerHTML =
    response.data.weather[0].main;
  let weatherIcon = document.querySelector("#icons");
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  weatherIcon.setAttribute("alt", response.data.weather[0].description);
}

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let days = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];

  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
      <div class="col-2">
        <div class="weather-forecast-date">${day}</div>
        <img
          src="http://openweathermap.org/img/wn/50d@2x.png"
          alt=""
          width="36"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> 18° </span>
          <span class="weather-forecast-temperature-min"> 12° </span>
        </div>
      </div>
  `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);
}
function currentWeather(city) {
  let apiKey = "4059dbca8de2f1fde78e82be329d5e71";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(getTemperature);
}

function cityInfo(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  currentWeather(city);
}

function currentLocation(position) {
  let apiKey = "4059dbca8de2f1fde78e82be329d5e71";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(getTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentLocation);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", cityInfo);

let currentLocationButton = document.querySelector("#current");
currentLocationButton.addEventListener("click", getCurrentLocation);

currentWeather("New York");
displayForecast();
