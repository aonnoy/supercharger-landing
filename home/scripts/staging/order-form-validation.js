// order-form-validation.js

/**
 * Validates the required radio inputs in the current slide.
 * @param {HTMLElement} currentSlide - The current Swiper slide element.
 * @returns {boolean} - Returns true if all validations pass, false otherwise.
 */
export function validateCurrentSlide(currentSlide) {
  let isValid = true;

  // Find all required radio inputs in the current slide
  const requiredRadioGroups = currentSlide.querySelectorAll('input[type="radio"][required]');
  
  requiredRadioGroups.forEach((radio) => {
    // Find the parent wrapper with the error message
    const errorElement = radio.closest('.form-field_wrapper')?.querySelector('.form-field_error');
    
    // Check if the radio group has a selected radio
    const radioGroupName = radio.name;
    const selectedRadio = currentSlide.querySelector(`input[name="${radioGroupName}"]:checked`);

    if (!selectedRadio) {
      // If no radio is selected, show the error
      isValid = false;
      if (errorElement) {
        errorElement.removeAttribute('custom-cloak');
      }
    } else {
      // If radio is selected, hide the error
      if (errorElement) {
        errorElement.setAttribute('custom-cloak', '');
      }
    }
  });

  return isValid;
}
