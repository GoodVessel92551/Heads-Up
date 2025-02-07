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
    }else{
      greenFlipMeter.style.height = "20px"
    }
    if(gammaPercent < 0){
      console.log("here");
      greenFlipMeter.style.bottom = (Math.abs(gammaPercent)) + "%";

    }else if(gammaPercent > 0){
      greenFlipMeter.style.bottom = ((100-Math.abs(gammaPercent))) + "%";
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