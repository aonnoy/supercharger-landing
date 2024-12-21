import { getSwiperInstance } from 'https://supercharger-staging.vercel.app/home/scripts/staging/swiper-order-form.js';

console.log("Order form navigation and validation script initialized.");

document.addEventListener("DOMContentLoaded", () => {
  const swiper = getSwiperInstance();

  if (!swiper) {
    console.error("Swiper instance not found. Ensure Swiper is initialized before this script.");
    return;
  }

  console.log("Swiper instance retrieved. Setting up navigation and validation...");

  // Get all "Next" and "Previous" buttons
  const nextButtons = document.querySelectorAll("[wized='home_orderForm_navigation_next']");
  const prevButtons = document.querySelectorAll("[wized='home_orderForm_navigation_previous']");

  if (nextButtons.length === 0) {
    console.error("No 'Next' buttons found. Ensure they are present in the DOM.");
    return;
  }

  if (prevButtons.length === 0) {
    console.error("No 'Previous' buttons found. Ensure they are present in the DOM.");
    return;
  }

  // Attach event listeners to all "Next" buttons
  nextButtons.forEach((nextButton) => {
    nextButton.addEventListener("click", (event) => {
      event.preventDefault(); // Prevent default link behavior
      console.log("Next button clicked. Validating current slide...");

      const activeSlide = swiper.slides[swiper.activeIndex];
      if (!activeSlide) {
        console.error("No active slide found.");
        return;
      }

      console.log("Active slide found. Validating required fields...");

      // Validate radio buttons on the active slide
      const requiredRadios = activeSlide.querySelectorAll(
        "input[type='radio'][wized='home_orderForm_selectProduct_radio']"
      );
      const errorElement = activeSlide.querySelector(".form-field_error");

      let isValid = false;

      requiredRadios.forEach((radio) => {
        // Check if the radio button is selected
        if (radio.checked) {
          console.log(`Radio button with value '${radio.value}' is selected.`);
          isValid = true;
        }
      });

      if (!isValid) {
        console.warn("Validation failed. Showing error message...");

        // Show the error element by removing the "custom-cloak" attribute
        if (errorElement) {
          errorElement.removeAttribute("custom-cloak");
          console.log("Error message displayed.");
        }
      } else {
        console.log("Validation passed. Proceeding to the next slide...");

        // Hide the error element if it was previously shown
        if (errorElement) {
          errorElement.setAttribute("custom-cloak", "true");
          console.log("Error message hidden.");
        }

        // Navigate to the next slide
        swiper.slideNext();
      }
    });
  });

  // Attach event listeners to all "Previous" buttons
  prevButtons.forEach((prevButton) => {
    prevButton.addEventListener("click", (event) => {
      event.preventDefault(); // Prevent default link behavior
      console.log("Previous button clicked. Moving to the previous slide...");
      swiper.slidePrev();
    });
  });

  // Add event listener to toggle the error message visibility when a radio is selected
  document.addEventListener("change", (event) => {
    if (event.target.matches("input[type='radio'][wized='home_orderForm_selectProduct_radio']")) {
      console.log("Radio button selected. Hiding error message if visible...");

      const activeSlide = swiper.slides[swiper.activeIndex];
      const errorElement = activeSlide.querySelector(".form-field_error");

      // Hide the error element when a radio button is selected
      if (errorElement) {
        errorElement.setAttribute("custom-cloak", "true");
        console.log("Error message hidden.");
      }
    }
  });

  console.log("Navigation and validation logic set up successfully.");
});
