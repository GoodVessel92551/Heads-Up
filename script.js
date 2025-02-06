window.addEventListener("deviceorientation", handleOrientation, true);

const absoluteElement = document.getElementById("absoluteElement");
const alphaElement = document.getElementById("alphaElement");
const betaElement = document.getElementById("betaElement");
const gammaElement = document.getElementById("gammaElement");

function handleOrientation(event) {
    const absolute = event.absolute;
    const alpha = event.alpha;
    const beta = event.beta;
    const gamma = event.gamma;
    absoluteElement.innerHTML = "Absolute:"+absolute;
    alphaElement.innerHTML = "Alpha: "+alpha;
    betaElement.innerHTML = "Beta: "+beta;
    gammaElement.innerHTML = "Gamma: "+gamma;
  }