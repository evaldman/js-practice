// let js = "amazing";

// if (js === "amazing") alert("Javascript is FUN!");

// 40 + 8 + 23 - 10;
/*
console.log(40 + 8 + 23 - 10);
console.log("Jonas");
let firstName = "Jonas";
console.log(firstName);
*/

console.log("challenge 1:");
const massMark = 78;
const heightMark = 1.69;
const massJohn = 92;
const heightJohn = 1.95;

const bmiMark = massMark / heightMark ** 2;
const bmiJohn = massJohn / heightJohn ** 2;
const markHigherBMI = bmiMark > bmiJohn;

console.log(bmiMark, bmiJohn);
console.log(markHigherBMI);
console.log("_______________");

/*
const firstName = 'Jonas'
const job = 'teacher'
const birthYear = 1991
const year = 2037

const jonas = "I'm " + firstName + ", a " + (year - birthYear) + " year old " + job + "!"
console.log(jonas)

const jonasNew = `I'm ${firstName}, a ${year-birthYear} year old ${job}!`
console.log(jonasNew)
console.log("string with \n\multiple \n\lines")
//backticks (template literals) can make multiple lines 
console.log(`string with
multiple
lines`)
*/
///////////// if / else /////////
/*
const age = 15
//const isOldEnough = age >= 18

if(age >= 18) {
    console.log("Sarah can start driving")
} else {
    const yearsLeft = 18 - age
    console.log(`no license, wait ${yearsLeft} more years`)
}

const birthYear = 1991
let century
if (birthYear <= 2000) {
    century = 20
} else {
    century = 21
}
console.log(century)
*/

console.log("challenge 2:");
if (markHigherBMI) {
  console.log(`Mark's BMI (${bmiMark}) is higher`);
} else {
  console.log(`Johns's BMI (${bmiJohn}) is higher`);
}
console.log("_______________");

///////// type conversion or coercion ////////////
/// type conversion - when we manually convert from one type to another
/// type coercion - when js automatically converts types behind the scenes for us

//conversion//
/*
const inputYear = "1991"
console.log(Number(inputYear), inputYear)
console.log(inputYear + 18)
console.log(Number(inputYear) + 18)

console.log(Number("string"))
console.log(typeof NaN)
console.log(String(23), 23)

//coercion//
console.log("I am " + 23 + " years old") //becomes string
console.log("23" - "10" - 3 ) //becomes number
console.log("23" / "2") //becomes number

let n = "1" + 1
n = n - 1
console.log(n) // n = 10
*/

////////// truthy and falsy values ////////////

// 5 falsy values: 0, "", undefined, null, Nan //

///// equality operators //////

// const age = 18;

// if (age === 18) console.log("you're and adult (strict)");
// if (age == 18) console.log("you're and adult (loose)");
/*
const favorite = prompt("What's your favorite number?");
console.log(favorite);
console.log(typeof favorite);

if (favorite == 23) {
  // "23" == 23
  console.log("23 is a great number");
}

if (favorite === 23) {
  // "23" does not === 23
  console.log("is 23 a number?");
}
// can convert the prompt input to number instead of string //
const favorite2 = Number(prompt("What's your favorite number?"));
console.log(favorite2);

if (favorite2 === 24) {
  // "24" === 24
  console.log("is 24 a number?");
} else if (favorite2 === 7) {
  console.log("7 is great");
} else if (favorite2 === 9) {
  console.log("9!!!");
} else {
  console.log("not 24 or 7 or 9");
}
// does not equal: != loose, !== strict
if (favorite2 !== 24) console.log("why not 24");
*/

//////// boolean logic ///////

// A and B // true when all are true

/*
             A
        ------------
  | and   | true  | false 
  |   ----|-------|----
B | true  | true  | false
  |   ----|-------|----
  | false | false | false
*/

// A or B // true when one is true
/*
             A
        ------------
  |  or   | true  | false 
  |   ----|-------|----
B | true  | true  | true
  |   ----|-------|----
  | false | true  | false

  // not A, not B // inverts true/false value - does not combine multiple values, acts on only one boolean value
  
  age = 16
  A: age is greater or equal 20 - false
  B: age is less than 30 - true
  !A - true
  A and B - false
  A or B - true
  !A and B - true
  A or !B - false
  */

/////// Logical operators ///////
////// && = and, || = or, ! = not //////

/*
const hasDriversLicense = true;
const hasGoodVision = true;
const hasBadVision = false;

console.log(hasDriversLicense && hasGoodVision);
console.log(hasDriversLicense && hasBadVision);
console.log(hasDriversLicense || hasBadVision);
console.log(!hasDriversLicense);


//if (hasDriversLicense && hasGoodVision) {
//  console.log("sarah can drive");
//} else {
//  console.log("let someone else drive");
//}


const isTired = true;

console.log(hasDriversLicense || hasGoodVision || isTired);
console.log(hasDriversLicense && hasGoodVision && isTired);
console.log(hasDriversLicense && hasGoodVision && !isTired);

if (hasDriversLicense && hasGoodVision && !isTired) {
  console.log("sarah can drive");
} else {
  console.log("let someone else drive");
}
*/

console.log("challenge 3:");
const dolphinsAverage = (96 + 108 + 89) / 3;
console.log(`Dolphins average is ${dolphinsAverage}`);
const koalasAverage = (88 + 91 + 110) / 3;
console.log(`Koalas average is ${koalasAverage}`);

if (dolphinsAverage > koalasAverage) {
  console.log("Dolphins are the winner");
} else if (dolphinsAverage < koalasAverage) {
  console.log("Koalas are the winner");
} else if (dolphinsAverage === koalasAverage) {
  console.log("It is a draw");
}
console.log("bonus1:");
const dolphinsAverage1 = (97 + 112 + 80) / 3;
console.log(`Dolphins average is ${dolphinsAverage1}`);
const koalasAverage1 = (109 + 95 + 50) / 3;
console.log(`Koalas average is ${koalasAverage1}`);
if (dolphinsAverage1 > koalasAverage1 && dolphinsAverage1 >= 100) {
  console.log("Dolphins are the winner");
} else if (dolphinsAverage1 < koalasAverage1 && koalasAverage1 >= 100) {
  console.log("Koalas are the winner");
} else if (
  dolphinsAverage1 === koalasAverage1 &&
  dolphinsAverage1 >= 100 &&
  koalasAverage1 >= 100
) {
  console.log("It is a draw");
} else {
  console.log("no one wins");
}
console.log("_______________");

//////// switch ///////// - does a strict comparison!!
/*
const day = "saturday";

switch (day) {
  case "monday": // day === monday
    console.log("plan course structure");
    console.log("go to the gym");
    break;
  case "tuesday":
    console.log("prepare theory videos");
    break;
  case "wednesday":
  case "thursday":
    console.log("write code examples");
    break;
  case "friday":
    console.log("record videos");
    break;
  case "saturday":
  case "sunday":
    console.log("weekend!!");
    break;
  default:
    console.log("not a valid day");
}

if (day === "monday") {
  console.log("plan course structure");
  console.log("go to the gym");
} else if (day === "tuesday") {
  console.log("prepare theory videos");
} else if (day === "wednesday" || day === "thursday") {
  console.log("write code examples");
} else if (day === "friday") {
  console.log("record videos");
} else if (day === "saturday" || day === "sunday") {
  console.log("weekend!!");
} else {
  console.log("not a valid day");
}
*/

///////// statements and expressions ///////////
// expression - piece of code that produces a value
/// example: 3 + 4, 1991, true, false, !false (all produce values)
// statements - bigger piece of code that is executed  and does not produce a value on itself
/// example: this statement does nor produce a value, it only declares this variable called str.. only performs some action, while the string "23 is bigger" is the expression
// if (23 > 10) {
// const str = "23 is bigger"
// }

//////// conditional (ternary) operator ///////////
const age = 23;
age >= 18 ? console.log("I'm older than 18") : console.log("Not older than 18");
//condition ? if : else

const older = age >= 18 ? "older" : "not older";
console.log(older);

// same statement:
let older2;
if (age >= 18) {
  older2 = "older";
} else {
  older2 = "not older";
}
console.log(older2);
////////****** */ if else is a statement... ternary is an expression *****//////
///// cannot put if else statement in template literal but can put ternary ///
console.log(`I am ${age >= 18 ? "older" : "not older"} than 18`);
