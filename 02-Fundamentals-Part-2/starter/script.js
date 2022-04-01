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
