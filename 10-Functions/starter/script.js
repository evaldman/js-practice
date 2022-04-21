"use strict";

//////// default parameters ///////////
const bookings = [];
// function createBooking(flightNum, numPassengers = 1, price = 199) {
// can set price dynamically based on number of passengers (can only work in order. ie numPassengers does not know about price)
function createBooking(
  flightNum,
  numPassengers = 1,
  price = 199 * numPassengers
) {
  // es5 way to set default parameters, es6 is above by defining the variables
  //   numPassengers = numPassengers || 1;
  //   price = price || 199;
  const booking = {
    flightNum,
    numPassengers,
    price,
  };
  console.log(booking);
  bookings.push(booking);
}

createBooking("LH123");
createBooking("LH123", 2, 800);
createBooking("LH123", 2);
createBooking("LH123", 5);
createBooking("LH123", undefined, 800);

/////////// passing arguments //////////
console.log("----------passing arguments---------");

const flight = "LH234"; //primitive type
const jonas = {
  // reference type
  name: "Jonas Sch",
  passport: 2384769345,
};

const checkIn = function (flightNum, passenger) {
  flightNum = "LH999";
  passenger.name = "Mr. " + passenger.name;

  //   if (passenger.passport === 2384769345) {
  //     alert("Checked in");
  //   } else {
  //     alert("Wrong passport");
  //   }
};

checkIn(flight, jonas);
console.log(flight); // change in function not reflected in original
// passing a primitive into a function is creating a copy and passing the copy, original stays the same
console.log(jonas); // change in function is reflected in the original
// passing an object is passing the actual object, changes affect the original

// is the same as doing ...
// const flightNum = flight;
// const passenger = jonas;

const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 100000000);
};

newPassport(jonas);
console.log(jonas);
checkIn(flight, jonas);

// passing by value vs passing by reference
// JS has ONLY passing by VALUE

console.log("----------callbacks----------");

const oneWord = function (str) {
  return str.replace(/ /g, "").toLowerCase();
};

const upperFirstWord = function (str) {
  const [first, ...others] = str.split(" ");
  return [first.toUpperCase(), ...others].join(" ");
};

const transformer = function (str, fn) {
  console.log(`Original string: ${str}`);
  console.log(`Transformed string: ${fn(str)}`);
  console.log(`Transformed by: ${fn.name}`);
};

transformer("Javascript is the best", upperFirstWord);
transformer("Javascript is the best", oneWord);

// JS uses callbacks all the time
const high5 = function () {
  console.log("👋");
};

// document.body.addEventListener("click", high5);

["jonas", "martha", "adam"].forEach(high5);
// callbacks allow us to create abstraction - we hide the detail of some code implementation, this allows to think at a higher, deeper lever

console.log("----------return new functions----------");

const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};
const greeterHey = greet("Hey");
greeterHey("Bob");
greeterHey("Joe");
greet("Hello")("Steve");
// works because of closure

// mini challenge
const greet2 = greeting => name => console.log(`${greeting} ${name}`);
greet2("Hello")("Frank");

console.log("----------call and apply methods----------");

const lufthansa = {
  airline: "Lufthansa",
  iataCode: "LH",
  bookings: [],
  //book: function(){}
  // new syntax:
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
  },
};
lufthansa.book(239, "Bob Smith");
lufthansa.book(635, "Mike Jones");
console.log(lufthansa);

const eurowings = {
  airline: "Eurowings",
  iataCode: "EW",
  bookings: [],
};

const book = lufthansa.book;
// book(23, "Sara Wills"); // undefined, because this keyword is no longer linked ot lufthansa, this makes a copy and becoes a function not a method in an object.

// call method
book.call(eurowings, 23, "Sara Wills"); // call() method calls a method of an object, substituting another object for the current object
console.log(eurowings);

book.call(lufthansa, 239, 'Mary "Cooper');
console.log(lufthansa);

const swiss = {
  airline: "Swiss Air Lines",
  iataCode: "LX",
  bookings: [],
};

book.call(swiss, 583, "Mary Coop");

// apply method
const flightData = [583, "George Cooper"];
book.apply(swiss, flightData);
console.log(swiss);
//  -- not used much in modern javascript
// its preferred to use call() method with spread operator
book.call(swiss, ...flightData);

console.log("----------bind----------");
// bind does not immediately call the function. It returns a new function where the this keyword is bound, so its set to whatever value we pass into bind
// book.call(eurowings, 23, "Sara Wills")

const bookEW = book.bind(eurowings);
const bookLH = book.bind(lufthansa);
const bookLX = book.bind(swiss);

bookEW(23, "Steven Williams");

const bookEW23 = book.bind(eurowings, 23); // flight number is preset for the future(called partial application, its the book function with flight number pre-defined), so only passenger name needs to be passed in
bookEW23("John Snow");
bookEW23("Martha Snow");

// with event listeners
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log(this);
  this.planes++;
  console.log(this.planes);
};
// lufthansa.buyPlane();
document
  .querySelector(".buy")
  .addEventListener("click", lufthansa.buyPlane.bind(lufthansa)); // without bind, this keyword would point to the body

// partial
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

const addVAT = addTax.bind(null, 0.23); // sets this keyword to null, becuase we don't need it and rate to .23
console.log(addVAT(100));

//mini challenge - return above as a function returning a function

const taxRate = function (rate) {
  return function (value) {
    return value + value * rate;
  };
};
const taxVAT = taxRate(0.23);
console.log(taxVAT(100));

console.log("----------challenge1----------");

// Let's build a simple poll app!

// A poll has a question, an array of options from which people can choose, and an array with the number of replies for each option. This data is stored in the starter object below.

// Here are your tasks:

// 1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 2 things:
//   1.1. Display a prompt window for the user to input the number of the selected option. The prompt should look like this:
//         What is your favourite programming language?
//         0: JavaScript
//         1: Python
//         2: Rust
//         3: C++
//         (Write option number)

//   1.2. Based on the input number, update the answers array. For example, if the option is 3, increase the value AT POSITION 3 of the array by 1. Make sure to check if the input is a number and if the number makes sense (e.g answer 52 wouldn't make sense, right?)
// 2. Call this method whenever the user clicks the "Answer poll" button.
// 3. Create a method 'displayResults' which displays the poll results. The method takes a string as an input (called 'type'), which can be either 'string' or 'array'. If type is 'array', simply display the results array as it is, using console.log(). This should be the default option. If type is 'string', display a string like "Poll results are 13, 2, 4, 1".
// 4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.

// HINT: Use many of the tools you learned about in this and the last section 😉

// BONUS: Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and the 'string' option. Do NOT put the arrays in the poll object! So what shoud the this keyword look like in this situation?

// BONUS TEST DATA 1: [5, 2, 3]
// BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]

const poll = {
  question: "What is your favourite programming language?",
  options: ["0: JavaScript", "1: Python", "2: Rust", "3: C++"],
  // This generates [0, 0, 0, 0]. More in the next section 😃
  answers: new Array(4).fill(0),
  registerNewAnswer: function () {
    const promptAnswer = Number(
      prompt(
        `${this.question}\n${this.options.join("\n")}\n(Write option number)`
      )
    );
    console.log(promptAnswer);
    if (
      typeof promptAnswer === "number" &&
      promptAnswer < this.answers.length
    ) {
      this.answers[promptAnswer]++;
    } else {
      alert("Pick between 0 and 3");
      this.registerNewAnswer();
    }
    // console.log(this.answers);
    this.displayResults();
    this.displayResults("string");
  },
  displayResults: function (type = "array") {
    if (type === "array") {
      console.log(this.answers);
    } else if (type === "string") {
      console.log(`Poll results are ${this.answers.join(", ")}`);
    }
  },
};
document
  .querySelector(".poll")
  .addEventListener("click", poll.registerNewAnswer.bind(poll));

poll.displayResults.call({ answers: [5, 2, 3] });
poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] }, "string");
