const modal = document.getElementById("modal");
const modalStartBtn = document.getElementById("modal-start-btn");
const restartBtn = document.getElementById("restart-btn");
const playerName = document.getElementById("player-name");
const playerNameInput = document.getElementById("player-name-input");
const cards = document.querySelectorAll('.card');
const timerEl = document.getElementById("timer");
const moveCounter = document.getElementById("move-counter");
const scoreEl = document.getElementById("score");
const bestScoreEl = document.getElementById("best-score");
const endgameModal = document.getElementById("win-modal");

const soundtrackEl = document.getElementById("soundtrack");
const audioToggle = document.getElementById("audio-toggle");
const playIcon = document.getElementById("play-icon");
const pauseIcon = document.getElementById("pause-icon");

let hasFlippedCard = false;
let lockBoard = false;
let firstCard;
let secondCard;

let timerInterval;
let secCounter = 0;
let numMoves = 0;
let matchCounter = 0;

let bestScore = 0;

function openModal() {
  modal.showModal();
}

function closeModal() {
  modal.close();
  modal.style.display = "none";
}

function openWinModal() {
  endgameModal.showModal();
  endgameModal.style.display = "grid";
}

function closeWinModal() {
  endgameModal.close();
  endgameModal.style.display = "none";
}

function calcScore() {
  let score = Math.round((10000 - numMoves) / secCounter);
  scoreEl.innerHTML = score;

  if (score > bestScore) {
    bestScore = score;
    bestScoreEl.innerHTML = bestScore;
    localStorage.setItem("bestScore", JSON.stringify(bestScore));
  }
}

function initialiseBestScore() {
    bestScore = localStorage.getItem("bestScore") || "0";
  try {
    bestScore = JSON.parse(bestScore);
  } catch (e) {
    bestScore = 0;
  }
  bestScoreEl.innerHTML = bestScore;
}

function startTimer() {
  clearInterval(timerInterval);
  secCounter = 0;
  let seconds = 0;
  let minutes = 0;

  timerInterval = setInterval(function () {
    secCounter++;
    timerEl.innerHTML =
    (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds);
    seconds++;
    if (seconds === 60) {
      minutes++;
      seconds = 0;
    }
  }, 1000);
}

function incrementScore() {
  numMoves++;
  moveCounter.innerHTML = numMoves;
}

function flipCard() {
  incrementScore();

  if (lockBoard) return;

  if (this === firstCard) return;
  this.classList.add('flip');

  if (!hasFlippedCard) {    
    hasFlippedCard = true;
    firstCard = this;
  } else {    
    secondCard = this;

    checkForMatch();
  }
}

function checkForMatch() {
  if (firstCard.dataset.image === secondCard.dataset.image) {
   
    matchCounter += 1;

    disableCards();

    if (matchCounter === (cards.length / 2)) {      
      stopGame();
    }
  } else {
    unflipCards();
  }
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

function unflipCards() {

  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetBoard();
  }, 1000);
}

function resetBoard() {
  hasFlippedCard = false;
  lockBoard = false;  

  firstCard = null;
  secondCard = null;
}

function shuffle() {
  for (let card of cards) {
    let ramdomPos = Math.floor(Math.random() * 12);
    card.style.order = ramdomPos;
  }
}

function startGame() {

  shuffle();

  if (playerNameInput.value === "") {
    playerName.innerHTML = "Your";
  } else {
    playerName.innerHTML = `${playerNameInput.value}!`;
  }

  closeModal(); 

  initialiseBestScore();

  startTimer();

  for (let card of cards) {
    card.addEventListener('click', flipCard);
  }

  numMoves = 0;
  moveCounter.innerHTML = numMoves;
}

function stopGame() {
  
  clearInterval(timerInterval);

  calcScore();

  openWinModal();

  setTimeout(() => {
    restartBtn.style.display = "block";
  }, 100);
}

function restartGame() {

  closeWinModal();

  restartBtn.style.display = "none";

  cards.forEach(card => card.classList.remove('flip'));

  matchCounter = 0;

  scoreEl.innerHTML = 0;

  startGame();
}

let isPlaying = false;
pauseIcon.style.display = "none";

function togglePlay() {
  if (isPlaying) {
    soundtrackEl.pause();
  } else {
    soundtrackEl.play();
  }
}

soundtrackEl.onplaying = function () {
  isPlaying = true;
  playIcon.style.display = "none";
  pauseIcon.style.display = "inline";
}

soundtrackEl.onpause = function () {
  isPlaying = false;
  playIcon.style.display = "inline";
  pauseIcon.style.display = "none";
}

audioToggle.addEventListener("click", togglePlay);
modalStartBtn.addEventListener("click", startGame);
restartBtn.addEventListener("click", restartGame);

modal.addEventListener('cancel', (event) => {
  event.preventDefault();
})
