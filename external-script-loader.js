/**
 * Dynamically load a CSS file
 * @param {string} href - The URL of the CSS file
 * @param {function} [callback] - Optional callback to execute after loading
 */


export function loadStylesheet(href, callback) {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = href;
  link.onload = callback || (() => console.log(`Stylesheet loaded: ${href}`));
  link.onerror = () => console.error(`Failed to load stylesheet: ${href}`);
  document.head.appendChild(link);
}

/**
 * Dynamically load a JavaScript file
 * @param {string} src - The URL of the JavaScript file
 * @param {function} [callback] - Optional callback to execute after loading
 */
export function loadScript(src, callback) {
  const script = document.createElement("script");
  script.src = src;
  script.onload = callback || (() => console.log(`Script loaded: ${src}`));
  script.onerror = () => console.error(`Failed to load script: ${src}`);
  document.head.appendChild(script);
}
