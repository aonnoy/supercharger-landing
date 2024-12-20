import { loadStylesheet, loadScript } from 'https://supercharger-staging.vercel.app/utilities/external-script-loader.js';
import { getSwiperInstance } from 'https://supercharger-staging.vercel.app/home/scripts/staging/swiper-order-form.js'; // Import the Swiper instance

/**
 * Step 1: Dynamically load the Flatpickr CSS and JS files.
 */
loadStylesheet("https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css", () => {
  console.log("Flatpickr CSS loaded successfully.");
});

loadScript("https://cdn.jsdelivr.net/npm/flatpickr", () => {
  console.log("Flatpickr JS loaded successfully.");

  // Step 2: Initialize Wized's data handling system
  window.Wized = window.Wized || [];
  window.Wized.push((Wized) => {
    console.log("Wized initialized. Ready to interact with Wized variables.");

    // Helper function to initialize Flatpickr on a specific input
    const initializeFlatpickr = (targetInput) => {
      if (!targetInput) return;

      // Destroy existing Flatpickr instance to avoid conflicts
      if (targetInput._flatpickr) {
        console.log("Destroying existing Flatpickr instance.");
        targetInput._flatpickr.destroy();
      }

      // Initialize Flatpickr
      flatpickr(targetInput, {
        dateFormat: "m-d-Y", // Set desired date format
        onChange: (selectedDates, dateStr) => {
          console.log(`Date changed. New value: ${dateStr}`);

          // Update appropriate Wized variable
          if (targetInput.hasAttribute('wized="home_orderForm_date_priorityDateInput"')) {
            Wized.data.v.home_orderForm_date_priorityDate = dateStr;
            console.log("Updated Wized variable: home_orderForm_date_priorityDate");
          } else if (targetInput.hasAttribute('wized="home_orderForm_date_input"')) {
            Wized.data.v.home_orderForm_date_date = dateStr;
            console.log("Updated Wized variable: home_orderForm_date_date");
          }
        },
      });

      console.log("Flatpickr initialized on target input.");
    };

    // Function to check the active slide and initialize Flatpickr
    const checkAndInitializeFlatpickr = () => {
      const swiper = getSwiperInstance(); // Retrieve the Swiper instance

      if (!swiper) {
        console.error("Swiper instance is not available.");
        return;
      }

      // Get the active Swiper slide
      const activeSlide = document.querySelector('.swiper-slide-active');
      if (!activeSlide) {
        console.error("No active slide found.");
        return;
      }

      // Find date inputs in the active slide
      const priorityDateInput = activeSlide.querySelector("[wized='home_orderForm_date_priorityDateInput']");
      const dateInput = activeSlide.querySelector("[wized='home_orderForm_date_input']");

      // Initialize Flatpickr on the found inputs
      if (priorityDateInput) {
        console.log("Initializing Flatpickr for priority date input.");
        initializeFlatpickr(priorityDateInput);
      }
      if (dateInput) {
        console.log("Initializing Flatpickr for date input.");
        initializeFlatpickr(dateInput);
      }
    };

    // Attach Swiper's `slideChange` event listener to check and initialize Flatpickr
    const swiper = getSwiperInstance(); // Retrieve the Swiper instance again
    if (swiper) {
      swiper.on('slideChange', checkAndInitializeFlatpickr);
    } else {
      console.error("Swiper instance is not available for event binding.");
    }

    // Run the initialization function on the current active slide
    checkAndInitializeFlatpickr();
  });
}, () => {
  console.error("Failed to load Flatpickr JS.");
});
