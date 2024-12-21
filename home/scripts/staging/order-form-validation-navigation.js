import { getSwiperInstance } from 'https://supercharger-staging.vercel.app/home/scripts/staging/swiper-order-form.js';

console.log("Swiper navigation script with validation initialized.");

const waitForSwiper = () => {
  const swiper = getSwiperInstance();
  if (swiper) {
    console.log("Swiper instance found. Proceeding with navigation and validation setup...");
    setupNavigation(swiper); // Call navigation and validation setup logic
  } else {
    console.log("Swiper instance not ready yet. Retrying...");
    setTimeout(waitForSwiper, 500); // Retry after 500ms
  }
};

const setupNavigation = (swiper) => {
  console.log("Setting up navigation and validation handlers...");

  const validateCurrentSlide = () => {
    // Get all radio inputs in the current slide
    const currentSlide = swiper.slides[swiper.activeIndex];
    const radios = currentSlide.querySelectorAll("input[type='radio']");
    const errorElement = currentSlide.querySelector(".form-field_error");

    // Check if at least one radio is selected
    const isRadioChecked = Array.from(radios).some((radio) => {
      const parentLabel = radio.closest("label");
      return parentLabel && parentLabel.querySelector(".w-radio-input").classList.contains("w--redirected-checked");
    });

    if (!isRadioChecked) {
      console.warn("Validation failed: No radio option selected.");
      if (errorElement) {
        errorElement.removeAttribute("custom-cloak"); // Show error
      }
      return false;
    } else {
      if (errorElement) {
        errorElement.setAttribute("custom-cloak", "true"); // Hide error
      }
      return true;
    }
  };

  // Add event listener for "next" buttons
  document.querySelectorAll('[wized="home_orderForm_navigation_next"]').forEach((nextButton) => {
    nextButton.addEventListener('click', () => {
      if (validateCurrentSlide()) {
        if (swiper.activeIndex < swiper.slides.length - 1) {
          swiper.slideNext();
          console.log(`Navigated to slide ${swiper.activeIndex + 2}.`);
          swiper.updateAutoHeight(); // Ensure the height adjusts after moving to the next slide
        } else {
          console.warn("Already on the last slide.");
        }
      } else {
        console.error("Validation failed. Staying on the current slide.");
      }
    });
  });

  // Add event listener for "previous" buttons
  document.querySelectorAll('[wized="home_orderForm_navigation_previous"]').forEach((prevButton) => {
    prevButton.addEventListener('click', () => {
      if (swiper.activeIndex > 0) {
        swiper.slidePrev();
        console.log(`Navigated to slide ${swiper.activeIndex}.`);
        swiper.updateAutoHeight(); // Ensure the height adjusts after moving to the previous slide
      } else {
        console.warn("Already on the first slide.");
      }
    });
  });

  // Adjust height on slide change
  swiper.on('slideChange', () => {
    console.log("Slide changed. Updating height...");
    swiper.updateAutoHeight(); // Automatically adjust height when the active slide changes
  });

  // Add event listener for radio selection to hide error message
  document.querySelectorAll("input[type='radio']").forEach((radio) => {
    radio.addEventListener('change', () => {
      const parentLabel = radio.closest("label");
      if (parentLabel && parentLabel.querySelector(".w-radio-input").classList.contains("w--redirected-checked")) {
        const currentSlide = swiper.slides[swiper.activeIndex];
        const errorElement = currentSlide.querySelector(".form-field_error");
        if (errorElement) {
          errorElement.setAttribute("custom-cloak", "true"); // Hide error when a radio is selected
        }
      }
    });
  });

  console.log("Navigation and validation handlers attached successfully.");
};

// Wait for Swiper instance to be ready
waitForSwiper();


  console.log("Navigation and validation handlers attached successfully.");
};

// Wait for Swiper instance to be ready
waitForSwiper();
