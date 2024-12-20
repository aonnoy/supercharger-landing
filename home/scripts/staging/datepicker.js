import { loadStylesheet, loadScript } from 'https://supercharger-staging.vercel.app/utilities/external-script-loader.js';
import { getSwiperInstance } from 'https://supercharger-staging.vercel.app/home/scripts/staging/swiper-order-form.js'; // Import the Swiper instance


console.log("Datepicker script loaded. Starting setup...");

// Step 1: Load Flatpickr CSS
loadStylesheet("https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css", () => {
  console.log("Flatpickr CSS loaded successfully.");
});

// Step 2: Load Flatpickr JS
loadScript("https://cdn.jsdelivr.net/npm/flatpickr", () => {
  console.log("Flatpickr JS loaded successfully.");

  // Initialize Flatpickr function
  const initializeFlatpickr = () => {
    console.log("Running initializeFlatpickr...");

    const swiper = getSwiperInstance();

    // Check if Swiper instance is available
    if (!swiper) {
      console.error("Swiper instance is not available.");
      return;
    }

    console.log("Swiper instance retrieved successfully. Active slide index:", swiper.activeIndex);

    // Get the active slide
    const activeSlide = swiper.slides[swiper.activeIndex];

    // Verify active slide
    if (!activeSlide) {
      console.error("No active slide found. ActiveIndex may be incorrect.");
      return;
    }

    console.log("Active slide detected. HTML content of active slide:", activeSlide.innerHTML);

    // Look for the input inside the active slide
    const dateInput = activeSlide.querySelector("[wized='home_orderForm_date_input']");
    if (!dateInput) {
      console.warn("Input with attribute 'wized=home_orderForm_date_input' not found in the active slide.");
      return;
    }

    console.log("Input detected in the active slide. Proceeding with Flatpickr initialization...");

    try {
      // Destroy existing Flatpickr instance if any
      if (dateInput._flatpickr) {
        console.log("Destroying existing Flatpickr instance...");
        dateInput._flatpickr.destroy();
      }

      // Initialize Flatpickr
      flatpickr(dateInput, {
        dateFormat: "m-d-Y",
        onChange: (selectedDates, dateStr) => {
          console.log(`Flatpickr date changed: ${dateStr}`);
        },
      });

      console.log("Flatpickr successfully initialized on the detected input.");
    } catch (error) {
      console.error("Error initializing Flatpickr:", error);
    }
  };

  // Listen to slide changes and reinitialize Flatpickr
  const swiper = getSwiperInstance();

  if (swiper) {
    console.log("Swiper instance found. Setting up slideChange listener...");
    swiper.on('slideChange', () => {
      console.log("Slide change detected. Reinitializing Flatpickr...");
      initializeFlatpickr();
    });

    // Initial setup for the first slide
    console.log("Running initial Flatpickr setup for the current active slide...");
    initializeFlatpickr();
  } else {
    console.error("Swiper instance not found. Flatpickr initialization cannot proceed.");
  }
});
