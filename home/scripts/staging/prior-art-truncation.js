window.Wized = window.Wized || [];
window.Wized.push((Wized) => {
    const state = new Map();

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

            if (!state.has(content)) {
                console.log(`Setting up ${logLabel} and its link at index ${index}.`);

                const originalText = content.textContent;
                const truncatedText = truncateText(originalText);
                const isTruncated = originalText.length > 256;

                content.textContent = isTruncated ? truncatedText : originalText;
                state.set(content, { expanded: false, originalText, truncatedText });

                link.textContent = isTruncated ? "View More" : "";

                link.addEventListener("click", () => {
                    const currentState = state.get(content);

                    if (!currentState) {
                        console.error(`No state found for ${logLabel} element. This should not happen.`);
                        return;
                    }

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
     * Function to reapply truncation when a remove button is clicked.
     */
    const setupRemoveButtonListener = () => {
        console.log("Setting up listeners for retruncation on remove button clicks...");

        document.addEventListener("click", (event) => {
            const removeButton = event.target.closest('[wized="home_orderForm_priorArtPreview_patentRemove"]');
            if (removeButton) {
                console.log("Remove button clicked. Reapplying truncation logic...");
                initializeListeners();
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
            }, 100);
        }
    });

    // Initial setup
    console.log("Setting up initial listeners...");
    initializeListeners();
    setupRemoveButtonListener();
});

