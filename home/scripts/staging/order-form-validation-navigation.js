// Define navigation and validation for the order form
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
      console.log(`Next button ${btnIndex + 1} clicked.`);

      const currentSlide = document.querySelector('.swiper-slide-active');
      if (!currentSlide) {
        console.error('No active slide found.');
        return;
      }

      console.log('Active slide found:', currentSlide);

      const requiredRadios = currentSlide.querySelectorAll('input[type="radio"][required]');
      console.log(`Number of required radios on the current slide: ${requiredRadios.length}`);

      const errorElements = currentSlide.querySelectorAll('.form-field_error');
      console.log(`Number of error elements on the current slide: ${errorElements.length}`);

      let allValid = true;

      requiredRadios.forEach((radio, radioIndex) => {
        const isChecked = radio.closest('label').querySelector('.w--redirected-checked');
        const errorElement = radio.closest('.order-form_product-selection').querySelector('.form-field_error');

        console.log(`Radio ${radioIndex + 1} checked:`, Boolean(isChecked));

        if (!isChecked) {
          allValid = false;
          if (errorElement) {
            console.log(`Showing error for radio ${radioIndex + 1}`);
            errorElement.removeAttribute('custom-cloak');
          }
        } else if (errorElement) {
          console.log(`Hiding error for radio ${radioIndex + 1}`);
          errorElement.setAttribute('custom-cloak', '');
        }
      });

      if (allValid) {
        console.log('Validation passed. Moving to the next slide.');
        swiper.slideNext();
      } else {
        console.warn('Validation failed. Ensure all required radio options are selected.');
      }
    });
  });

  // Handlers for "Previous" buttons
  document.querySelectorAll('[wized="home_orderForm_navigation_previous"]').forEach((prevButton, btnIndex) => {
    console.log(`Adding click listener to Previous button ${btnIndex + 1}`);

    prevButton.addEventListener('click', () => {
      console.log(`Previous button ${btnIndex + 1} clicked.`);
      swiper.slidePrev();
    });
  });

  // Toggle error visibility on radio selection
  document.querySelectorAll('input[type="radio"]').forEach((radio, radioIndex) => {
    console.log(`Adding change listener to radio ${radioIndex + 1}`);

    radio.addEventListener('change', () => {
      console.log(`Radio ${radioIndex + 1} changed. Checking for associated error element.`);

      const errorElement = radio.closest('.order-form_product-selection').querySelector('.form-field_error');
      if (errorElement) {
        console.log(`Hiding error for radio ${radioIndex + 1}`);
        errorElement.setAttribute('custom-cloak', '');
      }
    });
  });
};

// Directly invoke the initialization function
initializeNavigation();

