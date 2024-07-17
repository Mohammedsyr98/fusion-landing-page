const testimonialSlider = document.getElementById("testimonialSlider");
const dotsContainer = document.getElementById("dotsContainer");

let isDragging = false;
let startPosition = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID = 0;
let currentIndex = 0;

const testimonialItems = document.querySelectorAll(".main");

testimonialItems.forEach((item, index) => {
  item.addEventListener("touchstart", touchStart(index));
  item.addEventListener("touchend", touchEnd);
  item.addEventListener("mousedown", touchStart(index));
  item.addEventListener("mouseup", touchEnd);
  item.addEventListener("mouseleave", touchEnd);
  item.addEventListener("mousemove", touchMove);
});

// Create dots for each testimonial item
for (let i = 0; i < testimonialItems.length - 2; i++) {
  const dot = document.createElement("div");
  dot.classList.add("dot");
  if (i == 0) {
    dot.classList.add("active");
  }
  dot.addEventListener("click", () => {
    currentIndex = i;
    smoothScrollTo(currentIndex);
  });
  dotsContainer.appendChild(dot);
}

function touchStart(index) {
  return function (event) {
    currentIndex = index;
    startPosition = getPositionX(event);
    isDragging = true;
    animationID = requestAnimationFrame(animation);
    testimonialSlider.classList.add("grabbing");
  };
}

function touchEnd() {
  isDragging = false;
  cancelAnimationFrame(animationID);

  const movedBy = currentTranslate - prevTranslate;

  if (movedBy < -100 && currentIndex < testimonialItems.length - 1) {
    currentIndex += 1;
  }

  if (movedBy > 100 && currentIndex > 0) {
    currentIndex -= 1;
  }

  smoothScrollTo(currentIndex);
  testimonialSlider.classList.remove("grabbing");
}

function touchMove(event) {
  if (isDragging) {
    const currentPosition = getPositionX(event);
    currentTranslate = prevTranslate + currentPosition - startPosition;
  }
}

function getPositionX(event) {
  return event.type.includes("mouse") ? event.pageX : event.touches[0].clientX;
}

function animation() {
  setSliderPosition();
  if (isDragging) requestAnimationFrame(animation);
}

function setSliderPosition() {
  testimonialSlider.style.transform = `translateX(${currentTranslate}px)`;

  const itemWidth = testimonialItems[0].offsetWidth;
  currentIndex = Math.round(currentTranslate / -itemWidth);
  updateDots();
}

function smoothScrollTo(index) {
  const itemWidth = testimonialItems[0].offsetWidth;
  const newPosition = index * -itemWidth;

  // Adjust position to compensate for any spacing issue
  let adjustedPosition = newPosition;

  for (let i = 0; i <= index; i++) {
    adjustedPosition -= i * 20; // Adjust as needed
  }

  testimonialSlider.style.transition = "transform 0.5s ease-in-out";
  testimonialSlider.style.transform = `translateX(${newPosition}px)`;

  // Update dots after the animation completes
  setTimeout(() => {
    testimonialSlider.style.transition = "";
    updateDots();
  }, 500);
}

function updateDots() {
  const dots = document.querySelectorAll(".dot");
  dots.forEach((dot, index) => {
    if (index === currentIndex) {
      dot.classList.add("active");
    } else {
      dot.classList.remove("active");
    }
  });
}

const inputs = document.querySelectorAll("input");
const nameInput = inputs[1];
const emailInput = inputs[2];

function checkInput(input) {
  input.addEventListener("focusout", (event) => {
    if (input.value == "") {
      input.nextElementSibling.classList.add("show");
    } else {
      input.nextElementSibling.classList.remove("show");
    }
  });
}

checkInput(nameInput);
checkInput(emailInput);
const titleElement = document.querySelector(".serviss");
const items = document.querySelectorAll(".our-services .boxes .row");
const manageStaticsText = document.querySelectorAll(".manage-static .text");
const manageStaticsPhoto = document.querySelectorAll(".manage-static .photo");
const awesomeFeaturesHead = document.querySelectorAll(".awesome-features-head");
const boxes = document.querySelectorAll(".awesome-features .content .boxes");
const boxes2 = document.querySelectorAll(".awesome-features .content .boxes2");
const awesomeFeaturesimage = document.querySelectorAll(
  ".awesome-features .photo"
);
const ourTeamTitle = document.querySelectorAll(".our-team-head");
const ourTeamBoxes = document.querySelectorAll(".our-team .boxes");
const pricingHead = document.querySelectorAll(".pricing-head");
const pricingBoxes = document.querySelectorAll(".pricing .row");
const navbar = document.querySelectorAll(".navbar-nav")[0];

Array.from(navbar.children).map((ele) =>
  ele.addEventListener("click", function () {
    ele.children[0].classList.add("active");
    Array.from(navbar.children).forEach((link) =>
      link != ele ? link.children[0].classList.remove("active") : ""
    );
  })
);
function startAnimate(element, animateState) {
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animated", animateState);

        entry.target.opacity = 1;

        observer.unobserve(entry.target);
      }
    });
  });
  observer.observe(element);
}

startAnimate(manageStaticsPhoto[0], "fadeInRight");
startAnimate(titleElement, "fadeInDown");
Array.from(items[0].children).forEach((ele) =>
  startAnimate(ele, "fadeInRight")
);
Array.from(boxes[0].children).forEach((ele) => startAnimate(ele, "fadeInLeft"));
Array.from(boxes2[0].children).forEach((ele) =>
  startAnimate(ele, "fadeInRight")
);
startAnimate(manageStaticsText[0], "fadeInLeft");
startAnimate(awesomeFeaturesHead[0], "fadeInDown");
startAnimate(awesomeFeaturesimage[0], "fadeInDown");
startAnimate(ourTeamTitle[0], "fadeInDown");
Array.from(ourTeamBoxes[0].children).forEach((ele) =>
  startAnimate(ele, "fadeInRight")
);
startAnimate(pricingHead[0], "fadeInDown");
Array.from(pricingBoxes[0].children).forEach((ele) =>
  startAnimate(ele, "fadeInDown")
);

//   // Get all section elements
//   const sections = document.querySelectorAll(".section");

//   // Loop through sections to check which is in viewport
//   sections.forEach((section) => {
//     const sectionTop = section.offsetTop - 50; // Adjusted for navbar height
//     const sectionHeight = section.clientHeight;
//     const sectionId = section.getAttribute("id");
//     const navLink = document.querySelector(`a[href="#${sectionId}"]`);

//     // Check if window scroll position is within the section
//     if (
//       window.scrollY >= sectionTop &&
//       window.scrollY < sectionTop + sectionHeight
//     ) {
//       // Add active class to corresponding nav link
//       navLink.classList.add("active");
//     } else {
//       // Remove active class from all nav links if not in corresponding section
//       navLink.classList.remove("active");
//     }
//   });
// });
document.querySelectorAll(".section").forEach(function (element) {
  var waypoint = new Waypoint({
    element: element,
    handler: function (direction) {
      Array.from(navbar.children).map((ele) =>
        ele.children[0].getAttribute("href").substring(1) === element.id
          ? ele.children[0].classList.add("active")
          : ele.children[0].classList.remove("active")
      );
      console.log("Scrolled to waypoint!");
      console.log(element.id);
    },
  });
});
