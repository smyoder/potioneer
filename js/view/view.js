class View {
  static resizeCanvases() {
    let canvases = document.getElementsByClassName("rendered-canvas");
    for(let canvas of canvases) {
      canvas.width = canvas.parentNode.offsetWidth;
      canvas.height = canvas.parentNode.offsetHeight;
      let obj = gameObjects[canvas.id];
      if(obj instanceof Cauldron) {
        renderCauldron(canvas.id);
      } else if(obj instanceof Container) {
        renderContainer(canvas.id);
      }
    }
  }

  static idCounter = 0;
  static linkIds(name, dom, obj) {
    if(!obj.id) {
      obj.id = `${View.idCounter}`;
      View.idCounter++;
    }
    let id = `${obj.id}-${name}`;
    dom.id = id;
    gameObjects[id] = obj;
  }
}