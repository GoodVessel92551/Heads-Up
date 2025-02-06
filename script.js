window.addEventListener("deviceorientation", handleOrientation, true);


const gammaElement = document.getElementById("gammaElement");
let gamma_value = 0;
function handleOrientation(event) {
    let gamma_difference = event.gamma - gamma_value;
    gamma_value = event.gamma;
    console.log(gamma_difference);
    let gamma = event.gamma;
    console.log((gamma > 70 || gamma <-70))
    if (gamma > 70 || gamma <-70){
      document.body.style.backgroundColor = "blue";
    }else if (gamma > 0 && gamma < 70){
      document.body.style.backgroundColor = "red";
    }
    else if (gamma < 0 && gamma > -70){
      document.body.style.backgroundColor = "green";
    }
    else{
      document.body.style.backgroundColor = "white";
    }
    gammaElement.innerHTML = "Gamma: "+gamma;
  }