// Function to dynamically load a JavaScript file
function loadDynamicScript(src, callback, isModule = false) {
  const script = document.createElement("script");
  script.src = src;

  // Treat the script as a module if needed
  if (isModule) {
    script.type = "module";
  }

  script.onload = callback || (() => console.log(`Script loaded: ${src}`));
  script.onerror = () => console.error(`Failed to load script: ${src}`);
  document.head.appendChild(script);
}

// Dynamically decide which script to load
const origin = window.location.hostname;
const baseURL = `https://html-starter-ecru-phi.vercel.app/home/`;

if (origin.includes("webflow.io")) {
  // Load staging script as a module
  loadDynamicScript(`${baseURL}staging.js`, () => {
    console.log("Loaded staging script");
  }, true);
} else {
  // Load production script as a module
  loadDynamicScript(`${baseURL}production.js`, () => {
    console.log("Loaded production script");
  }, true);
}
