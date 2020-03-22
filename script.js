
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
<<<<<<< HEAD
=======

function createColumn() {
  const newCol = document.createElement('div');
  newCol.className = "col-lg-4 col-md-6 animated slideInUp";
  newCol.innerHTML = cardHTML;
>>>>>>> master

function removeCard(event) {
  const parentCard = event.target.closest(".col-lg-4");
  const allCards = cardRow.querySelectorAll(".col-lg-4");;

<<<<<<< HEAD
  cardRow.innerHTML = "";

  allCards.forEach(card => {
    cardRow.appendChild(card);
  });
=======
function deleteTracker(element){
  let totalRows = document.querySelectorAll(".row");
  let lastRow = totalRows[totalRows.length - 1];

  if (lastRow.children.length === 1){
    lastRow.remove();
  }else{
    lastRow.lastElementChild.remove();
  }

  totalRows = document.querySelectorAll(".row");
  let card_container = document.querySelector("#card_container");
  const cardStack = document.querySelectorAll(".col-lg-4");
>>>>>>> master

  parentCard.remove();
}

function addCard(row) {
  const newCard = document.createElement("div");
  newCard.className = "col-lg-4 col-md-6 animated slideInUp";
  newCard.innerHTML = cardHTML;

<<<<<<< HEAD
  const removeButton = newCard.querySelector(".removeTracker");
  removeButton.onclick = removeCard;

  row.appendChild(newCard);
=======
  for (let i = 0; i < totalRows.length; i++){
    for (let j = 0; j < 2; j++){
      if (myArray.length != 0){
        totalRows[i].appendChild(myArray.shift());
      }
      else
        break;
    }
  }
>>>>>>> master
}

addTracker.onclick = () => {
  if(cardRow.children.length >= 8) return;
  addCard(cardRow);
}
