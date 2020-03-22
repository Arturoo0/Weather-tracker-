
const addTracker = document.querySelector("#addTracker");
const removeTracker = document.querySelector(".removeTracker");

const cardHTML = `
<div class="card">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <div class="d-flex justify-content-between">
      <a href="#" class="btn btn-primary card-btn">Go somewhere</a>
      <button class="removeTracker" type="button" name="button" onclick="deleteTracker(this)"">🗑</button>
    </div>
  </div>
</div>
`
function createColumn() {
  const newCol = document.createElement('div');
  newCol.className = "col-lg-4 col-md-6 animated slideInUp";
  newCol.innerHTML = cardHTML;

  return newCol;
}

// removeTracker.onclick = () => {
//   // const cardContainer = document.querySelector('#card_container');
//   // const lastRow = cardContainer.lastElementChild;
//   //
//   // lastRow.lastElementChild.remove();
//   //
//   // if (lastRow.innerHTML === ""){
//   //   lastRow.remove();
//   // }
//   console.log('test');
//
// }

function deleteTracker(element){
  if (element.parentNode.parentNode.parentNode.parentNode.parentNode.children.length === 1){
    element.parentNode.parentNode.parentNode.parentNode.parentNode.remove();
  }else{
    element.parentNode.parentNode.parentNode.parentNode.remove();
  }

  const totalRows = document.querySelectorAll(".row");
  let card_container = document.querySelector("#card_container");
  let cardStack = document.querySelectorAll(".col-lg-4");

  for (let i = 0; i < totalRows.length; i++){
    totalRows[i].innerHTML = "";
  }

  let myArray = Array.from(cardStack)

  for (let i = 0; i < totalRows.length; i++){
    for (let j = 0; j < 2; j++){
      if (myArray.length != 0){
        totalRows[i].appendChild(myArray.shift());
      }
      else
        break;
    }
  }

}

addTracker.onclick = () => {
  const cardCols = document.querySelectorAll(".col-lg-4");
  const cardContainer = document.querySelector("#card_container");

  if (cardCols.length < 8){
    if (cardCols.length % 2 === 0){
      const newRow = document.createElement('div');
      newRow.className = "row justify-content-center align-items-center";

      const newCol = createColumn();

      newRow.appendChild(newCol);
      cardContainer.appendChild(newRow);
    }else{
      const lastRow = cardContainer.lastElementChild;

      const newCol = createColumn();
      lastRow.appendChild(newCol);
    }
  }
};
