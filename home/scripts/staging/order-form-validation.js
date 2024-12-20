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

        // Check field validity
        if (field.type === 'radio' || field.type === 'checkbox') {
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
            console.log(`Select field "${field.name}" is empty.`);
            isValid = false;
            if (errorElement) {
                errorElement.removeAttribute('custom-cloak');
            }
        } else if ((field.tagName === 'INPUT' || field.tagName === 'TEXTAREA') && !field.value.trim()) {
            console.log(`Input/textarea field "${field.name}" is empty.`);
            isValid = false;
            if (errorElement) {
                errorElement.removeAttribute('custom-cloak');
            }
        } else {
            // If valid, hide the error element
            if (errorElement) {
                errorElement.setAttribute('custom-cloak', '');
            }
        }
    });

    return isValid;
};

/**
 * Function to initialize validation and ensure the next button only works if fields are valid.
 * @param {Swiper} swiperInstance - The Swiper instance.
 */
export const attachValidationToNextButton = (swiperInstance) => {
    const nextButton = document.querySelector('.swiper-button-next');
    if (!nextButton) return;

    nextButton.addEventListener('click', (event) => {
        const isValid = validateActiveSlide();

        if (!isValid) {
            console.warn("Validation failed. Preventing navigation to the next slide.");
            event.preventDefault(); // Prevent navigation
        } else {
            console.log("Validation passed. Allowing navigation.");
        }
    });

    // Disable the next button until the fields are valid
    const disableNextButton = () => {
        nextButton.setAttribute('disabled', 'true');
    };

    const enableNextButton = () => {
        nextButton.removeAttribute('disabled');
    };

    const attachListenersToFields = () => {
        const activeSlide = document.querySelector('.swiper-slide-active');
        if (!activeSlide) return;

        const requiredFields = activeSlide.querySelectorAll('[required]');

        const checkValidity = () => {
            const isValid = validateActiveSlide();
            if (isValid) {
                enableNextButton();
            } else {
                disableNextButton();
            }
        };

        requiredFields.forEach((field) => {
            field.addEventListener('input', checkValidity);
            field.addEventListener('change', checkValidity);
        });

        checkValidity(); // Initial check
    };

    swiperInstance.on('slideChange', () => {
        disableNextButton();
        attachListenersToFields();
    });

    // Initial attachment for the first slide
    attachListenersToFields();
};



