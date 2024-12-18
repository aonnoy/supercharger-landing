// Function to dynamically load a JavaScript file
function loadDynamicScript(src, callback) {
  const script = document.createElement("script");
  script.src = src;
  script.onload = callback || (() => console.log(`Script loaded: ${src}`));
  script.onerror = () => console.error(`Failed to load script: ${src}`);
  document.head.appendChild(script);
}


// Check the origin and decide which script to load
const origin = window.location.origin;

if (origin.includes("webflow.io")) {
  // Load the staging script
loadDynamicScript("/home/staging.js", () => {
  console.log("Loaded staging script");
});
} else {
  // Load the production script
loadDynamicScript("/home/production.js", () => {
  console.log("Loaded production script");
});
}
