import { loadStylesheet, loadScript } from 'https://supercharger-staging.vercel.app/utilities/external-script-loader.js';

/**
 * Step 1: Dynamically load the Flatpickr CSS and JS files.
 * This ensures that the Flatpickr library is available for use in the script.
 */
loadStylesheet("https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css", () => {
  console.log("Flatpickr CSS loaded successfully.");
});

loadScript("https://cdn.jsdelivr.net/npm/flatpickr", () => {
  console.log("Flatpickr JS loaded successfully.");

  // Step 2: Initialize Wized's data handling system
  window.Wized = window.Wized || [];
  window.Wized.push((Wized) => {
    console.log("Wized initialized. Ready to interact with Wized variables.");

    /**
     * Step 3: Define a function to initialize Flatpickr on the appropriate date input.
     * This function is triggered whenever a radio button is clicked.
     */
    const initializeFlatpickr = () => {
      console.log("Initializing Flatpickr setup...");

      // Corrected selector for radio elements
      const radioElements = document.querySelectorAll("[wized='home_orderForm_selectProduct_radio']");

      // Check if any radio buttons exist in the DOM
      if (radioElements.length > 0) {
        console.log(`Found ${radioElements.length} radio element(s) with attribute 'wized=home_orderForm_selectProduct_radio'.`);

        // Loop through each radio button to attach a click event listener
        radioElements.forEach((radio, index) => {
          console.log(`Setting up event listener for radio button ${index + 1}.`);

          // Add a click event listener to the current radio button
          radio.addEventListener("click", () => {
            console.log(`Radio button ${index + 1} clicked.`);

            // Try to locate the date input fields based on their Wized attributes
            const priorityDateInput = document.querySelector("[wized='home_orderForm_date_priorityDateInput']");
            const dateInput = document.querySelector("[wized='home_orderForm_date_input']");

            // Log whether each specific input was found
            if (priorityDateInput) {
              console.log("Found the input with attribute 'wized=home_orderForm_date_priorityDateInput'.");
            }
            if (dateInput) {
              console.log("Found the input with attribute 'wized=home_orderForm_date_input'.");
            }

            // If no date input field is found, log an error and exit the function
            if (!priorityDateInput && !dateInput) {
              console.error("No date input elements found in the DOM.");
              return;
            }

            // Determine which input field to target (first one found)
            const targetInput = priorityDateInput || dateInput;

            try {
              // Clear any existing Flatpickr instance on the input (to avoid conflicts)
              if (targetInput._flatpickr) {
                console.log("Destroying existing Flatpickr instance on the target input.");
                targetInput._flatpickr.destroy();
              }

              // Initialize Flatpickr on the target input field
              flatpickr(targetInput, {
                dateFormat: "m-d-Y", // Set the desired date format (e.g., 12-25-2023)

                /**
                 * onChange is triggered whenever the date value in the Flatpickr input changes.
                 * The selected date is passed as `dateStr` (formatted string) to this function.
                 */
                onChange: (selectedDates, dateStr) => {
                  console.log(`Date changed in input field. New value: ${dateStr}`);

                  // Update the appropriate Wized variable based on which input is being targeted
                  if (targetInput === priorityDateInput) {
                    Wized.data.v.home_orderForm_date_priorityDate = dateStr; // Update Wized variable
                    console.log("Updated Wized variable 'home_orderForm_date_priorityDate' with value:", dateStr);
                  } else if (targetInput === dateInput) {
                    Wized.data.v.home_orderForm_date_date = dateStr; // Update Wized variable
                    console.log("Updated Wized variable 'home_orderForm_date_date' with value:", dateStr);
                  }
                }
              });

              console.log("Flatpickr successfully initialized on the target input.");
            } catch (error) {
              console.error("Error initializing Flatpickr:", error);
            }
          });
        });
      } else {
        console.error("No radio elements found with attribute 'wized=home_orderForm_selectProduct_radio'.");
      }
    };

    try {
      // Step 4: Call the initialization function to set up Flatpickr
      initializeFlatpickr();
    } catch (error) {
      console.error("An error occurred during Flatpickr initialization:", error);
    }
  });
}, () => {
  console.error("Failed to load Flatpickr JS.");
});
