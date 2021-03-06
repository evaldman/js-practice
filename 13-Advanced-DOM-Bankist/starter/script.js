"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach(function (btn) {
  btn.addEventListener("click", openModal);
});

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});
console.log("---- smooth scroll ----");

const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

btnScrollTo.addEventListener("click", function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);
  console.log(e.target.getBoundingClientRect());

  console.log("Current scroll (X/Y)", window.pageXOffset, window.pageYOffset);
  console.log(
    "height/width viewport",
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );
  /// ** old method **
  // scrolling
  // window.scrollTo(
  //   s1coords.lef + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );
  // *** to make it smooth, make it an object and set a behavior ***
  // window.scrollTo({
  //   left: s1coords.lef + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: "smooth",
  // });

  /// ** modern method **
  // only works in modern browsers
  section1.scrollIntoView({ behavior: "smooth" });
});

// page navigation
// document.querySelectorAll(".nav__link").forEach(function (el) {
//   el.addEventListener("click", function (e) {
//     e.preventDefault();
//     // console.log("link");
//     const id = this.getAttribute("href");
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: "smooth" });
//   });
// }); // is more efficient if done with event delagation:
// 1. add event listener to common parent element
// 2. determine what element originated the event

document.querySelector(".nav__links").addEventListener("click", function (e) {
  console.log(e.target);
  e.preventDefault();

  // matching strategy
  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

//// tabbed components ////
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");

// tabs.forEach(t => t.addEventListener("click", () => console.log("tab"))); // not efficient
// more efficient to go through the parent and listen for a click there
tabsContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".operations__tab");
  // need .closest here because the numbers in the tab are their own <span> element
  console.log(clicked);

  // guard clause - do not execute code if we miss the button, otherwise error occurs
  if (!clicked) return;

  // remove active classes
  tabs.forEach(tab => tab.classList.remove("operations__tab--active"));
  tabsContent.forEach(content =>
    content.classList.remove("operations__content--active")
  );

  // activate tab
  clicked.classList.add("operations__tab--active");

  // activate content area
  console.log(clicked.dataset.tab);
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});

// menu fade animation
const handleHover = function (e, opacity) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");

    siblings.forEach(el => {
      if (el !== link) {
        el.style.opacity = opacity;
      }
    });
    logo.style.opacity = opacity;
  }
};

const nav = document.querySelector(".nav");
nav.addEventListener("mouseover", function (e) {
  handleHover(e, 0.5);
  // if (e.target.classList.contains("nav__link")) {
  //   const link = e.target;
  //   const siblings = link.closest(".nav").querySelectorAll(".nav__link");
  //   const logo = link.closest(".nav").querySelector("img");
  //   siblings.forEach(el => {
  //     if (el !== link) {
  //       el.style.opacity = 0.5;
  //     }
  //   });
  //   logo.style.opacity = 0.5;
  // }
});
nav.addEventListener("mouseout", function (e) {
  handleHover(e, 1);
  // if (e.target.classList.contains("nav__link")) {
  //   const link = e.target;
  //   const siblings = link.closest(".nav").querySelectorAll(".nav__link");
  //   const logo = link.closest(".nav").querySelector("img");
  //   siblings.forEach(el => {
  //     if (el !== link) {
  //       el.style.opacity = 1;
  //     }
  //   });
  //   logo.style.opacity = 1;
  // }
});

// sticky nav

// sticky navigation:
// const initialCoords = section1.getBoundingClientRect();
// console.log(initialCoords);

// window.addEventListener("scroll", function () {
//   // console.log(e); // event fires off too many times so we are not going to use it
//   console.log(window.scrollY);

//   if (window.scrollY > initialCoords.top) {
//     nav.classList.add("sticky");
//   } else {
//     nav.classList.remove("sticky");
//   }
// });

// sticky navigation: Intersection Observer Api

// practice ??????
// const obsCallback = function (entries, observer) {
//   entries.forEach(function (entry) {
//     console.log(entry);
//   });
// };

// const obsOptions = {
//   root: null,
//   // threshold: 0.1, // can have multiple thresholds in an array
//   threshold: [0, 0.2], // 0% means that our callback will trigger each time that the target element moves completely out of the view and also as soon as it enters the view
// };
// // callback function gets called everytime the observed element (our target element - section1) is intersecting the root element at the threshold that we defined
// // in this case - whenever the first section is intersecting the viewport (because root is null) at 10% (threshold) the callback function will be called
// const observer = new IntersectionObserver(obsCallback, obsOptions);
// // could write the callback and options directly in ItersectionObserver
// observer.observe(section1);
// // practice ??????

const header = document.querySelector(".header");
const navHeight = nav.getBoundingClientRect().height; // using to set rootMargin dynamically
console.log(navHeight);

const stickyNav = function (entries) {
  const [entry] = entries; // same as writing (entrie[0]) - destructuring
  // console.log(entry);

  if (!entry.isIntersecting) {
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
  // rootMargin: "-90px", // a box of 90px that will be applied outside our target element (start sticky nav a little before (90px in this case) crossing the line of section1)
});
headerObserver.observe(header);

// reveal sections
const allSections = document.querySelectorAll(".section");
const revealSection = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) return;

  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null, //viewport
  threshold: 0.15,
});
allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

// lazy loading images
const imgTargets = document.querySelectorAll("img[data-src]");
// console.log(imgTargets);
const loadImg = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) return;

  // replace src with data-src
  entry.target.src = entry.target.dataset.src;
  // when an image is changed and loaded, JS emits a load event
  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
});

imgTargets.forEach(img => imgObserver.observe(img));

// slider
function slider() {
  const slides = document.querySelectorAll(".slide");
  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");
  const dotContainer = document.querySelector(".dots");

  let curSlide = 0;
  const maxSlide = slides.length;

  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll(".dots__dot")
      .forEach(dot => dot.classList.remove("dots__dot--active"));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  };

  // slides.forEach(function (slide, index) {
  //   slide.style.transform = `translateX(${100 * index}%)`;
  //   // 1st slide 0%, 2nd 100%, 3rd 200%
  // });
  // becomes goToSlide(0)

  const goToSlide = function (slide) {
    slides.forEach(function (s, index) {
      s.style.transform = `translateX(${100 * (index - slide)}%)`;
    });
  };

  // next slide

  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };
  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  function init() {
    goToSlide(0);
    createDots();
    activateDot(0);
  }
  init();

  // event handlers
  btnRight.addEventListener("click", nextSlide);
  // btnRight.addEventListener("click", function () {
  // if (curSlide === maxSlide - 1) {
  //   curSlide = 0;
  // } else {
  //   curSlide++;
  // }
  // slides.forEach(function (slide, index) {
  //   slide.style.transform = `translateX(${100 * (index - curSlide)}%)`;
  //   // 1st slide -100%, 2nd 0%, 3rd 100%
  // });
  // goToSlide(curSlide);
  // });
  btnLeft.addEventListener("click", prevSlide);

  document.addEventListener("keydown", function (e) {
    // console.log(e);
    if (e.key === "ArrowLeft") prevSlide();
    // short circuiting (can use either)
    e.key === "ArrowRight" && nextSlide();
  });

  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      // console.log("dot");
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
}
slider();
console.log("--- selecting, creating & deleting elements ---");

// selecting elements
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

// const header = document.querySelector(".header");
// const allSections = document.querySelectorAll(".section");
console.log(allSections);

document.getElementById("section--1");
const allButtons = document.getElementsByTagName("button");
console.log(allButtons);

document.getElementsByClassName("btn");

// creating and inserting elements
// .insertAdjacentHTML

const message = document.createElement("div");
message.classList.add("cookie-message");
// message.textContent = "We use cookies for improved functionality and analytics";
message.innerHTML =
  "We use cookies for improved functionality and analytics <button class='btn btn--close-cookie'>Got it!</button>";
// header.prepend(message);
header.append(message);
// header.append(message.cloneNode(true));
// dom elements are unique - can only exist in one place at a time
// prepend and append can insert an element, and can also move an element from one place to another
// header.before(message);
// header.after(message);

/// delete elements
document
  .querySelector(".btn--close-cookie")
  .addEventListener("click", function () {
    message.remove();
    // message.parentElement.removeChild(message)
  });

console.log("--- styles, attributes, classes ---");

//styles
message.style.backgroundColor = "#37383d";
message.style.width = "120%";

console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height);

message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 40 + "px";

// document.documentElement.style.setProperty("--color-primary", "orangered");

//attributes
const logo = document.querySelector(".nav__logo");
console.log(logo.alt);
console.log(logo.src);
console.log(logo.getAttribute("src"));
console.log(logo.className);

logo.alt - "Beautiful minimalist logo";
logo.setAttribute("company", "Bankist");

//classes
logo.classList.add("c", "j"); // can do one or more
logo.classList.remove("c");
logo.classList.toggle("c");
logo.classList.contains("c");

// don't use
// logo.className = "jonas";

console.log("------- events ------");

const h1 = document.querySelector("h1");

const alertH1 = function (e) {
  alert("addEventListenerL: Great! You are reading the heading");

  // h1.removeEventListener("mouseenter", alertH1);
};
h1.addEventListener("mouseenter", alertH1);
setTimeout(() => h1.removeEventListener("mouseenter", alertH1), 3000);
// h1.addEventListener("mouseenter", function (e) {
// alert("addEventListenerL: Great! You are reading the heading");
// });

// old way
// h1.onmouseenter = function (e) {
// alert("onmouseenter: Great! You are reading the heading");
// };

console.log("------- propagation ------");

// rgb(255, 255, 255)
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const randomColor = () =>
  `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;

// console.log(randomColor());

// document.querySelector(".nav__link").addEventListener("click", function (e) {
//   // console.log("LINK");
//   this.style.backgroundColor = randomColor();

//   // stop propagation
//   // e.stopPropagation();
// });
// document.querySelector(".nav__links").addEventListener("click", function (e) {
//   // console.log("LINK");
//   this.style.backgroundColor = randomColor();
// });
// document.querySelector(".nav").addEventListener("click", function (e) {
//   // console.log("LINK");
//   this.style.backgroundColor = randomColor();
// });

console.log("------ dom traversing ------");

// going downwards: child
console.log(h1.querySelectorAll(".highlight"));
console.log(h1.childNodes);
console.log(h1.children);
console.log(h1.firstElementChild);
h1.firstElementChild.style.color = "purple";
h1.lastElementChild.style.color = "yellow";

// going upwards: parents
console.log(h1.parentNode);
console.log(h1.parentElement);

h1.closest(".header").style.background = "var(--gradient-secondary)";

// going sideways: siblings

console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

console.log(h1.previousSibling); // nodes
console.log(h1.nextSibling); // nodes

console.log(h1.parentElement.children);
// [...h1.parentElement.children].forEach(function (el) {
//   if (el !== h1) {
//     el.style.transform = "scale(0.5)";
//   }
// });

console.log("-----lifecycle DOM events-----");
document.addEventListener("DOMContentLoaded", function (e) {
  console.log("HTML parsed and DOM tree built", e);
});

window.addEventListener("load", function (e) {
  console.log("page fully loaded", e);
});

// window.addEventListener("beforeunload", function (e) {
//   e.preventDefault();
//   console.log(e);
//   e.returnValue = "";
// });
