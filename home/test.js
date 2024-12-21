// Import the Swiper instance from the initialization file
import { getSwiperInstance } from 'https://supercharger-staging.vercel.app/home/scripts/staging/swiper-order-form.js';

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Retrieve the Swiper instance
  const swiperInstance = getSwiperInstance();

  // Check if the Swiper instance is available
  if (!swiperInstance) {
    console.error("Swiper instance is not initialized yet.");
    return;
  }

  console.log("Swiper navigation handler initialized.");

  // Add event listener for the "next" buttons
  document.querySelectorAll('[wized="home_orderForm_navigation_next"]').forEach((nextButton) => {
    nextButton.addEventListener('click', () => {
      console.log("Next button clicked.");

      // Move to the next slide
      if (swiperInstance.activeIndex < swiperInstance.slides.length - 1) {
        swiperInstance.slideNext();
        console.log(`Navigated to slide ${swiperInstance.activeIndex + 2}.`); // Swiper uses zero-based indexing
      } else {
        console.warn("Already on the last slide.");
      }
    });
  });

  // Add event listener for the "previous" buttons
  document.querySelectorAll('[wized="home_orderForm_navigation_previous"]').forEach((prevButton) => {
    prevButton.addEventListener('click', () => {
      console.log("Previous button clicked.");

      // Move to the previous slide
      if (swiperInstance.activeIndex > 0) {
        swiperInstance.slidePrev();
        console.log(`Navigated to slide ${swiperInstance.activeIndex}.`); // Swiper uses zero-based indexing
      } else {
        console.warn("Already on the first slide.");
      }
    });
  });
});
