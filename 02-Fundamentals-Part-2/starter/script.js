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
/*
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
*/
/*
const calcAge = function (birthYear) {
  return 2037 - birthYear;
};
//parameters are local variables and are not related between functions(birthYear)
const yearsUntilRetirement = function (birthYear, firstName) {
  const age = calcAge(birthYear);
  const retirement = 65 - age;
  if (retirement > 0) {
    return `${firstName} retires in ${retirement} years`;
  } else {
    return `${firstName} has already retired`;
  }
};
console.log(yearsUntilRetirement(1991, "Bob"));
console.log(yearsUntilRetirement(1970, "Sam"));
*/

console.log("challenge 1:");

const calcAverage = (score1, score2, score3) => (score1 + score2 + score3) / 3;

let scoreDolphins = calcAverage(44, 23, 71);
let scoreKoalas = calcAverage(65, 54, 49);

//console.log(scoreDolphins, scoreKoalas);

function checkWinner(avgDolphins, avgKoalas) {
  if (avgDolphins >= 2 * avgKoalas) {
    console.log(`Dolphins win (${avgDolphins} vs. ${avgKoalas})`);
  } else if (avgKoalas >= 2 * avgDolphins) {
    console.log(`Koalas win (${avgKoalas} vs. ${avgDolphins})`);
  } else {
    console.log("No one wins");
  }
}
checkWinner(scoreDolphins, scoreKoalas); // test data 1

scoreDolphins = calcAverage(85, 54, 41);
scoreKoalas = calcAverage(23, 34, 27);
checkWinner(scoreDolphins, scoreKoalas); // test data 2

console.log("_______________");

/////// arrays ////////
/*
const friend1 = "Michael";
const friend2 = "Steven";
const friend3 = "Peter";

const friends = ["Michael", "Steven", "Peter"];
console.log(friends);

const years1 = new Array(1991, 1984, 2008, 2020);
console.log(years1);

console.log(friends[0]);
console.log(friends[2]);

console.log(friends.length);
console.log(friends[friends.length - 1]); // = [2] = peter

// can change an element in the array:
friends[2] = "Jay";
console.log(friends);
// but not the whole array:
// friends = ["Bob", "Alice"]

const firstName = "Jonas";
const jonas = [firstName, "Schmedtman", 2037 - 1991, "teacher", friends];
console.log(jonas);

// Exercise:
const calcAge = function (birthYear) {
  return 2037 - birthYear;
};

const years = [1990, 1967, 2002, 2010, 2018];
// can't do this with arrays:
console.log(calcAge(years)); // = NaN
// can do:
const age1 = calcAge(years[0]);
const age2 = calcAge(years[1]);
const age3 = calcAge(years[years.length - 1]);
console.log(age1, age2, age3);

// can put function calls inside an array
const ages = [
  calcAge(years[0]),
  calcAge(years[1]),
  calcAge(years[years.length - 1]),
];
console.log(ages);
*/

////// array operations(methods) //////

const friends = ["Michael", "Steven", "Peter"];

// add elements
friends.push("Jay"); // push is a function that adds elements to the end of the array and we are calling that function with the argument "Jay"
// returns the value as the length of the new array
console.log(friends);
friends.unshift("John"); // adds to the front of array
// returns length of the array
console.log(friends);

// remove elements

friends.pop(); // removes last.... no argument needed
// returns the value of the element it removed
console.log(friends);
friends.shift(); // removes first
// returns element
console.log(friends);

console.log(friends.indexOf("Steven"));

console.log(friends.includes("Steven"));
console.log(friends.includes("Bob"));

if (friends.includes("Peter")) {
  console.log("Yay Peter");
}
