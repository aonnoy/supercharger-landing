window.Wized = window.Wized || [];
window.Wized.push((Wized) => {
    // Track the state of which elements are expanded
    const state = new Map(); // Map to keep track of expanded elements (key: element, value: expanded or not)

    /**
     * Function to truncate text if it exceeds 256 characters.
     * Adds a "..." at the end if truncated.
     */
    const truncateText = (text, maxLength = 256) => {
        return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
    };

    /**
     * Function to initialize listeners for newly added elements.
     */
    const initializeListeners = () => {
        console.log("Initializing listeners for patent abstracts...");

        // Get all abstract and "view more/less" link elements
        const abstracts = document.querySelectorAll('[wized="home_orderForm_priorArtPreview_patentAbstract"]');
        const readMoreLinks = document.querySelectorAll('[wized="home_orderForm_priorArtPreview_patentAbstractReadMore"]');

        // Ensure the number of abstracts matches the number of links
        if (abstracts.length !== readMoreLinks.length) {
            console.error("Mismatch in number of abstracts and read more links.");
            return;
        }

        abstracts.forEach((abstract, index) => {
            const readMoreLink = readMoreLinks[index];

            // Ensure both elements are valid
            if (!abstract || !readMoreLink) {
                console.warn(`Missing elements at index ${index}.`);
                return;
            }

            // Check if this abstract has already been processed
            if (!state.has(abstract)) {
                console.log(`Setting up abstract and read more link at index ${index}.`);

                // Set initial truncated state
                const originalText = abstract.textContent;
                const truncatedText = truncateText(originalText);
                const isTruncated = originalText.length > 256;

                // Update the abstract text and state
                abstract.textContent = isTruncated ? truncatedText : originalText;
                state.set(abstract, { expanded: false, originalText, truncatedText });

                // Update the read more link text
                readMoreLink.textContent = isTruncated ? "view more" : "";

                // Attach click listener to the read more link
                readMoreLink.addEventListener("click", () => {
                    const currentState = state.get(abstract);

                    if (!currentState) {
                        console.error("No state found for abstract. This should not happen.");
                        return;
                    }

                    // Toggle the expanded state
                    if (currentState.expanded) {
                        // Collapse the text
                        abstract.textContent = currentState.truncatedText;
                        readMoreLink.textContent = "view more";
                    } else {
                        // Expand the text
                        abstract.textContent = currentState.originalText;
                        readMoreLink.textContent = "view less";
                    }

                    // Update the state
                    currentState.expanded = !currentState.expanded;
                    state.set(abstract, currentState);
                    console.log(`Updated state for abstract at index ${index}:`, currentState);
                });
            }
        });
    };

    /**
     * Listen for the execution of the searchByPatentNumber3 request and reinitialize listeners.
     */
    Wized.on("request", (event) => {
        if (event.name === "searchByPatentNumber3") {
            console.log("Detected execution of searchByPatentNumber3 request. Reinitializing listeners...");
            setTimeout(() => {
                initializeListeners(); // Reinitialize listeners after new elements are added to the DOM
            }, 100); // Slight delay to ensure DOM updates are complete
        }
    });

    // Initial setup
    console.log("Setting up initial listeners...");
    initializeListeners();
});
