// Define navigation and validation for the order form
import { getSwiperInstance } from 'https://supercharger-staging.vercel.app/home/scripts/staging/swiper-order-form.js';

document.addEventListener('DOMContentLoaded', () => {
  const swiper = getSwiperInstance();

  if (!swiper) {
    console.error('Swiper instance is not initialized.');
    return;
  }

  // Handlers for "Next" buttons
  document.querySelectorAll('[wized="home_orderForm_navigation_next"]').forEach((nextButton) => {
    nextButton.addEventListener('click', () => {
      const currentSlide = document.querySelector('.swiper-slide-active');
      if (!currentSlide) {
        console.error('No active slide found.');
        return;
      }

      const requiredRadios = currentSlide.querySelectorAll('input[type="radio"][required]');
      const errorElements = currentSlide.querySelectorAll('.form-field_error');

      let allValid = true;

      requiredRadios.forEach((radio) => {
        const isChecked = radio.closest('label').querySelector('.w--redirected-checked');
        const errorElement = radio.closest('.order-form_product-selection').querySelector('.form-field_error');

        if (!isChecked) {
          allValid = false;
          if (errorElement) {
            errorElement.removeAttribute('custom-cloak');
          }
        } else if (errorElement) {
          errorElement.setAttribute('custom-cloak', '');
        }
      });

      if (allValid) {
        swiper.slideNext();
      } else {
        console.warn('Validation failed. Ensure all required radio options are selected.');
      }
    });
  });

  // Handlers for "Previous" buttons
  document.querySelectorAll('[wized="home_orderForm_navigation_previous"]').forEach((prevButton) => {
    prevButton.addEventListener('click', () => {
      swiper.slidePrev();
    });
  });

  // Toggle error visibility on radio selection
  document.querySelectorAll('input[type="radio"]').forEach((radio) => {
    radio.addEventListener('change', () => {
      const errorElement = radio.closest('.order-form_product-selection').querySelector('.form-field_error');
      if (errorElement) {
        errorElement.setAttribute('custom-cloak', '');
      }
    });
  });
});
