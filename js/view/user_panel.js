/***************************Inventory***************************/
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