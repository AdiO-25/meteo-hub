function updateCityTemperature(response) {
  let currentTemperatureElement = document.querySelector(
    "#current-temperature-number"
  );
  let temperatureElement = response.data.temperature.current;
  let cityResult = document.querySelector("#city-result");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#temperature-icon");

  iconElement.innerHTML = `<img
                class="temperature-icon"
                src="${response.data.condition.icon_url}"
            />`;
  timeElement.innerHTML = formatDate(date);
  windElement.innerHTML = `${response.data.wind.speed}km/h`;
  humidityElement.innerHTML = response.data.temperature.humidity;
  descriptionElement.innerHTML = response.data.condition.description;
  currentTemperatureElement.innerHTML = Math.round(temperatureElement);
  cityResult.innerHTML = response.data.city;

  getForecastTemperature(response.data.city);
}

function formatDate(date) {
  let hour = date.getHours();
  let minute = date.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minute < 0) {
    minute = `0${minute}`;
  }

  return `${day} ${hour}:${minute}`;
}

function showCurrentTemperatur(city) {
  let apiKey = "ffda897ab634820409o4f30t6c83a646";
  let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiURL).then(updateCityTemperature);
}

function showSearchCity(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#city-input");

  showCurrentTemperatur(cityElement.value);
}

let searchFormElement = document.querySelector("#city-form");
searchFormElement.addEventListener("submit", showSearchCity);

function formatTime(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}

function getForecastTemperature(city) {
  let apiKey = "ffda897ab634820409o4f30t6c83a646";
  let apiURL = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiURL).then(refreshForecast);
}

function refreshForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = "";
  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `<div class="forecast-day">
<div class="forecast-container-day">${formatTime(day.time)}</div>
<img class="forecast-container-icon" src="${day.condition.icon_url}" />
<div class="forecast-container-temperatures">
  <div class="forecast-container-temperature-max">${Math.round(
    day.temperature.maximum
  )}°</div>
  <div class="forecast-container-temperature-min">${Math.round(
    day.temperature.minimum
  )}°</div>
</div>
</div>
`;
    }
  });
  forecastElement.innerHTML = forecastHTML;
}

showCurrentTemperatur("Paris");
