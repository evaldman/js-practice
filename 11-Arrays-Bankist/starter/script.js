"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ["USD", "United States dollar"],
  ["EUR", "Euro"],
  ["GBP", "Pound sterling"],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

let arr = ["a", "b", "c", "d", "e"];
// slice - can extract any part of an array without changing the original
console.log(arr.slice(2));
console.log(arr.slice(2, 4)); // end parameter not included
console.log(arr.slice(-2)); // from the end
console.log(arr.slice(-1)); // always the last
console.log(arr.slice(1, -2));
console.log(arr.slice()); // no argument creates a shallow copy
console.log([...arr]); // same result with spread operator as slice with no argument

// splice - works like slice EXCEPT it changes the origina array
// console.log(arr.splice(2)); // extracts all elements after index
arr.splice(-1);
console.log(arr); // all that is left
// we are usually not interested in what the splice method returns, just what is left over
arr.splice(1, 2); // first parameter is the starting index, second paramets is the number of elements NOT the end index
console.log(arr);

// reverse - does mutate the original array
arr = ["a", "b", "c", "d", "e"];
const arr2 = ["j", "i", "h", "g", "f"];
console.log(arr2.reverse());
console.log(arr2);

// concat - does not mutate the original array
const letters = arr.concat(arr2);
console.log(letters);
console.log([...arr, ...arr2]); // same result as concat

//join
console.log(letters.join("-"));

console.log("----------- at method----------");

const arr3 = [23, 11, 64];
console.log(arr3[0]);
// same thing with at method
console.log(arr3.at(0));
// one big difference:
// better for method chaining
// getting last array element:
// more traditional methods
console.log(arr3[arr3.length - 1]);
console.log(arr3.slice(-1)[0]);
// at
console.log(arr3.at(-1)); // gets the last element

console.log("jonas".at(0));
console.log("jonas".at(-1));
