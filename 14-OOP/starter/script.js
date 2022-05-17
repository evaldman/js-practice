"use strict";

// object oriented programming (oop): a programming paradigm (style of code, how we write and organize code) based on the concept of objects
// we use objects to model(describe) real-world (user or todo list item) or abstract features (html component or data structure)
// objects may contain data (properties) and code (methods). By using objects we pack data and the corresponding behavior into one block
// objects are self-contained pieces/blocks of code
// objects are building blocks of applications, and interact with one another
// interactions happen through a public interface (API): methods that the code outside of the object can access and use to communicate with the object
// oop was developed with the goal of organizing code, to make it more flexible and easier to maintain

// class - blueprint from which we can create new objects (set of rules or a theoretical plan).
// instance - real object created from a class. THE CLASS ITSELF IS NOT AN OBJECT
// class is created to generate objects from it

// how to model real world data into classes: 4 fundamental principals

/// abstraction - ignoring or hiding details that don,t matter, allowing us to get an overview perspective of the thing we're implementing, instead of messing with details that don't really matter to our implementation.

/// encapsulation - keeping properties and methods private inside the class, so they are not accessible from outside the class. Some methods can be exposed as a public interface (API)

/// inheritance - making all properties and methods of a certain class available to a child class, forming a hierarchical relationship between classes. This allows us to reuse common logic and to model real-world relationships.

/// polymorphism - a child class can overwrite a method it inherited from a parent class

// ------ oop in JS ------

// prototype ---> object
// objects are linked to a certain prototypee object .. each object has a prototype
// prototype object contains methods (behaviors) and properties that all the objects that are linked to that prorotype can access and use (prototypal inheritance or delegation).
// behavior (method) is delegated to the linked prototype object

// three ways to create prototypes:
/// constructor functions
/// ES6 classes
/// Object.create()

console.log("----- constructor function -----");
// not really a feature of JS, its simply a pattern that everyone uses
// in oop convention is to start constructor functions with capital letter
const Person = function (firstName, birthYear) {
  //   console.log(this);
  // instance properties:
  this.firstName = firstName;
  this.birthYear = birthYear;

  // never create a method inside aconstructor function. Every object created would carry around this function which can affect performance
  //   this.calcAge = function () {
  //     console.log(2037 - this.birthYear);
  //   };
};

// call constructor with the new operator
const jonas = new Person("Jonas", 1991);
console.log(jonas);

// behind the scenes:
/// 1. New {} is created
/// 2. function is called, this = {}
/// 3. {} is linked to prototype
/// 4. function automatically returns {}

const matilda = new Person("Matilda", 2017);
const jack = new Person("Jack", 1975);
console.log(matilda, jack);
// these are instances of Person
console.log(jonas instanceof Person);
