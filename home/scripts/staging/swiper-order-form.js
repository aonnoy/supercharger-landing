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

            console.log("Swiper initialized successfully.");
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
