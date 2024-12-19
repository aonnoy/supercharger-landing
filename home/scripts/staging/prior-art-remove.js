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

                    // Reapply the truncation logic after removing the object
                    if (window.initializeListeners) {
                        console.log("Reapplying truncation logic...");
                        window.initializeListeners();
                    } else {
                        console.warn("Truncation logic function is not defined. Ensure it's loaded.");
                    }
                });

                button.dataset.listenerAttached = true;
            }
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
