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
     * Function to process a group of elements and initialize truncation and toggle functionality.
     * @param {string} contentSelector - Selector for the text element (e.g., abstract or claims).
     * @param {string} linkSelector - Selector for the "View More/Less" link element.
     * @param {string} logLabel - Label for logging (e.g., "abstract" or "claims").
     */
    const processElements = (contentSelector, linkSelector, logLabel) => {
        console.log(`Initializing listeners for ${logLabel} elements...`);

        const contents = document.querySelectorAll(`[wized="${contentSelector}"]`);
        const links = document.querySelectorAll(`[wized="${linkSelector}"]`);

        // Ensure the number of content elements matches the number of links
        if (contents.length !== links.length) {
            console.error(`Mismatch in number of ${logLabel} elements and their links.`);
            return;
        }

        contents.forEach((content, index) => {
            const link = links[index];

            // Ensure both elements are valid
            if (!content || !link) {
                console.warn(`Missing elements for ${logLabel} at index ${index}.`);
                return;
            }

            // Check if this content has already been processed
            if (!state.has(content)) {
                console.log(`Setting up ${logLabel} and its link at index ${index}.`);

                // Set initial truncated state
                const originalText = content.textContent;
                const truncatedText = truncateText(originalText);
                const isTruncated = originalText.length > 256;

                // Update the content text and state
                content.textContent = isTruncated ? truncatedText : originalText;
                state.set(content, { expanded: false, originalText, truncatedText });

                // Update the link text
                link.textContent = isTruncated ? "View More" : "";

                // Attach click listener to the link
                link.addEventListener("click", () => {
                    const currentState = state.get(content);

                    if (!currentState) {
                        console.error(`No state found for ${logLabel} element. This should not happen.`);
                        return;
                    }

                    // Toggle the expanded state
                    if (currentState.expanded) {
                        // Collapse the text
                        content.textContent = currentState.truncatedText;
                        link.textContent = "View More";
                    } else {
                        // Expand the text
                        content.textContent = currentState.originalText;
                        link.textContent = "View Less";
                    }

                    // Update the state
                    currentState.expanded = !currentState.expanded;
                    state.set(content, currentState);
                    console.log(`Updated state for ${logLabel} at index ${index}:`, currentState);
                });
            }
        });
    };

    /**
     * Function to initialize listeners for all target elements.
     */
    const initializeListeners = () => {
        processElements(
            "home_orderForm_priorArtPreview_patentAbstract",
            "home_orderForm_priorArtPreview_patentAbstractReadMore",
            "abstract"
        );
        processElements(
            "home_orderForm_priorArtPreview_patentClaims",
            "home_orderForm_priorArtPreview_patentClaimsReadMore",
            "claims"
        );
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
