"use strict";
/*
console.log(document.querySelector(".message").textContent);

document.querySelector(".message").textContent = "Correct Number!";

console.log(document.querySelector(".message").textContent);

document.querySelector(".number").textContent = 13;
document.querySelector(".score").textContent = 10;
document.querySelector(".guess").value = 23;
console.log(document.querySelector(".guess").value);
*/

/////// game logic ///////
let secretNumber = Math.trunc(Math.random() * 20) + 1;

let score = 20;
let highScore = 0;

// document.querySelector(".number").textContent = secretNumber;
const displayMessage = function (message) {
  document.querySelector(".message").textContent = message;
};
////////// event listeners ////////

document.querySelector(".check").addEventListener("click", function () {
  //   console.log(document.querySelector(".guess").value);
  const guess = Number(document.querySelector(".guess").value);
  console.log(guess, typeof guess);
  // const checkBtn = document.querySelector(".check");
  // checkBtn.addEventListener("click", function () {
  //   console.log(document.querySelector(".guess").value);
  // });

  if (!guess) {
    // document.querySelector(".message").textContent = "Not a number!";
    displayMessage("Not a Number!");
  } else if (guess === secretNumber) {
    displayMessage("Correct Number!");
    // document.querySelector(".message").textContent = "Correct number!";
    document.querySelector("body").style.backgroundColor = "#60b347";
    document.querySelector(".number").style.width = "30rem";
    document.querySelector(".number").textContent = secretNumber;
    if (score > highScore) {
      highScore = score;
      document.querySelector(".highscore").textContent = highScore;
    }
    //// refactor /////
  } else if (guess !== secretNumber) {
    if (score > 1) {
      // document.querySelector('.message').textContent =
      // guess > secretNumber ? '📈 Too high!' : '📉 Too low!';
      displayMessage(guess > secretNumber ? "📈 Too high!" : "📉 Too low!");
      score--;
      document.querySelector(".score").textContent = score;
    } else {
      // document.querySelector('.message').textContent = 'You lose!';
      displayMessage("💥 You lose!");
      document.querySelector(".score").textContent = 0;
    }
  }
  //   } else if (guess > secretNumber) {
  //     if (score > 1) {
  //       document.querySelector(".message").textContent = "Too high!";
  //       score--;
  //       document.querySelector(".score").textContent = score;
  //     } else {
  //       document.querySelector(".message").textContent = "You lose!";
  //       document.querySelector(".score").textContent = 0;
  //     }
  //   } else if (guess < secretNumber) {
  //     if (score > 1) {
  //       document.querySelector(".message").textContent = "Too low!";
  //       score--;
  //       document.querySelector(".score").textContent = score;
  //     } else {
  //       document.querySelector(".message").textContent = "You lose!";
  //       document.querySelector(".score").textContent = 0;
  //     }
  //   }
});

/////// challenge 1 /////
// reset the game on again button click
document.querySelector(".again").addEventListener("click", function () {
  displayMessage("Start guessing...");
  document.querySelector(".message").textContent = "Start guessing...";
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  score = 20;
  document.querySelector(".score").textContent = score;
  document.querySelector(".number").textContent = "?";
  document.querySelector("body").style.backgroundColor = "#222";
  document.querySelector(".number").style.width = "15rem";
  document.querySelector(".guess").value = "";
});
