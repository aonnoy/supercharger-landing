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

        // Validate field only when the next button is clicked
        const showError = () => {
            if (errorElement) {
                errorElement.removeAttribute('custom-cloak');
            }
        };

        const hideError = () => {
            if (errorElement) {
                errorElement.setAttribute('custom-cloak', '');
            }
        };

        // Check field validity
        if (field.type === 'radio' || field.type === 'checkbox') {
            const isChecked = activeSlide.querySelector(`[name="${field.name}"]:checked`);
            if (!isChecked) {
                console.log(`Radio/Checkbox group "${field.name}" is invalid.`);
                isValid = false;
                showError();
            } else {
                hideError();
            }
        } else if (field.tagName === 'SELECT' && field.value === '') {
            console.log(`Select field "${field.name}" is empty.`);
            isValid = false;
            showError();
        } else if ((field.tagName === 'INPUT' || field.tagName === 'TEXTAREA') && !field.value.trim()) {
            console.log(`Input/textarea field "${field.name}" is empty.`);
            isValid = false;
            showError();
        } else {
            hideError();
        }
    });

    // Return the validation result
    return isValid;
};

/**
 * Function to disable/enable the next button based on validation.
 */
export const enableNextButton = (swiperInstance) => {
    const nextButton = document.querySelector('.swiper-button-next');
    if (!nextButton) return;

    // Disable the next button initially
    nextButton.setAttribute('disabled', 'true');

    // Attach input/change listeners to required fields in the active slide
    const attachFieldListeners = () => {
        const activeSlide = document.querySelector('.swiper-slide-active');
        if (!activeSlide) return;

        const requiredFields = activeSlide.querySelectorAll('[required]');

        const checkValidity = () => {
            const isValid = validateActiveSlide();
            if (isValid) {
                nextButton.removeAttribute('disabled');
            } else {
                nextButton.setAttribute('disabled', 'true');
            }
        };

        requiredFields.forEach((field) => {
            field.addEventListener('input', checkValidity);
            field.addEventListener('change', checkValidity);
        });

        // Run initial validation
        checkValidity();
    };

    // Reattach listeners every time the slide changes
    swiperInstance.on('slideChange', () => {
        attachFieldListeners();
    });

    // Initial attachment
    attachFieldListeners();
};

