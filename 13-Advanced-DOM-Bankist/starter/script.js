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

console.log("--- selecting, creating & deleting elements ---");

// selecting elements
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

const header = document.querySelector(".header");
const allSections = document.querySelectorAll(".section");
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

document.documentElement.style.setProperty("--color-primary", "orangered");

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
logo.className = "jonas";

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
