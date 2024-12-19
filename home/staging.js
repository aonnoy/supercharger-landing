// Import the BASE_URL constant
import { BASE_URL } from '.utilities/base-url.js';

// Construct the full URL
const swiperOrderFormUrl = `${BASE_URL}/home/scripts/staging/swiper-order-form.js`;

// Dynamically import the Swiper order form script
import(swiperOrderFormUrl)
  .then(() => {
    console.log('Swiper order form script loaded!');
  })
  .catch((error) => {
    console.error('Failed to load Swiper order form script:', error);
  });
