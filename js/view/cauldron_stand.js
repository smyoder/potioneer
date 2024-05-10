function renderCauldron(id) {
  let canvas = document.getElementById(id);
  let cauldronImg = document.getElementById("cauldron-image");
  
  let ctx = canvas.getContext("2d");
  ctx.fillStyle = "#0F1128";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(cauldronImg, 0, 0, canvas.width, canvas.height);
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
