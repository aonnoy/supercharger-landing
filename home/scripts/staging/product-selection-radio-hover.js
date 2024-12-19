// Select all radio button containers
const radioButtons = document.querySelectorAll('.product-selection_radio-button');

// Add event listeners to each radio button
radioButtons.forEach((radioButton) => {
  // Get the label element inside the current radio button
  const radioLabel = radioButton.querySelector('.product-selection_radio-label');

  // Add hover event listeners only if the radio button is not disabled
  if (!radioButton.classList.contains('is-disabled')) {
    // Mouseenter (hover) event
    radioButton.addEventListener('mouseenter', () => {
      // Check if the radio button is already selected
      const isSelected = radioButton.querySelector('.product-selection_radio-select').classList.contains('w--redirected-checked');
      
      // Add 'is-active' class only if the radio button is not selected
      if (!isSelected) {
        radioLabel.classList.add('is-active');
      }
    });

    // Mouseleave event
    radioButton.addEventListener('mouseleave', () => {
      // Always remove the 'is-active' class when the cursor leaves
      radioLabel.classList.remove('is-active');
    });

    // Click event to handle selection
    radioButton.addEventListener('click', () => {
      // Remove 'is-active' class from all labels
      radioButtons.forEach((btn) => {
        const label = btn.querySelector('.product-selection_radio-label');
        label.classList.remove('is-active');
      });

      // Add 'is-active' class to the clicked button's label
      radioLabel.classList.add('is-active');
    });
  }
});
