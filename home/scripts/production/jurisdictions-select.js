window.Wized = window.Wized || [];
window.Wized.push((Wized) => {
  console.log("Wized initialized. Ready to interact with Wized variables.");

  /**
   * Function to customize the select element with specific requirements.
   */
  const customizeSelectElement = () => {
    console.log("Starting customization of the select element...");

    // Step 1: Target the select element with the specific Wized attribute
    const selectElement = document.querySelector("[wized='home_orderForm_jurisdictionSelect']");

    if (!selectElement) {
      console.error("Select element with attribute 'wized=home_orderForm_jurisdictionSelect' not found in the DOM.");
      return; // Exit the function if the select element is not found
    }

    console.log("Found the select element. Proceeding to customize its options.");

    // Step 2: Disable the first option in the select element
    const firstOption = selectElement.options[0];
    if (firstOption) {
      firstOption.disabled = true; // Disable the first option
      console.log("The first option in the select element has been disabled.");
    } else {
      console.warn("The first option was not found in the select element. Skipping this step.");
    }

    // Step 3: Preselect the option with the value "United States Patent and Trademark Office (USPTO)"
    const preselectValue = "United States Patent and Trademark Office (USPTO)";
    let preselectedOption = null;

    // Loop through all options in the select element to find the matching value
    for (const option of selectElement.options) {
      if (option.value === preselectValue) {
        preselectedOption = option; // Store the matching option
        break;
      }
    }

    if (preselectedOption) {
      preselectedOption.selected = true; // Mark the found option as selected
      console.log(`The option with value '${preselectValue}' has been preselected.`);
    } else {
      console.error(`The option with value '${preselectValue}' was not found in the select element.`);
    }

    // Step 4: Disable all other options except the preselected and the first option
    for (const option of selectElement.options) {
      // Only disable options that are neither the first nor the preselected
      if (option !== firstOption && option !== preselectedOption) {
        option.disabled = true; // Disable this option
        console.log(`The option with value '${option.value}' has been disabled.`);
      }
    }

    console.log("Customization of the select element has been successfully completed.");
  };

  // Call the function directly since Wized ensures the DOM is ready
  customizeSelectElement();
});
