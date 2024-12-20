// Exported function to initialize listeners
export const initializeTruncationListeners = () => {
    const state = new Map();

    const truncateText = (text, maxLength = 256) => {
        return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
    };

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
                const originalText = content.textContent;
                const truncatedText = truncateText(originalText);
                const isTruncated = originalText.length > 256;

                content.textContent = isTruncated ? truncatedText : originalText;
                state.set(content, { expanded: false, originalText, truncatedText });

                link.textContent = isTruncated ? "View More" : "";

                link.addEventListener("click", () => {
                    const currentState = state.get(content);

                    if (!currentState) {
                        console.error(`No state found for ${logLabel} element.`);
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
                });
            }
        });
    };

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
