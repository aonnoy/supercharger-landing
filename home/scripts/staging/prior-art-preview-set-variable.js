window.Wized = window.Wized || [];
window.Wized.push((Wized) => {
    /**
     * Function to update the Wized variable with new data from the request.
     */
    const updateSelectedPatents = async () => {
        try {
            console.log("Executing searchByPatentNumber3 request...");
            
            // Execute the request and fetch the result
            const result = await Wized.requests.execute("searchByPatentNumber3");

            if (!result.ok) {
                console.error("Request searchByPatentNumber3 failed with status:", result.status);
                return;
            }

            console.log("Request searchByPatentNumber3 succeeded:", result);

            // Extract claims data using the specific path
            const claimsData = result.data?.claims?.map((claim, index) => ({
                uniqueID: claim.uniqueID,
                index: index
            }));

            if (!claimsData || claimsData.length === 0) {
                console.log("No claims data found in the request response.");
                return;
            }

            console.log("Extracted claims data:", claimsData);

            // Access the target Wized variable
            let selectedPatents = Wized.data.v.home_orderForm_priorArtPreview_selectedPatents;

            // Ensure it's an array
            if (!Array.isArray(selectedPatents)) {
                console.warn("home_orderForm_priorArtPreview_selectedPatents is not an array. Converting it to an array.");
                selectedPatents = [];
            }

            // Add unique items to the array
            claimsData.forEach((claim) => {
                const exists = selectedPatents.some((patent) => patent.uniqueID === claim.uniqueID);
                if (!exists) {
                    console.log("Adding new unique claim to the array:", claim);
                    selectedPatents.push(claim);
                } else {
                    console.warn("Duplicate claim detected. Skipping claim with uniqueID:", claim.uniqueID);
                }
            });

            // Update the Wized variable
            Wized.data.v.home_orderForm_priorArtPreview_selectedPatents = selectedPatents;

            console.log("Updated home_orderForm_priorArtPreview_selectedPatents variable:", selectedPatents);
        } catch (error) {
            console.error("Unexpected error during searchByPatentNumber3 processing:", error);
        }
    };

    /**
     * Listen for the execution of the searchByPatentNumber3 request and trigger the update function.
     */
    Wized.on("request", (event) => {
        if (event.name === "searchByPatentNumber3") {
            console.log("Detected searchByPatentNumber3 request execution.");
            updateSelectedPatents();
        }
    });
});
