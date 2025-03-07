const greenFlipMeter = document.getElementById("greenFlipMeter");
const word = document.getElementById("word");
const startGameButton = document.getElementById("startGameButton");
const gameOverContainer = document.getElementById("gameOverContainer");
const gameOverTime = document.getElementById("gameOverTime");
const gameOverScore = document.getElementById("gameOverScore");
const gameOverStreak = document.getElementById("gameOverStreak");
let turnComplete = false;
let wordsList = [];
let canChangeWord = true; // Cooldown flag
let gameStarted = false;
let startTime = 0;
let endTime = 0;
let totalPoints = 0;
let currentPoints = 0;
let streak = 0
let longestStreak = 0

const params = new URLSearchParams(window.location.search);
const topic = params.get("topic");
const subtopic = params.get("subtopic");

function goFullScreen() {
  let elem = document.documentElement; // Fullscreen for the entire page
  if (elem.requestFullscreen) {
      elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) { // Firefox
      elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) { // Chrome, Safari, Opera
      elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { // IE/Edge
      elem.msRequestFullscreen();
  }
}

fetch("/static/words.json")
  .then(response => response.json())
  .then(data => {
    topics = data[topic].topics;
    for (var i = 0; i < topics.length;i++){
      console.log(topics[i].title);
      console.log(subtopic)
      if (topics[i].title === subtopic){
        wordsList = topics[i].words;
        break;
      }
    }
  });

const startGame = () => {
  startTime = new Date().getTime();
  console.log(wordsList);
  goFullScreen();
  startGameButton.style.display = "none";
  nextWord(false);
  gameStarted = true;
  console.log("Game started");
  window.addEventListener("deviceorientation", handleOrientation, true);
}

const nextWord = (correct) => {
  if (!canChangeWord) return; // Prevent function execution if cooldown is active
  canChangeWord = false; // Set cooldown flag to false
  setTimeout(() => canChangeWord = true, 1000); // Reset cooldown flag after 1 second

  let randomWord = wordsList[Math.floor(Math.random() * wordsList.length)];
  word.innerHTML = randomWord;
  if (correct){
    totalPoints += 1
    currentPoints += 1
    streak += 1
    if (streak > longestStreak){
      longestStreak = streak
  }else if (!gameStarted) {
    return
  }else{
    totalPoints += 1
    streak = 0
  }

  if (wordsList.length === 0) {
    console.log("No more words left");
    window.removeEventListener("deviceorientation", handleOrientation, true);
    word.innerHTML = "";
    document.body.style.backgroundColor = "#000";
    document.body.style.backgroundImage = "url(/static/background.png)";
    word.style.color = "#FFFFFF"
    endTime = new Date().getTime();
    const totalSeconds = Math.floor((endTime - startTime) / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    gameOverTime.innerHTML = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    gameOverContainer.style.display = "flex";
    gameOverScore.innerHTML = `${currentPoints}/${totalPoints}`;
    gameOverStreak.innerHTML = streak;
  }
  wordsList = wordsList.filter(word => word !== randomWord);
}

const isLandscapeWithCameraLeft = () => {
  console.log(screen.orientation.angle)
  if (screen.orientation) {
    return screen.orientation.angle
  }
  return 0
}


let gamma_value = 0;
const handleOrientation = (event) => {

    const angle = isLandscapeWithCameraLeft()
    console.log(angle)
    if (angle === 0 || angle === 180) {
      return
    }


    gamma_value = event.gamma;

    let gammaPercent = (50/gamma_value)*100;
    if (gammaPercent > 100){
      gammaPercent = 100;
    }else if (gammaPercent < -100){
      gammaPercent = -100;
    }
    if(gammaPercent < 0){
      if(angle === 270){
        greenFlipMeter.style.bottom = ((100-Math.abs(gammaPercent))) + "%";
      }else{
        greenFlipMeter.style.bottom = (Math.abs(gammaPercent)) + "%";
      }

    }else if(gammaPercent > 0){
      if(angle === 90){
        greenFlipMeter.style.bottom = ((100-Math.abs(gammaPercent))) + "%";
      }else{
        greenFlipMeter.style.bottom = (Math.abs(gammaPercent)) + "%";
      }
    }
    let gamma = event.gamma;
    if (gamma > 50 || gamma <-50){
      turnComplete = false;
      document.body.style.backgroundColor = "#000";
      document.body.style.backgroundImage = "url(/static/background.png)";
      word.style.color = "#FFFFFF"
    }else if (gamma > 0 && gamma < 50){
      let isCorrect
      if (angle === 90){
        document.body.style.background = "#FFA9A9";
        word.style.color = "#5A2E2E"
        isCorrect = false;
      }else{
        document.body.style.background = "#CAFFA9";
        word.style.color = "#283A1D"
        isCorrect = true;
      }
      console.log(turnComplete)
      if (!turnComplete){
        nextWord(isCorrect);
        navigator.vibrate(400);
      }
      turnComplete = true;
    }
    else if (gamma < 0 && gamma > -50){
      let isCorrect
      if (angle === 90){
        document.body.style.background = "#CAFFA9";
        word.style.color = "#283A1D"
        isCorrect = true;
      }else{
        document.body.style.background = "#FFA9A9";
        word.style.color = "#5A2E2E"
        isCorrect = false;
      }
      if (!turnComplete){
        nextWord(isCorrect);
        navigator.vibrate(200);
      }
      turnComplete = true;
    }
    else{
      document.body.style.backgroundColor = "#000";
      document.body.style.backgroundImage = "url(/static/background.png)";
    }
}}
