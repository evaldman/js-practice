"use strict";
//// forbids us to do certain things ///
//// creates visible errors in the developer console in certain situations, otherwise js will fail silently without letting us know

let hasDriversLicense = false;
const passTest = true;
if (passTest) hasDriverLicense = true;
if (hasDriversLicense) console.log("I can drive");
// without strict mode there was no error in the console, just nothing happened.
// turned on, the error showed up in the console.

const interface = "audio";
const private = 534;
// reserved words not allowed in strict mode
