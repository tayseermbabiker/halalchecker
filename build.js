const fs = require('fs');

// Create config.js that loads API key from Netlify at runtime
const configContent = `window.HALALDETECT_CONFIG = { apiKey: window.netlifyApiKey || 'PLACEHOLDER_KEY' };`;

// Write to config.js
fs.writeFileSync('config.js', configContent);
console.log('Config file generated successfully');