const hamburgerMenu = document.querySelector(".hamburger");

hamburgerMenu.addEventListener("click", (e) => {
  document.body.classList.toggle("hamburger-toggled");
});

const hamburgerCloseButton = document.querySelector(".hamburger-close");

hamburgerCloseButton.addEventListener("click", () => {
  document.body.classList.add("hamburger-closed");
  const hamburgerOverlay = document.querySelector(".hamburger-menu");

  hamburgerOverlay.addEventListener(
    "animationend",
    () => {
      document.body.classList.toggle("hamburger-toggled");
      document.body.classList.remove("hamburger-closed");
    },
    { once: true }
  );
});

const adventages = document.querySelector(".advantages_grid");

let touch;

const adventagesDots = document.querySelectorAll(
  ".adventages .mobile-dots .dot"
);
const adventageSwipe = createSwipeSlider(adventages, adventagesDots, [0, 600]);

adventages.addEventListener("touchstart", (e) => {
  touch = e.changedTouches[0].clientX;
});

adventages.addEventListener("touchend", checkDirection(adventageSwipe));

const tips = document.querySelector(".tips_cards");
const tipsDots = document.querySelectorAll(".tips .mobile-dots .dot");

const tipSlider = createSwipeSlider(tips, tipsDots, [0, 300], 5);

tips.addEventListener("touchstart", (e) => {
  touch = e.changedTouches[0].clientX;
});

tips.addEventListener("touchend", checkDirection(tipSlider));

function checkDirection(callback) {
  return (e) => {
    if (e.changedTouches[0].clientX - touch < -50) {
      callback(false);
    } else if (e.changedTouches[0].clientX - touch > 50) {
      callback(true);
    }
  };
}

function createSwipeSlider(element, dots, [leftBound, rightBound], margin = 0) {
  let currentSlidePosition = 0;
  return (right) => {
    console.log(currentSlidePosition);

    if (!right) {
      if (currentSlidePosition + 100 >= rightBound) {
        return;
      }
      element.style.transform = `translateX(${-(currentSlidePosition +=
        100 + margin)}vw)`;
    } else {
      if (currentSlidePosition - 100 < leftBound) {
        return;
      }
      element.style.transform = `translateX(${-(currentSlidePosition -=
        100 + margin)}vw)`;
    }

    changeActiveDot(currentSlidePosition, dots);
  };
}

function changeActiveDot(offset, dotsArray) {
  let currentDotNumber;
  if (offset === 0) {
    currentDotNumber = 0;
  } else if (offset === 100) {
    currentDotNumber = 1;
  } else {
    currentDotNumber = offset / 100;
  }
  console.log(currentDotNumber);
  dotsArray.forEach((v) => {
    v.classList.remove("active");
  });

  dotsArray[Math.floor(currentDotNumber)].classList.add("active");
}

const input = document.querySelector("#tel");
const maskOptions = {
  mask: "000-000-0000",
};

const mask = new IMask(input, maskOptions);

const maskInput = document.querySelector(".mask");
input.addEventListener("change", (e) => {
  maskInput.value = e.target.value;
});
