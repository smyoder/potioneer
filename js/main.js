var gameObjects = {}

var inventory = [null, null, null, null, null, null, null, null, null, null];
initInventory(inventory);

var cauldron = new Cauldron(100, 1);
var cauldronStand = new CauldronStand(cauldron);
var workshop = [[new Shelf(), cauldronStand, new Shelf(), null], [null, null, null, null]];
for(let i = 0; i < 2; i++) {
  for(let j = 0; j < 5; j++) {
    workshop[0][0].inventory[i][j] = new RawIngredient("Debug", 1, 0, [0, 0, 0, 0], "img/powder.png");
  }
}
initWorkshop(workshop);

// let cauldronInfo = document.getElementById(cauldronStand.infoId);

// Game constants
const FILL_PER_TICK = 1;
const HEAT_PER_TICK = 10;

// Game data
var objectMap = {};
var canvas = document.getElementById(cauldron.id);
var fillCauldronButton = document.getElementById("fill-cauldron-button");
var heatCauldronButton = document.getElementById("heat-cauldron-button");

var cauldronImg = new Image();
cauldronImg.src = "img/cauldron_clear.png";
var cauldronMaskImg = new Image();
cauldronMaskImg.src = "img/cauldron_mask.png";

var examining = false;

var fillingCauldron = false;
var heatingCauldron = false;

function gameLoop(timestamp) {
  tick();
  render();
  window.requestAnimationFrame(gameLoop);
}

function tick(timestamp) {
  // cauldronInfo.innerHTML = cauldron.info;
  
  if(fillingCauldron) {
    cauldron.addBase(new PotionBase([0, 0, 0, 0], FILL_PER_TICK, 0, 100));
  }
  if(heatingCauldron) {
    cauldron.addHeat(HEAT_PER_TICK);
  }
}

function render() {
  let ctx = canvas.getContext("2d");
  ctx.fillStyle = "#0F1128";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Cauldron contents
  let fillAmount = cauldron.occupiedVolume / cauldron.volume * canvas.height;
  ctx.fillStyle = "rgba(0, 255, 255, 0.5)";
  ctx.fillRect(0, canvas.height - fillAmount, canvas.width, fillAmount);
  
  ctx.drawImage(cauldronImg, 0, 0);
  
  // Heat Gradient
  let gradient = ctx.createLinearGradient(0, canvas.height, 0, 0);
  heatGradient(cauldron.heat, gradient);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  ctx.drawImage(cauldronMaskImg, 0, 0);
}

function heatGradient(temperature, gradient) {
  if(temperature < 50) {
    gradient.addColorStop(0, `rgba(255, 0, 0, 0.5)`);
    gradient.addColorStop(temperature / 50 * 3/16, `rgba(255, 0, 0, ${temperature / 50 * 0.5})`);
  } else if(temperature < 100) {
    gradient.addColorStop(0, `rgba(255, 255, 0, 0.5)`);
    gradient.addColorStop((temperature - 50) / 50 * 2/16, `rgba(255, ${(temperature - 50) / 50 * 255}, 0, 0.5)`);
    gradient.addColorStop(3/16, `rgba(255, 0, 0, 0.5)`);
  } else if(temperature < 200) {
    gradient.addColorStop(0, `rgba(255, 255, 255, 0.5)`);
    gradient.addColorStop((temperature - 100) / 100 * 1/16, `rgba(255, 255, ${(temperature - 100) / 100 * 255}, 0.5)`);
    gradient.addColorStop(2/16, `rgba(255, 255, 0, 0.5)`);
    gradient.addColorStop(3/16, `rgba(255, 0, 0, 0.5)`);
  } else {
    gradient.addColorStop(0, `rgba(255, 255, 255, 0.5)`);
    gradient.addColorStop(1/16, `rgba(255, 255, 255, 0.5)`);
    gradient.addColorStop(2/16, `rgba(255, 255, 0, 0.5)`);
    gradient.addColorStop(3/16, `rgba(255, 0, 0, 0.5)`);
  }
  gradient.addColorStop(4/16, `rgba(255, 0, 0, 0)`);
}

window.requestAnimationFrame(gameLoop);