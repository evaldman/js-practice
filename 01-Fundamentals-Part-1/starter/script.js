 // let js = "amazing";

// if (js === "amazing") alert("Javascript is FUN!");


// 40 + 8 + 23 - 10;
/*
console.log(40 + 8 + 23 - 10);
console.log("Jonas");
let firstName = "Jonas";
console.log(firstName);
*/


const massMark = 78
const heightMark = 1.69
const massJohn = 92
const heightJohn = 1.95

const bmiMark = massMark / heightMark ** 2
const bmiJohn = massJohn / heightJohn ** 2
const markHigherBMI = bmiMark > bmiJohn

console.log(bmiMark, bmiJohn)
console.log(markHigherBMI)

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
