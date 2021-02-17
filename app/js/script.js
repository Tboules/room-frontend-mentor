const menu = document.querySelector(".header__nav__menu");
const navLinks = document.querySelector(".header__nav__nav-links");
const burger = document.querySelector(".header__nav__hamburger");

burger.addEventListener("click", () => {
  menu.classList.toggle("open");
  navLinks.classList.toggle("open");
  burger.classList.toggle("open");
});

const toLargeScreen = window.matchMedia("(min-width: 840px)");

function handleScreenChange(e) {
  if (e.matches) {
    menu.classList.remove("open");
    navLinks.classList.remove("open");
    burger.classList.remove("open");
  }
}

toLargeScreen.addListener(handleScreenChange);

handleScreenChange(toLargeScreen);

//carousel functionality
(function (d) {
  const photoName = "header__carousel__photo";
  const mName = "mobilePhoto";
  const dName = "desktopPhoto";
  const iName = "info-wrap";

  const mobilePhotos = d.getElementsByClassName(mName);
  const desktopPhotos = d.getElementsByClassName(dName);
  const info = d.getElementsByClassName(iName);

  const totalItems = mobilePhotos.length;
  let slide = 0;
  let moving = true;

  //setting classes
  function setIntialClasses() {
    //add 'prev'
    mobilePhotos[totalItems - 1].classList.add("prev");
    desktopPhotos[totalItems - 1].classList.add("prev");
    info[totalItems - 1].classList.add("prev");

    //add 'active'
    mobilePhotos[0].classList.add("active");
    desktopPhotos[0].classList.add("active");
    info[0].classList.add("active");

    //add 'next'
    mobilePhotos[1].classList.add("next");
    desktopPhotos[1].classList.add("next");
    info[1].classList.add("next");
  }

  //adding event listeners
  function setEventListeners() {
    const next = d.querySelector(".right-butt");
    const prev = d.querySelector(".left-butt");

    next.addEventListener("click", moveNext);
    prev.addEventListener("click", movePrev);
  }

  function moveNext() {
    if (!moving) {
      if (slide === totalItems - 1) {
        slide = 0;
      } else {
        slide++;
      }

      console.log(slide);
      moveCarouselTo(slide);
    }
  }

  function movePrev() {
    if (!moving) {
      if (slide === 0) {
        slide = totalItems - 1;
      } else {
        slide--;
      }

      moveCarouselTo(slide);
    }
  }

  function disableInteraction() {
    moving = true;

    setTimeout(function () {
      moving = false;
    }, 500);
  }

  function moveCarouselTo(slide) {
    if (!moving) {
      disableInteraction();

      let newPrev = (slide + 2) % 3;
      let newNext = (slide + 1) % 3;
      let oldPrev = (slide + 4) % 3;
      let oldNext = slide % 3;

      console.log(oldPrev);
      console.log(oldNext);

      //reset class names
      mobilePhotos[oldPrev].className = mName;
      mobilePhotos[oldNext].className = mName;
      desktopPhotos[oldPrev].className = dName;
      desktopPhotos[oldNext].className = dName;
      info[oldPrev].className = iName;
      info[oldNext].className = iName;

      //add new class names
      mobilePhotos[newPrev].className = photoName + " " + mName + " prev";
      mobilePhotos[slide].className = photoName + " " + mName + " active";
      mobilePhotos[newNext].className = photoName + " " + mName + " next";

      desktopPhotos[newPrev].className = photoName + " " + dName + " prev";
      desktopPhotos[slide].className = photoName + " " + dName + " active";
      desktopPhotos[newNext].className = photoName + " " + dName + " next";

      info[newPrev].className = iName + " prev";
      info[slide].className = iName + " active";
      info[newNext].className = iName + " next";
    }
  }

  function initCarousel() {
    setIntialClasses();
    setEventListeners();

    moving = false;
  }

  initCarousel();
})(document);
