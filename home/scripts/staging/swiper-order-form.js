import { loadStylesheet, loadScript } from "https://supercharger-staging.vercel.app/utilities/external-script-loader.js";

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
    const swiper = new Swiper('.swiper', {
      // Optional parameters
      loop: true, // Enable looping of slides
      slidesPerView: 1, // Number of slides visible at once
      spaceBetween: 10, // Space between slides in pixels

      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
    console.log("Swiper initialized!");
  }
);
