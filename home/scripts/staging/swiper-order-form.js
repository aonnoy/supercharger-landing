// Define the base URL
const BASE_URL = "https://supercharger-staging.vercel.app";

console.log(`Base URL is set to: ${BASE_URL}`);

// Import utilities
import { loadStylesheet, loadScript } from `${BASE_URL}/utilities/external-script-loader.js`;
import { addCustomStyles } from `${BASE_URL}/utilities/custom-css.js`;

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
          // Optional parameters for multistep form
          loop: false, // No looping for a multistep form
          slidesPerView: 1, // Show one step at a time
          spaceBetween: 0, // No spacing between slides

          // Enable autoHeight to adjust based on content
          autoHeight: true,

          // Enable fade effect
          effect: 'fade',
          fadeEffect: {
            crossFade: true, // Enable crossfade between slides
          },

          // Navigation arrows
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
        });

        console.log("Swiper initialized successfully for multistep form.");
      } catch (error) {
        console.error("Failed to initialize Swiper:", error);
      }
    }
  );
} catch (error) {
  console.error("Failed to load Swiper JS:", error);
}
