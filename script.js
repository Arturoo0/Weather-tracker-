
const addTracker = document.querySelector(".button");
console.log(addTracker);

const cardHTML = `
<div class="card">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>
`

function createColumn() {
  let newCol = document.createElement('div');
  newCol.className = "col-lg-4 col-md-6";
  newCol.innerHTML = cardHTML;

  return newCol;
}

addTracker.onclick = () => {
  cardCols = document.querySelectorAll(".col-lg-4");
  cardContainer = document.querySelector("#card_container");

  if (cardCols.length % 3 === 0){
    let newRow = document.createElement('div');
    newRow.className = "row justify-content-center align-items-center";

    let newCol = createColumn();

    newRow.appendChild(newCol);
    cardContainer.appendChild(newRow);

  }else{
    let lastRow = cardContainer.lastElementChild;

    let newCol = createColumn();
    lastRow.appendChild(newCol);
  }
};
