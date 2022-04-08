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
const secretNumber = Math.trunc(Math.random() * 20) + 1;

let score = 20;

document.querySelector(".number").textContent = secretNumber;

////////// event listeners ////////

document.querySelector(".check").addEventListener("click", function () {
  //   console.log(document.querySelector(".guess").value);
  const guess = Number(document.querySelector(".guess").value);
  console.log(guess, typeof guess);

  if (!guess) {
    document.querySelector(".message").textContent = "Not number";
  } else if (guess === secretNumber) {
    document.querySelector(".message").textContent = "Correct number!";
  } else if (guess > secretNumber) {
    if (score > 1) {
      document.querySelector(".message").textContent = "Too high!";
      score--;
      document.querySelector(".score").textContent = score;
    } else {
      document.querySelector(".message").textContent = "You lose!";
      document.querySelector(".score").textContent = 0;
    }
  } else if (guess < secretNumber) {
    if (score > 1) {
      document.querySelector(".message").textContent = "Too low!";
      score--;
      document.querySelector(".score").textContent = score;
    } else {
      document.querySelector(".message").textContent = "You lose!";
      document.querySelector(".score").textContent = 0;
    }
  }
});
// const checkBtn = document.querySelector(".check");
// checkBtn.addEventListener("click", function () {
//   console.log(document.querySelector(".guess").value);
// });
