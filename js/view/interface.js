/************************SHORTCUTS************************/
function shortcuts(event) {
  if(event.key == "e") {
    toggleExamining();
  }
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
    hideInfoPanel();
  }
}

function displayInfoPanel(event, object) {
  if(object && object.info) {
    if(examining) {
      let infoPanel = document.getElementById("info-panel");
      infoPanel.style.display = "block";
      infoPanel.style.left = `${event.pageX + 1}px`;
      infoPanel.style.top = `${event.pageY + 1}px`;
      infoPanel.innerHTML = object.info;
    }
  }
}

function hasInfoMouseMove(event, object) {
  if(examining) {
    let infoPanel = document.getElementById("info-panel");
    if(infoPanel.style.display == "none") {
      infoPanel.style.display = "block";
      infoPanel.innerHTML = object.info;
    }
    infoPanel.style.left = `${event.pageX + 1}px`;
    infoPanel.style.top = `${event.pageY + 1}px`;
  }
}

function hideInfoPanel() {
  let infoPanel = document.getElementById("info-panel");
  infoPanel.style.display = "none";
}