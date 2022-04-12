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
// f(); // undefined, it is not attached to any object because it is a regular function call (not object)

////// regular vs arrow functions //////
console.log("---------reg vs arrow---------");

// object literal (a way we literally define objects) is in the global scope, it is not a code block
const jonas2 = {
  firstName: "Jonas",
  year: 1991,
  calcAge: function () {
    console.log(this); // the jonas object
    console.log(2037 - this.year);
    // solution 1
    /*const self = this;
    const isMillenial = function () {
      console.log(self); // works because self is defined as this outside of function
      console.log(self.year >= 1981 && self.year <= 1996);
      //   console.log(this); // undefined because functions inside methods don't have access to this outside of function, function gets its own this keyword
      //   console.log(this.year >= 1981 && this.year <= 1996);
    };
    */
    // solution 2
    const isMillenial = () => {
      console.log(this); // works because arrow function does not get its own this keyword so it looks outward for it in its parent scope which is calcAge method in the jonas object. arrow function inherits the this keyword from its parent scope.  ** in the greet method the parent scope is window, in this case it is the jonas object **
      console.log(this.year >= 1981 && this.year <= 1996);
    };
    isMillenial();
  },
  greet: () => console.log(`Hey ${this.firstName}`), // never ever use an arrow function as a method (best practice)
  // a method is a function stored as an object property
};
jonas2.greet(); // returns "hey undefined".. because arrow function does not get its own this keyword, parent scope of the greet method is the global scope(window object). translates to window.firstName
console.log(this.fistName); // undefined, because there is no firstName on the window object

jonas2.calcAge();

// arguments keyword
const addExpr = function (a, b) {
  console.log(arguments);
  return a + b;
};
addExpr(2, 5); // 2 parameters, 2 arguments
addExpr(2, 5, 8, 12); // can add more arguments, they just won't be named

var addArrow2 = (a, b) => {
  console.log(arguments); // arrow function does not get argument keyword
  return a + b; // need to explicitly return if there is more than one line of code
};
// addArrow2(2, 5);// gets an error

/////// primitives vs objects (primitive vs reference types) //////
console.log("---------primitives vs objects---------");

// primitives (Primitive Types: Number, String, Boolean, Undefined, Null, Symbol, BigInt) - stored in call stack
let age = 30;
let oldAge = age;
age = 31;
console.log(age); // 31
console.log(oldAge); // 30 .. old age not affected, because it was changed after

// objects (Reference Types: Object literal, Arrays, Functions, many more(everything else)) - stored in heap
const me2 = {
  name: "Jonas",
  age: 30,
};
const friend = me2;
friend.age = 27;
console.log("friend:", friend); // age = 27
console.log("me:", me2); // age = 27

//primitive types
let lastName = "Williams";
let oldLastName = lastName;
lastName = "Davis";
console.log(lastName, oldLastName);

//reference types
const jessica = {
  firstName: "Jessica",
  lastName: "Williams",
  age: 27,
};
const marriedJessica = jessica; // does not create a new object in the heap, its a variable in the stack which holds the reference to the original object. Both point to the same memory address in the heap. Changing a property on one changes the other, its two different names for the same thing.
marriedJessica.lastName = "Davis";
console.log("before marriage:", jessica);
console.log("after marriage:", marriedJessica);

//copying objects
const jessica2 = {
  firstName: "Jessica",
  lastName: "Williams",
  age: 27,
  family: ["Alice", "Bob"],
};
const jessicaCopy = Object.assign({}, jessica2); // creates a completely new object, only creates a copy on the first level - will not create a copy of an object inside that object
jessicaCopy.lastName = "Davis";
jessicaCopy.family.push("Mary");
jessicaCopy.family.push("John");
console.log("before marriage:", jessica2); // lastName was preserved, but family is deeply nested so Object.assign did not preserve it, and it was changed with the push
console.log("after marriage:", jessicaCopy);
