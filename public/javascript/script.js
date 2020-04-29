
const cardAdd = document.querySelector("#card-add");
const cardContainer = document.querySelector("#card-container");
const cardRow = cardContainer.querySelector("#card-row");
const cardClose = document.querySelector("#card-add-close");
const displayStatus = document.querySelector("#error-message");
const removeButton = document.querySelector(".remove-btn");

let errorToggle = false;

const cardHTML = `
<div class="card">
  <div class="card-body">
    <h2 class="card-title">...</h2>
    <div class="row">
      <div class="col-sm-6">
        <div class="card">
          <div class="card-body">
          <p class="card-text current-weather">...</p>
          </div>
        </div>
      </div>
      <div class="col-sm-6">
        <div class="card">
          <div class="card-body">
            <h3 class="card-title temp-text mb-4">...</h3>
            <h5 class="card-humidity">...</h5>
            <h5 class="card-windSpeed">...</h5>
          </div>
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-between">
      <a href="#" class="btn btn-primary card-btn" data-toggle="modal" data-target="#forecast-modal" onclick="displayForecast(event)">View forecast</a>
        <button class="remove-btn btn btn-danger" type="button" name="button" onclick="removeCard(event)">
          <div class="btn-cont">
            <span class="remove-text">Remove</span>
            <span class="remove-icon fas fa-trash-alt"></span>
          </div>
        </button>
    </div>
  </div>
</div>
`
const modalColHTML = `
<div class="row">
  <div class="col-12 rain text-center">...</div>
  <div class="col-6 temp">...</div>
  <div style="font-size: .3rem; font-weight: bold;" class="col-6 time mt-2">...</div>
</div>
`

const weatherMapping = {
  ["Clouds"] : "☁️",
  ["Clear"] : "☀️",
  ["Rain"] : "🌧",
  ["Snow"] : "❄️",
  ["Thunderstorm"] : "⛈",
  ["Drizzle"] : "💦"
};

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function dtConvert(dt, format){
  const date = new Date(parseInt(dt) * 1000);
  const time = date.toLocaleTimeString("en-US");

  if(format === "time") return time

  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();

  const regexTime = (format === "date") ? ("") : (time.replace(/:\d+ /, " ") + " ");

  return `${regexTime}${month}/${day}/${year}`;
}

function createModalBody() {
  const modalRow = document.querySelector(".modal-row");

  const colClassList = ["col-4", "border"];

  for(let i = 0; i < 9; ++i) {
    const col = document.createElement("div");
    col.classList.add(...colClassList);

    col.innerHTML = modalColHTML;
    modalRow.appendChild(col);
  }
}

function removeCard(event) {
  const parentCard = event.target.closest(".col-lg-6");
  const allCards = cardRow.querySelectorAll(".col-lg-6");

  cardRow.innerHTML = "";

  allCards.forEach(card => {
    cardRow.appendChild(card);
  });

  parentCard.remove();
}

function newCard() {
  const newCard = document.createElement("div");
  newCard.className = "col-lg-6 col-md-6 animated slideInUp";
  newCard.innerHTML = cardHTML;

  const removeButton = newCard.querySelector(".remove-btn");
  removeButton.onclick = removeCard;

  return newCard;
}

async function updateCard(card, location) {
  const locationData = await getEndpointData(location, "location");

  if (locationData.status == 400)
    return 400;

  const cardTitle = card.querySelector(".card-title");
  const cardTemp = card.querySelector(".temp-text");
  const cardWeatherSymbol = card.querySelector(".current-weather");
  const cardHumidity = card.querySelector(".card-humidity");
  const cardWindSpeed = card.querySelector(".card-windSpeed");

  cardHumidity.innerHTML = `Humidity: ${locationData.humidity}%`;
  cardWindSpeed.innerHTML = `Wind Speed: ${locationData.windSpeed} mph`;
  cardTitle.innerHTML = `${locationData.name}`;
  cardTemp.innerHTML = `${locationData.temp}° F`;
  cardWeatherSymbol.innerHTML =`${weatherMapping[locationData.weatherSymbol]}`;

  return 200;
}

async function getEndpointData(location, endpoint) {
  const requestURL = `/${endpoint}?q=${location}`;
  const requestData = sessionStorage.getItem(requestURL);

  if(requestData !== null) return JSON.parse(requestData);

  try {
    const response = await fetch(requestURL);

    if(!response.ok) throw new Error(response.statusText);

    const data = await response.json();
    sessionStorage.setItem(requestURL, JSON.stringify(data));

    return data;

  } catch (error) {
    return {
      status : 400
    }
  }
}

async function displayForecast(event){
  const parentCard = event.target.closest(".col-lg-6");
  const locationName = parentCard.querySelector(".card-title");

  const forecastData = await getEndpointData(locationName.innerText, "forecast");

  const modal = document.querySelectorAll(".col-4 .row");

  let rain, temp, time, description;

  for (let i = 0; i < modal.length; i++){
    rain = modal[i].querySelector(".rain");
    temp = modal[i].querySelector(".temp");
    time = modal[i].querySelector(".time");

    temp.innerHTML = `${forecastData.forecast[i].main.temp}°`;

    description = forecastData.forecast[i].weather[0].main;
    rain.innerHTML = weatherMapping[description];

    dt = forecastData.forecast[i].dt;
    time.innerHTML = dtConvert(parseInt(dt), "full");
  }
}

cardAdd.onclick = async () => {
  if(cardRow.children.length >= 8) return;

  const selectedArea = document.querySelector("#city-selector");
  const modal = document.querySelector("#add-card-body");

  const selection = selectedArea.value;

  const card = newCard();
  const status = await updateCard(card, selection);

  if (status === 400){
    if(!errorToggle)
      displayStatus.classList.toggle("d-none");

    errorToggle = true;
    return;
  }else if (status === 200 && errorToggle){
    displayStatus.classList.toggle("d-none");
    errorToggle = false;
  }

  cardRow.appendChild(card);
}

cardClose.onclick = () => {
  if (errorToggle) {
    displayStatus.classList.toggle("d-none");
  }
  errorToggle = false;
}

window.onload = async () => {
  sessionStorage.clear();

  createModalBody();

  const card1 = newCard();
  const card2 = newCard();

  await updateCard(card1, "New York");
  await updateCard(card2, "Miami");

  const spinner = document.querySelector(".loading-spinner");

  spinner.style.display = "none";

  cardRow.appendChild(card1);
  cardRow.appendChild(card2);
}
