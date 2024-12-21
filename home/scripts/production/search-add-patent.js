window.Wized = window.Wized || [];
window.Wized.push((Wized) => {
    /**
     * Function to attach an event listener to the search input field.
     * Logs and handles scenarios where elements might not be found.
     */
    const attachListener = () => {
        console.log("Attempting to attach event listener to search input...");

        // Target the input and trigger elements
        const searchInput = document.querySelector('[wized="home_orderForm_searchPatent_input"]');
        const searchTrigger = document.querySelector('[wized="home_orderForm_searchPatent_trigger"]');

        if (!searchInput) {
            console.error("Search input element with wized=home_orderForm_searchPatent_input not found.");
            return;
        }

        if (!searchTrigger) {
            console.error("Search trigger element with wized=home_orderForm_searchPatent_trigger not found.");
            return;
        }

        // Check if the listener is already attached
        if (!searchInput.dataset.listenerAttached) {
            console.log("Attaching 'Enter' key event listener to the search input...");
            searchInput.addEventListener('keydown', (event) => {
                if (event.key === 'Enter') {
                    console.log("'Enter' key pressed. Executing searchByPatentNumber3 request...");
                    try {
                        Wized.requests.execute("searchByPatentNumber3")
                            .then((result) => {
                                console.log("searchByPatentNumber3 request executed successfully:", result);
                            })
                            .catch((error) => {
                                console.error("Error executing searchByPatentNumber3 request:", error);
                            });
                    } catch (err) {
                        console.error("Unexpected error while executing searchByPatentNumber3 request:", err);
                    }
                }
            });

            // Mark the listener as attached
            searchInput.dataset.listenerAttached = true;
            console.log("Event listener attached successfully.");
        } else {
            console.log("Event listener is already attached to the search input.");
        }
    };

    /**
     * Main logic to monitor changes in the radio button's value and attach listeners conditionally.
     */
    const monitorRadioButton = () => {
        console.log("Initializing monitoring of the radio button...");

        // Target the radio element
        const radioElement = document.querySelector('[wized="home_orderForm_selectProduct_radio"]');

        if (!radioElement) {
            console.error("Radio button element with wized=home_orderForm_selectProduct_radio not found.");
            return;
        }

        // Add an event listener to detect changes in the radio button's value
        radioElement.addEventListener('change', () => {
            console.log(`Radio button value changed to: ${radioElement.value}`);
            if (radioElement.value === 'invalidity-prior-art-search') {
                console.log("Radio value matches 'invalidity-prior-art-search'. Attaching listener...");
                attachListener();
            }
        });

        // Check the current value of the radio button on initialization
        if (radioElement.value === 'invalidity-prior-art-search') {
            console.log("Radio value is already 'invalidity-prior-art-search'. Attaching listener...");
            attachListener();
        } else {
            console.log("Radio value does not match 'invalidity-prior-art-search'. No action taken.");
        }
    };

    // Start monitoring the radio button
    try {
        monitorRadioButton();
    } catch (err) {
        console.error("Unexpected error during radio button monitoring setup:", err);
    }
});
