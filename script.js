window.addEventListener("deviceorientation", handleOrientation, true);
const greenFlipMeter = document.getElementById("greenFlipMeter");
const redFlipMeter = document.getElementById("redFlipMeter");

const gammaElement = document.getElementById("gammaElement");
let gamma_value = 0;
function handleOrientation(event) {
    let gamma_difference = event.gamma - gamma_value;
    gamma_value = event.gamma;
    let gammaPercent = (50/gamma_value)*100;
    console.log(gammaPercent);
    if (gammaPercent > 100){
      gammaPercent = 100;
    }else if (gammaPercent < -100){
      gammaPercent = -100;
    }
    if(gammaPercent < 0){
      console.log("here");
      greenFlipMeter.style.height = (Math.abs(gammaPercent))/2 + "%";
      redFlipMeter.style.height = "0%";
    }else if(gammaPercent > 0){
      greenFlipMeter.style.height = "0%";
      redFlipMeter.style.height = (Math.abs(gammaPercent))/2 + "%";
    }
    let gamma = event.gamma;
    if (gamma > 50 || gamma <-50){
      document.body.style.backgroundColor = "#2C2C2C";
    }else if (gamma > 0 && gamma < 50){
      document.body.style.backgroundColor = "#FFA9A9";
    }
    else if (gamma < 0 && gamma > -50){
      document.body.style.backgroundColor = "#CAFFA9";
    }
    else{
      document.body.style.backgroundColor = "#2C2C2C";
    }
    gammaElement.innerHTML = "Gamma: "+gamma;
  }