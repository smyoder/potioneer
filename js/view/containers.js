function createContainerDOM(container) {
  let dragDOM = document.createElement("div");
  dragDOM.draggable = true;
  dragDOM.ondragstart = dragIngredient;
  dragDOM.ondragend = ingredientDragEnd;
  dragDOM.onmousemove = event => hasInfoMouseMove(event, gameObjects[dragDOM.id]);
  dragDOM.onmouseover = event => examine(event, gameObjects[dragDOM.id]);
  dragDOM.onmouseout = event => hideInfoPanel();
  
  let canvasSizer = document.createElement("div");
  
  let containerDOM = document.createElement("canvas");
  containerDOM.draggable = false;
  linkIds("container", containerDOM, container)
  containerDOM.onload = () => sizeShelfItem(containerDOM);
  canvasSizer.appendChild(containerDOM);
  dragDOM.appendChild(canvasSizer);
  
  let containerImage = document.getElementById(container.backImgId);
  if(containerImage.width > containerImage.height) {
    canvasSizer.style.width = "100%";
  } else {
    canvasSizer.style.height = "100%";
  }
  canvasSizer.style.aspectRatio = containerImage.height / containerImage.width;
  
  return dragDOM;
}

function renderContainer(id) {
  let container = gameObjects[id];
  let canvas = document.getElementById(id);
  let ctx = canvas.getContext("2d");
  let backImg = document.getElementById(container.backImgId);
  let frontImg = document.getElementById(container.frontImgId);
  
  ctx.drawImage(backImg, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(frontImg, 0, 0, canvas.width, canvas.height);
}
