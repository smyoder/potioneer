/****************************Workshop***************************/
function initWorkshop(workshop) {
  let workshopDOM = document.getElementById("workshop");
  for(let i = 0; i < 2; i++) {
    for(let j = 0; j < 3; j++) {
      if(workshop[i][j] !== null) {
        let workstand = workshop[i][j];
        let dom = null;
        if(workstand instanceof Shelf) {
          dom = createShelf(workstand);
        } else if(workstand instanceof CauldronStand) {
          dom = createCauldronStand(workstand);
        }
        let oldDOM = workshopDOM.children[i].children[j];
        workshopDOM.children[i].replaceChild(dom, oldDOM);
      }
    }
  }
}

/************************Caludron Stand*************************/
function createCauldronStand(stand) {
  let standDOM = document.getElementById("cauldron-stand-factory").cloneNode(true);
  linkIds("cauldron-stand", standDOM, stand);
  let cauldronDOM = standDOM.querySelector("#cauldron-canvas");
  cauldronDOM.classList.add("rendered-canvas");
  linkIds("canvas", cauldronDOM, stand.cauldron);
  return standDOM;
}

/****************************Shelves****************************/
function dragIngredient(ev) {
  ev.dataTransfer.setData("application/id", ev.target.id);
  let targets = document.getElementsByClassName("drag-target");
  for(let target of targets) {
    if(target.children.length == 0) {
      target.classList.add("empty");
    }
  }
}

function ingredientDragEnd(ev) {
  let targets = document.getElementsByClassName("drag-target");
  for(let target of targets) {
    target.classList.remove("empty");
  }
}

function dropIngredient(ev, target) {
  if(target.children.length == 0) {
    let item = document.getElementById(ev.dataTransfer.getData("application/id"));
    item.remove();
    target.appendChild(item);
  }
}

function createShelf(shelf) {
  let shelfDOM = document.getElementById("shelf-factory").cloneNode(true);
  linkIds("shelf", shelfDOM, shelf);
  
  // For each row on the shelf
  for(let i = 0; i < shelf.inventory.length; i++) {
    let rowDOM = document.createElement("div");
    rowDOM.classList.add("shelf");
    shelfDOM.appendChild(rowDOM);
    // For each slot on the row
    for(let j = 0; j < shelf.inventory[i].length; j++) {
      let shelfSpot = document.createElement("span");
      shelfSpot.classList.add("shelf-spot");
      shelfSpot.classList.add("drag-target");
      rowDOM.appendChild(shelfSpot);
      // Put the item in the slot
      if(shelf.inventory[i][j] !== null) {
        shelfSpot.appendChild(createContainerDOM(shelf.inventory[i][j]));
      }
      
      shelfSpot.ondragover = function(ev) {
        ev.preventDefault();
      }
      shelfSpot.ondrop = function(ev) {
        dropIngredient(ev, shelfSpot);
      }
    }
  }
  return shelfDOM;
}
