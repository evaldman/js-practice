"use strict";

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".close-modal");
const btnsOpenModal = document.querySelectorAll(".show-modal");
// console.log(btnsOpenModal);

function openModal() {
  //   console.log("button clicked");
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
}

function closeModal() {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
}

for (let i = 0; i < btnsOpenModal.length; i++) {
  //   console.log(btnsOpenModal[i].textContent);
  btnsOpenModal[i].addEventListener("click", openModal);
  //     console.log("button clicked");
  //     modal.classList.remove("hidden");
  //     overlay.classList.remove("hidden");
  //   });
}

// declare it directly:
btnCloseModal.addEventListener("click", closeModal);
// modal.classList.add("hidden");
// overlay.classList.add("hidden");

// can also call it in the function:
overlay.addEventListener("click", function () {
  closeModal();
  // modal.classList.add("hidden");
  // overlay.classList.add("hidden");
});

document.addEventListener("keydown", function (event) {
  console.log(event.key);
  if (event.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});
