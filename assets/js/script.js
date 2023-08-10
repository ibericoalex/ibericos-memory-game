// DOM ELEMENT RETRIEVAL
// These lines retrieve different elements from the DOM based on their IDs or class names.

const modal = document.getElementById("modal"); // Modal element
const modalStartBtn = document.getElementById("modal-start-btn"); // Modal start button
const restartBtn = document.getElementById("restart-btn"); // Restart game button
const playerName = document.getElementById("player-name"); // Player name display element
const playerNameInput = document.getElementById("player-name-input"); // Player name input field
const cards = document.querySelectorAll('.card'); // All card elements
const timerEl = document.getElementById("timer"); // Timer display element
const moveCounter = document.getElementById("move-counter"); // Move counter display
const scoreEl = document.getElementById("score"); // Current score display
const bestScoreEl = document.getElementById("best-score"); // Best score display
const modalBestScoreEl = document.getElementById("modal-best-score"); // Best score display for end modal
const endgameModal = document.getElementById("win-modal"); // Modal endgame element


// AUDIO ELEMENTS
const soundtrackEl = document.getElementById("soundtrack"); // Background music element
const audioToggle = document.getElementById("audio-toggle"); // Button to toggle audio on/off
const playIcon = document.getElementById("play-icon"); // Play icon for audio
const pauseIcon = document.getElementById("pause-icon"); // Pause icon for audio

// GAME STATE MANAGEMENT
let hasFlippedCard = false; // Whether a card has been flipped
let lockBoard = false; // To prevent flipping when two cards are already flipped
let firstCard; // First flipped card
let secondCard; // Second flipped card

let timerInterval; // To track the timer's setInterval function
let secCounter = 0; // Counts the elapsed seconds
let numMoves = 0; // Counts the number of card flips
let matchCounter = 0; // Counts the number of matched pairs

let bestScore = 0; // Variable to store best scores


// MODAL SECTION - source: https://www.youtube.com/watch?v=TAB_v6yBXIE&ab_channel=KevinPowell

// Starting Modal Function called by HTML file 
function openModal() {
  modal.showModal();
}

function closeModal() {
  modal.close();
  modal.style.display = "none";
}

// Endgame Modal Functions
function openWinModal() {
  endgameModal.showModal();
  endgameModal.style.display = "grid";
}

function closeWinModal() {
  endgameModal.close();
  endgameModal.style.display = "none";
}


// SCORE CALCULATION SECTION - Help from tutor

function calcScore() {
  let score = Math.round((10000 - numMoves) / secCounter); // Score calculation formula
  scoreEl.innerHTML = score;


  if (score > bestScore) {
    bestScore = score; // Add score to bestScores array
    bestScoreEl.innerHTML = bestScore; // Update best score display
    modalBestScoreEl.innerHTML = bestScore; // Update best score display on end modal
    // storing bestScores array in local storage
    localStorage.setItem("bestScore", JSON.stringify(bestScore));
  }
}

function initialiseBestScore() {
    // Try to get the 'bestScore' from the browser's local storage
    // If it doesn't exist, default to the string "0"
    bestScore = localStorage.getItem("bestScore") || "0";
  try {
    bestScore = JSON.parse(bestScore);
  } catch (e) {
    bestScore = 0;
  }
  bestScoreEl.innerHTML = bestScore; // Update content of bestScoreEl value with value of bestScore
}


// TIMER SECTION - source: https://daily-dev-tips.com/posts/vanilla-javascript-timer/

function startTimer() {
  clearInterval(timerInterval); // Clear any existing timer, to ensure no overlap
  secCounter = 0; // Initialize second counter to 0, to keep track of elapsed seconds
  let seconds = 0;
  let minutes = 0;

  timerInterval = setInterval(function () {
    secCounter++;
    // Update the 'timerEl' HTML element with the current timer value
    timerEl.innerHTML =
    (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds);
    seconds++;
    if (seconds === 60) {
      minutes++;
      seconds = 0;
    }
  }, 1000);
}


// MEMORY GAME CARD SECTION - source: https://www.youtube.com/watch?v=ZniVgo8U7ek&t=139s

// Monitor and show move count
function incrementScore() {
  numMoves++;
  moveCounter.innerHTML = numMoves;
}


function flipCard() {
  incrementScore();

  if (lockBoard) return;  // Avoid more than 2 cards from being flipped at the same time 

  if (this === firstCard) return;
  this.classList.add('flip'); // Add a "flip" class to the card being clicked

  if (!hasFlippedCard) {    
    hasFlippedCard = true;  // Indicate that a card has been flipped
    firstCard = this; // Store a reference to the card that was just flipped
  } else {    
    secondCard = this;  // Indicate that a second card has been flipped

    checkForMatch();   // Check if the two flipped cards are a match
  }
}


function checkForMatch() {
  // Check if the 'data-image' attribute of both the first and second card are the same
  if (firstCard.dataset.image === secondCard.dataset.image) {
   
    matchCounter += 1; // Keep track of how many pairs have been matched

    disableCards(); // Disable matched cards so that they can't be clicked again

    // If the number of matched pairs equals half the total cards, the game is over
    if (matchCounter === (cards.length / 2)) {      
      stopGame();
    }
  } else {
    // If the two cards don't match, flip them back over
    unflipCards();
  }
}

// Disable interactions with cards that have been matched
function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

// If two cards don't match, they are flipped back after 0.5s
function unflipCards() {

  lockBoard = true;

  // Set a delay before executing the function inside
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetBoard();
  }, 500);
}

// Resets the state of the game board after each move
function resetBoard() {
  hasFlippedCard = false;
  lockBoard = false;   // Unlock the board to allow further card interactions  

  // Reset the references to the first and second cards that were flipped
  firstCard = null;
  secondCard = null;
}

// Shuffles the visual order of the cards 
function shuffle() {
  for (let card of cards) {
    let ramdomPos = Math.floor(Math.random() * 12); // Generate a random position/index between 0 and 11 
    card.style.order = ramdomPos; // Assign a random position to the card's order in the flexbox layout 
  }
}

// Starts the game
function startGame() {

  shuffle();  // Shuffle the order of the cards

  // Check if the 'playerNameInput' has a value
  // If it's empty, set the innerHTML of 'playerName' to "Your"
  // Otherwise, use the entered name/value
  if (playerNameInput.value === "") {
    playerName.innerHTML = "Your";
  } else {
    playerName.innerHTML = `${playerNameInput.value}!`;
  }

  closeModal(); 

  initialiseBestScore();  // Initialize the best score from local storage or set it to default

  startTimer(); 

  // Add event listener to each card, allowing them to be flipped when clicked
  for (let card of cards) {
    card.addEventListener('click', flipCard);
  }

  // Reset the move counter to 0 at the beginning of the game
  numMoves = 0;
  moveCounter.innerHTML = numMoves;
}


// Stops the game
function stopGame() {
  clearInterval(timerInterval); // Stop the ongoing timer by clearing the timer
  calcScore();  // Calculate the final score of the game

  openWinModal();  // Open Endgame Modal to show game results

  // After a short delay, display reset button
  setTimeout(() => {
    restartBtn.style.display = "block";
  }, 100);
}

// Restarts the game
function restartGame() {

  closeWinModal();

  restartBtn.style.display = "none";  // Hide the restart button

  cards.forEach(card => card.classList.remove('flip')); // Revert all cards to unflipped state

  matchCounter = 0; // Reset counter of matched card pairs to 0

  scoreEl.innerHTML = 0;  // Reset the displayed score to 0

  startGame();  // Start the game again
}


// SOUNDTRACK ON/OFF TOGGLE - source: https://stackoverflow.com/questions/27368778/how-to-toggle-audio-play-pause-with-one-button-or-link

let isPlaying = false;  // Track if audio is currently playing
pauseIcon.style.display = "none"; // Hide the pause button

// If the soundtrack is currently playing...
function togglePlay() {
  if (isPlaying) {
    soundtrackEl.pause(); // Pause the soundtrack
  } else {
    soundtrackEl.play(); // Start the soundtrack
  }
}

// Music playing - switch play icon to pause icon
soundtrackEl.onplaying = function () {
  isPlaying = true;
  playIcon.style.display = "none";  // Hide the play icon
  pauseIcon.style.display = "inline"; // Display the pause icon
}

// Music paused - switch pause icon to play icon
soundtrackEl.onpause = function () {
  isPlaying = false;
  playIcon.style.display = "inline";  // Display the pause icon
  pauseIcon.style.display = "none"; // Hide the pause icon
}


// EVENT LISTENERS 
audioToggle.addEventListener("click", togglePlay);
modalStartBtn.addEventListener("click", startGame); // Start the game when modal button is clicked
restartBtn.addEventListener("click", restartGame); // Restart the game without reloading

// Prevents best score resetting after page refresh
modal.addEventListener('cancel', (event) => {
  event.preventDefault();
}) 