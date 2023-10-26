var slideIndex = 0;

function plusSlides(n) {
  slideIndex += n;
  if (slideIndex < 0) {
    slideIndex = 2;
  } else if (slideIndex > 2) {
    slideIndex = 0;
  }
  showSlides();
}

function showSlides() {
  var slides = document.querySelectorAll(".slideshow img");
  for (var i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideIndex].style.display = "block";
}

// Start the slideshow
showSlides();