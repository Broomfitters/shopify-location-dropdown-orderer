# Shopify Location Dropdown Orderer

A Chrome extension that automatically reorders the location dropdown in Shopify admin to show your actual store locations before app-based fulfillment locations.

## Problem

By default, Shopify displays all locations in the order they were added, which means app-based fulfillment locations (like Printful, Printify, etc.) often appear before your actual store locations. This makes it inconvenient to quickly select your physical store locations.

## Solution

This extension automatically reorders the location dropdown to display:
1. "All locations" (always first)
2. Your actual store locations (e.g., "Broomfitters / Brooklyn", "Broomfitters / Twin Cities")
3. App-based fulfillment locations (sorted last)

## Installation

### Step 1: Generate Icons (Optional)

Icons are optional but recommended for a better visual experience.

1. Open `generate-icons.html` in your web browser
2. Click the "Generate Icons" button
3. Right-click each canvas image and save as:
   - `icon16.png`
   - `icon48.png`
   - `icon128.png`
4. Save all three PNG files in the extension folder

### Step 2: Load the Extension in Chrome

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" (toggle in the top-right corner)
3. Click "Load unpacked"
4. Select the folder containing this extension
5. The extension should now appear in your extensions list

### Step 3: Use in Shopify Admin

1. Navigate to your Shopify admin panel (e.g., `https://admin.shopify.com/store/your-store/orders`)
2. Click on any location dropdown (e.g., in the Orders page)
3. The dropdown will automatically reorder to show your store locations first!

## How It Works

The extension uses a MutationObserver to detect when the Shopify location dropdown appears in the DOM. When detected, it:

1. Identifies which locations are apps (by looking for the "App" badge)
2. Separates actual store locations from app locations
3. Reorders the list to prioritize store locations
4. Maintains the "All locations" option at the top

## Files

- `manifest.json` - Extension configuration
- `content.js` - Main script that reorders the dropdown
- `generate-icons.html` - Tool to generate extension icons
- `icon.svg` - SVG source for the extension icon
- `README.md` - This file

## Browser Compatibility

- Chrome (Manifest V3)
- Edge (Chromium-based)
- Other Chromium-based browsers

## Privacy

This extension:
- Does NOT collect any data
- Does NOT make any network requests
- Only modifies the visual order of elements in the Shopify admin interface
- Runs entirely locally in your browser

## Development

To modify the extension:

1. Edit `content.js` to change the reordering logic
2. Update `manifest.json` if you need to change permissions or URLs
3. Reload the extension in `chrome://extensions/` to see your changes

## Troubleshooting

**The dropdown is not reordering:**
- Make sure the extension is enabled in `chrome://extensions/`
- Check that you're on a Shopify admin page that matches the URL patterns in `manifest.json`
- Open the browser console (F12) and look for messages starting with "Shopify Location Dropdown Orderer"

**The extension icon is not showing:**
- Generate the icon PNG files using `generate-icons.html`
- Reload the extension in `chrome://extensions/`

## License

MIT License - Feel free to modify and distribute as needed.

## Contributing

Found a bug or have a suggestion? Feel free to open an issue or submit a pull request!
