import { getSwiperInstance } from 'https://supercharger-staging.vercel.app/home/scripts/staging/swiper-order-form.js';

console.log("Order form navigation and validation script initialized.");

document.addEventListener("DOMContentLoaded", () => {
  const swiper = getSwiperInstance();

  if (!swiper) {
    console.error("Swiper instance not found. Ensure Swiper is initialized before this script.");
    return;
  }

  console.log("Swiper instance retrieved. Setting up navigation and validation...");

  // Get navigation buttons
  const nextButton = document.querySelector("[wized='home_orderForm_navigation_next']");
  const prevButton = document.querySelector("[wized='home_orderForm_navigation_previous']");

  if (!nextButton || !prevButton) {
    console.error("Navigation buttons not found. Ensure they are present in the DOM.");
    return;
  }

  // Add event listener for the "Next" button
  nextButton.addEventListener("click", () => {
    console.log("Next button clicked. Validating current slide...");

    const activeSlide = swiper.slides[swiper.activeIndex];
    if (!activeSlide) {
      console.error("No active slide found.");
      return;
    }

    console.log("Active slide found. Validating required fields...");

    // Check for required radio buttons on the current slide
    const requiredRadios = activeSlide.querySelectorAll("input[type='radio'][wized='home_orderForm_selectProduct_radio'][required]");
    const errorElement = activeSlide.querySelector(".form-field_error");

    let isValid = false;

    requiredRadios.forEach((radio) => {
      // Check if the radio button is selected
      if (radio.classList.contains("w--redirected-checked")) {
        isValid = true;
      }
    });

    if (!isValid) {
      console.warn("Validation failed. Showing error message...");

      // Show the error element by removing the "custom-cloak" attribute
      if (errorElement) {
        errorElement.removeAttribute("custom-cloak");
      }
    } else {
      console.log("Validation passed. Proceeding to the next slide...");

      // Hide the error element if it was previously shown
      if (errorElement) {
        errorElement.setAttribute("custom-cloak", "true");
      }

      // Navigate to the next slide
      swiper.slideNext();
    }
  });

  // Add event listener for the "Previous" button
  prevButton.addEventListener("click", () => {
    console.log("Previous button clicked. Moving to the previous slide...");
    swiper.slidePrev();
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
      }
    }
  });

  console.log("Navigation and validation logic set up successfully.");
});
