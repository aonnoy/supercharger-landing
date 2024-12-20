import { loadStylesheet, loadScript } from 'https://supercharger-staging.vercel.app/utilities/external-script-loader.js';
import { getSwiperInstance } from 'https://supercharger-staging.vercel.app/home/scripts/staging/swiper-order-form.js'; // Import the Swiper instance

loadStylesheet("https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css", () => {
  console.log("Flatpickr CSS loaded successfully.");
});

loadScript("https://cdn.jsdelivr.net/npm/flatpickr", () => {
  console.log("Flatpickr JS loaded successfully.");

  // Ensure that this function gets executed
  const initializeFlatpickr = () => {
    console.log("Initializing Flatpickr setup...");

    const swiper = getSwiperInstance();
    if (!swiper) {
      console.error("Swiper instance is not available. Ensure Swiper is initialized correctly.");
      return;
    }

    console.log("Swiper instance retrieved. Current activeIndex:", swiper.activeIndex);

    // Get the active slide
    const activeSlide = swiper.slides[swiper.activeIndex];

    if (!activeSlide) {
      console.error("No active slide found for the current activeIndex.");
      return;
    }

    console.log("Active slide detected. HTML content:", activeSlide.innerHTML);

    // Locate the target input
    const dateInput = activeSlide.querySelector("[wized='home_orderForm_date_input']");
    if (!dateInput) {
      console.error("Date input with attribute 'wized=home_orderForm_date_input' not found in the active slide.");
      return;
    }

    console.log("Date input detected. Initializing Flatpickr...");

    try {
      // Destroy any existing Flatpickr instance
      if (dateInput._flatpickr) {
        console.log("Existing Flatpickr instance detected. Destroying it...");
        dateInput._flatpickr.destroy();
      }

      // Initialize Flatpickr
      flatpickr(dateInput, {
        dateFormat: "m-d-Y",
        onChange: (selectedDates, dateStr) => {
          console.log(`Date changed in input field. New value: ${dateStr}`);
        },
      });

      console.log("Flatpickr successfully initialized on the date input.");
    } catch (error) {
      console.error("Error initializing Flatpickr:", error);
    }
  };

  // Reinitialize Flatpickr on slide change
  const swiper = getSwiperInstance();
  if (swiper) {
    console.log("Swiper instance found. Setting up slideChange listener...");
    swiper.on('slideChange', () => {
      console.log("Slide change detected. Reinitializing Flatpickr...");
      initializeFlatpickr();
    });

    // Initial Flatpickr setup
    console.log("Running initial Flatpickr setup...");
    initializeFlatpickr();
  } else {
    console.error("Swiper instance not found. Flatpickr initialization cannot proceed.");
  }
});
