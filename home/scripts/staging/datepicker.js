import { loadStylesheet, loadScript } from 'https://supercharger-staging.vercel.app/utilities/external-script-loader.js';
import { getSwiperInstance } from 'https://supercharger-staging.vercel.app/home/scripts/staging/swiper-order-form.js'; // Import the Swiper instance

console.log("Datepicker script initialized. Loading resources...");

// Step 1: Load Flatpickr CSS
loadStylesheet("https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css", () => {
  console.log("Flatpickr CSS loaded successfully.");
});

// Step 2: Load Flatpickr JS
loadScript("https://cdn.jsdelivr.net/npm/flatpickr", () => {
  console.log("Flatpickr JS loaded successfully.");

  const waitForSwiper = () => {
    const swiper = getSwiperInstance();
    if (swiper) {
      console.log("Swiper instance found. Proceeding with Flatpickr setup...");
      setupFlatpickr(swiper); // Call your Flatpickr setup logic
    } else {
      console.log("Swiper instance not ready yet. Retrying...");
      setTimeout(waitForSwiper, 500); // Retry after 500ms
    }
  };

  const setupFlatpickr = (swiper) => {
    console.log("Running setupFlatpickr with Swiper instance...");

    const initializeFlatpickrOnActiveSlide = () => {
      console.log("Initializing Flatpickr on the active slide...");

      // Get active slide
      const activeSlide = swiper.slides[swiper.activeIndex];
      if (!activeSlide) {
        console.error("No active slide found.");
        return;
      }

      console.log("Active slide detected. HTML content:", activeSlide.innerHTML);

      // Look for the input inside the active slide
      const dateInput = activeSlide.querySelector("[wized='home_orderForm_date_input']");
      if (!dateInput) {
        console.warn("Date input not found in the active slide.");
        return;
      }

      console.log("Date input detected. Initializing Flatpickr...");

      try {
        // Destroy any existing Flatpickr instance
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

        console.log("Flatpickr successfully initialized.");
      } catch (error) {
        console.error("Error initializing Flatpickr:", error);
      }
    };

    // Attach to Swiper's slide change event
    swiper.on('slideChange', () => {
      console.log("Slide change detected. Reinitializing Flatpickr...");
      initializeFlatpickrOnActiveSlide();
    });

    // Initial Flatpickr setup
    initializeFlatpickrOnActiveSlide();
  };

  // Wait for Swiper instance to be ready
  waitForSwiper();
});
