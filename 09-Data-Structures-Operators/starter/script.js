"use strict";

// Data needed for a later exercise
const flights =
  "_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30";

// Data needed for first part of the section
const weekdays2 = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
const openingHours = {
  [weekdays2[3]]: {
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
};

const restaurant = {
  name: "Classico Italiano",
  location: "Via Angelo Tavanti 23, Firenze, Italy",
  categories: ["Italian", "Pizzeria", "Vegetarian", "Organic"],
  starterMenu: ["Focaccia", "Bruschetta", "Garlic Bread", "Caprese Salad"],
  mainMenu: ["Pizza", "Pasta", "Risotto"],
  // ES6 enhanced object literals - can now pass in another object just by name
  openingHours,
  // openingHours: {
  //   thu: {
  //     open: 12,
  //     close: 22,
  //   },
  //   fri: {
  //     open: 11,
  //     close: 23,
  //   },
  //   sat: {
  //     open: 0, // Open 24 hours
  //     close: 24,
  //   },
  // },

  // no longer need to create a property and then set it to a function expression
  // can just write name of property with parameters
  order(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },
  // order: function (starterIndex, mainIndex) {
  //   return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  // },
  orderDelivery: function ({ starterIndex, mainIndex, time, address }) {
    // as the object is received it is immediately destructured
    // can also set default values during destructuring: just in case there are a lot of parameters and some of them do not get filled out
    // orderDelivery: function ({ starterIndex = 1, mainIndex = 0, time = '20:00, address })
    console.log(
      `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
    );
  },
  orderPasta: function (ing1, ing2, ing3) {
    console.log(
      `Here is your delicious pasta with ${ing1}, ${ing2} and ${ing3}`
    );
  },
  orderPizza: function (mainIngredient, ...otherIngredients) {
    console.log(mainIngredient);
    console.log(otherIngredients);
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

// const { name, openingHours, categories } = restaurant;
// console.log(name, openingHours, categories);

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

///////// spread operator(...) //////////
console.log("---------spread operator-----------");

const arr2 = [7, 8, 9];
// long method (not good)
const badNewArr = [1, 2, arr2[0], arr2[1], arr2[2]];
console.log(badNewArr);
const newArr = [1, 2, ...arr2]; // [1, 2, 7, 8, 9]
// ... takes all the values out of the array and writes them individually. without the ... the array would be an array inside the new array [1, 2, [7, 8, 9]]
console.log(newArr);
console.log(...newArr); // logs individual elements of the array 1, 2, 7, 8, 9 (expands the array). pass the whole array as individual arguments into a function.

const newMenu = [...restaurant.mainMenu, "Gnocci"];
console.log(newMenu);
// ***** big difference between spread operator and destructuring is that the spread operator takes all the elements from the array and does not create new variables, and as a consequence we can only use it in places where we would otherwise write values separated by commas ******

// copy array
const mainMenuCopy = [...restaurant.mainMenu];
console.log(mainMenuCopy);

// join arrays
const fullMenu = [...restaurant.starterMenu, ...restaurant.mainMenu];
console.log(fullMenu);

// ** spread operator works on all iterables - arrays, strings, maps, sets *** NOT objects ***

const str = "Jonas";
const letters = [...str, " ", "S."];
console.log(letters);
// ** can only use the spread operator when building an array or when passing values into a function **
console.log(...str);

// real world example
const ingredients = [
  // prompt("Let's make pasta! Ingredient 1?"),
  // prompt("Ingredient 2?"),
  // prompt("Ingredient 3?"),
];
console.log(ingredients);
// without spread operator
// restaurant.orderPasta(ingredients[0], ingredients[1], ingredients[2]);
// with spread operator
restaurant.orderPasta(...ingredients);

//objects
const newRestaurant = { ...restaurant, founder: "Giuseppe", foundedIn: 1998 };
console.log(newRestaurant);

const restaurantCopy = { ...restaurant };
restaurantCopy.name = "Ristorante Roma";
console.log(restaurantCopy);

/////// rest pattern and parameters ////////
console.log("---------rest pattern-----------");

// destructuring //

// spread, because on right side of =
const arr3 = [1, 2, ...[3, 4]];
// rest, because on left side of =
const [a1, b1, ...others] = [1, 2, 3, 4, 5];
// takes the rest of the elements (remainig elements of array) and puts them into new array (others) - collects the elements that are unused in the destructuring assignment.. rest pattern should always be the last element
console.log(a1, b1, others);

const [pizza, , risotto, ...otherFood] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];
console.log(pizza, risotto, otherFood);

// objects
const { sat, ...weekdays } = restaurant.openingHours;
// weekdays becomes its own new object
console.log(weekdays);

// functions //

const add = function (...numbers) {
  // rest parameters - takes all the numbers and compresses them into one array
  // console.log(numbers);
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) sum += numbers[i];
  console.log(sum);
};
add(2, 3);
add(5, 3, 7, 2);
add(8, 2, 5, 3, 2, 1, 4);

const x1 = [23, 5, 7];
add(...x1);

restaurant.orderPizza("mushrooms", "onion", "olives", "spinach");
restaurant.orderPizza("mushrooms");

//////////// short circuiting (&& and ||) ////////////
console.log("---------short circuiting-----------");

// can use any data type, can return any data type, do short-circuiting (short circuit evaluation)
// short circuiting - for || (or) - if the first value is a truthy value it will immediately return that first value
console.log("--- || ---");
console.log(3 || "Jonas"); // 3
console.log("" || "Jonas"); // Jonas
console.log(true || 0); // true
console.log(undefined || null); // null
console.log(undefined || 0 || "" || "hello" || 23 || null); // hello

restaurant.numGuests = 23;
const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
console.log(guests1); // since restaurant.numGuests doesn't exist, it will be undefined and 10 will be returned
const guests2 = restaurant.numGuests || 10;
console.log(guests2); // when restaurant.numGuests has a value, it short circuits and 23 is returned, same with guests1

// short circuiting - for && (and) - if the first value is falsy it will immediately return that value
// **** && works the opposite of || ****
console.log("--- && ---");
console.log(0 && "Jonas"); // 0
console.log(7 && "Jonas"); // Jonas
console.log("hello" && 23 && null && "Jonas"); // null

if (restaurant.orderPizza) {
  restaurant.orderPizza("mushrooms", "spinach");
}
// can be written with &&
restaurant.orderPizza && restaurant.orderPizza("mushrooms", "spinach");

//////// nullish coalescing operator (??) //////////
console.log("---------nullish-----------");

restaurant.numGuests = 0;
const guests3 = restaurant.numGuests || 10;
console.log(guests3); // 10 because 0 is a falsy value
// nullish: null and undefined - does NOT include 0 or ""(empty string)
const guestsCorrect = restaurant.numGuests ?? 10;
console.log(guestsCorrect); // 0 .. would only return 10 if first value is null or undefined

////////// logical assignment operators ///////////
console.log("---------logical assignment----------");

const rest1 = {
  name: "capri",
  // numGuests: 20,
  numGuests: 0,
};
const rest2 = {
  name: "la piazza",
  owner: "giovanni",
};

// rest1.numGuests = rest1.numGuests || 10;
// rest2.numGuests = rest2.numGuests || 10;
// can be written with logical assignment
// or assignment operator
// rest1.numGuests ||= 10;
// rest2.numGuests ||= 10;
// nullish assignment operator (null or undefined only)
rest1.numGuests ??= 10;
rest2.numGuests ??= 10;
// && assignment operator
// rest1.owner = rest1.owner && "anonymous";
// rest2.owner = rest2.owner && "anonymous";
rest1.owner &&= "anonymous";
rest2.owner &&= "anonymous";
console.log(rest1);
console.log(rest2);

///////// challenge 1 ////////
console.log("---------challenge 1----------");

// Suppose we get data from a web service about a certain game (below). In this challenge we're gonna work with the data. So here are your tasks:

// 1. Create one player array for each team (variables 'players1' and 'players2')
// 2. The first player in any player array is the goalkeeper and the others are field players. For Bayern Munich (team 1) create one variable ('gk') with the goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10 field players
// 3. Create an array 'allPlayers' containing all players of both teams (22 players)
// 4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a new array ('players1Final') containing all the original team1 players plus 'Thiago', 'Coutinho' and 'Perisic'
// 5. Based on the game.odds object, create one variable for each odd (called 'team1', 'draw' and 'team2')
// 6. Write a function ('printGoals') that receives an arbitrary number of player names (NOT an array) and prints each of them to the console, along with the number of goals that were scored in total (number of player names passed in)
// 7. The team with the lower odd is more likely to win. Print to the console which team is more likely to win, WITHOUT using an if/else statement or the ternary operator.

// TEST DATA FOR 6: Use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'. Then, call the function again with players from game.scored
const game = {
  team1: "Bayern Munich",
  team2: "Borrussia Dortmund",
  players: [
    [
      "Neuer",
      "Pavard",
      "Martinez",
      "Alaba",
      "Davies",
      "Kimmich",
      "Goretzka",
      "Coman",
      "Muller",
      "Gnarby",
      "Lewandowski",
    ],
    [
      "Burki",
      "Schulz",
      "Hummels",
      "Akanji",
      "Hakimi",
      "Weigl",
      "Witsel",
      "Hazard",
      "Brandt",
      "Sancho",
      "Gotze",
    ],
  ],
  score: "4:0",
  scored: ["Lewandowski", "Gnarby", "Lewandowski", "Hummels"],
  date: "Nov 9th, 2037",
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

// 1
const [players1, players2] = game.players;
console.log(players1);
console.log(players2);
// 2
const [gk, ...fieldPlayers] = players1;
console.log(gk);
console.log(fieldPlayers);
// 3
const allPlayers = [...players1, ...players2];
console.log(allPlayers);
// 4
const players1Final = [...players1, "Thiago", "Coutinho", "Perisic"];
console.log(players1Final);
// 5
const { team1, x: draw, team2 } = game.odds;
console.log(team1);
console.log(draw);
console.log(team2);
// 6
function printGoals(...players) {
  for (let i = 0; i < players.length; i++) {
    console.log(players[i]);
  }
  console.log(`${players.length} goals were scored`);
}
printGoals("Davies", "Muller", "Lewandowski", "Kimmich");
printGoals(...game.scored);
// 7
team1 < team2 && console.log("team1 is more likely to win");
team1 > team2 && console.log("team2 is more likely to win");

//////// looping arrays: for-of loop /////////
console.log("---------for-of loop----------");

const menu2 = [...restaurant.starterMenu, ...restaurant.mainMenu];
// console.log(menu2);

for (const item of menu2) {
  console.log(item);
}
for (const item of menu2.entries()) {
  // console.log(item);
  console.log(`${item[0] + 1}: ${item[1]}`);
}
// console.log([...menu2.entries()]);
// destructure the item array
for (const [i, el] of menu2.entries()) {
  // console.log(item);
  console.log(`${i + 1}: ${el}`);
}
///////////// enhanced object literals //////////////
// refer to line 10, 30, 47

///////// optional chaining //////////////
if (restaurant.openingHours && restaurant.openingHours.mon)
  console.log(restaurant.openingHours.mon.open);
// console.log(restaurant.openingHours.mon.open); // error
// with optional chaining
console.log(restaurant.openingHours.mon?.open); // undefined - only if the property that is before the ? exists then the open property will be read, otherwise undefined (only null and undefined NOT 0 or "")
console.log(restaurant.openingHours?.mon?.open); // if openingHours exists and mon exists read open

const days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
for (const day of days) {
  // console.log(day);
  const open = restaurant.openingHours[day]?.open ?? "closed"; // day is coming dynamically from days array (openingHours.mon)
  console.log(`on ${day}, we open at ${open}`);
}

// methods
console.log(restaurant.order?.(0, 1) ?? "Method does not exist");
console.log(restaurant.orderRisotto?.(0, 1) ?? "Method does not exist");

// arrays
const users = [{ name: "Jonas", email: "hello@jonas.io" }];
console.log(users[0]?.name ?? "User array empty");
console.log(users[1]?.name ?? "User array empty");

/////////// looping objects /////////////
console.log("---------looping objects----------");

// property names
const properties = Object.keys(openingHours);
console.log(properties);
let openStr = `We are open on ${properties.length} days: `;
for (const day of properties) {
  openStr += `${day}, `;
}
console.log(openStr);

// property values
const values = Object.values(openingHours);
console.log(values);

// Entire object
const entries = Object.entries(openingHours);
console.log(entries);

for (const [day, { open, close }] of entries) {
  console.log(`On ${day} we open at ${open} and close at ${close}`);
}

///////// challenge 2 ////////
console.log("---------challenge 2----------");
// 1. Loop over the game.scored array and print each player name to the console, along with the goal number (Example: "Goal 1: Lewandowski")
// 2. Use a loop to calculate the average odd and log it to the console (We already studied how to calculate averages, you can go check if you don't remember)
// 3. Print the 3 odds to the console, but in a nice formatted way, exaclty like this:
//       Odd of victory Bayern Munich: 1.33
//       Odd of draw: 3.25
//       Odd of victory Borrussia Dortmund: 6.5
// Get the team names directly from the game object, don't hardcode them (except for "draw"). HINT: Note how the odds and the game objects have the same property names 😉

// BONUS: Create an object called 'scorers' which contains the names of the players who scored as properties, and the number of goals as the value. In this game, it will look like this:
//       {
//         Gnarby: 1,
//         Hummels: 1,
//         Lewandowski: 2
//       }

// 1
for (const player of game.scored.entries()) {
  console.log(`Goal ${player[0] + 1}: ${player[1]}`);
}
// deconstructed solution
// for (const [i, player] of game.scored.entries())
// console.log(`Goal ${i + 1}: ${player}`);

// 2
const oddValues = Object.values(game.odds);
// console.log(oddValues);

let average = 0;
for (const odd of oddValues) {
  // console.log(odd);
  // average = average + odd;
  average += odd;
}
average /= oddValues.length;
// average = average / oddValues.length;
console.log(`average of odds is ${average}`);

// 3
// console.log(game.team1);
for (const [team, odd] of Object.entries(game.odds)) {
  // console.log(team, odd);
  const teamDraw = team === "x" ? "draw" : `victory ${game[team]}`;
  console.log(`odd of ${teamDraw}: ${odd}`);
}

/////////// sets ///////////
console.log("---------sets----------");
// set - a collection of unique values. Can never have any duplicates.
// there are no indexes in sets
// theres no way to retrieve values out of a set
// main use case is to remove duplicate values of arrays

const ordersSet = new Set([
  "pasta",
  "pizza",
  "pizza",
  "risotto",
  "pasta",
  "pizza",
]);
console.log(ordersSet);
console.log(new Set("Jonas"));
console.log(ordersSet.size);
console.log(ordersSet.has("pizza"));
console.log(ordersSet.has("bread"));
ordersSet.add("garlic bread");
ordersSet.add("garlic bread");
ordersSet.delete("risotto");
// ordersSet.clear(); // empties the set
console.log(ordersSet);

for (const order of ordersSet) {
  console.log(order);
}

const staff = ["waiter", "chef", "waiter", "manager", "chef", "waiter"];
// const staffUnique = new Set(staff);
const staffUnique = [...new Set(staff)];
console.log(staffUnique);
console.log(
  new Set(["waiter", "chef", "waiter", "manager", "chef", "waiter"]).size
);
console.log(new Set("slkfnadsjadfklnfd").size);

///////////// maps ////////////
console.log("---------maps----------");
// map - data structure that we can use to map values to keys

const rest = new Map(); // start with creating an empty map
rest.set("name", "classico italiano");
rest.set(1, "italy");
console.log(rest.set(2, "portugal"));
rest
  .set("categories", ["italian", "pizzeria", "vegetarian", "organic"])
  .set("open", 11)
  .set("close", 23)
  .set(true, "we are open")
  .set(false, "we are closed");
console.log(rest.get("name"));
console.log(rest.get(true));

const time = 8;
console.log(rest.get(time > rest.get("open") && time < rest.get("close")));

console.log(rest.has("categories"));
rest.delete(2);
const restArray = [1, 2];
rest.set(restArray, "test");
rest.set([1, 2], "test"); // cannot retreive with rest.get([1,2])
console.log(rest.get([1, 2])); // undefined
console.log(rest.get(restArray)); // test
rest.set(document.querySelector("h1"), "heading");
console.log(rest);
console.log(rest.size);
// rest.clear();
// console.log(rest);

///////////// maps: iteration ////////////
console.log("---------maps: iteration----------");

const question = new Map([
  ["question", "what is the best programming language?"],
  [1, "c"],
  [2, "java"],
  [3, "javascript"],
  ["correct", 3],
  [true, "correct!"],
  [false, "try again"],
]);
console.log(question);

// convert object to map
console.log(Object.entries(openingHours));
const hoursMap = new Map(Object.entries(openingHours));
console.log(hoursMap);

// iteration
console.log(question.get("question"));
for (const [key, value] of question) {
  if (typeof key === "number") console.log(`answer ${key}: ${value}`);
}
// const answer = Number(prompt("your answer"));
const answer = 3;
console.log(answer);

console.log(question.get(question.get("correct") === answer));

// convert map to array
console.log(...question);
// other things that can be done

console.log([...question.keys()]);
console.log([...question.values()]);

console.log("---------challenge 3----------");

// 1. Create an array 'events' of the different game events that happened (no duplicates)
// 2. After the game has finished, is was found that the yellow card from minute 64 was unfair. So remove this event from the game events log.
// 3. Print the following string to the console: "An event happened, on average, every 9 minutes" (keep in mind that a game has 90 minutes)
// 4. Loop over the events and log them to the console, marking whether it's in the first half or second half (after 45 min) of the game, like this:
//       [FIRST HALF] 17: ⚽️ GOAL

const gameEvents = new Map([
  [17, "⚽️ GOAL"],
  [36, "🔁 Substitution"],
  [47, "⚽️ GOAL"],
  [61, "🔁 Substitution"],
  [64, "🔶 Yellow card"],
  [69, "🔴 Red card"],
  [70, "🔁 Substitution"],
  [72, "🔁 Substitution"],
  [76, "⚽️ GOAL"],
  [80, "⚽️ GOAL"],
  [92, "🔶 Yellow card"],
]);

//1
const eventsSet = new Set();

for (const [key, value] of gameEvents) {
  eventsSet.add(value);
}
const events = [...eventsSet];
console.log(events);
// *** can be written with spread operator ***
// console.log(gameEvents.values());
const events2 = [...new Set(gameEvents.values())];
console.log(events2);

//2
gameEvents.delete(64);
console.log(gameEvents);

//3
console.log(
  `An event happened, on average, every ${90 / gameEvents.size} minutes`
);
/// alternate solution by using the last minute marker with .pop()
const time2 = [...gameEvents.keys()].pop();
console.log(time2);

console.log(
  `An event happened, on average, every ${time2 / gameEvents.size} minutes`
);

// 4
for (const [key, value] of gameEvents) {
  if (key < 45) {
    console.log(`[first half] ${key}: ${value}`);
  } else {
    console.log(`[second half] ${key}: ${value}`);
  }
}
//// can be written as
for (const [key, value] of gameEvents) {
  const half = key <= 45 ? "first" : "second";
  console.log(`[${half} half] ${key}: ${value}`);
}
///////// strings part 1 //////////
console.log("---------strings1----------");
// strings are 0 based
// it is impossible to mutate strings - they are primitives
// all methods always return a new string
const airline = "TAP Air Portugal";
const plane = "A320";
console.log(plane[0]);
console.log(plane[1]);
console.log(plane[2]);
console.log("B737"[0]);
console.log(airline.length);
console.log("B737".length);

// methods
// **** whenever we call a method on a string JS converts that string primitive with a string object with the same content (called boxing) *****
console.log(airline.indexOf("r")); // only gives first occurence
console.log(airline.lastIndexOf("r"));
console.log(airline.indexOf("Portugal")); // case sensitive
console.log(airline.slice(4)); // the begin parameter (position at which the extraction will start) - result is called sub string, does not change the underlying string
console.log(airline.slice(4, 7)); // stops extracting before reaching 7
// withour knowing the string
console.log(airline.slice(0, airline.indexOf(" "))); // to find first word
console.log(airline.slice(airline.lastIndexOf(" ") + 1)); // to find last word
console.log(airline.slice(-2)); // starts extracting from the end
console.log(airline.slice(1, -1));

const checkMiddleSeat = function (seat) {
  // b and e are middle seats
  const s = seat.slice(-1);
  if (s === "B" || s === "E") {
    console.log("you got the middle seat");
  } else {
    console.log("you got lucky");
  }
};
checkMiddleSeat("11B");
checkMiddleSeat("23C");
checkMiddleSeat("3E");

// **** whenever we call a method on a string JS converts that string primitive with a string object with the same content (called boxing), then the object is converted back to a string  *****
// JS does this behind the scenes:
console.log(new String("string"));
console.log(typeof new String("string"));

///////// strings part 2 //////////
console.log("---------strings2----------");

console.log(airline.toLowerCase());
console.log(airline.toUpperCase());
console.log("call directly on a string".toUpperCase());

// fix capitalization in a name
const passenger = "jOnAs";
const passengerLower = passenger.toLowerCase();
const passengerCorrect =
  passengerLower[0].toUpperCase() + passengerLower.slice(1);
console.log(passengerCorrect);
//
function fixName(name) {
  const lower = name.toLowerCase();
  const correct = lower[0].toUpperCase() + lower.slice(1);
  return correct;
}
console.log(fixName("jaCoB"));

// compare email
const email = "hello@jonas.io";
const loginEmail = "  Hello@Jonas.Io  \n";

const lowerEmail = loginEmail.toLowerCase();
const trimmedEmail = lowerEmail.trim();
console.log(trimmedEmail);
// combined
const normalizedEmail = loginEmail.toLowerCase().trim();
console.log(normalizedEmail);
console.log(email === normalizedEmail);

// // replacing
const priceGB = "288,97£";
const priceUS = priceGB.replace("£", "$").replace(",", ".");
console.log(priceUS);

const announcement =
  "All passengers come to boarding door 23. Boarding door 23!";
console.log(announcement.replace("door", "gate"));
console.log(announcement.replaceAll("door", "gate"));
console.log(announcement.replace(/door/g, "gate")); // /word/g - global

// booleans

const plane2 = "Airbus A320neo";
console.log(plane2.includes("A320"));
console.log(plane2.startsWith("Air"));

if (plane2.startsWith("Airbus") && plane2.endsWith("neo")) {
  console.log("Part of the NEW ARirbus family");
}

const checkBaggage = function (items) {
  const baggage = items.toLowerCase();
  if (baggage.includes("knife") || baggage.includes("gun")) {
    console.log("You are not allowed on board");
  } else {
    console.log("Welcome aboard");
  }
};
checkBaggage("I have a laptop, some Food and a pocket Knife");
checkBaggage("I have a some socks and camera");
checkBaggage("Got some snacks and a gun for protection");

///////// strings part 3 //////////
console.log("---------strings3----------");

// split and join
console.log("a+very+nice+string".split("+"));
console.log("Jonas Schmedtmann".split(" "));

const [firstName, lastName] = "Jonas Schmedtmann".split(" ");

const newName = ["Mr.", firstName, lastName.toUpperCase()].join(" ");
console.log(newName);

const capitalizeName = function (name) {
  const names = name.split(" ");
  const namesUpper = [];
  for (const n of names) {
    // namesUpper.push(n[0].toUpperCase() + n.slice(1));
    // can be written as:
    namesUpper.push(n.replace(n[0], n[0].toUpperCase()));
  }
  console.log(namesUpper.join(" "));
};
capitalizeName("jessica ann smith davis");
capitalizeName("bob smith");

// padding
const message = "go to gate 23!";
console.log(message.padStart(25, "+").padEnd(30, "+"));
console.log("Bob".padStart(25, "+"));

const maskCreditCard = function (number) {
  const str = number + "";
  const last = str.slice(-4);
  return last.padStart(str.length, "*");
};

console.log(maskCreditCard(8439756923));
console.log(maskCreditCard(475692345345467));

//repeat
const message2 = "Bad weather... All departures delayed... ";
console.log(message2.repeat(5));

function planesInLine(n) {
  console.log(`There are ${n} planes in line ${"🛩".repeat(n)}`);
}
planesInLine(5);
planesInLine(3);
planesInLine(12);

console.log("---------challenge4----------");

/* 
Write a program that receives a list of variable names written in underscore_case and convert them to camelCase.

The input will come from a textarea inserted into the DOM (see code below), and conversion will happen when the button is pressed.

THIS TEST DATA (pasted to textarea)
underscore_case
 first_name
Some_Variable 
  calculate_AGE
delayed_departure

SHOULD PRODUCE THIS OUTPUT (5 separate console.log outputs)
underscoreCase      ✅
firstName           ✅✅
someVariable        ✅✅✅
calculateAge        ✅✅✅✅
delayedDeparture    ✅✅✅✅✅

HINT 1: Remember which character defines a new line in the textarea 😉
HINT 2: The solution only needs to work for a variable made out of 2 words, like a_b
HINT 3: Start without worrying about the ✅. Tackle that only after you have the variable name conversion working 😉
HINT 4: This challenge is difficult on purpose, so start watching the solution in case you're stuck. Then pause and continue!

Afterwards, test with your own test data!

GOOD LUCK 😀
*/

document.body.append(document.createElement("textarea"));
document.body.append(document.createElement("button"));

const button = document.querySelector("button");
button.addEventListener("click", function () {
  const text = document.querySelector("textarea").value;
  // console.log(text);
  const rows = text.split("\n");
  // console.log(rows);

  for (const [i, row] of rows.entries()) {
    const [first, second] = row.toLowerCase().trim().split("_");
    const output = `${first}${second.replace(
      second[0],
      second[0].toUpperCase()
    )}`;
    console.log(`${output.padEnd(20)}${"✅".repeat(i + 1)}`);
  }
});
