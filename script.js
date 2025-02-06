window.addEventListener("deviceorientation", handleOrientation, true);


const gammaElement = document.getElementById("gammaElement");

function handleOrientation(event) {
    const gamma = event.gamma;
    gammaElement.innerHTML = "Gamma: "+gamma;
  }