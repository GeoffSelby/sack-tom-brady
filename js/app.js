const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const toms = document.querySelectorAll('.tb');
const startButton = document.querySelector('.start');
const crowdNoise = new Howl({
  src: ['../assets/sounds/crowd-noise.mp3'],
  volume: 0.2,
});
const tackleSound = new Howl({
  src: ['../assets/sounds/tackle.mp3'],
});
let lastHole;
let timeUp;
let score = 0;

function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
  const idx = Math.floor(Math.random() * holes.length);
  const hole = holes[idx];

  if (hole === lastHole) {
    return randomHole(holes);
  }

  lastHole = hole;

  return hole;
}

function peep() {
  const time = randomTime(350, 1000);
  const hole = randomHole(holes);

  hole.classList.add('up');

  setTimeout(() => {
    hole.classList.remove('up');
    if (!timeUp) peep();
  }, time);
}

function startGame() {
  startButton.classList.add('disabled');
  startButton.disabled = true;
  scoreBoard.textContent = 0;
  score = 0;
  timeUp = false;
  crowdNoise.play();
  peep();

  setTimeout(() => {
    crowdNoise.stop();
    timeUp = true;
    startButton.disabled = false;
    startButton.classList.remove('disabled');
  }, 10000);
}

function bonk(e) {
  if (!e.isTrusted) return;
  tackleSound.play();
  score++;
  this.classList.remove('up');
  scoreBoard.textContent = score;
}

toms.forEach(tom => tom.addEventListener('click', bonk));
