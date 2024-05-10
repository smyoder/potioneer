function resizeCanvases() {
  let canvases = document.getElementsByTagName("canvas");
  for(let canvas of canvases) {
    canvas.width = canvas.parentNode.offsetWidth;
    canvas.height = canvas.parentNode.offsetHeight;
  }
}

var idCounter = 0;
function linkIds(name, dom, obj) {
  let id = `${name}${idCounter}`;
  idCounter++;
  dom.id = id;
  obj.id = id;
  gameObjects[id] = obj;
}