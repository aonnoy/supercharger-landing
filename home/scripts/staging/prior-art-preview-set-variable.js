window.Wized = window.Wized || [];
window.Wized.push((Wized) => {
    /**
     * Function to update the Wized variable with new data, ensuring no duplicates.
     */
    const updateSelectedPatents = (result) => {
        try {
            console.log("Processing data from searchByPatentNumber3 request...");

            // Extract claims data from the result
            const claimsData = result.data?.claims?.map((claim, index) => ({
                uniqueID: claim.uniqueID,
                index: index,
            }));

            if (!claimsData || claimsData.length === 0) {
                console.warn("No claims data found in the request response.");
                return;
            }

            console.log("Extracted claims data:", claimsData);

            // Access the Wized variable
            let selectedPatents = Wized.data.v.home_orderForm_priorArtPreview_selectedPatents;

            // Ensure the variable is an array
            if (!Array.isArray(selectedPatents)) {
                console.warn("home_orderForm_priorArtPreview_selectedPatents is not an array. Initializing it as an array.");
                selectedPatents = [];
            }

            // Add unique items to the array
            claimsData.forEach((claim) => {
                const exists = selectedPatents.some((patent) => patent.uniqueID === claim.uniqueID);
                if (!exists) {
                    console.log("Adding unique claim to the array:", claim);
                    selectedPatents.push(claim);
                } else {
                    console.warn("Duplicate claim detected. Skipping claim with uniqueID:", claim.uniqueID);
                }
            });

            // Update the Wized variable
            Wized.data.v.home_orderForm_priorArtPreview_selectedPatents = selectedPatents;

            console.log("Updated home_orderForm_priorArtPreview_selectedPatents variable:", selectedPatents);
        } catch (error) {
            console.error("Error while processing data from searchByPatentNumber3 request:", error);
        }
    };

    /**
     * Listen for the execution of the searchByPatentNumber3 request.
     */
    Wized.on("request", (event) => {
        if (event.name === "searchByPatentNumber3") {
            console.log("Detected execution of searchByPatentNumber3 request:", event);
            if (event.data && event.data.claims) {
                updateSelectedPatents(event);
            } else {
                console.error("searchByPatentNumber3 request did not return expected data structure.");
            }
        }
    });

    console.log("Listener for searchByPatentNumber3 request has been set up.");
});
