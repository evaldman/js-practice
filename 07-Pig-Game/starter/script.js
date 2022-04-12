"use strict";

// selecting elements
const score0El = document.querySelector("#score--0");
// another way to get an element by id
const score1El = document.getElementById("score--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");

// starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add("hidden");
let currentScore = 0;

// rolling dice functionality
btnRoll.addEventListener("click", function () {
  //generate a random dice roll
  const dice = Math.trunc(Math.random() * 6) + 1;
  console.log(dice);
  //display the dice
  diceEl.classList.remove("hidden");
  diceEl.src = `dice-${dice}.png`;
  // check for a rolled 1: if true, switch to next player
  if (dice !== 1) {
    // add dice to current score
    // currentScore = currentScore + dice
    currentScore += dice;
    current0El.textContent = currentScore; // change later!!
  } else {
    // switch player
  }
});
