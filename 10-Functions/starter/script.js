"use strict";

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
