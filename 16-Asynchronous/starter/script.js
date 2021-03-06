'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
//restcountries.com/v2/

const renderCountry = function (data, className = '') {
  const html = `
      <article class="country ${className}">
      <img class="country__img" src="${data.flag}" />
      <div class="country__data">
      <h3 class="country__name">${data.name}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(
        +data.population / 1000000
      ).toFixed(1)} people</p>
          <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
          <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
          </div>
          </article>
          `;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  // countriesContainer.style.opacity = 1;
};

const getCountryData = function (country) {
  // old way
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v2/name/${country}`);
  request.send();
  // console.log(request.responseText);

  request.addEventListener('load', function () {
    console.log(this.responseText);

    const [data] = JSON.parse(this.responseText);
    console.log(data);

    const html = `
  <article class="country">
  <img class="country__img" src="${data.flag}" />
  <div class="country__data">
    <h3 class="country__name">${data.name}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>👫</span>${(
      +data.population / 1000000
    ).toFixed(1)} people</p>
    <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
    <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
  </div>
</article>
  `;

    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
  });
};

// getCountryData('portugal');
// getCountryData('usa');
// getCountryData('moldova');

/////////////////////////////////////////

const getCountryAndNeighbor = function (country) {
  // ajax call country 1
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v2/name/${country}`);
  request.send();
  // console.log(request.responseText);

  request.addEventListener('load', function () {
    // console.log(this.responseText);

    const [data] = JSON.parse(this.responseText);
    console.log(data);

    // render country 1
    renderCountry(data);

    // get neighbor country (2)
    const neighbor = data.borders?.[0];

    // ajax call country 2
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v2/alpha/${neighbor}`);
    request2.send();

    request2.addEventListener('load', function () {
      const data2 = JSON.parse(this.responseText);
      console.log(data2);

      renderCountry(data2, 'neighbour');
    });
  });
};

// getCountryAndNeighbor('portugal');
// getCountryAndNeighbor('usa');

// callback hell

// setTimeout(() => {
//   console.log('1 second passed');
//   setTimeout(() => {
//     console.log('2 seconds passed');
//     setTimeout(() => {
//       console.log('3 seconds passed');
//       setTimeout(() => {
//         console.log('4 seconds passed');
//       }, 1000);
//     }, 1000);
//   }, 1000);
// }, 1000);

console.log('------ promises and fetch ------');

// const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v2/name/${country}`);
//   request.send();

// modern way to make api calls
// const request = fetch('https://restcountries.com/v2/name/portugal');
// console.log(request);

// promise = an object that is used as a placeholder for the future result of an asynchronous operation
///// we no longer need to rely on events and callbacks passed into asynchronous functions to handle asynchronous results
///// instead of nesting callbacks, we can chain promises for a sequence of asynchronous operaions: escaping callback hell

// const getCountryDataF = function (country) {
//   fetch(`https://restcountries.com/v2/name/${country}`)
//     .then(function (response) {
//       console.log(response);
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data);
//       renderCountry(data[0]);
//     });
// };

// simplified version
const getCountryDataF = function (country) {
  fetch(`https://restcountries.com/v2/name/${country}`)
    .then(response => response.json())
    .then(data => renderCountry(data[0]));
};
// getCountryDataF('portugal');

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

    return response.json();
  });
};

// const getCountryDataNeighbor = function (country) {
//   //country 1
//   fetch(`https://restcountries.com/v2/name/${country}`)
//     .then(response => {
//       console.log(response);

//       if (!response.ok)
//         throw new Error(`Country not found (${response.status})`);
//       // creates a rejection which propogates down to the catch method and gets passed in as err.message
//       return response.json();
//     })
//     .then(data => {
//       renderCountry(data[0]);
//       const neighbor = data[0].borders?.[0];
//       //country 2
//       return fetch(`https://restcountries.com/v2/alpha/${neighbor}`);
//     })
//     .then(res => res.json())
//     .then(data => renderCountry(data, 'neighbour'))
//     .catch(err => {
//       console.error(`${err} 🔴 🔴 🔴`);
//       renderError(`Something went wrong - ${err.message}. Try again!`);
//     })
//     // something needs to happen no matter the result of the promise
//     // only works on promises
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

const getCountryDataNeighbor = function (country) {
  //country 1
  getJSON(`https://restcountries.com/v2/name/${country}`, 'Country not found')
    .then(data => {
      renderCountry(data[0]);
      const neighbor = data[0].borders?.[0];
      if (!neighbor) throw new Error('No neighbor found');
      //country 2
      return getJSON(
        `https://restcountries.com/v2/alpha/${neighbor}`,
        'Country not found'
      );
    })
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
      console.error(`${err} 🔴 🔴 🔴`);
      renderError(`🛑 Something went wrong 🛑 - ${err.message}. Try again!`);
    })
    // something needs to happen no matter the result of the promise
    // only works on promises
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', function () {
  //   getCountryDataNeighbor('portugal');
});
// getCountryDataNeighbor('United States of America');

console.log('----- challenge 1 -----');

/* 
In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.

Here are your tasks:

PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).
2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://geocode.xyz/api.
The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, that is cheating 😉
3. Once you have the data, take a look at it in the console to see all the attributes that you recieved about the provided location. Then, using this data, log a messsage like this to the console: 'You are in Berlin, Germany'
4. Chain a .catch method to the end of the promise chain and log errors to the console
5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() does NOT reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message.

PART 2
6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)

TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474

*/

const whereAmI = function (lat, lng) {
  fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
    .then(response => {
      if (!response.ok)
        throw new Error(`Too many requests (${response.status})`);

      return response.json();
    })
    // .then(data => console.log(data));
    .then(data => {
      console.log(data);
      console.log(`You are in ${data.city}, ${data.country}`);
      return getCountryDataNeighbor(data.country);
    })
    .catch(err => console.log(`Something went wrong - ${err.message}`));
};

// whereAmI(52.508, 13.381);
// whereAmI(19.037, 72.873);
// whereAmI(-33.933, 18.474);

///////////
console.log('----- event loop -----');

// console.log('Test start');
// setTimeout(() => console.log('0 sec timer'), 0);
// Promise.resolve('Resolved Promise 1').then(res => console.log(res));
// Promise.resolve('Resolved Promise 2').then(res => {
//   //   for (let i = 0; i < 1000000000; i++) {}
//   console.log(res);
// });
// console.log('test end');

console.log('----- building a promise -----');
/*
const lotteryPromise = new Promise(function (resolve, reject) {
  console.log('Lottery draw happening');
  setTimeout(function () {
    if (Math.random() >= 0.5) {
      resolve('You win 😁');
    } else {
      reject(new Error('You lost 😞'));
    }
  }, 2000);
});

lotteryPromise.then(res => console.log(res)).catch(err => console.log(err));

// promisifying setTimeout
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};
wait(2)
  .then(() => {
    console.log('2 second wait');
    return wait(1);
  })
  .then(() => console.log('1 second wait'));

Promise.resolve('testing').then(res => console.log(res));
Promise.reject(new Error('testing')).catch(err => console.error(err));
*/
console.log('----- promisifying geolocation -----');

// navigator.geolocation.getCurrentPosition(
//   position => console.log(position),
//   err => console.log(err)
// );

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    // navigator.geolocation.getCurrentPosition(
    //   position => resolve(position),
    //   err => reject(err)
    // );
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};
// getPosition().then(pos => console.log(pos));

const whereAmI2 = function () {
  getPosition()
    .then(pos => {
      const { latitude: lat, longitude: lng } = pos.coords;
      return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    })
    .then(response => {
      if (!response.ok)
        throw new Error(`Too many requests (${response.status})`);

      return response.json();
    })
    // .then(data => console.log(data));
    .then(data => {
      console.log(data);
      console.log(`You are in ${data.city}, ${data.country}`);

      return fetch(`https://restcountries.com/v2/name/${data.country}`);
    })
    .then(res => {
      if (!res.ok) throw new Error(`Country not found (${res.status})`);
      return res.json();
    })
    // .then(data => console.log(data[0]))
    .then(data => renderCountry(data[0]))
    .catch(err => console.error(`Something went wrong - ${err.message}`))
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

// btn.addEventListener('click', whereAmI2);

console.log('----- challenge 2 -----');
/* 
Build the image loading functionality that I just showed you on the screen.

Tasks are not super-descriptive this time, so that you can figure out some stuff on your own. Pretend you're working on your own 😉

PART 1
1. Create a function 'createImage' which receives imgPath as an input. This function returns a promise which creates a new image (use document.createElement('img')) and sets the .src attribute to the provided image path. When the image is done loading, append it to the DOM element with the 'images' class, and resolve the promise. The fulfilled value should be the image element itself. In case there is an error loading the image ('error' event), reject the promise.

If this part is too tricky for you, just watch the first part of the solution.

PART 2
2. Comsume the promise using .then and also add an error handler;
3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier;
4. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second image (HINT: Use the image element returned by the createImage promise to hide the current image. You will need a global variable for that 😉);
5. After the second image has loaded, pause execution for 2 seconds again;
6. After the 2 seconds have passed, hide the current image.

TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. Set the network speed to 'Fast 3G' in the dev tools Network tab, otherwise images load too fast.

GOOD LUCK 😀
*/

const images = document.querySelector('.images');

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;

    img.addEventListener('load', function () {
      images.append(img);
      resolve(img);
    });

    img.addEventListener('error', function () {
      reject(new Error('Cannot find image'));
    });
  });
};

let currentImage;

// createImage('img/img-1.jpg')
//   .then(img => {
//     currentImage = img;
//     console.log('loading');
//     return wait(2);
//   })
//   .then(() => {
//     currentImage.style.display = 'none';
//     return createImage('img/img-2.jpg');
//   })
//   .then(img => {
//     currentImage = img;
//     console.log('loading 2');
//     return wait(2);
//   })
//   .then(() => {
//     currentImage.style.display = 'none';
//   })
//   .catch(err => console.error(err));

console.log('----- async/await -----');

const whereAmI3 = async function (country) {
  // geolocation
  const pos = await getPosition();
  const { latitude: lat, longitude: lng } = pos.coords;
  //reverse geocoding
  const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
  const dataGeo = await resGeo.json();
  console.log(dataGeo);
  // country data
  const res = await fetch(
    `https://restcountries.com/v2/name/${dataGeo.country}`
  );
  // console.log(res);
  const data = await res.json();
  console.log(data);
  renderCountry(data[0]);
};
whereAmI3();
console.log('first');
