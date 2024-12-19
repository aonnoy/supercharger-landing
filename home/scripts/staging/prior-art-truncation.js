window.Wized = window.Wized || [];
window.Wized.push((Wized) => {
    // Track the state of which elements are expanded
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

    Wized.on("request", (event) => {
        if (event.name === "searchByPatentNumber3") {
            console.log("Detected execution of searchByPatentNumber3 request. Reinitializing listeners...");
            setTimeout(() => {
                initializeListeners();
            }, 100);
        }
    });

    console.log("Setting up initial listeners...");
    initializeListeners();

    // Export the initializeListeners function
    window.initializeTruncationListeners = initializeListeners;
});
