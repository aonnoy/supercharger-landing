window.Wized = window.Wized || [];
window.Wized.push((Wized) => {
    /**
     * Keep track of the previously selected radio option
     */
    let previouslySelectedFields = [];

    /**
     * Function to initialize listeners for radio buttons with `required-fields` attribute.
     */
    const initializeRadioListeners = () => {
        console.log("Initializing listeners for radio buttons with required-fields...");

        const radioButtons = document.querySelectorAll('label[required-fields]');

        radioButtons.forEach((radioLabel) => {
            const inputElement = radioLabel.querySelector('input[type="radio"]');

            if (!inputElement) {
                console.warn("Radio label is missing an associated input element. Skipping...");
                return;
            }

            const requiredFieldsAttr = radioLabel.getAttribute('required-fields');
            const wizedVariablesAttr = radioLabel.getAttribute('wized-variables');

            if (!requiredFieldsAttr) {
                console.warn("Radio label is missing the `required-fields` attribute. Skipping...");
                return;
            }

            const requiredFields = requiredFieldsAttr.split(',');
            const wizedVariables = wizedVariablesAttr ? wizedVariablesAttr.split(',') : [];

            inputElement.addEventListener("change", () => {
                console.log(`Radio button selected: ${inputElement.value}`);
                console.log(`Required fields: ${requiredFields}`);
                console.log(`Wized variables: ${wizedVariables}`);

                // Ensure the clicked radio button gets the proper class
                const radioSelect = radioLabel.querySelector(".w-radio-input");
                if (radioSelect) {
                    document.querySelectorAll(".w--redirected-checked").forEach((el) => {
                        el.classList.remove("w--redirected-checked");
                    });
                    radioSelect.classList.add("w--redirected-checked");
                }

                // Mark the previous inputs as not required
                if (previouslySelectedFields.length > 0) {
                    previouslySelectedFields.forEach((field) => {
                        const targetElement = document.querySelector(`[wized="${field.trim()}"]`);
                        if (targetElement) {
                            console.log(`Marking field as NOT required: ${field}`);
                            targetElement.removeAttribute("required");
                        }
                    });
                }

                // Mark the current required fields as required and reset them
                requiredFields.forEach((field) => {
                    const targetElement = document.querySelector(`[wized="${field.trim()}"]`);
                    if (targetElement) {
                        console.log(`Marking field as required: ${field}`);
                        targetElement.setAttribute("required", "true");

                        // Reset the field based on its type
                        if (targetElement.tagName === "INPUT" || targetElement.tagName === "TEXTAREA") {
                            targetElement.value = "";
                        } else if (targetElement.tagName === "SELECT") {
                            targetElement.selectedIndex = 0;
                        } else if (targetElement.type === "checkbox" || targetElement.type === "radio") {
                            targetElement.checked = false;
                        }
                    } else {
                        console.warn(`Target element not found for required field: ${field}`);
                    }
                });

                // Update the previously selected fields
                previouslySelectedFields = requiredFields;

                // Reset the Wized variables
                wizedVariables.forEach((variable) => {
                    if (variable.trim()) {
                        console.log(`Resetting Wized variable: ${variable}`);
                        Wized.data.v[variable.trim()] = null;
                    }
                });
            });
        });
    };

    /**
     * Reinitialize listeners when new elements are added to the DOM.
     */
    Wized.on("request", (event) => {
        console.log("Reinitializing radio listeners after Wized request...");
        setTimeout(() => {
            initializeRadioListeners();
        }, 100); // Delay to ensure DOM updates are complete
    });

    // Initial setup
    console.log("Setting up initial radio listeners...");
    initializeRadioListeners();
});
