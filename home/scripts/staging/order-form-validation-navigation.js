import { getSwiperInstance } from 'https://supercharger-staging.vercel.app/home/scripts/staging/swiper-order-form.js';

console.log("Swiper navigation script with validation initialized.");

const waitForSwiper = () => {
  const swiper = getSwiperInstance();
  if (swiper) {
    console.log("Swiper instance found. Proceeding with navigation and validation setup...");
    setupNavigation(swiper); // Pass the Swiper instance to the setup function
  } else {
    console.log("Swiper instance not ready yet. Retrying...");
    setTimeout(waitForSwiper, 500); // Retry after 500ms
  }
};

// Validate radio inputs
const validateRadios = (currentSlide) => {
  const radios = currentSlide.querySelectorAll("input[type='radio']");
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

// Validate text inputs
const validateTextInputs = (currentSlide) => {
  const inputs = currentSlide.querySelectorAll("input[type='text'][required], input[type='email'][required], input[type='number'][required]");
  let isValid = true;

  inputs.forEach((input) => {
    const errorElement = input.closest(".form-field_wrapper")?.querySelector(".form-field_error");
    if (!input.value.trim()) {
      if (errorElement) {
        errorElement.removeAttribute("custom-cloak"); // Show error
      }
      isValid = false;
    } else {
      if (errorElement) {
        errorElement.setAttribute("custom-cloak", "true"); // Hide error
      }
    }
  });

  return isValid;
};

// Validate textareas
const validateTextareas = (currentSlide) => {
  const textareas = currentSlide.querySelectorAll("textarea[required]");
  let isValid = true;

  textareas.forEach((textarea) => {
    const errorElement = textarea.closest(".form-field_wrapper")?.querySelector(".form-field_error");
    if (!textarea.value.trim()) {
      console.warn(`Validation failed for textarea with id "${textarea.id}".`);
      if (errorElement) {
        errorElement.removeAttribute("custom-cloak"); // Show error
      }
      isValid = false;
    } else {
      console.log(`Textarea with id "${textarea.id}" is valid.`);
      if (errorElement) {
        errorElement.setAttribute("custom-cloak", "true"); // Hide error
      }
    }
  });

  return isValid;
};

// Validate select inputs
const validateSelectInputs = (currentSlide) => {
  const selects = currentSlide.querySelectorAll("select[required]");
  let isValid = true;

  selects.forEach((select) => {
    const errorElement = select.closest(".form-field_wrapper")?.querySelector(".form-field_error");
    if (!select.value || select.value === "") {
      if (errorElement) {
        errorElement.removeAttribute("custom-cloak"); // Show error
      }
      isValid = false;
    } else {
      if (errorElement) {
        errorElement.setAttribute("custom-cloak", "true"); // Hide error
      }
    }
  });

  return isValid;
};

// Validate current slide
const validateCurrentSlide = (swiper) => {
  const currentSlide = swiper.slides[swiper.activeIndex];
  const isRadiosValid = validateRadios(currentSlide);
  const isTextInputsValid = validateTextInputs(currentSlide);
  const isTextareasValid = validateTextareas(currentSlide);
  const isSelectsValid = validateSelectInputs(currentSlide);

  return isRadiosValid && isTextInputsValid && isTextareasValid && isSelectsValid;
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

