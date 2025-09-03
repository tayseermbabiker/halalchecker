# HalalChecker - Halal Ingredient Scanner

A mobile-first Progressive Web App that helps Muslims identify halal, suspicious, and haram ingredients using AI-powered image analysis and manual input.

## Features

### Core Functionality
- **Photo Scanning** - Upload ingredient lists and get AI analysis using OpenAI GPT-4 Vision
- **Manual Input** - Type ingredients manually for analysis
- **Bilingual Support** - Full Arabic/English interface with RTL support
- **Color-coded Results** - Green (Halal), Yellow (Suspicious), Red (Haram)
- **Mobile-First Design** - Optimized for smartphones with PWA capabilities

### Smart Features
- **AI-Powered Analysis** - Uses OpenAI GPT-4 Vision to read ingredient lists in English and Arabic
- **Local Caching** - Common ingredients cached locally to reduce API costs
- **Scan History** - Stores last 10 scans locally (no signup required)
- **Offline Support** - Works offline for previously analyzed ingredients

### Community & Business Features
- **Share Results** - Easy sharing to WhatsApp groups and social media
- **Halal Store Finder** - Links to nearby halal stores and alternatives
- **Business Tools** - Premium features for restaurants and food businesses
- **Affiliate Integration** - Amazon and halal store affiliate links

### Freemium Model
- **Free Tier** - 5 scans per day
- **Premium** - Unlimited scans + business features ($4.99/month)
- **Daily Reset** - Free scan counter resets every day

## Getting Started

### Prerequisites
- A web browser (Chrome, Safari, Firefox, Edge)
- OpenAI API key (for image analysis)
- Web server (for local development) or hosting platform

### Setup Instructions

1. **Download the files**
   - All files should be in your project directory:
     - `index.html` (main app file)
     - `manifest.json` (PWA configuration)
     - `sw.js` (service worker)
     - `README.md` (this file)

2. **Get an OpenAI API Key**
   - Go to [OpenAI API](https://platform.openai.com/api-keys)
   - Create a new API key
   - Replace `'your-openai-api-key'` in `index.html` with your actual key

3. **Create App Icons**
   Create PNG icons in these sizes and save them in your project folder:
   - `icon-72.png` (72x72 pixels)
   - `icon-96.png` (96x96 pixels)
   - `icon-128.png` (128x128 pixels)
   - `icon-144.png` (144x144 pixels)
   - `icon-152.png` (152x152 pixels)
   - `icon-192.png` (192x192 pixels)
   - `icon-384.png` (384x384 pixels)
   - `icon-512.png` (512x512 pixels)

   **Icon Design Suggestions:**
   - Use a mosque symbol or Islamic design
   - Use green color scheme (#2E7D32)
   - Make sure they're square and clear at small sizes

4. **Local Development**
   Option A - Python:
   ```bash
   cd "C:\Users\LENOVO\Desktop\New folder\Projects\Halal-WebApp"
   python -m http.server 8000
   ```
   Then open: http://localhost:8000

   Option B - Live Server (VS Code):
   - Install "Live Server" extension
   - Right-click `index.html` → "Open with Live Server"

5. **Deploy to Web**
   
   **Netlify (Recommended):**
   - Drag and drop your project folder to [netlify.com](https://netlify.com)
   - Your app will be live with a custom URL
   - Enable HTTPS automatically

   **Vercel:**
   - Upload to [vercel.com](https://vercel.com)
   - Connect to GitHub for automatic deployments

   **GitHub Pages:**
   - Upload files to a GitHub repository
   - Enable GitHub Pages in repository settings

## 🔧 Configuration

### OpenAI API Setup
In `index.html`, find these lines and replace with your API key:

```javascript
const OPENAI_API_KEY = 'your-openai-api-key'; // Replace with your actual key
```

**Important Security Note:**
For production, move the API key to your backend server to keep it secure. The current setup is for development/testing only.

### Customization Options

1. **Change Colors** (in CSS variables):
```css
:root {
    --primary-green: #2E7D32;    /* Main green color */
    --secondary-green: #4CAF50;   /* Lighter green */
    --background: #FAFAFA;        /* Background color */
}
```

2. **Modify Free Scan Limit**:
```javascript
let maxFreeScans = 5; // Change to any number
```

3. **Add More Cached Ingredients**:
Add to the `ingredientDatabase` object in `index.html`

## 📱 PWA Installation

Users can install your app like a native mobile app:

1. **Android (Chrome):**
   - Visit your app URL
   - Tap "Add to Home Screen" in browser menu
   - Or use the in-app install prompt

2. **iOS (Safari):**
   - Visit your app URL
   - Tap Share button → "Add to Home Screen"

3. **Desktop:**
   - Visit your app URL in Chrome
   - Click install button in address bar

## Technical Architecture

### Frontend
- **Vanilla JavaScript** - No frameworks, fast loading
- **CSS Grid/Flexbox** - Responsive mobile-first design
- **Progressive Web App** - Installable, works offline
- **Local Storage** - Caches data, no database needed

### AI Integration
- **OpenAI GPT-4 Vision** - Reads ingredient lists from photos
- **Smart Caching** - Common ingredients cached locally
- **Batch Processing** - Multiple ingredients analyzed together
- **Fallback Logic** - Works when API is unavailable

### Performance Optimization
- **Service Worker** - Caches resources, works offline
- **Local Database** - Reduces API calls for common ingredients
- **Image Compression** - Optimizes photos before sending to API
- **Lazy Loading** - Loads content as needed

## Monetization Features

### Built-in Revenue Streams
1. **Premium Subscriptions** - Unlimited scans + business features
2. **Affiliate Links** - Amazon and halal store partnerships
3. **Business Accounts** - Restaurant and food company tools
4. **Advertising** - Space reserved for halal product ads

### Payment Integration (To Add)
- Stripe for credit card payments
- PayPal for international users
- Apple Pay / Google Pay for mobile

## Internationalization

- **Arabic Interface** - Complete RTL (right-to-left) support
- **English Interface** - Default language
- **Easy Translation** - All text in translation object
- **Cultural Adaptation** - Islamic design elements and colors

## Security & Privacy

- **No User Accounts** - Works without registration
- **Local Storage** - Data stays on user's device
- **HTTPS Required** - Secure connections only
- **No Tracking** - Privacy-focused design

## Analytics (Future)

Recommended analytics to add:
- Scan success rates
- Most searched ingredients
- User retention metrics
- Geographic usage data
- Premium conversion rates

## Troubleshooting

### Common Issues

1. **API Key Errors**
   - Make sure your OpenAI API key is correct
   - Check API usage limits and billing

2. **Icons Not Loading**
   - Ensure all icon files are created and named correctly
   - Use PNG format, square dimensions

3. **Camera Not Working**
   - HTTPS is required for camera access
   - Check browser permissions

4. **App Not Installing**
   - Ensure `manifest.json` is correctly configured
   - Test on different browsers/devices

## Future Enhancements

### Priority Features
- [ ] Backend API for secure OpenAI key storage
- [ ] Payment processing integration
- [ ] Push notifications for new features
- [ ] Barcode scanning for packaged products
- [ ] Community rating system

### Advanced Features
- [ ] Machine learning for local ingredient recognition
- [ ] Voice input in Arabic and English
- [ ] Integration with grocery delivery apps
- [ ] Restaurant menu scanning
- [ ] Halal certification verification

## Contributing

To improve the app:
1. Fork the repository
2. Make your changes
3. Test thoroughly on mobile devices
4. Submit a pull request

## License

This project is open source. Use it to help the Muslim community identify halal ingredients.

## Acknowledgments

- OpenAI for GPT-4 Vision API
- Islamic scholars for halal ingredient guidance
- Muslim community for feedback and support

---

**HalalChecker - Supporting your halal lifestyle choices**

For questions or support, create an issue in this repository.