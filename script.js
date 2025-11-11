
let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  loses: 0,
  ties: 0,
};

updateScoreElement();

const AutoElement = document.querySelector('.js-button-auto');

let isAutoPlaying = false;
let intervalId;
function autoPlay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
    AutoElement.innerText = 'Stop';
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
    AutoElement.innerText = 'Auto Play';
  }

};
document.querySelector('.js-button-scissors')
  .addEventListener('click', () => {
    playGame('scissors');
  });

document.querySelector('.js-button-paper')
  .addEventListener('click', () => {
    playGame('paper');
  });

document.querySelector('.js-button-rock')
  .addEventListener('click', () => {
    playGame('rock');
  });

document.querySelector('.js-button-auto')
  .addEventListener('click', () => {
    autoPlay();
  })

function resetScore() {
  score.wins = 0;
  score.loses = 0;
  score.ties = 0;
  localStorage.removeItem('score');
  updateScoreElement();
}


function HideResetConfirm() {
  document.querySelector('.js-confirm-message').innerHTML = '';

}

function ShowResetConfirm() {
  document.querySelector('.js-confirm-message').innerHTML =
    `<p>Are you sure you want to reset the score ?</p>
      <button class="confirm-button js-yes-button">Yes</button>
      <button class="confirm-button js-no-button">No</button>`

  document.querySelector('.js-yes-button').addEventListener('click', () => {
    resetScore();
    HideResetConfirm();
  });

  document.querySelector('.js-no-button').addEventListener('click', () => {
    HideResetConfirm();
  })
}

document.querySelector('.js-button-reset')
  .addEventListener('click', () => {
    ShowResetConfirm();
  });


document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r') {
    playGame('rock');
  } else if (event.key === 'p') {
    playGame('paper');
  } else if (event.key === 's') {
    playGame('scissors');
  } else if (event.key === 'a') {
    autoPlay();
  } else if (event.key === 'Backspace') {
    resetScore();
  }
}
)

function playGame(playerMove) {
  const computerMove = pickComputerMove();
  let result = "";

  if (playerMove === "scissors") {
    if (computerMove === "rock") {
      result = "You lose.";
    } else if (computerMove === "paper") {
      result = "You win.";
    } else if (computerMove === "scissors") {
      result = "Tie.";
    }
  } else if (playerMove === "paper") {
    if (computerMove === "rock") {
      result = "You win.";
    } else if (computerMove === "paper") {
      result = "Tie.";
    } else if (computerMove == "scissors") {
      result = "You lose.";
    }
  } else if (playerMove == "rock") {
    if (computerMove === "rock") {
      result = "Tie.";
    } else if (computerMove === "paper") {
      result = "You lose.";
    } else if (computerMove === "scissors") {
      result = "You win.";
    }
  }

  if (result === "You win.") {
    score.wins += 1;
  } else if (result === "You lose.") {
    score.loses += 1;
  } else if (result === "Tie.") {
    score.ties += 1;
  }
  localStorage.setItem("score", JSON.stringify(score));

  document.querySelector(".js-result").innerHTML = result;
  document.querySelector(
    ".js-move"
  ).innerHTML = `   You <img class="emoji-icon" src="emoji-icons/${playerMove}-emoji.png">
<img class="emoji-icon" src="emoji-icons/${computerMove}-emoji.png">
Computer`;
  updateScoreElement();
}

function updateScoreElement() {
  document.querySelector(
    ".js-score"
  ).innerHTML = `Wins : ${score.wins}, Loses : ${score.loses}, Ties : ${score.ties}`;
}

function pickComputerMove() {
  let computerMove = "";
  const randomNumber = Math.random();
  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = "rock";
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = "paper";
  } else if (randomNumber >= 1 / 3 && randomNumber < 1) {
    computerMove = "scissors";
  }
  return computerMove;
}