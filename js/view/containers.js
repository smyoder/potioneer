function createContainerDOM(container) {
  let dragDOM = document.createElement("div");
  dragDOM.classList.add("drag-box");
  View.linkIds("drag-box", dragDOM, container);
  dragDOM.draggable = true;
  dragDOM.ondragstart = dragIngredient;
  dragDOM.ondragend = ingredientDragEnd;
  dragDOM.onmousemove = event => hasInfoMouseMove(event, gameObjects[dragDOM.id]);
  dragDOM.onmouseover = event => examine(event, gameObjects[dragDOM.id]);
  dragDOM.onmouseout = event => hideInfoPanel();
  
  let canvasSizer = document.createElement("div");
  canvasSizer.classList.add("canvas-container");
  
  let canvas = document.createElement("canvas");
  canvas.classList.add("rendered-canvas");
  canvas.draggable = false;
  View.linkIds("canvas", canvas, container)
  canvas.onload = () => sizeShelfItem(canvas);
  
  let containerImage = document.getElementById(container.backImgId);
  canvasSizer.style.aspectRatio = `${containerImage.width} / ${containerImage.height}`;
  if(containerImage.width > containerImage.height) {
    canvasSizer.style.maxWidth = "100%";
  } else {
    canvasSizer.style.maxHeight = "100%";
  }
  
  canvasSizer.appendChild(canvas);
  dragDOM.appendChild(canvasSizer);
  
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
