/**
 * Function to validate all fields in the active Swiper slide.
 * Ensures required fields are filled, displays errors if not, and prevents navigation to the next slide if validation fails.
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

        // Check if the field is valid
        if (field.type === 'radio' || field.type === 'checkbox') {
            // Check if at least one radio/checkbox in the group is selected
            const isChecked = activeSlide.querySelector(`[name="${field.name}"]:checked`);
            if (!isChecked) {
                console.log(`Radio/Checkbox group "${field.name}" is invalid.`);
                isValid = false;
                if (errorElement) {
                    errorElement.removeAttribute('custom-cloak');
                }
            } else {
                if (errorElement) {
                    errorElement.setAttribute('custom-cloak', '');
                }
            }
        } else if (field.tagName === 'SELECT' && field.value === '') {
            // Validate select fields
            console.log(`Select field "${field.name}" is empty.`);
            isValid = false;
            if (errorElement) {
                errorElement.removeAttribute('custom-cloak');
            }
        } else if ((field.tagName === 'INPUT' || field.tagName === 'TEXTAREA') && !field.value.trim()) {
            // Validate text inputs and textareas
            console.log(`Input/textarea field "${field.name}" is empty.`);
            isValid = false;
            if (errorElement) {
                errorElement.removeAttribute('custom-cloak');
            }
        } else {
            // If the field is valid, hide the error
            if (errorElement) {
                errorElement.setAttribute('custom-cloak', '');
            }
        }
    });

    // Prevent navigation to the next slide if validation fails
    if (!isValid) {
        console.warn("Validation failed for the active slide. Navigation blocked.");
    }

    return isValid;
};
