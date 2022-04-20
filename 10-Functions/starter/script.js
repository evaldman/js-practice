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

document.body.addEventListener("click", high5);

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
