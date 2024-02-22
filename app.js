/*----------------- modal logic--------------------*/
const rulesBtn = document.querySelector(".rules");
const closeBtn = document.querySelector(".modal-close");
const rulesModal = document.querySelector(".rules-modal");

rulesBtn.addEventListener("click", () => {
  rulesModal.classList.toggle("show");
});

closeBtn.addEventListener("click", () => {
  rulesModal.classList.toggle("show");
});

/*----------------- Game logic--------------------*/
const CHOICES = [
  {
    name: "paper",
    beats: "rock",
  },
  {
    name: "scissors",
    beats: "paper",
  },
  {
    name: "rock",
    beats: "scissors",
  },
];
const choiceBtn = document.querySelectorAll(".choice");
const resultsDiv = document.querySelector(".results");
const resultsContDiv = document.querySelector(".results__container");
const resultDivs = document.querySelectorAll(".result");
const selectionBox = document.querySelector(".selection-box");
const winnerDiv = document.querySelector(".results__winner");
const winnerText = document.querySelector(".results__text");
const gameScore = document.querySelector(".score");
const playAgain = document.querySelector(".play-again");
let score = 0;
choiceBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    const choiceName = btn.dataset.choice;
    const choice = CHOICES.find((choice) => choice.name === choiceName);
    console.log(choice);
    choose(choice);
  });
});

const choose = (choice) => {
  const aichoice = aiChoose();
  displayResults([choice, aichoice]);
  displayWinner([choice, aichoice]);
};

const aiChoose = () => {
  const rand = Math.floor(Math.random() * CHOICES.length);
  return CHOICES[rand];
};

const displayResults = (results) => {
  resultDivs.forEach((resultDiv, index) => {
    console.log(index);
    setTimeout(() => {
      resultDiv.innerHTML = `
        <div class="choice ${results[index].name}">
          <img src="images/icon-${results[index].name}.svg" alt="${results[index].name}" />
        </div>
      `;
    }, index * 1000);
  });

  selectionBox.classList.toggle("hidden");
  resultsDiv.classList.toggle("hidden");
};

const displayWinner = (results) => {
  setTimeout(() => {
    const userWins = isWinner(results);
    const aiWins = isWinner(results.reverse());

    if (userWins) {
      winnerText.innerText = "you win";
      resultDivs[0].classList.toggle("winner");
      keepScore(1);
    } else if (aiWins) {
      winnerText.innerText = "you lose";
      resultDivs[1].classList.toggle("winner");
      if (score != 0) {
        keepScore(-1);
      }
    } else {
      winnerText.innerText = "draw";
    }
    winnerDiv.classList.toggle("hidden");
    resultsContDiv.classList.toggle("show-winner");
  }, 1000);
};

const isWinner = (results) => {
  return results[0].beats === results[1].name;
};
const keepScore = (scr) => {
  score += scr;
  gameScore.innerText = score;
};

playAgain.addEventListener("click", () => {
  selectionBox.classList.toggle("hidden");
  resultsDiv.classList.toggle("hidden");

  resultDivs.forEach((resultDiv) => {
    resultDiv.innerHTML = "";
    resultDiv.classList.remove("winner");
  });

  winnerText.innerText = "";
  winnerDiv.classList.toggle("hidden");
  resultsContDiv.classList.toggle("show-winner");
});
