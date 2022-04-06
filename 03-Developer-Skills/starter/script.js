// Remember, we're gonna use strict mode in all scripts now!
"use strict";

// PROBLEM 1:
// We work for a company building a smart home thermometer. Our most recent task is this: "Given an array of temperatures of one day, calculate the temperature amplitude. Keep in mind that sometimes there might be a sensor error."

const temperatures = [3, -2, -6, -1, "error", 9, 13, 17, 15, 14, 9, 5];

// ** underdstanding the problem: **
// what is temperature amplitude? the difference between highest and lowest
// how to compute the max and min temperatures?
// what is a sensor error? and what to do?

// ** breaking up into sub problems **
// how to ignore errors
// find max value in temp array
// find min value in temp array
// subtract min from max (amplitude) and return it

function calcTempAmp(temps) {
  let max = temps[0];
  let min = temps[0];
  for (let i = 0; i < temps.length; i++) {
    // since we use temps[i] so many times, we should create a variable for it
    // if (temps[i] > max) max = temps[i];
    // if (temps[i] < min) min = temps[i]
    const currentTemp = temps[i];
    // tackle error
    if (typeof currentTemp !== "number") continue;
    if (currentTemp > max) max = currentTemp;
    if (currentTemp < min) min = currentTemp;
  }

  //   console.log(max);
  //   console.log(min);
  return max - min;
}
const amplitude = calcTempAmp(temperatures);
console.log(amplitude);

// problem 2:
// function should now receive 2 arrays of temperatures

// understanding:
// with 2 arrays, should we implement functionality twice? no, just merge the arrays
// breaking into sub problems:
// merge 2 arrays?

function calcTempAmpNew(temps1, temps2) {
  //   const array1 = ["a", "b", "c"];
  //   const array2 = ["d", "e", "f"];
  //   const array3 = array1.concat(array2);
  const temps = temps1.concat(temps2);
  //   console.log(temps);
  let max = temps[0];
  let min = temps[0];
  for (let i = 0; i < temps.length; i++) {
    const currentTemp = temps[i];
    if (typeof currentTemp !== "number") continue;
    if (currentTemp > max) max = currentTemp;
    if (currentTemp < min) min = currentTemp;
  }
  //   console.log(max);
  //   console.log(min);
  return max - min;
}
const amplitudeNew = calcTempAmpNew([3, 5, 1], [9, 0, 5]);
//const amplitudeNew = calcTempAmpNew(temperatures);
console.log(amplitudeNew);

console.log("challenge 1");
// Given an array of forecasted maximum temperatures, the thermometer displays a string with these temperatures.

// Example: [17, 21, 23] will print "... 17ºC in 1 days ... 21ºC in 2 days ... 23ºC in 3 days ..."

// Create a function 'printForecast' which takes in an array 'arr' and logs a string like the above to the console.

// Use the problem-solving framework: Understand the problem and break it up into sub-problems!

// pull out each value and put in sentence
// loop through to extract value
// create days variable that increments with each iteration

// understanding the problem:
// array transformed to string, separated by ...
// what is the x days? index + 1
// breaking into sub problems:
// transform array into string
// transmorm each element to string with C
// strings need to contain day (index + 1)
// add ... between elements at start and end of string
// TEST DATA 1: [17, 21, 23]
// TEST DATA 2: [12, 5, -5, 0, 4]

const testData1 = [17, 21, 23];
const testData2 = [12, 5, -5, 0, 4];

function printForecast(arr) {
  let string = "";
  for (let i = 0; i < arr.length; i++) {
    string = string + `${arr[i]}ºC in ${i + 1} days ... `;
  }
  console.log("... " + string);
}
printForecast(testData1);
printForecast(testData2);
