document.addEventListener("DOMContentLoaded", () => {
    // Select the element with the attribute wized=home_orderForm_form
    const orderFormElement = document.querySelector('[wized="home_orderForm_form"]');
    
    if (orderFormElement) {
        // Set the initial height to 500px
        orderFormElement.style.height = "500px";

        // After 1.5 seconds, set the height to auto
        setTimeout(() => {
            orderFormElement.style.height = "auto";
        }, 1500);
    } else {
        console.warn('Element with attribute wized=home_orderForm_form not found.');
    }
});
