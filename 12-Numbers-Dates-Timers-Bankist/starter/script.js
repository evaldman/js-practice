"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2022-04-29T17:01:17.194Z",
    "2022-04-30T23:36:17.929Z",
    "2022-05-03T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT", // de-DE
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-05-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
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
// Functions

const formatMovementDate = function (date) {
  const calcDaysPassed = function (date1, date2) {
    return Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
  };

  const daysPassed = calcDaysPassed(new Date(), date);
  console.log(daysPassed);

  if (daysPassed === 0) {
    return "Today";
  }
  if (daysPassed === 1) {
    return "Yesterday";
  }
  if (daysPassed <= 7) {
    return `${daysPassed} days ago`;
  }
  const day = `${date.getDate()}`.padStart(2, 0);
  const month = `${date.getMonth() + 1}`.padStart(2, 0); // zero based
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
};
const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = "";

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";

    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDate(date);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
    <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${mov.toFixed(2)}€</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance.toFixed(2)}€`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes.toFixed(2)}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out).toFixed(2)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest.toFixed(2)}€`;
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map(name => name[0])
      .join("");
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

///////////////////////////////////////
// Event handlers
let currentAccount;

// fake logged in
currentAccount = account1;
updateUI(currentAccount);
containerApp.style.opacity = 100;

// month/day/year

btnLogin.addEventListener("click", function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === +inputLoginPin.value) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(" ")[0]
    }`;
    containerApp.style.opacity = 100;

    // create current date and time
    const now = new Date();
    const day = `${now.getDate()}`.padStart(2, 0);
    const month = `${now.getMonth() + 1}`.padStart(2, 0); // zero based
    const year = now.getFullYear();
    const hour = `${now.getHours()}`.padStart(2, 0);
    const min = `${now.getMinutes()}`.padStart(2, 0);
    labelDate.textContent = `${month}/${day}/${year}, ${hour}:${min}`;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = "";

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener("click", function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);
  // round down the loan number

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    currentAccount.movements.push(amount);

    // add loan date
    currentAccount.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = "";
});

btnClose.addEventListener("click", function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = "";
});

let sorted = false;
btnSort.addEventListener("click", function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// in JS all numbers are represented as internally as floating point numbers (decimals)
// numbers are always stored in binary format
// numbers are stored internally as 64 bit - there are exactly 64 1 or 0 to represent a given number. Of these 64 bits, only 53 are used to store the digits themselves, the reset are for storing the position of the decimal point and the sign

console.log(23 === 23.0);
// base 10 is 0 - 9
// binary base is 0 - 1
console.log(0.1 + 0.2);
console.log(0.1 + 0.2 === 0.3); // false

// both convert string to number
console.log(Number("23"));
console.log(+"23");

// parsing - string needs to start with a number

console.log(Number.parseInt("30px", 10)); // 30
// second argument is the base (optional)

// parseFloat should be the go to to read a value out of a string
console.log(Number.parseFloat("2.5rem")); // 2.5
console.log(Number.parseInt("2.5rem")); // 2
// works without Number, but its more enouraged in modern JS call parse on the Number object

console.log(Number.isNaN(20));
console.log(Number.isNaN("20"));
console.log(Number.isNaN(+"20px"));
console.log(Number.isNaN(23 / 0)); // false although its infinity

// best way of checking if a value is a real number //
console.log(Number.isFinite(20));
console.log(Number.isFinite("20"));
console.log(Number.isFinite("+20px"));
console.log(Number.isFinite(23 / 0));

// check if integer
console.log(Number.isInteger(23));
console.log(Number.isInteger(23 / 0));

console.log("------ math ------");
console.log(Math.sqrt(25)); // square root
console.log(25 ** (1 / 2)); // square root
console.log(8 ** (1 / 3)); // cubic root

console.log(Math.max(5, 18, 23, 11, 2));
console.log(Math.max(5, 18, "23", 11, 2)); // does type coercion
console.log(Math.max(5, 18, "23px", 11, 2)); // NAN

console.log(Math.min(5, 18, 23, 11, 2));
console.log(Math.PI * Number.parseFloat("10px") ** 2); // calculate the area of a circle with 10px radius

console.log(Math.random()); // gives a random value between 0 and 1
console.log(Math.random() * 6); // gives a random value between 0 and 6, not 6 itself
console.log(Math.trunc(Math.random() * 6)); // cuts off decimal points so only get random numbers 0 - 5
console.log(Math.trunc(Math.random() * 6) + 1); // makes random numbers 1 - 6

// function to get a random number between the min and max
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min) + 1) + min;
// 0...1 -> 0...(max - min) -> min...max
console.log(randomInt(10, 20));

// rounding integers
console.log(Math.trunc(23.8)); // just removes the decimal
console.log(Math.round(23.3)); // actually rounds
console.log(Math.round(23.8));

console.log(Math.ceil(23.3)); // rounds up

console.log(Math.floor(23.8)); // rounds down
console.log(Math.floor(-23.3)); // works with negatives

// rounding decimals
console.log((2.7).toFixed(0)); // toFixed always returns a string
console.log((2.7).toFixed(3)); // can choose number of decimals
console.log((2.345).toFixed(2));
console.log(+(2.345).toFixed(2)); // add a plus to convert to number

console.log("------ remainder operator ------");

console.log(5 % 2); // 1
console.log(5 / 2); // 5 = 2 * 2 + 1

console.log(8 % 3); // 2
console.log(8 / 3); // 8 = 2 * 3 + 2

// useful to check whether a number is even or odd - a number is even when its divided by 2 and the remainder is 0
console.log(6 % 2); // 0
console.log(6 / 2);

const isEven = n => n % 2 === 0;
console.log(isEven(8));
console.log(isEven(23));
console.log(isEven(514));

// can check whether any number is divisible by any other number, if the remainder is 0, it is completely divisible

// labelBalance.addEventListener('click', function () {
//   [...document.querySelectorAll('.movements__row')].forEach(function (row, i) {
//     if (i % 2 === 0) row.style.backgroundColor = 'orangered';
//     if (i % 3 === 0) row.style.backgroundColor = 'blue';
//   });
// });

console.log("------ numeric separators ------");

const diameter = 287_460_000_000; //287,460,000,000
console.log(diameter);

const priceCents = 345_99;
console.log(priceCents);

const transferFee = 15_00;
const transferFee2 = 1_500;

// underscore can only go between 2 numbers
const PI = 3.14_15;
//const PI = 3._1415 //error
//const PI = 3_.1415 //error
console.log(PI);

console.log(Number("230_000")); // NAN - can't convert string to number with an underscore

console.log("------ Bigint ------");
// there is a limit of how big numbers can be
console.log(2 ** 53 - 1); // the biggest number that JS can represent - anything bigger are not accurate - "unsafe numbers"
// 2 elevated to 53 - 1, because the numbers start at 0
console.log(Number.MAX_SAFE_INTEGER);

console.log(4385672349587629384562394578263945876234);
console.log(4385672349587629384562394578263945876234n); // n at the end makes it a bigint
// can also use the BigInt function
console.log(BigInt(4385672349587629));

// operations
console.log(10000n + 10000n);
console.log(398476523984567934857n * 1000000n);

// cannot combine bigint with regular int
const huge = 239843204520394578329n;
const num = 23;
// console.log(huge * num); // error
console.log(huge * BigInt(num));
// console.log(Math.sqrt(16n)); // error

// 2 exceptions - comparison operators and plus operator with strings
console.log(20n > 15);
console.log(20n === 20);
console.log(typeof 20n);
console.log(20n == 20);
console.log(20n == "20");

console.log(huge + "is really big!!");
// -----

console.log(10n / 3n);
console.log(10 / 3);

console.log("------ date & time ------");

// create a date
const now2 = new Date();
console.log(now2);

console.log(new Date("May 03 2022 14:17:30"));
console.log(new Date("december 24, 2015"));
console.log(new Date(account1.movementsDates[0]));
console.log(new Date(2037, 10, 19, 15, 23, 5)); // ** month is 0 based **
console.log(new Date(2037, 10, 31)); // gets auto corrected to dec 1 because only 30 days in nov
console.log(new Date(0));
console.log(new Date(3 * 24 * 60 * 60 * 1000)); // days * hours * minutes * seconds * milliseconds

// working with dates

const future = new Date(2037, 10, 19, 15, 23);
console.log(future);
console.log(future.getFullYear()); // ** never use getYear() **
console.log(future.getMonth());
console.log(future.getDate()); // day
console.log(future.getDay()); // day of the week
console.log(future.getHours());
console.log(future.getMinutes());
console.log(future.getSeconds());
console.log(future.toISOString());
console.log(future.getTime()); // time stamp - since jan 1 1970

console.log(new Date(2142274980000));

console.log(Date.now());

future.setFullYear(2040);
console.log(future);

console.log("------ operations dates ------");

// converting date to number
console.log(Number(future));
console.log(+future);

const daysPassed = function (date1, date2) {
  return Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);
};
const days1 = daysPassed(new Date(2037, 3, 14), new Date(2037, 3, 24));
console.log(days1); // 10
