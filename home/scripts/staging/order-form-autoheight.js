const checkAndSetHeight = () => {
    const orderFormElement = document.querySelector('[wized="home_orderForm_form"]');
    
    if (orderFormElement) {
        // Set the initial height to 500px
        orderFormElement.style.height = "500px";
        
        // After 1.5 seconds, set the height to auto
        setTimeout(() => {
            orderFormElement.style.height = "auto";
        }, 1500);
    } else {
        // Retry after a short delay if the element is not found
        setTimeout(checkAndSetHeight, 100); // Adjust delay if needed
    }
};

// Start the check
checkAndSetHeight();

