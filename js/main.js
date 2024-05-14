// Init page
var gameObjects = {}

var inventory = [null, null, null, null, null, null, null, null, null, null];
initInventory(inventory);
var eyes = new Tool("eyes", ["appearance", "volume"], 0);

var cauldron = new Cauldron(100, 1);
var cauldronStand = new CauldronStand(cauldron);
var workshop = [[new Shelf(), cauldronStand, new Shelf(), null], [null, null, null, null]];
for(let i = 0; i < 2; i++) {
  for(let j = 0; j < 5; j++) {
    workshop[0][0].inventory[i][j] = new Container("Jar", 12, "jar-back-image", "jar-front-image",
      new RawIngredient("Debug", "powder", "white", 1, 0, [0, 0, 0, 0], "img/powder.png")
    );
  }
}
initWorkshop(workshop);
resizeCanvases();

// Add listeners
document.onkeyup = shortcuts;
window.onresize = resizeCanvases;

// Game constants
const FILL_PER_TICK = 1;
const HEAT_PER_TICK = 10;

// Game data
var objectMap = {};
var examining = false;
