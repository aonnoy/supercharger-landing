window.Wized = window.Wized || [];
window.Wized.push((Wized) => {
    /**
     * Function to update the input after a publication_number is removed.
     * @param {string} publicationNumberToRemove - The publication_number to remove from the input.
     */
    const updateSelectedPatentsInput = (publicationNumberToRemove) => {
        console.log(`Removing publication_number: ${publicationNumberToRemove} from the input...`);

        // Target the input element
        const inputElement = document.querySelector('[wized="home_orderForm_selectedPatentsInput"]');

        if (!inputElement) {
            console.error('Input element with wized="home_orderForm_selectedPatentsInput" not found.');
            return;
        }

        // Get the current value of the input
        let currentValue = inputElement.value;

        // Split the current value into an array and trim whitespace
        const currentValues = currentValue
            ? currentValue.split(",").map((value) => value.trim())
            : [];

        // Remove the specified publication_number from the array
        const updatedValues = currentValues.filter((value) => value !== publicationNumberToRemove);

        // Update the input value
        const updatedValueString = updatedValues.join(", ");
        inputElement.value = updatedValueString;

        // Trigger an input event to ensure Wized detects the change
        const event = new Event("input", { bubbles: true });
        inputElement.dispatchEvent(event);

        console.log(`Updated input value after removal: ${updatedValueString}`);
    };

    /**
     * Function to attach click listeners to "Remove" elements.
     */
    const initializeRemoveListeners = () => {
        console.log("Initializing listeners for patent removal elements...");

        // Get all elements with the specified wized attribute
        const removeButtons = document.querySelectorAll('[wized="home_orderForm_priorArtPreview_patentRemove"]');

        removeButtons.forEach((button) => {
            // Ensure the button has a publication-number attribute
            const publicationNumber = button.getAttribute("publication-number");
            if (!publicationNumber) {
                console.warn("Remove button is missing the publication-number attribute. Skipping...");
                return;
            }

            // Check if the listener is already attached to avoid duplication
            if (!button.dataset.listenerAttached) {
                console.log(`Attaching listener to button with publication-number: ${publicationNumber}`);

                button.addEventListener("click", () => {
                    console.log(`Remove button clicked for publication-number: ${publicationNumber}`);

                    // Access the Wized variable
                    let selectedPatents = Wized.data.v.home_orderForm_priorArtPreview_selectedPatents;

                    if (!Array.isArray(selectedPatents)) {
                        console.error("home_orderForm_priorArtPreview_selectedPatents is not an array. Cannot proceed with removal.");
                        return;
                    }

                    // Find and remove the object with the matching publication-number
                    const initialLength = selectedPatents.length;
                    selectedPatents = selectedPatents.filter(
                        (patent) => patent["publication_number"] !== publicationNumber
                    );

                    if (selectedPatents.length < initialLength) {
                        console.log(`Removed object with publication-number: ${publicationNumber}`);
                        // Update the input field after removal
                        updateSelectedPatentsInput(publicationNumber);
                    } else {
                        console.warn(`No matching object found for publication-number: ${publicationNumber}`);
                    }

                    // Update the Wized variable
                    Wized.data.v.home_orderForm_priorArtPreview_selectedPatents = selectedPatents;

                    console.log("Updated home_orderForm_priorArtPreview_selectedPatents variable:", selectedPatents);
                });

                // Mark the button to indicate that a listener is attached
                button.dataset.listenerAttached = true;
            }
        });
    };

    /**
     * Listen for the execution of the searchByPatentNumber3 request and attach listeners.
     */
    Wized.on("request", (event) => {
        if (event.name === "searchByPatentNumber3") {
            console.log("Detected execution of searchByPatentNumber3 request. Reinitializing remove listeners...");
            setTimeout(() => {
                initializeRemoveListeners(); // Reinitialize listeners after new elements are added to the DOM
            }, 100); // Slight delay to ensure DOM updates are complete
        }
    });

    // Initial setup
    console.log("Setting up initial remove listeners...");
    initializeRemoveListeners();
});

