import { loadStylesheet, loadScript } from 'https://supercharger-staging.vercel.app/utilities/external-script-loader.js';
import { getSwiperInstance } from 'https://supercharger-staging.vercel.app/home/scripts/staging/swiper-order-form.js'; // Import the Swiper instance

loadStylesheet("https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css", () => {
  console.log("Flatpickr CSS loaded successfully.");
});

loadScript("https://cdn.jsdelivr.net/npm/flatpickr", () => {
  console.log("Flatpickr JS loaded successfully.");

  const initializeFlatpickr = () => {
    const swiper = getSwiperInstance();

    if (!swiper) {
      console.error("Swiper instance not available. Ensure Swiper is initialized before using it.");
      return;
    }

    console.log("Checking active slide for datepicker inputs...");

    // Get the active slide element
    const activeSlide = swiper.slides[swiper.activeIndex];

    if (!activeSlide) {
      console.error("No active slide found.");
      return;
    }

    console.log("Active slide detected. Searching for datepicker inputs...");

    const priorityDateInput = activeSlide.querySelector("[wized='home_orderForm_date_priorityDateInput']");
    const dateInput = activeSlide.querySelector("[wized='home_orderForm_date_input']");

    if (!priorityDateInput && !dateInput) {
      console.log("No datepicker inputs found in the active slide.");
      return;
    }

    const targetInput = priorityDateInput || dateInput;

    try {
      // Destroy any existing Flatpickr instance
      if (targetInput._flatpickr) {
        console.log("Destroying existing Flatpickr instance on the target input.");
        targetInput._flatpickr.destroy();
      }

      // Initialize Flatpickr
      flatpickr(targetInput, {
        dateFormat: "m-d-Y",
        onChange: (selectedDates, dateStr) => {
          console.log(`Date changed in input field. New value: ${dateStr}`);
        },
      });

      console.log("Flatpickr successfully initialized on the active slide.");
    } catch (error) {
      console.error("Error initializing Flatpickr:", error);
    }
  };

  // Reinitialize Flatpickr on each slide change
  const swiper = getSwiperInstance();
  if (swiper) {
    swiper.on('slideChange', initializeFlatpickr);
    console.log("Flatpickr initialization set up to trigger on slide changes.");
  } else {
    console.error("Swiper instance not found. Flatpickr initialization will not trigger on slide changes.");
  }

  // Initial Flatpickr setup for the current active slide
  initializeFlatpickr();
});
