// Get all the slideshow images
var slides = document.querySelectorAll(".slideshow img");

// Set the current slide index
var slideIndex = 0;

// Set the delay in milliseconds
var delay = 5000;


function showSlide() {
  // Hide slides
  for (var i = 0; i < slides.length; i++) {
    slides[i].style.opacity = 0;
  }

  // display the current slide
  slides[slideIndex].style.opacity = 1;

  // Slideindex++
  slideIndex++;

  // If the slide index is greater than or equal to the number of slides reset to 0
  if (slideIndex >= slides.length) {
    slideIndex = 0;
  }

  // start timout
  setTimeout(showSlide, delay);
}


// Start the slideshow
showSlide();