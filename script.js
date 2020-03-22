
const addTracker = document.querySelector("#addTracker");
const removeTracker = document.querySelector("#removeTracker");
const cardContainer = document.querySelector("#card_container");
const cardRow = cardContainer.querySelector("#card-row");

const cardHTML = `
<div class="card">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <div class="d-flex justify-content-between">
      <a href="#" class="btn btn-primary card-btn">Go somewhere</a>
      <button class="removeTracker" type="button" name="button" onclick="removeCard(event)">🗑</button>
    </div>
  </div>
</div>
`

function removeCard(event) {
  const parentCard = event.target.closest(".col-lg-4");
  const allCards = cardRow.querySelectorAll(".col-lg-4");;

  cardRow.innerHTML = "";

  allCards.forEach(card => {
    cardRow.appendChild(card);
  });

  parentCard.remove();
}

function addCard(row) {
  const newCard = document.createElement("div");
  newCard.className = "col-lg-4 col-md-6 animated slideInUp";
  newCard.innerHTML = cardHTML;

  const removeButton = newCard.querySelector(".removeTracker");
  removeButton.onclick = removeCard;

  row.appendChild(newCard);
}

addTracker.onclick = () => {
  if(cardRow.children.length >= 8) return;
  addCard(cardRow);
}
