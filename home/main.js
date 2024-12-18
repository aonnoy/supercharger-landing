function loadDynamicScript(src, callback) {
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

// Check the origin and load the appropriate script
const origin = window.location.origin;

if (origin.includes("webflow.io")) {
  // Load staging script
  loadDynamicScript("https://html-starter-ecru-phi.vercel.app/home/staging.js", () => {
    console.log("Loaded staging script");
  });
} else {
  // Load production script
  loadDynamicScript("https://html-starter-ecru-phi.vercel.app/home/production.js", () => {
    console.log("Loaded production script");
  });
}
