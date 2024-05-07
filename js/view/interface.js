/************************SHORTCUTS************************/
function shortcuts(event) {
  
}

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

var showInfoPanel = false;
function displayInfoPanel(event, object) {
  if(object && object.info) {
    if(examining) {
      showInfoPanel = true;
      let infoPanel = document.getElementById("info-panel");
      infoPanel.style.display = "block";
      infoPanel.style.left = `${event.pageX + 1}px`;
      infoPanel.style.top = `${event.pageY + 1}px`;
      infoPanel.innerHTML = object.info;
    }
  }
}

function hasInfoMouseMove(event) {
  if(showInfoPanel) {
    let infoPanel = document.getElementById("info-panel");
    infoPanel.style.left = `${event.pageX + 1}px`;
    infoPanel.style.top = `${event.pageY + 1}px`;
  }
}

function hideInfoPanel(object) {
  showInfoPanel = false;
  let infoPanel = document.getElementById("info-panel");
  infoPanel.style.display = "none";
}