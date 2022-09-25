'use strict';

// get the document elements
const guessForm = document.querySelector('#guess-form');
const feedbackMessage = document.querySelector('.message');
const scoreElement = document.querySelector('.score');
const secretNumberContainer = document.querySelector('.secret-number');
const newRoundBtn = document.querySelector('.again');
const checkBtn = document.querySelector('.check');
const alertMessage = document.querySelector('.alert');

// set initial score and highscore
let highscore = 0;
let score = 10;

// generate random number between 1 and 20
// function to get a random integer between two values, inclusive
const generateRandomNumber = (max, min) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

let secretNumber = generateRandomNumber(20, 1);

// functions

const displayCorrectGuessUI = () => {
  secretNumberContainer.textContent = secretNumber;
  feedbackMessage.textContent = '🎉 Correct Number!';
  document.body.style.backgroundColor = '#60b347';
  checkBtn.setAttribute('disabled', '');
  document.querySelector('.highscore').textContent = highscore;
};

const checkNumber = number => {
  if (number === secretNumber) {
    if (score > highscore) highscore = score;
    displayCorrectGuessUI();
    return;
  }
  score--;
  scoreElement.textContent = score;
  const feedback = number > secretNumber ? 'too high' : 'too low';
  feedbackMessage.textContent = `${number} is ${feedback}!`;
  if (score === 0) {
    alertMessage.textContent = `💥 You lost the game! The number was ${secretNumber}.`;
    checkBtn.setAttribute('disabled', '');
    return;
  }
  guessForm.reset();
};

const handleGuess = e => {
  e.preventDefault();
  const userInput = +e.target.guess.value;
  if (!userInput) {
    alertMessage.textContent = 'Please enter a number!';
    setTimeout(() => (alertMessage.textContent = ''), 3000);
    return;
  }
  checkNumber(userInput);
};

const displayInitialUI = () => {
  guessForm.reset();
  secretNumberContainer.textContent = '?';
  feedbackMessage.textContent = 'Start Guessing...';
  document.body.style.backgroundColor = '#222';
  checkBtn.removeAttribute('disabled');
  alertMessage.textContent = '';
  scoreElement.textContent = score;
};

const newRound = () => {
  // generate new secret number
  secretNumber = generateRandomNumber(20, 1);
  // reset score
  score = 10;
  displayInitialUI();
};

// event listeners

guessForm.addEventListener('submit', handleGuess);

newRoundBtn.addEventListener('click', newRound);
