const fs = require('fs');

// Get API key from environment variable
const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
    console.error('ERROR: OPENAI_API_KEY environment variable not set');
    process.exit(1);
}

// Create config.js with the API key
const configContent = `window.HALALDETECT_CONFIG = { apiKey: "${apiKey}" };`;

// Write to config.js
fs.writeFileSync('config.js', configContent);
console.log('Config file generated successfully');