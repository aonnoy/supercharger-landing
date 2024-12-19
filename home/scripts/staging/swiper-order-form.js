import { loadStylesheet, loadScript } from "https://supercharger-staging.vercel.app/utilities/external-script-loader.js";
import { addCustomStyles } from "https://supercharger-staging.vercel.app/utilities/custom-css.js"; // Adjust the path as needed

// Add custom CSS for Swiper navigation buttons
addCustomStyles(`
  .swiper-button-next::after,
  .swiper-button-prev::after {
    display: none; /* Hide the default arrow icons */
  }
`);

// Load Swiper CSS
loadStylesheet(
  "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css",
  () => {
    console.log("Swiper CSS loaded!");
  }
);

// Load Swiper JS
loadScript(
  "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js",
  () => {
    console.log("Swiper JS loaded!");

    // Initialize Swiper
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

    console.log("Swiper initialized for multistep form!");
  }
);
