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

                    // Reapply truncation logic
                    console.log("Reapplying truncation logic...");
                    reapplyTruncationLogic(Wized);
                });

                button.dataset.listenerAttached = true;
            }
        });
    };

    const reapplyTruncationLogic = (Wized) => {
        const abstractElements = Wized.elements.getAll("home_orderForm_priorArtPreview_patentAbstract");
        const readMoreLinks = Wized.elements.getAll("home_orderForm_priorArtPreview_patentAbstractReadMore");
        const claimsElements = Wized.elements.getAll("home_orderForm_priorArtPreview_patentClaims");
        const claimsReadMoreLinks = Wized.elements.getAll("home_orderForm_priorArtPreview_patentClaimsReadMore");

        // Reprocess abstract elements
        if (abstractElements && readMoreLinks) {
            processElements(abstractElements, readMoreLinks, "abstract");
        }

        // Reprocess claims elements
        if (claimsElements && claimsReadMoreLinks) {
            processElements(claimsElements, claimsReadMoreLinks, "claims");
        }
    };

    const processElements = (contents, links, logLabel) => {
        console.log(`Reprocessing ${logLabel} elements...`);

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

            const originalText = content.textContent;
            const truncatedText = originalText.length > 256 ? originalText.slice(0, 256) + "..." : originalText;

            content.textContent = truncatedText;
            link.textContent = originalText.length > 256 ? "View More" : "";
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

