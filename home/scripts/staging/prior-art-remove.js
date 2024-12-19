window.Wized = window.Wized || [];
window.Wized.push((Wized) => {
    /**
     * Function to update the input after a publication_number is removed.
     * @param {string} publicationNumberToRemove - The publication_number to remove from the input.
     */
    const updateSelectedPatentsInput = (publicationNumberToRemove) => {
        console.log(`Removing publication_number: ${publicationNumberToRemove} from the input...`);

        const inputElement = document.querySelector('[wized="home_orderForm_selectedPatentsInput"]');

        if (!inputElement) {
            console.error('Input element with wized="home_orderForm_selectedPatentsInput" not found.');
            return;
        }

        const currentValues = inputElement.value
            ? inputElement.value.split(",").map((value) => value.trim())
            : [];

        const updatedValues = currentValues.filter((value) => value !== publicationNumberToRemove);

        inputElement.value = updatedValues.join(", ");
        const event = new Event("input", { bubbles: true });
        inputElement.dispatchEvent(event);

        console.log(`Updated input value after removal: ${updatedValues.join(", ")}`);
    };

    /**
     * Function to attach click listeners to "Remove" elements.
     */
    const initializeRemoveListeners = () => {
        console.log("Initializing listeners for patent removal elements...");

        const removeButtons = document.querySelectorAll('[wized="home_orderForm_priorArtPreview_patentRemove"]');

        removeButtons.forEach((button) => {
            const publicationNumber = button.getAttribute("publication-number");
            if (!publicationNumber) {
                console.warn("Remove button is missing the publication-number attribute. Skipping...");
                return;
            }

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
                        updateSelectedPatentsInput(publicationNumber);

                        // Update the Wized variable
                        Wized.data.v.home_orderForm_priorArtPreview_selectedPatents = selectedPatents;

                        console.log("Re-truncating all elements after DOM update...");
                        if (window.initializeTruncationListeners) {
                            setTimeout(() => {
                                window.initializeTruncationListeners();
                            }, 100); // Delay to ensure DOM updates are complete
                        } else {
                            console.error("Truncation listener function not found!");
                        }
                    } else {
                        console.warn(`No matching object found for publication-number: ${publicationNumber}`);
                    }
                });

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
                initializeRemoveListeners();
            }, 100);
        }
    });

    console.log("Setting up initial remove listeners...");
    initializeRemoveListeners();
});
