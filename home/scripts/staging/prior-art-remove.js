window.Wized = window.Wized || [];
window.Wized.push((Wized) => {
    /**
     * Function to attach click listeners to "Remove" elements.
     */
    const initializeRemoveListeners = () => {
        console.log("Initializing listeners for patent removal elements...");

        // Get all elements with the specified Wized attribute
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
                    } else {
                        console.warn(`No matching object found for publication-number: ${publicationNumber}`);
                    }

                    // Update the Wized variable
                    Wized.data.v.home_orderForm_priorArtPreview_selectedPatents = selectedPatents;

                    console.log("Updated home_orderForm_priorArtPreview_selectedPatents variable:", selectedPatents);

                    // Remove the value from the input field
                    const inputField = document.querySelector('[wized="home_orderForm_selectedPatentsInput"]');
                    if (inputField) {
                        let inputValue = inputField.value;
                        console.log(`Original input value: "${inputValue}"`);

                        // Split the input value into an array, remove the matching value, and join it back
                        const updatedInputValue = inputValue
                            .split(', ')
                            .filter((value) => value !== publicationNumber)
                            .join(', ');

                        inputField.value = updatedInputValue; // Update the input field value
                        console.log(`Updated input value: "${updatedInputValue}"`);
                    } else {
                        console.warn('Input field with attribute wized="home_orderForm_selectedPatentsInput" not found.');
                    }
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
