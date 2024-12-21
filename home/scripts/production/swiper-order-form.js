// Define the base URL
const BASE_URL = "https://supercharger-staging.vercel.app";

console.log(`Base URL is set to: ${BASE_URL}`);

let swiperInstance; // Declare Swiper instance

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
            swiperInstance = new Swiper('.order-form_wrapper', {
              loop: false, // No looping for a multistep form
              slidesPerView: 1, // Show one step at a time
              spaceBetween: 0, // No spacing between slides
              allowTouchMove: false, // Prevent manual swiping
              autoHeight: true, // Automatically adjust height based on content
              effect: 'fade',
            });

            console.log("Swiper initialized successfully.");

            // Observe changes in the Swiper slides to adjust height dynamically
            const swiperSlides = document.querySelectorAll('.order-form_wrapper .swiper-slide');
            swiperSlides.forEach((slide, index) => {
              console.log(`Setting up MutationObserver for slide ${index + 1}...`);
              const observer = new MutationObserver(() => {
                console.log(`Changes detected in slide ${index + 1}. Updating Swiper height...`);
                swiperInstance.updateAutoHeight(0); // Update Swiper height
              });

              observer.observe(slide, {
                childList: true, // Watch for added/removed child elements
                attributes: true, // Watch for attribute changes
                subtree: true, // Watch all descendants
              });

              console.log(`MutationObserver set up for slide ${index + 1}.`);
            });
          } catch (error) {
            console.error("Failed to initialize Swiper:", error);
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

// Export a function to retrieve the Swiper instance
export const getSwiperInstance = () => {
  if (!swiperInstance) {
    console.warn("Swiper instance is not yet initialized.");
  }
  return swiperInstance;
};
