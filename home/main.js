
// Check the origin and decide which script to load
const origin = window.location.origin;

if (origin.includes("webflow.io")) {
  // Load the staging script
  loadDynamicScript("home/staging.js", () => {
    console.log("Loaded staging script");
  });
} else {
  // Load the production script
  loadDynamicScript("home/production.js", () => {
    console.log("Loaded production script");
  });
}
