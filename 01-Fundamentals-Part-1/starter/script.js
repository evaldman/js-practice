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
