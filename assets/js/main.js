// DOM Elements
const gameSection = document.querySelector('.game__section');
const gameImgsSection = document.querySelector('.game__images');
const imgsSection = document.querySelector('.images');
const gameImgs = document.querySelectorAll('.game__section--img');

const resultEl = document.querySelector('.result');
const scoreEl = document.querySelector('.score');

// Global Variables
let userScore = Number(localStorage.getItem('score'));

// Functions
const init = () => {
  scoreEl.textContent = userScore;
  gameImgs.forEach(img => {
    img.addEventListener('click', e => {
      playGame(e);

      for (let i = 0; i < gameImgs.length; i++) {
        gameImgs[i].style.pointerEvents = 'none';
      }

    });
  });
};

const getUserChoice = e => {
  return e.target.id;
};

const getComputerChoice = () => {
  const choices = ['rock', 'paper', 'scissor'];
  const randIndex = Math.floor(Math.random() * choices.length);

  return choices[randIndex];
};

const disableOnClick = (i, children, e) => {
  children[i].style.cursor = e.target.style.cursor = 'default';
  e.preventDefault();
}

const filterImgs = (e, computerChoice) => {
  const children = e.target.parentElement.children;

  for (let i = 0; i < children.length; i++) {

    if (children[i].id !== e.target.id) {
      children[i].style.display = 'none';
    }

    if (children[i].id === computerChoice) {
      if (e.target.id === 'paper' && computerChoice === 'rock' || e.target.id === 'scissor') {
        imgsSection.style.display = 'flex';
        imgsSection.style.flexFlow = 'row-reverse wrap';
      }

      children[i].style.display = 'inline';

      disableOnClick(i, children, e);

    }
  }

};

const showChoices = () => {
  const userTitle = document.createElement('h2');
  const computerTitle = document.createElement('h2');

  userTitle.textContent = 'Your choice';
  computerTitle.textContent = 'Computer Choice'

  const titlesSection = document.createElement('section');
  titlesSection.classList.add('titles__section');

  titlesSection.append(userTitle);
  titlesSection.append(computerTitle);

  gameImgsSection.append(titlesSection);
};

const showScore = () => {
  localStorage.setItem('score', userScore);
  scoreEl.textContent = userScore;
};

const addRepeatButton = () => {
  const btnRepeat = document.createElement('button');
  btnRepeat.classList.add('btn__repeat');
  btnRepeat.textContent = 'Jogar Novamente';
  btnRepeat.addEventListener('click', () => window.location.reload());

  gameSection.append(btnRepeat);
};

const formatUIOnTie = () => {
  gameImgsSection.style.display = 'grid';
  gameImgsSection.style.justifyItems = 'center';
  document.querySelector('.titles__section').style.marginLeft = '2rem';
};

const gameLogic = (e, userChoice, computerChoice) => {
  showChoices();
  
  if (userChoice === 'rock' && computerChoice === 'scissor'
  || userChoice === 'paper' && computerChoice === 'rock'
  || userChoice === 'scissor' && computerChoice === 'paper'
  ) {
    userScore += 10;
    resultEl.textContent = 'You Won!';
  } else if (userChoice === computerChoice) {
    resultEl.textContent = 'Tie Game!';
    formatUIOnTie();
  } else {
    userScore -= 5;
    resultEl.textContent = 'Computer Won!';
  }
  
  showScore();
  filterImgs(e, computerChoice);
  addRepeatButton();

};

const playGame = e => {
  const userChoice = getUserChoice(e);
  const computerChoice = getComputerChoice();

  gameLogic(e, userChoice, computerChoice);
};

// Init Game
init();
