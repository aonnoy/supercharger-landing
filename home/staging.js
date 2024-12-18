import { loadStylesheet, loadScript } from "https://supercharger-staging.vercel.app/external-script-loader.js";

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
    // Initialize Swiper here if needed
  }
);
