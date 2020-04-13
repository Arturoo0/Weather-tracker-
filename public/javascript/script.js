
const cardAdd = document.querySelector("#card-add");
const cardContainer = document.querySelector("#card-container");
const cardRow = cardContainer.querySelector("#card-row");

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
            <h3 class="card-title temp-text">...</h3>
          </div>
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-between">
      <a href="#" class="btn btn-primary card-btn" data-toggle="modal" data-target="#forecast-modal" onclick="displayForecast(event)">View forecast</a>
      <button class="remove-btn" type="button" name="button" onclick="removeCard(event)">🗑</button>
    </div>
  </div>
</div>
`
const modalColHTML = `
<div class="row">
  <div class="col-12 rain text-center">...</div>
  <div class="col-6 temp">...</div>
  <div class="col-6 time">...</div>
</div>
`

const weatherMapping = {
  ["Clouds"] : "☁️",
  ["Clear"] : "☀️",
  ["Rain"] : "🌧"
};

function createModalBody() {
  const modalRow = document.querySelector(".modal-row");

  const colClassList = ["col-4", "border"];

  for(let i = 0; i < 8; ++i) {
    const col = document.createElement("div");
    col.classList.add(...colClassList);

    col.innerHTML = modalColHTML;
    modalRow.appendChild(col);
  }
}

async function getLocationData(location) {
  const requestURL = `/location?q=${location}`;

  let response = await fetch(requestURL);
  let data = await response.json();

  return data;
}

async function getForecastData(location) {
  const requestURL = `/forecast?q=${location}`;

  const requestData = sessionStorage.getItem(requestURL);

  if(requestData !== null) {
    console.log("Data already cached!");
    return JSON.parse(requestData);
  }

  let response = await fetch(requestURL);
  let data = await response.json();

  sessionStorage.setItem(requestURL, JSON.stringify(data));

  return data;
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
  const locationData = await getLocationData(location);

  let cardTitle = card.querySelector(".card-title");
  let cardTemp = card.querySelector(".temp-text");
  let cardWeatherSymbol = card.querySelector(".current-weather");

  cardTitle.innerHTML = `${locationData.name}`;
  cardTemp.innerHTML = `${locationData.temp}°`;
  cardWeatherSymbol.innerHTML =`${weatherMapping[locationData.weatherSymbol]}`;
}

async function displayForecast(event){
  const parentCard = event.target.closest(".col-lg-6");
  const locationName = parentCard.querySelector(".card-title");

  const forecastData = await getForecastData(locationName.innerText);

  let modal = document.querySelectorAll(".col-4 .row");

  for (let i = 0; i < modal.length; i++){
    let rain = modal[i].querySelector(".rain");
    let temp = modal[i].querySelector(".temp");

    temp.innerHTML = `${forecastData.forecast[i].main.temp}°`;
    let description = forecastData.forecast[i].weather[0].main;

    rain.innerHTML = weatherMapping[description];
  }
}

cardAdd.onclick = async () => {
  if(cardRow.children.length >= 8) return;

  const selectedArea = document.querySelector("#city-selector");
  let selection = selectedArea.options[selectedArea.selectedIndex].text;

  let card = newCard();
  await updateCard(card, selection);

  cardRow.appendChild(card);
}

window.onload = async () => {
  sessionStorage.clear();

  createModalBody();

  let card1 = newCard();
  let card2 = newCard();

  await updateCard(card1, "New York");
  await updateCard(card2, "Miami");

  cardRow.appendChild(card1);
  cardRow.appendChild(card2);
}
