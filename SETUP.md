# Quick Setup Guide for HalalChecker

## Step 1: Get Your OpenAI API Key

1. Go to https://platform.openai.com/api-keys
2. Sign up or log in
3. Click "Create new secret key"
4. Copy the key (it starts with "sk-")
5. Save it somewhere safe

## Step 2: Add Your API Key

1. Open the `index.html` file in a text editor
2. Find this line (around line 1200):
   ```javascript
   const OPENAI_API_KEY = 'your-openai-api-key';
   ```
3. Replace `'your-openai-api-key'` with your actual API key:
   ```javascript
   const OPENAI_API_KEY = 'sk-your-actual-key-here';
   ```
4. Save the file

## Step 3: Create App Icons

You need to create PNG icon files. You can:

**Option A: Use an online icon generator**
1. Go to https://favicon.io/favicon-generator/
2. Create an icon with mosque or halal theme
3. Download and rename files to match these names:
   - `icon-72.png`, `icon-96.png`, `icon-128.png`, `icon-144.png`
   - `icon-152.png`, `icon-192.png`, `icon-384.png`, `icon-512.png`

**Option B: Use simple colored squares (temporary)**
1. Create simple green square PNG files
2. Use any image editor or online tool
3. Make them in the sizes listed above

## Step 4: Test Locally

**If you have Python installed:**
```bash
cd "C:\Users\LENOVO\Desktop\New folder\Projects\Halal-WebApp"
python -m http.server 8000
```
Then open: http://localhost:8000

**If you have Node.js:**
```bash
npx http-server
```

**Or use any local web server**

## Step 5: Deploy Online

**Easiest option - Netlify:**
1. Go to https://netlify.com
2. Drag your project folder to the deploy area
3. Your app is now live!

**Alternative - Vercel:**
1. Go to https://vercel.com
2. Upload your project
3. Deploy with one click

## Step 6: Test Your App

1. Open your app URL
2. Try the "Manual Input" first (it's easier to test)
3. Type: "water, salt, pork"
4. Click "Analyze Ingredients"
5. You should see colored results

## Important Security Note

The current setup puts your API key in the front-end code. This is only for testing!

For production, you need to:
1. Create a backend server
2. Move the OpenAI API calls to your server
3. Keep your API key secret on the server

## Troubleshooting

**"API key error"**
- Check that your API key is correct
- Make sure you have billing set up with OpenAI

**"Icons not loading"**
- Create the icon files with exact names
- Make sure they're in the same folder as index.html

**"Camera not working"**
- You need HTTPS for camera access
- Deploy to Netlify/Vercel for automatic HTTPS

**"App won't install"**
- Test on mobile browsers first
- Make sure all icon files exist

## Next Steps

1. Test thoroughly on mobile devices
2. Add more ingredients to the local database
3. Set up secure backend for production
4. Add payment processing for premium features
5. Customize colors and branding

## File Structure

Your project should look like this:
```
Halal-WebApp/
├── index.html          (main app file)
├── manifest.json       (PWA settings)
├── sw.js              (service worker)
├── README.md          (full documentation)
├── SETUP.md           (this file)
├── icon-72.png        (app icons)
├── icon-96.png
├── icon-128.png
├── icon-144.png
├── icon-152.png
├── icon-192.png
├── icon-384.png
└── icon-512.png
```

## Support

If you have issues:
1. Check the browser console for errors (F12)
2. Verify all files are in the right place
3. Test your OpenAI API key separately
4. Make sure you have internet connection

The app works best on mobile devices with modern browsers (Chrome, Safari, Edge, Firefox).