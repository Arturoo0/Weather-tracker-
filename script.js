
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
          <p class="card-text currentWeather">🌧</p>
          </div>
        </div>
      </div>
      <div class="col-sm-6">
        <div class="card">
          <div class="card-body">
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a href="#" class="btn btn-primary card-btn">View forecast</a>
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

function removeCard(event) {
  const parentCard = event.target.closest(".col-lg-6");
  const allCards = cardRow.querySelectorAll(".col-lg-6");;

  cardRow.innerHTML = "";

  allCards.forEach(card => {
    cardRow.appendChild(card);
  });

  parentCard.remove();
}

function addCard(row) {
  const newCard = document.createElement("div");
  newCard.className = "col-lg-6 col-md-6 animated slideInUp";
  newCard.innerHTML = cardHTML;

  const removeButton = newCard.querySelector(".remove-btn");
  removeButton.onclick = removeCard;

  row.appendChild(newCard);
}

addTracker.onclick = () => {
  if(cardRow.children.length >= 8) return;
  addCard(cardRow);
}
