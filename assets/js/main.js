let windowWidth = window.innerWidth;

// Open Dental Slider

// Animate on Scroll
AOS.init({
  once: true,
});

// Burger Menus
let menu = document.querySelector(".menu-lines");
let menuSec = document.querySelector(".overall-menus");
let overlay = document.querySelector(".overlay");
function burgerMenus(e) {
  e.target.classList.toggle("menu-active");
  if (e.target.classList.contains("menu-active")) {
    menuSec.classList.add("slide-in");
    overlay.classList.add("d-block");
    document.body.style.overflow = "hidden";
  } else {
    menuSec.classList.remove("slide-in");
    overlay.classList.remove("d-block");
    document.body.style.overflow = "";
  }
}
menu.addEventListener("click", burgerMenus);

// Header Scroll
let navigations = document.querySelector("nav");
function fixedHeader(e) {
  if (scrollY > 80) {
    navigations.classList.add("fix-active");
  } else {
    navigations.classList.remove("fix-active");
  }
}
window.addEventListener("scroll", fixedHeader);

// Review Slider
var reviewSlider = new Swiper(".review-slider", {
  slidesPerView: "1.5",
  centeredSlides: true,
  spaceBetween: 50,
  loop: true,

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    640: {
      // slidesPerView: "1",
      // spaceBetween: 20,
      // autoplay: true,
      // navigation: {
      //   nextEl: ".swiper-button-next-unique",
      //   prevEl: ".swiper-button-prev-unique",
      // },
    },
    320: {
      slidesPerView: "1",
      spaceBetween: 20,
      autoplay: true,
      navigation: {
        nextEl: ".swiper-button-next-unique",
        prevEl: ".swiper-button-prev-unique",
      },
    },
  },
});

// Talk, Speak, Dictate Slider
let listItem = document.querySelectorAll(".tab-items li");
let listItemActive = document.querySelector(".tab-items li.active");
let dash = document.querySelector(".dash");

function setWidth(element) {
  dash.style.width = element.clientWidth + "px";
  dash.style.height = element.clientHeight + "px";
  dash.style.left = element.offsetLeft + "px";
  if ($(window).width() <= 767) {
    dash.style.top = element.offsetTop + "px";
  }
}

let tabSlider = new Swiper(".tab-slider", {
  speed: 800,
  slidesPerView: 1,
  allowTouchMove: false,
  autoHeight: true,

  // mousewheel: true,
  // autoScrollOffset: 2,
  // initialSlide: 1,

  // mousewheel: {
  //   releaseOnEdges: true,
  // },
});

tabSlider.on("slideChange", function (innerMethods) {
  RemoveActive();
  let currentElement = listItem[innerMethods.activeIndex];
  currentElement.classList.add("active");
  setWidth(currentElement);
});

let allSwipersTab = document.querySelectorAll(".swiper-slide");
// Active Setters
setTimeout(() => {
  setWidth(listItemActive);
}, 500);

function selectItem(e, index) {
  RemoveActive();
  e.target.classList.add("active");
  tabSlider.slideTo(index);
  setWidth(e.target);
}
// Remove Active
function RemoveActive() {
  listItem.forEach((item) => {
    item.classList.remove("active");
  });
}
listItem.forEach((item, index) => {
  item.addEventListener("click", function (e) {
    selectItem(e, index);
  });
});

if ($(window).width() <= 991) {
  tabSlider.destroy();
}

// Accordion
let accordionTab = $(".accordion .accordion-title");
accordionTab.each(function (index, ele) {
  if ($(ele).hasClass("active")) {
    $(ele).parent().find("img").attr("src", "./assets/images/minus.svg");
    $(ele).parent().find(".accordion-copy").slideToggle();
    setTimeout(function () {
      tabSlider.update();
    }, 500);
  }
  $(ele).click(function (e) {
    // tabSlider.update();

    $(ele).toggleClass("active");
    $(ele).parent().find(".accordion-copy").slideToggle();
    setTimeout(function () {
      tabSlider.update();
    }, 500);
    if ($(ele).hasClass("active")) {
      $(ele).parent().find("img").attr("src", "./assets/images/minus.svg");
    } else {
      $(ele).parent().find("img").attr("src", "./assets/images/add.svg");
    }
  });
});
