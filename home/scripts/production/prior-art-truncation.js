// Shared state map to track processed elements and their state
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
    console.log(`Processing listeners for ${logLabel} elements...`);

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

        // Reset state for the element
        const originalText = content.textContent;
        const truncatedText = truncateText(originalText);
        const isTruncated = originalText.length > 256;

        // If already in state, reset to truncated if not expanded
        if (state.has(content)) {
            const currentState = state.get(content);
            if (!currentState.expanded) {
                content.textContent = truncatedText;
                link.textContent = isTruncated ? "View More" : "";
            }
        } else {
            // Initialize new state
            content.textContent = isTruncated ? truncatedText : originalText;
            state.set(content, { expanded: false, originalText, truncatedText });

            link.textContent = isTruncated ? "View More" : "";

            // Attach click listener
            link.addEventListener("click", () => {
                const currentState = state.get(content);

                if (!currentState) {
                    console.error(`No state found for ${logLabel} element. This should not happen.`);
                    return;
                }

                // Toggle expanded state
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
export const initializeTruncationListeners = () => {
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

// Wrap the initialization for Wized
window.Wized = window.Wized || [];
window.Wized.push((Wized) => {
    console.log("Setting up initial truncation listeners...");
    initializeTruncationListeners();

    Wized.on("request", (event) => {
        if (event.name === "searchByPatentNumber3") {
            console.log("Detected execution of searchByPatentNumber3 request. Reinitializing truncation listeners...");
            setTimeout(() => {
                initializeTruncationListeners();
            }, 100);
        }
    });
});
