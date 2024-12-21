// ** INSTRUCTIONS FOR SETTING UP ATTRIBUTES
// 1. Select the parent radio element and add the attribute "required-fields". 
//    - The value of this attribute should include the Wized attribute names of the form fields that need to be marked as required, separated by commas.
//    - These fields will be validated as required when the corresponding radio option is selected.
//    - The value for this attribute can be empty
//
// 2. Add the attribute "wized-variables" to the same element.
//    - The value of this attribute should include the variable names, separated by commas.
//    - The value for this attribute can be empty
//
// Example Usage:
// - required-fields="demo_patentDescription_fileUpload_instructionsInput,home_orderForm_date_input,home_orderForm_patentSearchOption_option"
// - wized-variables="variable1,variable2"
//
// Additional Behavior:
// - The script ensures that when radio options are toggled, both the inputs and the associated Wized variable values are reset.


window.Wized = window.Wized || [];
window.Wized.push((Wized) => {
    /**
     * Keep track of the previously selected radio option
     */
    let previouslySelectedFields = [];
    let previouslySelectedVariables = [];

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

                // Reset inputs from the previous radio option
                if (previouslySelectedFields.length > 0) {
                    previouslySelectedFields.forEach((field) => {
                        const targetElement = document.querySelector(`[wized="${field.trim()}"]`);
                        if (targetElement) {
                            console.log(`Resetting and marking field as NOT required: ${field}`);
                            targetElement.removeAttribute("required");

                            // Reset the field based on its type
                            if (targetElement.tagName === "INPUT" || targetElement.tagName === "TEXTAREA") {
                                targetElement.value = "";
                                // Dispatch a bubble event for text inputs and text areas
                                const event = new Event("input", { bubbles: true });
                                targetElement.dispatchEvent(event);
                            } else if (targetElement.tagName === "SELECT") {
                                targetElement.selectedIndex = 0;
                            } else if (targetElement.type === "checkbox" || targetElement.type === "radio") {
                                targetElement.checked = false;
                            }
                        }
                    });
                }

                // Reset the Wized variables of the previously selected radio option
                if (previouslySelectedVariables.length > 0) {
                    previouslySelectedVariables.forEach((variable) => {
                        if (variable.trim()) {
                            console.log(`Resetting previously selected Wized variable: ${variable}`);
                            Wized.data.v[variable.trim()] = null;
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
                            // Dispatch a bubble event for text inputs and text areas
                            const event = new Event("input", { bubbles: true });
                            targetElement.dispatchEvent(event);
                        } else if (targetElement.tagName === "SELECT") {
                            targetElement.selectedIndex = 0;
                        } else if (targetElement.type === "checkbox" || targetElement.type === "radio") {
                            targetElement.checked = false;
                        }
                    } else {
                        console.warn(`Target element not found for required field: ${field}`);
                    }
                });

                // Update the previously selected fields and variables
                previouslySelectedFields = requiredFields;
                previouslySelectedVariables = wizedVariables;

                // Reset the Wized variables for the current radio option
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
