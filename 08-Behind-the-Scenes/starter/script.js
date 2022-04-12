"use strict";

//////// scope ///////////
console.log("---------scope---------");
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

//////// this keyword ///////////
console.log("---------this---------");

// this keyword/variable: Special variable that is created for every execution context (every function). Takes the value of (points to) the "owner" of the function in which the this keyword is used.
// this is not static. It depends on how the function is called, and its value is only assigned when the function is actually called.
// this will never point to the funtion in which we are using it, it will never point to the variable environment of the function

console.log(this); // the global window object
//functions
const calcAgeExpr = function (birthYear) {
  console.log(2037 - birthYear);
  console.log(this); // undefined ** because we are in strict mode, in 'sloppy' mode it would be the window object **
};
calcAgeExpr(1991);

const calcAgeArrow = birthYear => {
  console.log(2037 - birthYear);
  console.log(this); // window object. Arrow function does not get its own this keyword, instead the arrow function used the lexical this keyword - it uses the this keyword of its parent function(parent scope). window in this case(global scope)
};
calcAgeArrow(1980);

//object
const jonas = {
  year: 1991,
  calcAge: function () {
    console.log(this); // the jonas object
    console.log(2037 - this.year);
  },
};
jonas.calcAge();

const matilda = {
  year: 2017,
};

matilda.calcAge = jonas.calcAge; // method borrowing
console.log(matilda);
matilda.calcAge(); // calling the method inside the jonas object on matilda results in this pointing to matilda ** this is dynamic **

const f = jonas.calcAge;
console.log(f); // just the function
f(); // undefined, it is not attached to any object because it is a regular function call (not object)
