// Define simple navigation for the order form
import { getSwiperInstance } from 'https://supercharger-staging.vercel.app/home/scripts/staging/swiper-order-form.js';

const initializeNavigation = () => {
  const swiper = getSwiperInstance();

  if (!swiper) {
    console.error('Swiper instance is not initialized.');
    return;
  }

  console.log('Swiper instance successfully initialized:', swiper);

  // Handlers for "Next" buttons
  document.querySelectorAll('[wized="home_orderForm_navigation_next"]').forEach((nextButton, btnIndex) => {
    console.log(`Adding click listener to Next button ${btnIndex + 1}`);

    nextButton.addEventListener('click', () => {
      console.log(`Next button ${btnIndex + 1} clicked. Calling Swiper API to move to the next slide.`);
      swiper.slideTo(swiper.activeIndex + 1);
    });
  });

  // Handlers for "Previous" buttons
  document.querySelectorAll('[wized="home_orderForm_navigation_previous"]').forEach((prevButton, btnIndex) => {
    console.log(`Adding click listener to Previous button ${btnIndex + 1}`);

    prevButton.addEventListener('click', () => {
      console.log(`Previous button ${btnIndex + 1} clicked. Calling Swiper API to move to the previous slide.`);
      swiper.slideTo(swiper.activeIndex - 1);
    });
  });
};

// Directly invoke the initialization function
initializeNavigation();
