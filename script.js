const slides = document.querySelectorAll(".slide");
const logoItems = document.querySelectorAll(".logo-item");
let currentSlide = 0;
let slideInterval = 6000;
let slideTimer;

function showSlide(index) {
  slides.forEach((slide) => slide.classList.remove("active"));
  logoItems.forEach((item) => item.classList.remove("active"));

  slides[index].classList.add("active");
  logoItems[index].classList.add("active");

  currentSlide = index;
}

// Auto slide loop
function startSlideShow() {
  // only show first slide if it's the start

  slideTimer = setInterval(() => {
    const nextSlide = currentSlide + 1;
    if (nextSlide > 4) {
      showSlide(0); // loop back
    } else {
      showSlide(nextSlide);
    }
  }, slideInterval);
}

function resetSlideShow() {
  clearInterval(slideTimer);
  startSlideShow();
}

// ✅ run immediately so first slide appears on page load
document.addEventListener("DOMContentLoaded", () => {
  showSlide(0);
  startSlideShow();
});

// Start when page loads
// startSlideShow();

logoItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    showSlide(index);
    resetSlideShow();
  });
});

// init
// showSlide(currentSlide);
startSlideShow();


// nav
const sections = document.querySelectorAll("section"); // your sections (id: home, about, etc.)
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 80; // adjust for navbar height
    const sectionHeight = section.clientHeight;

    if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});


// added js text animation

const elts = {
	text1: document.getElementById("text1"),
	text2: document.getElementById("text2")
};

// The strings to morph between. You can change these to anything you want!
const texts = [
	"Simplifying Business Processes",
	"Building Software Solutions for Your Vision"
	
];

// Controls the speed of morphing.
const morphTime = 1;
const cooldownTime = 0.50;

let textIndex = texts.length - 1;
let time = new Date();
let morph = 0;
let cooldown = cooldownTime;

elts.text1.textContent = texts[textIndex % texts.length];
elts.text2.textContent = texts[(textIndex + 1) % texts.length];

function doMorph() {
	morph -= cooldown;
	cooldown = 0;
	
	let fraction = morph / morphTime;
	
	if (fraction > 1) {
		cooldown = cooldownTime;
		fraction = 1;
	}
	
	setMorph(fraction);
}


function setMorph(fraction) {

	
	elts.text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
	elts.text2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;
	
	fraction = 1 - fraction;
	elts.text1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
	elts.text1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;
	
	elts.text1.textContent = texts[textIndex % texts.length];
	elts.text2.textContent = texts[(textIndex + 1) % texts.length];
}

function doCooldown() {
	morph = 0;
	
	elts.text2.style.filter = "";
	elts.text2.style.opacity = "100%";
	
	elts.text1.style.filter = "";
	elts.text1.style.opacity = "0%";
}

function animate() {
	requestAnimationFrame(animate);
	
	let newTime = new Date();
	let shouldIncrementIndex = cooldown > 0;
	let dt = (newTime - time) / 1500;
	time = newTime;
	
	cooldown -= dt;
	
	if (cooldown <= 0) {
		if (shouldIncrementIndex) {
			textIndex++;
		}
		
		doMorph();
	} else {
		doCooldown();
	}
}

animate();
