import { getSwiperInstance } from 'https://supercharger-staging.vercel.app/home/scripts/staging/swiper-order-form.js';

console.log("Swiper navigation script initialized.");

const waitForSwiper = () => {
  const swiper = getSwiperInstance();
  if (swiper) {
    console.log("Swiper instance found. Proceeding with navigation setup...");
    setupNavigation(swiper); // Call navigation setup logic
  } else {
    console.log("Swiper instance not ready yet. Retrying...");
    setTimeout(waitForSwiper, 500); // Retry after 500ms
  }
};

const setupNavigation = (swiper) => {
  console.log("Setting up navigation handlers...");

  // Add event listener for "next" buttons
  document.querySelectorAll('[wized="home_orderForm_navigation_next"]').forEach((nextButton) => {
    nextButton.addEventListener('click', () => {
      if (swiper.activeIndex < swiper.slides.length - 1) {
        swiper.slideNext();
        console.log(`Navigated to slide ${swiper.activeIndex + 2}.`);
        swiper.updateAutoHeight(); // Ensure the height adjusts after moving to the next slide
      } else {
        console.warn("Already on the last slide.");
      }
    });
  });

  // Add event listener for "previous" buttons
  document.querySelectorAll('[wized="home_orderForm_navigation_previous"]').forEach((prevButton) => {
    prevButton.addEventListener('click', () => {
      if (swiper.activeIndex > 0) {
        swiper.slidePrev();
        console.log(`Navigated to slide ${swiper.activeIndex}.`);
        swiper.updateAutoHeight(); // Ensure the height adjusts after moving to the previous slide
      } else {
        console.warn("Already on the first slide.");
      }
    });
  });

  // Adjust height on slide change
  swiper.on('slideChange', () => {
    console.log("Slide changed. Updating height...");
    swiper.updateAutoHeight(); // Automatically adjust height when the active slide changes
  });

  console.log("Navigation handlers attached successfully.");
};

// Wait for Swiper instance to be ready
waitForSwiper();

