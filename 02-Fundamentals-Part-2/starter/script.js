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
/*
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
*/

console.log("challenge 2:");

function calcTip(bill) {
  //return bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;
  if (bill >= 50 && bill <= 300) {
    return bill * 0.15;
  } else {
    return bill * 0.2;
  }
}
const bills = [125, 555, 44];
const tips = [calcTip(bills[0]), calcTip(bills[1]), calcTip(bills[2])];
const total = [tips[0] + bills[0], tips[1] + bills[1], tips[2] + bills[2]];
console.log(tips);
console.log(total);

console.log("_______________");

//////// objects ///////////
/*
// define key, value pairs
// key is also called a property

const jonas = {
  firstName: "Jonas",
  lastName: "Schmedtmann",
  age: 2037 - 1991,
  job: "teacher",
  friends: ["Michael", "Peter", "Steven"],
};

///////// dot vs bracket ////////////

console.log(jonas);
console.log(jonas.age);
console.log(jonas.friends);
console.log(jonas["age"]);

const nameKey = "Name";
console.log(jonas["first" + nameKey]); // can't do this with dot notation
console.log(jonas["last" + nameKey]);

const interestedIn = prompt(
  "What do you want to know about Jonas? Choose between fistName, lastName, age, job and friends"
);
console.log(interestedIn);
// jonas.interestedIn returns undefined
if (jonas[interestedIn]) {
  console.log(jonas[interestedIn]);
} else {
  console.log("Incorrecr Input");
}
// add new properties to an object using either dot or bracket
jonas.location = "Portugal";
console.log(jonas);

// mini challenge
// "Jonas has 3 friends, and his best friend is Michael"
console.log(
  `${jonas.firstName} has ${jonas.friends.length} friends, and his best friend is ${jonas.friends[0]}`
);
*/
/////// object methods ///////////
/*
const jonas = {
  firstName: "Jonas",
  lastName: "Schmedtmann",
  birthYear: 1991,
  job: "teacher",
  friends: ["Michael", "Peter", "Steven"],
  hasDriversLicense: true,

  //calcAge: function (birthYear) {
  //  return 2037 - birthYear;
  //},
  // better version of calcAge:
  //calcAge: function () {
  //  console.log(this);
  // *** this variable is equal to the object on which the method is called... the object calling the method ***
  //  *** it is a way to reference the object itself without hard coding the name of the object ***
  //  return 2037 - this.birtYear;
  //},
  // even better version of calcAge:
  // most efficient
  calcAge: function () {
    // we are creating a new property called age on the jonas object
    // this way we only calculate the age once if we call this function multiple times
    this.age = 2037 - this.birthYear;
    return this.age;
  },
  getSummary: function () {
    return `${this.firstName} is a ${this.calcAge()}-year old ${
      this.job
    }. And he has ${this.hasDriversLicense ? "a" : "no"} drivers license`;
  },
};
// **** any function that is attached to an object is called a method ****
//console.log(jonas.calcAge(1991));
//console.log(jonas["calcAge"](1991));
//console.log(jonas.calcAge(jonas.birthYear));
console.log(jonas.calcAge());
console.log(jonas.age); // jonas.age does not exist until we call jonas.calcAge
// mini challenge
// write a method called getSummary with "Jonas is a 46-year old teacher. And he has a drivers license"
console.log(jonas.getSummary());
*/

console.log("challenge 3:");
const mark = {
  name: "Mark Miller",
  mass: 78,
  height: 1.69,
  calcBmi: function () {
    this.bmi = this.mass / this.height ** 2;
    return this.bmi;
  },
};
const john = {
  name: "John Smith",
  mass: 92,
  height: 1.95,
  calcBmi: function () {
    this.bmi = this.mass / this.height ** 2;
    return this.bmi;
  },
};
if (mark.calcBmi() > john.calcBmi()) {
  console.log(
    `${mark.name}'s BMI (${mark.bmi}) is higher than ${john.name}'s (${john.bmi})`
  );
} else {
  console.log(
    `${john.name}'s BMI (${john.bmi}) is higher than ${mark.name}'s (${mark.bmi})`
  );
}
console.log();
console.log("_______________");

/////// the for loop ////////

// console.log("lifting weights repetition 1");
// console.log("lifting weights repetition 2");
// console.log("lifting weights repetition 3");
// console.log("lifting weights repetition 4");
// console.log("lifting weights repetition 5");
// console.log("lifting weights repetition 6");
// console.log("lifting weights repetition 7");
// console.log("lifting weights repetition 8");
// console.log("lifting weights repetition 9");
// console.log("lifting weights repetition 10");
/*
// loop statement has 3 parts:
// part 1: initial value of a counter: let rep = 1
// part 2: a logical condition that is evaluated before each iteration of the loop(before each time that the code in the loop is executed): rep <= 10(rep needs to stay below or equal to 10) if this condition is true then the next loop iteration will run, as soon as its false the loop will stop
// part 3: update the counter after each iteration: rep ++(adding one to the value of the rep variable) (rep = rep + 1)
// for loop keeps running while condition is TRUE

for (let rep = 1; rep <= 10; rep++) {
  console.log(`lifting weights repetition ${rep}`);
}
*/

//////////// looping arrays ///////////
/*
const jonas = [
  "Jonas",
  "Schmedtmann",
  2037 - 1991,
  "teacher",
  ["Michael", "Peter", "Steven"],
  true,
];

const types = [];
for (let i = 0; i < jonas.length; i++) {
  //reading from jonas array:
  console.log(jonas[i], typeof jonas[i]);

  // filling types array:
  // types[i] = typeof jonas[i];
  // cleaner way of filling types array
  types.push(typeof jonas[i]);
}
console.log(types);

const years = [1991, 2007, 1969, 2020];
const ages = [];
for (let i = 0; i < years.length; i++) {
  ages.push(2037 - years[i]);
}
console.log(ages);
// continue and break statements //
// continue is to exit the current iteration of the loop and continue to the next
// break is used to completely terminate the whole loop
console.log("--only strings--");
for (let i = 0; i < jonas.length; i++) {
  if (typeof jonas[i] !== "string") continue;
  console.log(jonas[i], typeof jonas[i]);
}
console.log("--break with number--");
for (let i = 0; i < jonas.length; i++) {
  if (typeof jonas[i] === "number") break;
  console.log(jonas[i], typeof jonas[i]);
}
*/

/////// looping backwards ////////

const jonas = [
  "Jonas",
  "Schmedtmann",
  2037 - 1991,
  "teacher",
  ["Michael", "Peter", "Steven"],
  true,
];

for (let i = jonas.length - 1; i >= 0; i--) {
  console.log(i, jonas[i]);
}
for (let exercise = 1; exercise <= 3; exercise++) {
  console.log(`starting exercise ${exercise}`);
  // note: <= 3 is the same thing as < 4 same for the next loop <=5 could be written as < 6
  for (let rep = 1; rep <= 5; rep++) {
    console.log(`exercise ${exercise}: lifting weights repetition ${rep}`);
  }
}
