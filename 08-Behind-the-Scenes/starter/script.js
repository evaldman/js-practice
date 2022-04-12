"use strict";

//////// scope ///////////

function calcAge(birthYear) {
  const age = 2037 - birthYear;
  //   console.log(firstName);
  function printAge() {
    let output = `${firstName}, you are ${age}, born in ${birthYear}`;
    console.log(output); // inners can access outer variables

    if (birthYear >= 1981 && birthYear <= 1996) {
      var millenial = true;
      const firstName = "Steven"; // if variable exists in the current scope, JS will not look outward, but everywhere else firstName is still Jonas.. these are completely different variables with the same name (Jonas is global and Steven is local)
      const str = `Oh, you're a millenial, ${firstName}`;
      console.log(str);

      function add(a, b) {
        return a + b;
      }
      output = "new output"; // reassigning outer scope's variables
    }
    // console.log(str); // can't access str - only applies to const and let
    console.log(millenial); // var can be accessed in blocks (older code)
    // console.log(add(2, 3)); // can't be accessed, functions are also blocked scoped ** in strict mode only **
    console.log(output);
  }
  printAge();
  return age;
}

const firstName = "Jonas";
calcAge(1991);
// console.log(age); // can't access in the outer scope
// printAge(); // can't access in the outer scope

///////// hoisting ///////
console.log("---------hoisting---------");

// variables
console.log(me); // shows up undefined
// console.log(job); // in TDZ - temporal dead zone
// console.log(year); // in TDZ - temporal dead zone

var me = "Jonas";
let job = "teacher";
const year = 1991;

// functions
console.log(addDeclaration(2, 3)); // can access function declarations
//c onsole.log(addExpression(2, 3)); // can not acces function expression ** if it was var it would be indefined, same with arrow function **
// console.log(addArrow(2, 3)); // can not access function expressions

function addDeclaration(a, b) {
  return a + b;
}

const addExpression = function (a, b) {
  return a + b;
};

const addArrow = (a, b) => a + b; // returns implicitly

// example
if (!numProducts) deleteShoppingCart(); // calls function because var is undefined when its referenced in advance

var numProducts = 10;

function deleteShoppingCart() {
  console.log("all products deleted");
}

var x = 1;
let y = 2;
const z = 3;

console.log(x === window.x); // created on the global window object
console.log(y === window.y); // not created on the global window object
console.log(z === window.z); // not created on the global window object
