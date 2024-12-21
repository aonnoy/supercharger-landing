// INITIALISE SWIPER JS ON THE ORDER FORM
import 'https://supercharger-staging.vercel.app/home/scripts/production/swiper-order-form.js';
console.log('Swiper order form script loaded!');


// SET ACTIVE COMBO CLASS TO RADIO BUTTONS ON HOVER AND CLICKED STATE
// SELETORS: .product-selection_radio-select
// COMBO CLASS: .is-active
import 'https://supercharger-staging.vercel.app/home/scripts/production/product-selection-radio-hover.js';
console.log('Product selection hover and clicked Function is loaded');


// ATTACHES LISTENER TO SEARCH PATENT INPUT SO IT CAN BE TRIGGGERED ON KEYBOARD ENTER PRESS
// SELECTORS: wized=home_orderForm_searchPatent_input, wized=home_orderForm_searchPatent_trigger
import 'https://supercharger-staging.vercel.app/home/scripts/production/search-add-patent.js';
console.log('Search add patent function is loaded');


// SET WIZED VARIABLE WHEN WIZED REQUEST HAS BEEN EXECUTED SUCCESSFULLY
// WIZED VARIABLE: home_orderForm_priorArtPreview_selectedPatents
// WIZED REQUEST: searchByPatentNumber3
import 'https://supercharger-staging.vercel.app/home/scripts/production/prior-art-preview-set-variable.js';
console.log('Set Prior art Preview variable function is loaded');


// TRUNCATE TEXT, "VIEW MORE" "VIEW LESS" FUNCTIONALITY ADDED TO LINKS IN PRIOR ART UI CARDS
// SELECTORS: wized=home_orderForm_priorArtPreview_patentAbstract, 
// wized=home_orderForm_priorArtPreview_patentAbstractReadMore, wized=home_orderForm_priorArtPreview_patentClaims,
// wized=home_orderForm_priorArtPreview_patentClaimsReadMore 
// WIZED REQUEST: searchByPatentNumber3
import 'https://supercharger-staging.vercel.app/home/scripts/production/prior-art-truncation.js';
console.log('Prior Art Truncation function is loaded');


// REMOVES PRIOR ART FROM UI AND WIZED VARIABLE
// SELECTORS: wized=home_orderForm_priorArtPreview_patentRemove
// WIZED REQUEST: searchByPatentNumber3
// WIZED VARIABLE: home_orderForm_priorArtPreview_selectedPatents
import 'https://supercharger-staging.vercel.app/home/scripts/production/prior-art-remove.js';
console.log('Prior art remove function is loaded');


// SET PUBLICATION NUMBERS FROM SELECTED PRIOR ART INTO HIDDEN INPUT
// SELECTORS: wized=home_orderForm_selectedPatentsInput
// WIZED REQUEST: searchByPatentNumber3
import 'https://supercharger-staging.vercel.app/home/scripts/production/selected-patent-input.js';
console.log('Selected Patent Input function is loaded');


// SELECTING THE PRODUCT RADIO OPTIONS, THE SCRIPT MARKS THE FORM FIELDS AS "REQUIRED". INSTRUCTIONS ARE PROVIDED
// ...IN THE CODE ON THE ATTRIBUTE SETUP
import 'https://supercharger-staging.vercel.app/home/scripts/production/set-fields-required.js';
console.log('Set Fields Required function is loaded');


// INITIALISES FLATPICKR JS ON DATE INPUTS
// SELECTORS: wized=home_orderForm_date_input, wized='home_orderForm_date_priorityDateInput'
import 'https://supercharger-staging.vercel.app/home/scripts/production/datepicker.js';
console.log('datepicker function is loaded');


// DISABLES ALL THE OPTIONS ON THE SELECT AND PRESELECTS ONE OPTION
// SELECTORS: wized=home_orderForm_jurisdictionSelect
import 'https://supercharger-staging.vercel.app/home/scripts/production/jurisdictions-select.js';
console.log('jurisdictions select function is loaded');


// HANDLES THE MULTISTEP SWIPER FORM NAVIGATION AND VALIDATION
// SELECTORS: wized=home_orderForm_navigation_previous, wized="home_orderForm_navigation_next
import 'https://supercharger-staging.vercel.app/home/scripts/production/order-form-validation-navigation.js';
console.log('Order form validation & navigation is loaded');
