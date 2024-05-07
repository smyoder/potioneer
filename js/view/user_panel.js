function initInventory(inventory) {
  let inventoryDOM = document.getElementById("inventory-slots");
  for(let i = 0; i < inventory.length; i++) {
    let slotDOM = document.createElement("span");
    slotDOM.classList.add("inventory-slot");
    slotDOM.classList.add("drag-target");
    slotDOM.ondragover = function(ev) {
      ev.preventDefault();
    }
    slotDOM.ondrop = function(ev) {
      dropIngredient(ev, slotDOM);
    }
    inventoryDOM.appendChild(slotDOM);
  }
}

function toggleExamining() {
  examining = !examining;
  let eyeDOM = document.getElementById("examining-control").children[0];
  if(examining) {
    eyeDOM.src = "img/eye_open.png";
  } else {
    eyeDOM.src = "img/eye_closed.png";
  }
}