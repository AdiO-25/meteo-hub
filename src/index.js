function showSearchCity(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#city-input");
  let cityResult = document.querySelector("#city-result");
  cityResult.innerHTML = cityElement.value;
}

let searchFormElement = document.querySelector("#city-form");
searchFormElement - addEventListener("submit", showSearchCity);
