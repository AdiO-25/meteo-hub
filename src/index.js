function updateCityTemperature(response) {
  let currentTemperatureNumber = document.querySelector(
    "#current-temperature-number"
  );
  let temperatureElement = response.data.temperature.current;
  currentTemperatureNumber.innerHTML = Math.round(temperatureElement);
  let cityResult = document.querySelector("#city-result");
  cityResult.innerHTML = response.data.city;
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

showCurrentTemperatur("Paris");
