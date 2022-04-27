"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

const displayMovements = function (movements) {
  containerMovements.innerHTML = "";
  movements.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";
    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__value">$${mov}</div>
    </div>
 `;
    // this method accepts 2 strings - the position in which we want to attach the html and what we want to insert
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};
displayMovements(account1.movements);
// console.log(containerMovements.innerHTML);

const calcDisplayBalance = function (movements) {
  const balance = movements.reduce(function (acc, mov) {
    return acc + mov;
  });
  labelBalance.textContent = `$${balance}`;
};
calcDisplayBalance(account1.movements);

const calcDisplaySummary = function (movements) {
  const incomes = movements
    .filter(function (mov) {
      return mov > 0;
    })
    .reduce(function (acc, cur) {
      return acc + cur;
    }, 0);
  labelSumIn.textContent = `$${incomes}`;

  const out = movements
    .filter(function (mov) {
      return mov < 0;
    })
    .reduce(function (acc, cur) {
      return acc + cur;
    }, 0);
  labelSumOut.textContent = `$${Math.abs(out)}`;

  const interest = movements
    .filter(function (mov) {
      return mov > 0;
    })
    .map(function (deposit) {
      return (deposit * 1.2) / 100;
    })
    .filter(function (int, i, arr) {
      console.log(arr);
      return int >= 1;
    })
    .reduce(function (acc, int) {
      return acc + int;
    }, 0);
  labelSumInterest.textContent = `$${interest}`;
};
calcDisplaySummary(account1.movements);

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map(function (name) {
        return name[0];
      })
      .join("");
  });
};
// not creating some value here, just doing some work to each account object - adding a username (side affect)//

createUsernames(accounts);
// console.log(accounts);

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ["USD", "United States dollar"],
//   ["EUR", "Euro"],
//   ["GBP", "Pound sterling"],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

console.log("------- array methods -----");
let arr = ["a", "b", "c", "d", "e"];
// slice - can extract any part of an array without changing the original
console.log(arr.slice(2));
console.log(arr.slice(2, 4)); // end parameter not included
console.log(arr.slice(-2)); // from the end
console.log(arr.slice(-1)); // always the last
console.log(arr.slice(1, -2));
console.log(arr.slice()); // no argument creates a shallow copy
console.log([...arr]); // same result with spread operator as slice with no argument

// splice - works like slice EXCEPT it changes the origina array
// console.log(arr.splice(2)); // extracts all elements after index
arr.splice(-1);
console.log(arr); // all that is left
// we are usually not interested in what the splice method returns, just what is left over
arr.splice(1, 2); // first parameter is the starting index, second paramets is the number of elements NOT the end index
console.log(arr);

// reverse - does mutate the original array
arr = ["a", "b", "c", "d", "e"];
const arr2 = ["j", "i", "h", "g", "f"];
console.log(arr2.reverse());
console.log(arr2);

// concat - does not mutate the original array
const letters = arr.concat(arr2);
console.log(letters);
console.log([...arr, ...arr2]); // same result as concat

//join
console.log(letters.join("-"));

console.log("----------- at method----------");

const arr3 = [23, 11, 64];
console.log(arr3[0]);
// same thing with at method
console.log(arr3.at(0));
// one big difference:
// better for method chaining
// getting last array element:
// more traditional methods
console.log(arr3[arr3.length - 1]);
console.log(arr3.slice(-1)[0]);
// at
console.log(arr3.at(-1)); // gets the last element

console.log("jonas".at(0));
console.log("jonas".at(-1));

console.log("----------- forEach----------");
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for (const movement of movements) { // regular
for (const [i, movement] of movements.entries()) {
  // index, movement (a way of setting up a counter)
  if (movement > 0) {
    // console.log(you deposited ${movement}`);
    console.log(`movement ${i + 1}: you deposited ${movement}`);
  } else {
    // console.log(`you withdrew ${Math.abs(movement)}`);
    console.log(`movement ${i + 1}: you withdrew ${Math.abs(movement)}`);
    // Math.abs removes negative sign
  }
}
// same result as for of
// regular:
// movements.forEach(function (movement) {
//   if (movement > 0) {
//     console.log(`you deposited ${movement}`);
//   } else {
//     console.log(`you withdrew ${Math.abs(movement)}`);
//   }
// });
// forEach passes in the element, current index and entire array - order of parameters matter
// with counter:
movements.forEach(function (mov, i, arr) {
  if (mov > 0) {
    console.log(`movement ${i + 1}: you deposited ${mov}`);
  } else {
    console.log(`movement ${i + 1}: you withdrew ${Math.abs(mov)}`);
  }
});
// ***** continue and break statements don't work for forEach *****
// other than that theres not really a difference from for of
// how it works:
// 0: function(200)
// 1: function(200)
// 2: function(200)
// ...

console.log("-------- forEach - maps/sets-------");

const currencies = new Map([
  ["USD", "United States dollar"],
  ["EUR", "Euro"],
  ["GBP", "Pound sterling"],
]);

// parameters order is value, key, entire map
currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});

// set - set does not have keys or indexes
const currenciesUnique = new Set(["USD", "GBP", "USD", "EUR", "EUR"]);
console.log(currenciesUnique);
currenciesUnique.forEach(function (value, _, map) {
  console.log(`${value}: ${value}`);
});

console.log("-------- challenge 1-------");

/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

function checkDogs(dogsJulia, dogsKate) {
  const noCats = dogsJulia.slice(1, 3);
  // console.log(noCats);
  const allDogs = noCats.concat(dogsKate);
  // console.log(allDogs);
  allDogs.forEach(function (dog, i) {
    if (dog >= 3) {
      console.log(`Dog number ${i + 1} is an adult, and is ${dog} years old`);
    } else console.log(`Dog number ${i + 1} is still a puppy 🐶`);
  });
}

checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
console.log("--- test data 2 ---");
checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);

/////// map, filter, reduce /////

// map - like forEach EXCEPT map creates a brand new array based on the original array. takes an array, loops over it and in each iteration it applies a callback function and to the current array element. and returns a new array. - maps the values of the original array to a new array. forEach simply allows us to do some work with each array element, map builds us a brand new array containing the results of applying an operation to the original array.

// filter - used to filter for elements in the original array which satisfy a certain condition. only elements that pass the test that we specify will make it a new array that the filter returns

// reduce - used to boil down ("reduce") all the elements of the original array into one single value. ("snowball effect"). no new array, only the reduced value.

console.log("-------- map -------");

const movements2 = [200, 450, -400, 3000, -650, -130, 70, 1300];

const eurToUsd = 1.1;
const movementsUSD = movements2.map(function (movement) {
  return movement * eurToUsd;
});
console.log(movements2);
console.log(movementsUSD);

// as an arrow function
const movementsUsdArrow = movements2.map(movement => movement * eurToUsd);
console.log(movementsUsdArrow);

// for loop to do the same thing
//using methods with callback functions (map) is the new and modern way //
const movementsUSDfor = [];
for (const movement of movements) {
  movementsUSDfor.push(movement * eurToUsd);
}
console.log(movementsUSDfor);

const movementDesc = movements2.map(function (mov, i) {
  return `movement ${
    i + 1
  }: you ${mov > 0 ? "deposited" : "withdrew"} ${Math.abs(mov)}`;
  // if (mov > 0) {
  //   return `movement ${i + 1}: you deposited ${mov}`;
  // } else {
  //   return `movement ${i + 1}: you withdrew ${Math.abs(mov)}`;
  // }
});
// **** similar as forEach method EXCEPT:
// in forEach we printed each line individually to the console as we were looping over the array, in each of the iterations we performed some action that was then visinble in the console like a side affect. forEach method creates side affects.
// With map all we did was return each of the strings from the callback, they got added into a new array, and then we logged that entire array to the console, and not the elements one by one. WE DID NOT CREATE A SIDE AFFECT.
// **** its ok to have 2 return statements, or more, in a function AS LONG AS ONLY ONE IS EXECUTED. IT'S IMPOSSIBLE FOR BOTH TO RETURN AT THE SAME TIME.
console.log(movementDesc);

console.log("-------- filter -------");

const deposits = movements2.filter(function (mov) {
  return mov > 0;
});
console.log(movements2);
console.log(deposits);

// old way with for of loop:
const depositsFor = [];
for (const mov of movements2) {
  if (mov > 0) {
    depositsFor.push(mov);
  }
}
console.log(depositsFor);

const withdrawals = movements2.filter(function (mov) {
  return mov < 0;
});
console.log(withdrawals);

console.log("-------- reduce -------");
// reduce loops over the array
// xxxxxx.reduce(function(accumulator, element, index, entire array){}, initial value)
//accumulator is essentially like a snowball that keeps accumulating the value that we want to return
const balance = movements2.reduce(function (acc, cur, i) {
  console.log(`iteration ${i}: ${acc}`);
  return acc + cur;
}, 0);
console.log(balance);
// old way with for of:
let balance2 = 0;
for (const mov of movements2) {
  balance2 += mov;
}
console.log("balance2:", balance2);

// maximum value
const max = movements2.reduce(function (acc, mov) {
  if (acc > mov) {
    return acc;
  } else {
    return mov;
  }
}, movements2[0]);
console.log(max);

console.log("-------- challenge2 -------");
/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

*/

const calcAverageHumanAge = function (ages) {
  const humanAge = ages.map(function (age) {
    return age <= 2 ? age * 2 : 16 + age * 4;
    // if (age <= 2) {
    //   return age * 2;
    // } else {
    //   return 16 + age * 4;
    // }
  });
  console.log(humanAge);
  const over18 = humanAge.filter(function (age) {
    return age >= 18;
  });
  console.log(over18);
  const average = over18.reduce(function (acc, age, i, arr) {
    console.log(acc, age);
    return acc + age / arr.length;
  }, 0);
  // could have written:
  // const average =
  //   over18.reduce(function (acc, age) {
  //     return acc + age;
  //   }, 0) / over18.length;

  console.log(average);
};

calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);

console.log("-------- chaining -------");

const totalDepositsUSD = movements2
  .filter(function (mov) {
    return mov > 0;
  })
  .map(function (mov) {
    return mov * eurToUsd;
  })
  .reduce(function (acc, mov) {
    return acc + mov;
  }, 0);
console.log(totalDepositsUSD);

// arrow functions:
const totalDepositsUSD2 = movements2
  .filter(mov => mov > 0)
  .map(mov => mov * eurToUsd)
  .reduce((acc, mov) => acc + mov, 0);
console.log("arrow:", totalDepositsUSD2);

console.log("-------- challenge3 -------");
/* 
Rewrite the 'calcAverageHumanAge' function from the previous challenge, but this time as an arrow function, and using chaining!

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]


*/
const calcAverageHumanAge2 = ages =>
  ages
    .map(age => (age <= 2 ? age * 2 : 16 + age * 4))
    .filter(age => age >= 18)
    .reduce((acc, age, i, arr) => acc + age / arr.length, 0);

const avg1 = calcAverageHumanAge2([5, 2, 4, 1, 15, 8, 3]);
const avg2 = calcAverageHumanAge2([16, 6, 10, 5, 6, 1, 4]);
console.log(avg1);
console.log(avg2);

console.log("-------- find -------");
// find method - can use to retrieve one element of an array based on a condition
// like filter EXCEPT:
// ONLY returns the FIRST element in the array that satisfies the condition
// ** does NOT return a new array
const firstWithdrawal = movements2.find(function (mov) {
  return mov < 0;
});
console.log(movements2);
console.log(firstWithdrawal);

console.log(accounts);

const account = accounts.find(function (acc) {
  return acc.owner === "Jessica Davis";
});
console.log(account);

let accountFor;
for (const account of accounts) {
  if (account.owner === "Jessica Davis") {
    accountFor = account;
  }
}
console.log(accountFor);
