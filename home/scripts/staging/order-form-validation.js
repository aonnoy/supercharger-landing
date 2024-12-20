/**
 * Function to validate all fields in the active Swiper slide.
 * Ensures required fields are filled and displays errors if not.
 * @returns {boolean} - Returns `true` if all validations pass, otherwise `false`.
 */
export const validateActiveSlide = () => {
    console.log("Validating active slide...");

    // Get the active slide
    const activeSlide = document.querySelector('.swiper-slide-active');
    if (!activeSlide) {
        console.error("No active slide found!");
        return false;
    }

    let isValid = true;

    // Find all required fields in the active slide
    const requiredFields = activeSlide.querySelectorAll('[required]');

    requiredFields.forEach((field) => {
        const errorElement = field.closest('.form-field_wrapper')?.querySelector('.form-field_error');

        // Validate radio or checkbox
        if (field.type === 'radio' || field.type === 'checkbox') {
            const isChecked = activeSlide.querySelector(`[name="${field.name}"]:checked`);
            if (!isChecked) {
                isValid = false;
                if (errorElement) {
                    errorElement.removeAttribute('custom-cloak');
                }
            } else {
                if (errorElement) {
                    errorElement.setAttribute('custom-cloak', '');
                }
            }
        }
        // Validate select
        else if (field.tagName === 'SELECT' && field.value === '') {
            isValid = false;
            if (errorElement) {
                errorElement.removeAttribute('custom-cloak');
            }
        }
        // Validate text inputs or textareas
        else if ((field.tagName === 'INPUT' || field.tagName === 'TEXTAREA') && !field.value.trim()) {
            isValid = false;
            if (errorElement) {
                errorElement.removeAttribute('custom-cloak');
            }
        }
        // Hide error for valid fields
        else {
            if (errorElement) {
                errorElement.setAttribute('custom-cloak', '');
            }
        }
    });

    console.log(`Validation result for active slide: ${isValid ? 'Valid' : 'Invalid'}`);
    return isValid;
};

/**
 * Attach validation to the "Next" button to ensure navigation is blocked until fields are valid.
 */
export const attachValidationToNextButton = (swiperInstance) => {
    const nextButton = document.querySelector('.swiper-button-next');
    if (!nextButton) {
        console.error("Next button not found!");
        return;
    }

    nextButton.addEventListener('click', (event) => {
        const isValid = validateActiveSlide();

        if (!isValid) {
            console.warn("Validation failed. Blocking navigation to the next slide.");
            event.preventDefault(); // Prevent navigation
            return;
        }

        console.log("Validation passed. Allowing navigation to the next slide.");
    });
};

