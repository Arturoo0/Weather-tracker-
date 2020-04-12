
const addTracker = document.querySelector("#add-tracker");
const cardContainer = document.querySelector("#card-container");
const cardRow = cardContainer.querySelector("#card-row");

const cardHTML = `
<div class="card">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <div class="row">
      <div class="col-sm-6">
        <div class="card">
          <div class="card-body">
          <p class="card-text current-weather">🌧</p>
          </div>
        </div>
      </div>
      <div class="col-sm-6">
        <div class="card">
          <div class="card-body">
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a href="#" class="btn btn-primary card-btn" data-toggle="modal" data-target="#forecast-modal" onclick="displayForecast(this)">View forecast</a>
          </div>
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-between">
      <a href="#" class="btn btn-primary card-btn">Go somewhere</a>
      <button class="remove-btn" type="button" name="button" onclick="removeCard(event)">🗑</button>
    </div>
  </div>
</div>
`



async function getLocationData(location) {
  const requestURL = `/location?q=${location}`;

  let response = await fetch(requestURL);
  let data = await response.json();

  return data;
}

async function getForecastData(location) {
  const requestURL = `/forecast?q=${location}`;

  let response = await fetch(requestURL);
  let data = await response.json();

  return data;
}

function removeCard(event) {
  const parentCard = event.target.closest(".col-lg-6");
  const allCards = cardRow.querySelectorAll(".col-lg-6");;

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
  let cardTemp = card.querySelector(".card-text");

  cardTitle.innerHTML = `${locationData.name}`;
  cardTemp.innerHTML = `${locationData.temp}°`;
}

async function displayForecast(card){
  // const location = card.closest(".card-title");
  const location = "las vegas";
  const forecastData = await getForecastData(location);
  let modal = document.querySelectorAll(".col-4 .row");

  for (let i = 0; i < modal.length; i++){
    let rain = modal[i].querySelector(".rain");
    let temp = modal[i].querySelector(".temp");
    temp.innerHTML = forecastData.forecast[i].main.temp;
  }

}

addTracker.onclick = () => {
  if(cardRow.children.length >= 8) return;
  let card = newCard();

  cardRow.appendChild(card);
}

window.onload = async () => {
  let card1 = newCard();
  let card2 = newCard();

  await updateCard(card1, "New York");
  await updateCard(card2, "Miami");

  cardRow.appendChild(card1);
  cardRow.appendChild(card2);
}
