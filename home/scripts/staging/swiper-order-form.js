// Define the base URL
const BASE_URL = "https://supercharger-staging.vercel.app";

console.log(`Base URL is set to: ${BASE_URL}`);

// Dynamically import utilities
Promise.all([
  import(`${BASE_URL}/utilities/external-script-loader.js`),
  import(`${BASE_URL}/utilities/custom-css.js`)
])
  .then(([{ loadStylesheet, loadScript }, { addCustomStyles }]) => {
    try {
      // Add custom CSS for Swiper navigation buttons
      addCustomStyles(`
        .swiper-button-next::after,
        .swiper-button-prev::after {
          display: none; /* Hide the default arrow icons */
        }
      `);
      console.log("Custom styles for Swiper navigation buttons added successfully.");
    } catch (error) {
      console.error("Failed to add custom styles for Swiper navigation buttons:", error);
    }

    try {
      // Load Swiper CSS
      loadStylesheet(
        "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css",
        () => {
          console.log("Swiper CSS loaded!");
        }
      );
    } catch (error) {
      console.error("Failed to load Swiper CSS:", error);
    }

    try {
      // Load Swiper JS
      loadScript(
        "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js",
        () => {
          console.log("Swiper JS loaded!");

          // Initialize Swiper
          try {
            const swiper = new Swiper('.order-form_wrapper', {
              loop: false,
              slidesPerView: 1,
              spaceBetween: 0,
              allowTouchMove: false,
              autoHeight: true,
              effect: 'fade',
              fadeEffect: { crossFade: true },
              navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              },
            });

            console.log("Swiper initialized successfully with manual swiping disabled.");

            // Add validation logic to the "Next" button
            const nextButton = document.querySelector('.swiper-button-next');
            nextButton.addEventListener('click', () => {
              const currentSlide = document.querySelector('.order-form_wrapper .swiper-slide-active');

              // Perform validation
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

              if (!isValid) {
                console.log("Validation failed. Preventing navigation to the next slide.");
                return; // Stop execution to prevent moving to the next slide
              }

              console.log("Validation passed. Proceeding to the next slide.");
              swiper.slideNext(); // Move to the next slide manually
            });
          } catch (error) {
            console.error("Failed to Initialize Swiper:", error);
          }
        }
      );
    } catch (error) {
      console.error("Failed to load Swiper JS:", error);
    }
  })
  .catch((error) => {
    console.error("Failed to dynamically import utilities:", error);
  });
