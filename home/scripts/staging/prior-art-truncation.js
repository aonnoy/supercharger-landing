window.Wized = window.Wized || [];
window.Wized.push((Wized) => {
    const state = new Map(); // Map to keep track of expanded elements

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
        console.log(`Processing ${logLabel} elements for truncation...`);

        const contents = document.querySelectorAll(`[wized="${contentSelector}"]`);
        const links = document.querySelectorAll(`[wized="${linkSelector}"]`);

        if (contents.length !== links.length) {
            console.error(`Mismatch in number of ${logLabel} elements and their links.`);
            return;
        }

        contents.forEach((content, index) => {
            const link = links[index];

            if (!content || !link) {
                console.warn(`Missing elements for ${logLabel} at index ${index}.`);
                return;
            }

            // Reset or set the state
            const originalText = content.textContent;
            const truncatedText = truncateText(originalText);
            const isTruncated = originalText.length > 256;

            state.set(content, { expanded: false, originalText, truncatedText });

            // Set initial content and link text
            content.textContent = isTruncated ? truncatedText : originalText;
            link.textContent = isTruncated ? "View More" : "";

            // Remove any existing listener to avoid duplication
            link.removeEventListener("click", handleClick);

            // Define the click handler
            const handleClick = () => {
                const currentState = state.get(content);

                if (!currentState) {
                    console.error(`No state found for ${logLabel} element at index ${index}.`);
                    return;
                }

                // Toggle expanded/collapsed state
                if (currentState.expanded) {
                    content.textContent = currentState.truncatedText;
                    link.textContent = "View More";
                } else {
                    content.textContent = currentState.originalText;
                    link.textContent = "View Less";
                }

                currentState.expanded = !currentState.expanded;
                state.set(content, currentState);
                console.log(`Updated state for ${logLabel} at index ${index}:`, currentState);
            };

            // Attach the click handler
            link.addEventListener("click", handleClick);
        });
    };

    /**
     * Function to initialize listeners for all target elements.
     * Clears the state to ensure fresh processing.
     */
    const initializeListeners = () => {
        console.log("Initializing truncation listeners...");
        state.clear(); // Clear previous state to avoid stale references
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
            setTimeout(() => initializeListeners(), 100); // Slight delay to ensure DOM updates are complete
        }
    });

    // Initial setup
    console.log("Setting up initial listeners...");
    initializeListeners();
});
