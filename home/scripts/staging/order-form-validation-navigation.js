import { getSwiperInstance } from 'https://supercharger-staging.vercel.app/home/scripts/staging/swiper-order-form.js';

console.log("Swiper navigation script with validation initialized.");

const waitForSwiper = () => {
  const swiper = getSwiperInstance();
  if (swiper) {
    console.log("Swiper instance found. Proceeding with navigation and validation setup...");
    setupNavigation(swiper);
  } else {
    console.log("Swiper instance not ready yet. Retrying...");
    setTimeout(waitForSwiper, 500); // Retry after 500ms
  }
};

const validateFieldGroup = (groupName, validator, currentSlide) => {
  console.log(`Validating ${groupName}...`);
  const result = validator(currentSlide);
  console.log(`${groupName} validation result: ${result}`);
  return result;
};

const validateRadios = (currentSlide) => {
  const radios = currentSlide.querySelectorAll("input[type='radio']");
  
  if (radios.length === 0) {
    console.log("No radios found on this slide. Skipping radio validation.");
    return true; // No radios to validate, return true
  }

  const isRadioChecked = Array.from(radios).some((radio) => {
    const parentLabel = radio.closest("label");
    return parentLabel && parentLabel.querySelector(".w-radio-input").classList.contains("w--redirected-checked");
  });

  const errorElement = currentSlide.querySelector(".form-field_error");
  if (!isRadioChecked) {
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

// Other validation functions remain unchanged...

const validateCurrentSlide = (swiper) => {
  const currentSlide = swiper.slides[swiper.activeIndex];
  const isRadiosValid = validateFieldGroup("Radios", validateRadios, currentSlide);
  const isTextInputsValid = validateFieldGroup("Text Inputs", validateTextInputs, currentSlide);
  const isTextareasValid = validateFieldGroup("Textareas", validateTextareas, currentSlide);
  const isSelectsValid = validateFieldGroup("Selects", validateSelectInputs, currentSlide);

  const allValid = isRadiosValid && isTextInputsValid && isTextareasValid && isSelectsValid;
  console.log(`Overall validation result for slide ${swiper.activeIndex + 1}: ${allValid}`);
  return allValid;
};

const setupNavigation = (swiper) => {
  console.log("Setting up navigation and validation handlers...");

  // Add event listener for "next" buttons
  document.querySelectorAll('[wized="home_orderForm_navigation_next"]').forEach((nextButton) => {
    nextButton.addEventListener('click', () => {
      if (validateCurrentSlide(swiper)) {
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

  // Add event listener for all inputs to hide error message on interaction
  document.querySelectorAll("input[type='radio'], input[type='text'], textarea, select").forEach((field) => {
    field.addEventListener('input', () => { // Use 'input' for real-time updates
      const errorElement = field.closest(".form-field_wrapper")?.querySelector(".form-field_error");
      if (errorElement && field.value.trim() !== "") {
        console.log(`Error hidden for field with id "${field.id}".`);
        errorElement.setAttribute("custom-cloak", "true"); // Hide error on change
      }
    });
  });

  console.log("Navigation and validation handlers attached successfully.");
};

// Wait for Swiper instance to be ready
waitForSwiper();

