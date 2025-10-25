// src/config.ts

export const TARGET_URL = "https://example.com";

export const injectedJavaScript = `
  (function() {
    // Your custom JavaScript code goes here
    // For example, changing the background color
    document.body.style.backgroundColor = 'lightblue';
    alert("Custom script injected!");
  })();
`;
