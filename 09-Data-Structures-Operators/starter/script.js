"use strict";

// Data needed for a later exercise
const flights =
  "_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30";

// Data needed for first part of the section
const restaurant = {
  name: "Classico Italiano",
  location: "Via Angelo Tavanti 23, Firenze, Italy",
  categories: ["Italian", "Pizzeria", "Vegetarian", "Organic"],
  starterMenu: ["Focaccia", "Bruschetta", "Garlic Bread", "Caprese Salad"],
  mainMenu: ["Pizza", "Pasta", "Risotto"],

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },
  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },
  orderDelivery: function ({ starterIndex, mainIndex, time, address }) {
    // as the object is received it is immediately destructured
    // can also set default values during destructuring: just in case there are a lot of parameters and some of them do not get filled out
    // orderDelivery: function ({ starterIndex = 1, mainIndex = 0, time = '20:00, address })
    console.log(
      `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
    );
  },
};

////////// destructuring arrays ////////
console.log("---------destructuring arrays-----------");

const arr = [2, 3, 4];
const a = arr[0];
const b = arr[1];
const c = arr[2];

const [x, y, z] = arr; // destructuring (unpacking) of array, makes them separate variables, original array is not affected
console.log(x, y, z);
console.log(arr);

const [first, second] = restaurant.categories;
let [main, , secondary] = restaurant.categories;
console.log(first, second); // italian pizzaria
console.log(main, secondary); // italian vegetarian

// switch variables:

// const temp = main;
// main = secondary;
// secondary = temp;
// console.log(main, secondary); // vegetarian italian

[main, secondary] = [secondary, main];
console.log(main, secondary); // vegetarian italian

// receive 2 return values from a function
const [starter, mainCourse] = restaurant.order(2, 0);
console.log(starter, mainCourse);

// nested destructuring
const nested = [2, 4, [5, 6]];
const [p, , q] = nested;
console.log(p, q);
const [i, , [j, k]] = nested;
console.log(i, j, k);

// default values (don't know the length of the array)
// const [r, s, t] = [8, 9];
// console.log(r, s, t); // 8 9 undefined
const [r = 1, s = 1, t = 1] = [8, 9];
console.log(r, s, t); // 8 9 1

///////// destructuring objects /////////////
console.log("---------destructuring objects-----------");

const { name, openingHours, categories } = restaurant;
console.log(name, openingHours, categories);

const {
  name: restaurantName,
  openingHours: hours,
  categories: tags,
} = restaurant;
console.log(restaurantName, hours, tags);

// default values
const { menu = [], starterMenu: starters = [] } = restaurant;
console.log(menu, starters); // without default value, menu would be undefined

// mutating variables
let d = 111;
let e = 999;
const obj = { d: 23, e: 7, f: 14 };
console.log(d, e); // 111 999
({ d, e } = obj); // wrap destructuring assignment in parenthesis
console.log(d, e); // 23 7

// nested objects
const {
  fri: { open, close },
} = openingHours;
console.log(open, close); // 11 23
//// can assign different variables to open and close
const {
  fri: { open: op, close: cl },
} = openingHours;
console.log(op, cl); // 11 23

restaurant.orderDelivery({
  // we are passing in one object into the function (one argument)
  // the properties in the index don't have to match the order, only the names have to match
  time: "22:30",
  address: "via del sole, 21",
  mainIndex: 2,
  starterIndex: 2,
});
