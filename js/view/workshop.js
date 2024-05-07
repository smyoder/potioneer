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
        if(workstand instanceof CauldronStand) {
          cauldronStandLoaded(workstand, dom);
        }
      }
    }
  }
}

/************************Caludron Stand*************************/
function createCauldronStand(stand) {
  let standDOM = document.getElementById("cauldron-stand-factory").cloneNode(true);
  linkIds("cauldron-stand", standDOM, stand);
  let cauldronDOM = standDOM.querySelector("#cauldron-canvas");
  linkIds("cauldron", cauldronDOM, stand.cauldron);
  return standDOM;
}

function cauldronStandLoaded(stand, standDOM) {
  let cauldronDOM = document.getElementById(stand.cauldron.id);
  sizeCanvas(cauldronDOM, cauldronDOM.parentElement);
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
  linkIds("shelf", shelf, shelfDOM);
  
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
        let itemContainer = document.createElement("div");
        itemContainer.draggable = true;
        linkIds("item", itemContainer, shelf.inventory[i][j])
        itemContainer.ondragstart = dragIngredient;
        itemContainer.ondragend = ingredientDragEnd;
        itemContainer.onmousemove = hasInfoMouseMove;
        itemContainer.onmouseover = evt => displayInfoPanel(evt, gameObjects[itemContainer.id]);
        itemContainer.onmouseout = evt => hideInfoPanel(gameObjects[itemContainer.id]);
        
        let itemDOM = document.createElement("img");
        itemDOM.src = shelf.inventory[i][j].imgSrc;
        itemDOM.draggable = false;
        itemDOM.onload = () => sizeShelfItem(itemDOM);
        shelfSpot.appendChild(itemContainer);
        itemContainer.appendChild(itemDOM);
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

function sizeShelfItem(itemDOM) {
  if(itemDOM.width > itemDOM.height) {
    itemDOM.style = "max-width: 100%;";
  } else {
    itemDOM.style = "max-height: 100%;";
  }
}