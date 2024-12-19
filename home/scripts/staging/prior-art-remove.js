window.Wized = window.Wized || [];
window.Wized.push((Wized) => {
    const updateSelectedPatentsInput = (publicationNumberToRemove) => {
        const inputElement = document.querySelector('[wized="home_orderForm_selectedPatentsInput"]');
        if (!inputElement) {
            console.error('Input element not found.');
            return;
        }

        const currentValues = inputElement.value
            ? inputElement.value.split(",").map((value) => value.trim())
            : [];

        const updatedValues = currentValues.filter((value) => value !== publicationNumberToRemove);
        inputElement.value = updatedValues.join(", ");
        const event = new Event("input", { bubbles: true });
        inputElement.dispatchEvent(event);
    };

    const initializeRemoveListeners = () => {
        const removeButtons = document.querySelectorAll('[wized="home_orderForm_priorArtPreview_patentRemove"]');

        removeButtons.forEach((button) => {
            const publicationNumber = button.getAttribute("publication-number");
            if (!publicationNumber) {
                console.warn("Remove button is missing publication-number.");
                return;
            }

            if (!button.dataset.listenerAttached) {
                button.addEventListener("click", () => {
                    let selectedPatents = Wized.data.v.home_orderForm_priorArtPreview_selectedPatents;
                    if (!Array.isArray(selectedPatents)) {
                        console.error("Patents variable is not an array.");
                        return;
                    }

                    const initialLength = selectedPatents.length;
                    selectedPatents = selectedPatents.filter(
                        (patent) => patent["publication_number"] !== publicationNumber
                    );

                    if (selectedPatents.length < initialLength) {
                        console.log(`Removed patent with publication-number: ${publicationNumber}`);
                        updateSelectedPatentsInput(publicationNumber);

                        if (window.reapplyTruncationForElement) {
                            console.log(`Reapplying truncation for publication-number: ${publicationNumber}`);
                            window.reapplyTruncationForElement("home_orderForm_priorArtPreview_patentAbstract", publicationNumber);
                            window.reapplyTruncationForElement("home_orderForm_priorArtPreview_patentClaims", publicationNumber);
                        } else {
                            console.error("Truncation reapply function not found.");
                        }
                    }

                    Wized.data.v.home_orderForm_priorArtPreview_selectedPatents = selectedPatents;
                });

                button.dataset.listenerAttached = true;
            }
        });
    };

    Wized.on("request", (event) => {
        if (event.name === "searchByPatentNumber3") {
            setTimeout(() => {
                initializeRemoveListeners();
            }, 100);
        }
    });

    initializeRemoveListeners();
});
