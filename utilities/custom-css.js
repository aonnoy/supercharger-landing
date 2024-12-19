// Function to inject custom CSS
function addCustomStyles(css) {
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);
}
