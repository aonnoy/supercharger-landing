// *******************************************************
// INITIALIZE SWIPER JS ON THE ORDER FORM
// *******************************************************
import 'https://supercharger-staging.vercel.app/home/scripts/staging/swiper-order-form.js';
console.log('Swiper order form script loaded!');

// *******************************************************
// RADIO BUTTON HOVER & CLICK STATE HANDLING
// *******************************************************
// Selectors: .product-selection_radio-select
// Combo Class: .is-active
import 'https://supercharger-staging.vercel.app/home/scripts/staging/product-selection-radio-hover.js';
console.log('Product selection hover and clicked function loaded');

// *******************************************************
// SEARCH PATENT FUNCTIONALITY
// *******************************************************
// Attach listener to search patent input to trigger on "Enter"
// Selectors: 
// - wized=home_orderForm_searchPatent_input
// - wized=home_orderForm_searchPatent_trigger
import 'https://supercharger-staging.vercel.app/home/scripts/staging/search-add-patent.js';
console.log('Search add patent function loaded');

// *******************************************************
// PRIOR ART PREVIEW MANAGEMENT
// *******************************************************
// Set Wized variable after successful execution
// Wized Variable: home_orderForm_priorArtPreview_selectedPatents
// Wized Request: searchByPatentNumber3
import 'https://supercharger-staging.vercel.app/home/scripts/staging/prior-art-preview-set-variable.js';
console.log('Set prior art preview variable function loaded');

// *******************************************************
// PRIOR ART TEXT TRUNCATION
// *******************************************************
// Add "View More" / "View Less" functionality
// Selectors: 
// - wized=home_orderForm_priorArtPreview_patentAbstract
// - wized=home_orderForm_priorArtPreview_patentAbstractReadMore
// - wized=home_orderForm_priorArtPreview_patentClaims
// - wized=home_orderForm_priorArtPreview_patentClaimsReadMore
// Wized Request: searchByPatentNumber3
import 'https://supercharger-staging.vercel.app/home/scripts/staging/prior-art-truncation.js';
console.log('Prior art truncation function loaded');

// *******************************************************
// REMOVE PRIOR ART FROM UI & WIZED VARIABLE
// *******************************************************
// Selectors: wized=home_orderForm_priorArtPreview_patentRemove
// Wized Request: searchByPatentNumber3
// Wized Variable: home_orderForm_priorArtPreview_selectedPatents
import 'https://supercharger-staging.vercel.app/home/scripts/staging/prior-art-remove.js';
console.log('Prior art remove function loaded');

// *******************************************************
// SET PUBLICATION NUMBERS INTO HIDDEN INPUT
// *******************************************************
// Selectors: wized=home_orderForm_selectedPatentsInput
// Wized Request: searchByPatentNumber3
import 'https://supercharger-staging.vercel.app/home/scripts/staging/selected-patent-input.js';
console.log('Selected patent input function loaded');

// *******************************************************
// SET REQUIRED FIELDS ON RADIO OPTION SELECTION
// *******************************************************
// Marks form fields as required when a product radio option is selected
import 'https://supercharger-staging.vercel.app/home/scripts/staging/set-fields-required.js';
console.log('Set fields required function loaded');

// *******************************************************
// INITIALIZE DATEPICKER
// *******************************************************
// Selectors: 
// - wized=home_orderForm_date_input
// - wized=home_orderForm_date_priorityDateInput
import 'https://supercharger-staging.vercel.app/home/scripts/staging/datepicker.js';
console.log('Datepicker function loaded');

// *******************************************************
// JURISDICTIONS SELECT MANAGEMENT
// *******************************************************
// Disable options and preselect one
// Selectors: wized=home_orderForm_jurisdictionSelect
import 'https://supercharger-staging.vercel.app/home/scripts/staging/jurisdictions-select.js';
console.log('Jurisdictions select function loaded');

// *******************************************************
// MULTISTEP SWIPER FORM NAVIGATION & VALIDATION
// *******************************************************
// Handles navigation and validation
// Selectors: 
// - wized=home_orderForm_navigation_previous
// - wized=home_orderForm_navigation_next
import 'https://supercharger-staging.vercel.app/home/scripts/staging/order-form-validation-navigation.js';
console.log('Order form validation & navigation function loaded');
