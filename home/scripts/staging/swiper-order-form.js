// swiper-order-form.js

import { validateCurrentSlide } from './order-form-validation.js';

// Define the base URL
const BASE_URL = "https://supercharger-staging.vercel.app";

console.log(`Base URL is set to: ${BASE_URL}`);

// Dynamically import utilities
Promise.all([
  import(`${BASE_URL}/utilities/external-script-loader.js`),
  import(`${BASE_URL}/utilities/custom-css.js`)
])
  .then(([{ loadStylesheet, loadScript }, { addCustomStyles }]) => {
    try {
      // Add custom CSS for Swiper navigation buttons
      addCustomStyles(`
        .swiper-button-next::after,
        .swiper-button-prev::after {
          display: none; /* Hide the default arrow icons */
        }
      `);
      console.log("Custom styles for Swiper navigation buttons added successfully.");
    } catch (error) {
      console.error("Failed to add custom styles for Swiper navigation buttons:", error);
    }

    try {
      // Load Swiper CSS
      loadStylesheet(
        "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css",
        () => {
          console.log("Swiper CSS loaded!");
        }
      );
    } catch (error) {
      console.error("Failed to load Swiper CSS:", error);
    }

    try {
      // Load Swiper JS
      loadScript(
        "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js",
        () => {
          console.log("Swiper JS loaded!");

          // Initialize Swiper
          try {
            const swiper = new Swiper('.order-form_wrapper', {
              loop: false,
              slidesPerView: 1,
              spaceBetween: 0,
              allowTouchMove: false,
              autoHeight: true,
              effect: 'fade',
              fadeEffect: { crossFade: true },
              navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              },
            });

            console.log("Swiper initialized successfully with manual swiping disabled.");

            // Hook into the Next button to perform validation
            const nextButton = document.querySelector('.swiper-button-next');
            nextButton.addEventListener('click', () => {
              const currentSlide = document.querySelector('.order-form_wrapper .swiper-slide-active');

              // Validate the current slide
              if (!validateCurrentSlide(currentSlide)) {
                console.log("Validation failed. Preventing navigation to the next slide.");
                return; // Stop execution to prevent moving to the next slide
              }

              console.log("Validation passed. Proceeding to the next slide.");
              swiper.slideNext(); // Move to the next slide manually
            });
          } catch (error) {
            console.error("Failed to initialize Swiper:", error);
          }
        }
      );
    } catch (error) {
      console.error("Failed to load Swiper JS:", error);
    }
  })
  .catch((error) => {
    console.error("Failed to dynamically import utilities:", error);
  });
