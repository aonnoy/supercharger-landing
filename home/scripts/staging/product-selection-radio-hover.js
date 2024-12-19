// Select all radio button containers
const radioButtons = document.querySelectorAll('.product-selection_radio-button');

console.log(`Found ${radioButtons.length} radio buttons.`); // Debugging log

// Add event listeners to each radio button
radioButtons.forEach((radioButton, index) => {
  console.log(`Adding listeners to radio button ${index + 1}.`);

  // Get the label element inside the current radio button
  const radioLabel = radioButton.querySelector('.product-selection_radio-label');

  // Add hover event listeners only if the radio button is not disabled
  if (!radioButton.classList.contains('is-disabled')) {
    console.log(`Radio button ${index + 1} is enabled.`);

    // Mouseenter (hover) event
    radioButton.addEventListener('mouseenter', () => {
      console.log(`Mouse entered radio button ${index + 1}.`);
      // Check if the radio button is already selected
      const isSelected = radioButton.querySelector('.product-selection_radio-select').classList.contains('w--redirected-checked');
      
      // Add 'is-active' class only if the radio button is not selected
      if (!isSelected) {
        console.log(`Radio button ${index + 1} is not selected. Adding is-active class.`);
        radioLabel.classList.add('is-active');
      }
    });

    // Mouseleave event
    radioButton.addEventListener('mouseleave', () => {
      console.log(`Mouse left radio button ${index + 1}.`);

      // Check if the radio button is selected
      const isSelected = radioButton.querySelector('.product-selection_radio-select').classList.contains('w--redirected-checked');

      // Remove 'is-active' only if the radio button is not selected
      if (!isSelected) {
        console.log(`Removing is-active class from radio button ${index + 1}.`);
        radioLabel.classList.remove('is-active');
      }
    });

    // Click event to handle selection
    radioButton.addEventListener('click', () => {
      console.log(`Radio button ${index + 1} clicked.`);

      // Remove 'is-active' class from all labels
      radioButtons.forEach((btn, btnIndex) => {
        const label = btn.querySelector('.product-selection_radio-label');
        label.classList.remove('is-active');
        console.log(`Removed is-active from radio button ${btnIndex + 1}.`);
      });

      // Add 'is-active' class to the clicked button's label
      radioLabel.classList.add('is-active');
      console.log(`Added is-active to radio button ${index + 1}.`);
    });
  } else {
    console.log(`Radio button ${index + 1} is disabled. Skipping listeners.`);
  }
});
