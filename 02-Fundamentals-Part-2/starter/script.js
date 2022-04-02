"use strict";

//// forbids us to do certain things ///
//// creates visible errors in the developer console in certain situations, otherwise js will fail silently without letting us know
/*
let hasDriversLicense = false;
const passTest = true;
if (passTest) hasDriverLicense = true;
if (hasDriversLicense) console.log("I can drive");
// without strict mode there was no error in the console, just nothing happened.
// turned on, the error showed up in the console.

const interface = "audio";
const private = 534;
// reserved words not allowed in strict mode
*/

///////// functions /////////
/*
function logger() {
  console.log("My name is Eugene");
}
// calling / running / invoking the function //
logger();
logger();
logger();

function fruitProcessor(apples, oranges) {
  //console.log(apples, oranges);
  const juice = `Juice with ${apples} apples and ${oranges} oranges`;
  return juice; //becomes the result of executing this function - produces a value
}
// creating values for our blank variables (arguments)
const appleJuice = fruitProcessor(5, 0);
console.log(appleJuice);
// can just log the function directly
// the difference is we do not capture the value into any variable, we just log it directly
console.log(fruitProcessor(5, 0));

const appleOrangeJuice = fruitProcessor(2, 4);
console.log(appleOrangeJuice);
// not all functions need to return something, not all functions need to have parameters //

///// keep our code dry - don't repeat ourselves..  ie: reuse functions /////
*/
/////// function declarations vs expressions ////////
/*
// function declaration:
function calcAge1(birthYear) {
  //const age = 2037 - birthYear;
  //return age;
  // can skip creating a variable and just return the calculation you want
  return 2037 - birthYear;
}
// parameter is the place holder in the function for the value when we call it
// argument is the actual value that we use to fill in that place holder(parameter)
const age1 = calcAge1(1991);
console.log(age1);

// function expression: produce values
const calcAge2 = function (birthYear) {
  return 2037 - birthYear;
};
const age2 = calcAge2(1991);
console.log(age2);
*/
//// ***** the big difference is that you can call the declaration before it is defined, expression can not ****** ////

/////// arrow functions ///////
/*
const calcAge3 = (birthYear) => 2037 - birthYear;
//return happens implicitly
console.log(calcAge3(1991));
//or
const age3 = calcAge3(1991);
console.log(age3);

const yearsUntilRetirement = (birthYear, firstName) => {
  const age = 2037 - birthYear;
  const retirement = 65 - age;
  return `${firstName} retires in ${retirement} years`;
};
///// ***** return is only implicit in one line arrow functions ***** //////
console.log(yearsUntilRetirement(1991, "Bob"));
console.log(yearsUntilRetirement(1980, "Sam"));
//// ******* arrow functions do not get a 'this' keyword ****** /////
*/
//// functions calling other functions /////

function cutFruitPieces(fruit) {
  return fruit * 4;
}

function fruitProcessor(apples, oranges) {
  const applePieces = cutFruitPieces(apples);
  const orangePieces = cutFruitPieces(oranges);
  const juice = `Juice with ${applePieces} apple pieces and ${orangePieces} orange pieces`;
  return juice;
}
console.log(fruitProcessor(2, 3));
