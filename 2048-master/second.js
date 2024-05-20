document.addEventListener("DOMContentLoaded", function() {
  updateFromLocalStorage();
  if (remainingTime > 0) {
    startTimer();
  } else {
    // Если нет сохраненного времени, делаем кнопку доступной
    gameButton.disabled = false;
  }
});



window.addEventListener('beforeunload', function(event) {
  localStorage.setItem('counterValue', counterElement.textContent);
  localStorage.setItem('lastActiveTime', Date.now());
  localStorage.setItem('remainingTime', remainingTime);
});


// Get a reference to the game container by its ID
var gameContainer = document.getElementById("game-container");

// Function to change the shape of the game container to round
function makeRound() {
  gameContainer.style.borderRadius = "100%";
  gameContainer.style.transition = "border-radius 1s";
  gameContainer.style.overflow = "hidden";
  
  document.querySelector(".tile-container").style.display = "none";
  
  document.querySelector(".grid-container").style.transition = "all 1s";
  document.querySelector(".tile-container").style.transition = "display 1s";
  
  document.querySelector(".grid-container").style.display = "none";
  setTimeout(function() {
    document.querySelector(".coin").style.display = "flex"; 
  }, 400);
}

// Function to change the shape of the game container to rectangular
function makeRectangular() {
  gameContainer.style.borderRadius = "0%";
  document.querySelector(".coin").style.display = "none"; // Set style for round shape
  document.querySelector(".tile-container").style.display = "block";
  document.querySelector(".grid-container").style.display = "block";
}

var lastClickTime = 0;
var timerInterval;
var gameButton = document.getElementById("game-button");
var timerDisplay = document.getElementById("timer-display");
var remainingTime = 0;
function updateFromLocalStorage() {
  if (localStorage.getItem("remainingTime")) {
    var savedTime = parseInt(localStorage.getItem("lastActiveTime"));
    var elapsedTime = Math.floor((Date.now() - savedTime) / 1000);
    remainingTime = parseInt(localStorage.getItem("remainingTime")) - elapsedTime;
    if (remainingTime < 0) {
      remainingTime = 0;
    }
  }
}


function resetClickCount() {
  clearInterval(timerInterval);
  gameButton.disabled = false;
  gameButton.textContent = "New Game";
  gameButton.style.display = "block";
  timerDisplay.style.display = "none";
  localStorage.removeItem("lastClickTime");
  localStorage.removeItem("remainingTime");
}

function startTimer() {
  makeRound();
  gameButton.style.display = "none";
  timerDisplay.style.display = "block";
  gameButton.disabled = true;

  timerInterval = setInterval(function () {
    remainingTime--;
    if (remainingTime <= 0) {
      resetClickCount();
    } else {
      timerDisplay.textContent = formatTime(remainingTime);
      localStorage.setItem("remainingTime", remainingTime);
    }
  }, 1000);
}

function formatTime(timeInSeconds) {
  var minutes = Math.floor(timeInSeconds / 60);
  var seconds = timeInSeconds % 60;
  return pad(minutes, 2) + ":" + pad(seconds, 2);
}

function pad(number, length) {
  var str = "" + number;
  while (str.length < length) {
    str = 0 + str;
  }
  return str;
}

const counterElement = document.getElementById('attempts-display');

// Function to update the counter
function updateCounter(value) {
  counterElement.textContent = `${value}/9`;
  // Save the counter value to both sessionStorage and localStorage
  localStorage.setItem('counterValue', value);
}

// Function to handle button click
function handleRestartClick() {
  let counterValue = parseInt(localStorage.getItem('counterValue')) || 9;
  counterValue = Math.max(0, counterValue - 1); // Decrease the counter value
  if (counterValue === -1) {
    counterValue = 9; // Reset the counter to the maximum value if it reaches 0
  }
  updateCounter(counterValue); // Update the counter display
}

// Set the initial counter value
updateCounter(parseInt(localStorage.getItem('counterValue')) || 9);

// Function to attach event listener to the restart button
function attachRestartButtonListener() {
  
}
gameButton.addEventListener("click", function () {
  handleRestartClick()
  var clickCounter = parseInt(localStorage.getItem('counterValue'))
  var now = Date.now();
  if (now - lastClickTime >= 1800000) {
    makeRectangular();
  }
  if (now - lastClickTime < 1800000 && clickCounter <= 0) {
    remainingTime = 1800 - Math.floor((now - lastClickTime) / 1000);
    startTimer();
  } else {
    lastClickTime = now;
  }
});
// Attach event listener to the restart button
attachRestartButtonListener();

// If the timer was running when the page was closed, start it again
if (remainingTime > 0) {
  startTimer();
}
