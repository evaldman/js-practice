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
