import { initializeTruncationListeners } from 'https://supercharger-staging.vercel.app/home/scripts/production/prior-art-truncation.js';

window.Wized = window.Wized || [];
window.Wized.push((Wized) => {
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

                    let selectedPatents = Wized.data.v.home_orderForm_priorArtPreview_selectedPatents;

                    if (!Array.isArray(selectedPatents)) {
                        console.error("home_orderForm_priorArtPreview_selectedPatents is not an array. Cannot proceed with removal.");
                        return;
                    }

                    const initialLength = selectedPatents.length;
                    selectedPatents = selectedPatents.filter(
                        (patent) => patent["publication_number"] !== publicationNumber
                    );

                    if (selectedPatents.length < initialLength) {
                        console.log(`Removed object with publication-number: ${publicationNumber}`);
                    } else {
                        console.warn(`No matching object found for publication-number: ${publicationNumber}`);
                    }

                    Wized.data.v.home_orderForm_priorArtPreview_selectedPatents = selectedPatents;
                    console.log("Updated home_orderForm_priorArtPreview_selectedPatents variable:", selectedPatents);

                    // Update the input field
                    const inputField = document.querySelector('[wized="home_orderForm_selectedPatentsInput"]');
                    if (inputField) {
                        console.log(`Original input value: "${inputField.value}"`);

                        // Remove the publication number from the input field
                        const updatedInputValue = inputField.value
                            .split(', ')
                            .filter((value) => value !== publicationNumber)
                            .join(', ');

                        inputField.value = updatedInputValue;
                        console.log(`Updated input value: "${updatedInputValue}"`);

                        // Trigger an input event to notify Wized of the change
                        const event = new Event('input', { bubbles: true });
                        inputField.dispatchEvent(event);
                        console.log("Dispatched input event for updated input field.");
                    } else {
                        console.warn('Input field with attribute wized="home_orderForm_selectedPatentsInput" not found.');
                    }

                    // Reinitialize truncation listeners
                    console.log("Reinitializing truncation listeners...");
                    initializeTruncationListeners();
                });

                button.dataset.listenerAttached = true;
            }
        });
    };

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

