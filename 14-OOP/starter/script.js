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

console.log("----- prototypes -----");
// each and every function automatially has a property called prototype
// every object thats created by a certain constructor function will get access to all the methods and properties that we define on the constructor's prototype property
console.log(Person.prototype);

Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
}; // only one copy of this function exists, but all of the objects that are created using the construcrtor function can reuse this function on themselves (prototypal inheritance). The this keyword is set to the object that is calling the method.

jonas.calcAge();
matilda.calcAge();

console.log(jonas.__proto__);
console.log(jonas.__proto__ === Person.prototype);
console.log(Person.prototype.isPrototypeOf(jonas)); // true
console.log(Person.prototype.isPrototypeOf(matilda)); // true
console.log(Person.prototype.isPrototypeOf(Person)); // false

Person.prototype.species = "Homo sapiens";
console.log(jonas.species);
// jonas has own properties of name and birthyear and inherited properties of calcAge and species
console.log(jonas.hasOwnProperty("firstName")); // true
console.log(jonas.hasOwnProperty("species")); // false

console.log("----- prototypal inheritance -----");
console.log(jonas.__proto__);
console.log(jonas.__proto__.__proto__); // Object.prototype (top of prototype chain)
console.log(jonas.__proto__.__proto__.__proto__); // null
console.log(Person.prototype.constructor);
console.dir(Person.prototype.constructor);

const arr = [3, 6, 4, 5, 6, 9, 3];
console.log(arr.__proto__);
console.log(arr.__proto__ === Array.prototype);
console.log(arr.__proto__.__proto__);

// can create our own array method and call it on any array that we want (not recommended to do, just an example of what can be done)
Array.prototype.unique = function () {
  return [...new Set(this)];
};
console.log(arr.unique());

const h1 = document.querySelector("h1");
console.dir(h1);

console.dir(x => x + 1);

console.log("----- challenge 1 -----");

/* 
1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the current speed of the car in km/h;
2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;
3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;
4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.

DATA CAR 1: 'BMW' going at 120 km/h
DATA CAR 2: 'Mercedes' going at 95 km/h

GOOD LUCK 😀
*/

// 1.
const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

// 2.
Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(this.speed);
};

// 3.
Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(this.speed);
};

// 4.
const beemer = new Car("BMW", 120);
const benzo = new Car("Mercedes", 95);

console.log(beemer, benzo);
beemer.accelerate();
beemer.accelerate();
beemer.accelerate();
beemer.brake();
benzo.accelerate();
benzo.brake();
benzo.brake();
benzo.brake();
benzo.brake();

console.log("----- ES6 classes -----");

// class expression
const PersonCl1 = class {};

// class declaration
class PersonCl {
  constructor(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  } // data

  // write the methods outside of the constructor
  // methods will be added to .prototype property
  calcAge() {
    console.log(2037 - this.birthYear);
  } // behavior

  get age() {
    return 2037 - this.birthYear;
  }

  // static method
  static hey() {
    console.log("Hey there 👋");
    console.log(this);
  }
}
const jessica = new PersonCl("Jessica", 1996);
console.log(jessica);
jessica.calcAge();
console.log(jessica.age);

// can also add a method manually to .prototype
PersonCl.prototype.greet = function () {
  console.log(`Hello ${this.firstName}`);
};
jessica.greet();

PersonCl.hey();

// 1. Classes are not hoisted - even if they are class declarations
// 2. CLasses are first-class citizens - we can pass them into functions and also return from functions ---> because classes are a special kind of function behind the scenes
// 3. Classes are executed in strict mode

console.log("----- setters / getters -----");
// every object in JS can have setter and getter properties (assessor properties)
//// can be added to ES6 class same way as any method (refer to PersonCl) ////

const account = {
  owner: "jonas",
  movements: [200, 500, 120, 300],

  get latest() {
    return this.movements.slice(-1).pop();
  },

  // every setter method needs to have exactly one parameter
  set latest(mov) {
    this.movements.push(mov);
  },
};

// with get we can use latest as a property without calling the method
// useful when we want to read something as a property but still want to do some calculation first
console.log(account.latest);

// with set we "set" it as a regular property
account.latest = 50;
console.log(account.movements);
console.log(account.latest);

console.log("----- static methods -----");

Person.hey = function () {
  console.log("Hey there 👋");
  console.log(this);
};

Person.hey();
// does not get inherited, jonas.hey() will not work

console.log("----- object.create -----");

const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },
  // function can have any name
  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};
const steven = Object.create(PersonProto);
console.log(steven);
steven.name = "Steven";
steven.birthYear = 2002;
steven.calcAge();

console.log(steven.__proto__);

const sarah = Object.create(PersonProto);
sarah.init("Sarah", 1979);
sarah.calcAge();

console.log("----- challenge 2 -----");

/* 
1. Re-create challenge 1, but this time using an ES6 class;
2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6);
3. Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value, by multiplying the input by 1.6);
4. Create a new car and experiment with the accelerate and brake methods, and with the getter and setter.

DATA CAR 1: 'Ford' going at 120 km/h

GOOD LUCK 😀
*/

class Car2 {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(this.speed);
  }

  brake() {
    this.speed -= 5;
    console.log(this.speed);
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

const ford = new Car2("Ford", 120);
console.log(ford);
console.log(ford.speed);
console.log(ford.speedUS);
ford.speedUS = 50;
console.log(ford);
ford.accelerate();
ford.accelerate();
ford.accelerate();
ford.brake();
ford.brake();

console.log("----- class inheritance -----");

// const Person = function (firstName, birthYear) {
//   this.firstName = firstName;
//   this.birthYear = birthYear;
// };

// Person.prototype.calcAge = function () {
//   console.log(2037 - this.birthYear);
// };

const Student = function (firstName, birthYear, course) {
  //   this.firstName = firstName;
  //   this.birthYear = birthYear;
  Person.call(this, firstName, birthYear);
  this.course = course;
};
// create the link between Student and Person:
Student.prototype = Object.create(Person.prototype);

// a student is also a person, student is the child class that inherits from the parent class which is person. and through the prototype change methods are inherited, such as calcAge
Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const mike = new Student("Mike", 2020, "Computer Science");
console.log(mike);
mike.introduce();
mike.calcAge();

console.log(mike.__proto__);
console.log(mike.__proto__.__proto__);

console.log(mike instanceof Student);
console.log(mike instanceof Person);
console.log(mike instanceof Object);

Student.prototype.constructor = Student;
console.dir(Student.prototype.constructor);

console.log("----- challenge 3 -----");

/* 
1. Use a constructor function to implement an Electric Car (called EV) as a CHILD "class" of Car. Besides a make and current speed, the EV also has the current battery charge in % ('charge' property);
2. Implement a 'chargeBattery' method which takes an argument 'chargeTo' and sets the battery charge to 'chargeTo';
3. Implement an 'accelerate' method that will increase the car's speed by 20, and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140 km/h, with a charge of 22%';
4. Create an electric car object and experiment with calling 'accelerate', 'brake' and 'chargeBattery' (charge to 90%). Notice what happens when you 'accelerate'! HINT: Review the definiton of polymorphism 😉

DATA CAR 1: 'Tesla' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀
*/

// const Car = function (make, speed) {
//     this.make = make;
//     this.speed = speed;
//   };

//   Car.prototype.accelerate = function () {
//     this.speed += 10;
//     console.log(this.speed);
//   };

//   Car.prototype.brake = function () {
//     this.speed -= 5;
//     console.log(this.speed);
//   };

const EV = function (make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
};

EV.prototype = Object.create(Car.prototype);

EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};

EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge--;
  console.log(
    `${this.make} is going at ${this.speed} km/h, with a charge of ${this.charge}%`
  );
};

const tesla = new EV("Tesla", 120, 23);
console.log(tesla);
console.log(tesla.speed);
tesla.accelerate();
tesla.accelerate();
tesla.accelerate();
tesla.chargeBattery(90);
tesla.accelerate();
tesla.accelerate();
tesla.accelerate();
tesla.brake();
tesla.brake();
tesla.brake();

console.log("----- ES6 class inheritance -----");

class PersonClass {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`Hey ${this.fullName}`);
  }

  get age() {
    return 2037 - this.birthYear;
  }

  set fullName(name) {
    if (name.includes(" ")) this._fullName = name;
    else alert(`${name} is not a full name!`);
  }

  get fullName() {
    return this._fullName;
  }

  static hey() {
    console.log("Hey there 👋");
    console.log(this);
  }
}

class StudentClass extends PersonClass {
  constructor(fullName, birthYear, course) {
    super(fullName, birthYear);
    // super is the constructor function of the parent class
    // super always needs to happen first
    this.course = course;
  }
  introduce() {
    console.log(`My name is ${this.fullName} and I study ${this.course}`);
  }

  calcAge() {
    console.log(
      `I'm ${
        2037 - this.birthYear
      } years old, but as a student I fee more like ${
        2037 - this.birthYear + 10
      }`
    );
  }
}

const martha = new StudentClass("Martha Jones", 2012, "Computer Science");
console.log(martha);
martha.introduce();
martha.calcAge();

console.log("----- class inherit Object.create -----");
// const PersonProto = {
//     calcAge() {
//       console.log(2037 - this.birthYear);
//     },
//     // function can have any name
//     init(firstName, birthYear) {
//       this.firstName = firstName;
//       this.birthYear = birthYear;
//     },
//   };
//   const steven = Object.create(PersonProto);

const StudentProto = Object.create(PersonProto);
StudentProto.init = function (firstName, birthYear, course) {
  PersonProto.init.call(this, firstName, birthYear);
  this.course = course;
};
StudentProto.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};
const jay = Object.create(StudentProto);
jay.init("Jay", 2010, "Computer Science");
console.log(jay);
jay.introduce();
jay.calcAge();

console.log("----- class example -----");

class Account {
  // 1. pubic fields (instances)
  locale = navigator.language;

  // 2. private fields (instances)
  #movements = [];
  #pin;

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    // protected property
    this.#pin = pin;
    // this._movements = [];
    // this.locale = navigator.language;

    console.log(`Thanks for opening an account, ${owner}`);
  }
  // 3. public methods

  // public interface (API)
  getMovements() {
    return this.#movements;
  }

  deposit(val) {
    this.#movements.push(val);
  }

  withdraw(val) {
    this.deposit(-val);
  }

  requestLoan(val) {
    if (this.#approveLoan(val)) {
      this.deposit(val);
      console.log("Loan approved");
    }
  }

  // 4. private methods
  #approveLoan(val) {
    return true;
  }
}

const acc1 = new Account("Jonas", "EUR", 1111);
console.log(acc1);

// acc1.movements.push(250);
// acc1.movements.push(-140);
// instead of manually manipulating objects, its better to create methods: deposit, withdraw

acc1.deposit(250);
acc1.withdraw(140);
acc1.requestLoan(1000);
console.log(acc1);

console.log("----- encapsulation -----");
// keep some properties and methods private inside the class so that they are not accessible outside the class. Then the rest of the methods are basically exposed as a public interface(can also call an API)
// two big reasons why we need this:
//// 1. to prevent code from outside of a class to accidentally manipulate our data inside the class.
//// 2. when we expose only a small interface (a small API) consisting only of a few public methods then we can change all the other internal methods with more confidence because in this case we can be sure that external code does not rely on these private methods, and so therefore our code will not break when we do internal changes.

// first we will protect the movements array with an underscore:
//// this.movements will become this._movements
////// this doesn't actually make it truly private because this is just a convention to let everyone know that this property is not to be touched outside of the class

console.log(acc1.getMovements());

console.log("----- encapsulation truly private -----");
// 1. public fields
// 2. private fields
// 3. public methods
// 4. private methods

// a field is a property that will be on all instances
// fields have to be defined outside the constructor
// console.log(acc1.#movements); // error
