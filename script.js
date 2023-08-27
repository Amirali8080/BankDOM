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
btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

/////
const header = document.querySelector(".header");
const message = document.createElement("div");

message.classList.add("cookie-message");
message.innerHTML =
  'we use cookies for improves our services <button class= "btn btn--close-cookie">ok</button>';
// message append
header.append(message);
// delete cookie
document
  .querySelector(".btn--close-cookie")
  .addEventListener("click", function () {
    message.remove();
  });
// set style
message.style.width = "120%";
message.style.backgroundColor = "#37383d";
///

// smooth scroll
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

btnScrollTo.addEventListener("click", function () {
  section1.scrollIntoView({ behavior: "smooth" });
});

///  page navigation

document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();

  // matching strategy
  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

// tabbed component
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");

tabsContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".operations__tab");

  // guard clause
  if (!clicked) return;
  // remove active classes
  tabs.forEach((e) => e.classList.remove("operations__tab--active"));
  tabsContent.forEach((e) => e.classList.remove("operations__content--active"));
  // add active classes
  clicked.classList.add("operations__tab--active");
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});

// menue fade animations
const hanldehover = function (e) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    siblings.forEach((el) => {
      if (el !== link) el.style.opacity = this;
    });
  }
};
const nav = document.querySelector(".nav");
document;
nav.addEventListener("mouseover", hanldehover.bind(0.5));

nav.addEventListener("mouseout", hanldehover.bind(1));

// sticky navigation
const heightNav = nav.getBoundingClientRect().height;
const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  rootMargin: `-${heightNav}px`,
  threshold: 0,
});
headerObserver.observe(header);
// const obsCallback = function (entries) {
//   entries.forEach((entry) => console.log(entry));
// };
// const obsObserver = {
//   root: null,
//   threshold: 0,
// };
// const observer = new IntersectionObserver(obsCallback, obsObserver);
// observer.observe(section1);

///  reveal sections

const allSections = document.querySelectorAll(".section");

const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  // section.classList.add("section--hidden");
});

///  lazy loading img
const imgTargets = document.querySelectorAll("img[data-src]");

const loadImg = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });
  observer.unobserve(entry.target);
};
const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: "200px",
});

imgTargets.forEach((img) => imgObserver.observe(img));

/// slider
let currentSlide = 0;
const slider = document.querySelector(".slider");
const slides = document.querySelectorAll(".slide");
const btnRight = document.querySelector(".slider__btn--right");
const btnLeft = document.querySelector(".slider__btn--left");
const dotContainer = document.querySelector(".dots");

const goToSlide = function (slide) {
  slides.forEach((slides, i) => {
    slides.style.transform = `translateX(${100 * (i - slide)}%)`;
  });
};
goToSlide(0);
slides.forEach(function (s, i) {
  dotContainer.insertAdjacentHTML(
    "beforeend",
    `<button class='dots__dot' data-slide='${i}'></button>`
  );
});

const activateDot = function (slide) {
  document
    .querySelectorAll(".dots__dot")
    .forEach((dot) => dot.classList.remove("dots__dot--active"));
  const activeD = document.querySelector(`.dots__dot[data-slide="${slide}"]`);
  activeD.classList.add("dots__dot--active");
};
activateDot(0);

const nextSlide = function () {
  if (currentSlide === slides.length - 1) currentSlide = 0;
  else currentSlide++;

  goToSlide(currentSlide);
  activateDot(currentSlide);
};
const prevSlide = function () {
  if (currentSlide === 0) currentSlide = slides.length;
  currentSlide--;
  goToSlide(currentSlide);
  activateDot(currentSlide);
};

btnRight.addEventListener("click", nextSlide);
btnLeft.addEventListener("click", prevSlide);

dotContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("dots__dot")) {
    const { slide } = e.target.dataset;
    goToSlide(slide);
    activateDot(slide);
  }
});
// document.querySelector(".slide").addEventListener("keydown", function (e) {
//   if (e.key === "ArrowLeft") prevSlide();
//   e.key === "ArrowRight" && nextSlide();
// });
