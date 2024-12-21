window.Wized = window.Wized || [];
window.Wized.push((Wized) => {
    /**
     * Function to update the input with the publication_number values.
     * @param {string} newPublicationNumber - The new publication_number to add.
     */
    const updateSelectedPatentsInput = (newPublicationNumber) => {
        console.log(`Adding publication_number: ${newPublicationNumber} to the input...`);

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

        // Check if the new value is already present
        if (!currentValues.includes(newPublicationNumber)) {
            // Append the new value and update the input
            currentValues.push(newPublicationNumber);
            const updatedValue = currentValues.join(", ");
            inputElement.value = updatedValue;

            // Trigger an input event to ensure Wized detects the change
            const event = new Event("input", { bubbles: true });
            inputElement.dispatchEvent(event);

            console.log(`Updated input value: ${updatedValue}`);
        } else {
            console.warn(`Publication_number: ${newPublicationNumber} is already present in the input.`);
        }
    };

    /**
     * Listen for the execution of the searchByPatentNumber3 request.
     */
    Wized.on("request", (event) => {
        if (event.name === "searchByPatentNumber3") {
            console.log("Detected execution of searchByPatentNumber3 request.");

            // Grab the publication_number from the request result
            const publicationNumber = event.data?.publication_number;

            if (publicationNumber) {
                console.log(`Extracted publication_number: ${publicationNumber}`);
                updateSelectedPatentsInput(publicationNumber);
            } else {
                console.error("No publication_number found in the request response.");
            }
        }
    });

    console.log("Listener for searchByPatentNumber3 request has been set up.");
});
