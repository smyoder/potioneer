function sizeCanvas(canvas, parent) {
  canvas.width = parent.offsetWidth;
  canvas.height = parent.offsetHeight;
}

var idCounter = 0;
function linkIds(name, dom, obj) {
  let id = `${name}${idCounter}`;
  idCounter++;
  dom.id = id;
  obj.id = id;
  gameObjects[id] = obj;
}