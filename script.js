window.addEventListener("deviceorientation", handleOrientation, true);


const gammaElement = document.getElementById("gammaElement");
let gamma_value = 0;
function handleOrientation(event) {
    let gamma_difference = event.gamma - gamma_value;
    if(gamma_difference > 5){
        document.body.style.backgroundColor = "red";
    }
    else if(gamma_difference < -5){
        document.body.style.backgroundColor = "green";
    }

    const gamma = event.gamma;
    gammaElement.innerHTML = "Gamma: "+gamma;
  }