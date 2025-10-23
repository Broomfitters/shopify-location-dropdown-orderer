# Publishing to Chrome Web Store

## Prerequisites

1. **Chrome Web Store Developer Account**
   - Sign up at: https://chrome.google.com/webstore/devconsole/
   - One-time fee: $5 USD
   - Uses your Google account

## Required Assets

### Extension Files (Already Ready!)
- ✅ `manifest.json`
- ✅ `content.js`
- ✅ `icon16.png`, `icon48.png`, `icon128.png`

### Store Listing Materials

#### Required
- [x] **Store Icon**: 128x128px (use `icon128.png`)
- [ ] **Screenshots**: At least 1, max 5 screenshots
  - Recommended size: 1280x800px or 640x400px
  - Can use the before/after images from `images/` folder
  - Consider creating a composite showing the extension in action

#### Recommended (Optional)
- [ ] **Small promotional tile**: 440x280px
- [ ] **Marquee promo tile**: 1400x560px (for featured placement)

### Store Listing Text

**Name** (max 75 characters):
```
Shopify Location Dropdown Orderer
```

**Summary** (max 132 characters):
```
Reorders Shopify location dropdown to show your stores first, then app locations - with a clean divider between them.
```

**Description** (max 16,000 characters):
```
## Organize Your Shopify Locations

Tired of scrolling through app-based fulfillment locations to find your actual stores? This extension automatically reorders the Shopify admin location dropdown to prioritize your physical store locations.

### What It Does

1. **Moves your stores to the top** - Your physical locations appear first
2. **Adds a visual divider** - Clean separation using Shopify's Polaris design system
3. **Groups apps at the bottom** - All app-based locations (Printful, Printify, Apliiq, etc.) appear after your stores

### Features

✓ Works on any Shopify store automatically
✓ No configuration needed
✓ Uses Polaris design tokens for native look and feel
✓ Zero data collection - runs entirely locally
✓ No external network requests
✓ Open source on GitHub

### How It Works

The extension detects Shopify's "App" badge to automatically identify app-based fulfillment locations, then reorders the dropdown to show:

1. "All locations" (always first)
2. Your actual store locations
3. Visual divider line
4. App-based fulfillment locations

### Privacy & Security

- No data collection
- No tracking or analytics
- No external network requests
- All processing happens locally in your browser
- Open source code available on GitHub

### Perfect For

- Shopify merchants with multiple physical store locations
- Stores using multiple fulfillment apps (Printful, Printify, etc.)
- Anyone who wants a cleaner, more organized location selector

---

Made with ❤️ for the Shopify community
```

**Category**: Shopping

**Language**: English (United States)

## Publishing Steps

### 1. Create Extension ZIP

**Files to include:**
```
manifest.json
content.js
icon16.png
icon48.png
icon128.png
```

**Do NOT include:**
- `.git/` directory
- `images/` directory
- `README.md`, `CHANGELOG.md`, `PUBLISHING.md`
- `generate-icons.html`, `icon.svg`
- `.gitignore`, `.DS_Store`

**Command to create ZIP:**
```bash
zip -r shopify-location-orderer-v1.0.0.zip manifest.json content.js icon16.png icon48.png icon128.png
```

### 2. Upload to Chrome Web Store

1. Go to [Developer Dashboard](https://chrome.google.com/webstore/devconsole/)
2. Click **"New Item"**
3. Upload the ZIP file
4. Fill out the store listing:
   - **Item name**: Shopify Location Dropdown Orderer
   - **Summary**: (see above)
   - **Description**: (see above)
   - **Category**: Shopping
   - **Language**: English
   - **Icon**: Upload `icon128.png`
   - **Screenshots**: Upload at least 1 screenshot
   - **Small tile**: (optional)
   - **Marquee**: (optional)

### 3. Privacy & Distribution Settings

- **Privacy practices**: No data collection
- **Permissions justification**: Content scripts run on Shopify admin pages only
- **Single purpose description**: Reorders Shopify location dropdown
- **Visibility**: Public
- **Regions**: All regions

### 4. Submit for Review

- Click **"Submit for review"**
- Review typically takes 1-3 business days
- You'll receive an email when reviewed

## After Publication

1. **Update README.md** with Chrome Web Store link
2. **Update CHANGELOG.md** with publication date
3. **Share on social media** (optional)
4. **Monitor reviews** in Developer Dashboard

## Future Updates

To update the extension:
1. Increment version in `manifest.json`
2. Create new ZIP file
3. Upload to existing item in Developer Dashboard
4. Submit for review

---

**Current Version**: 1.0.0
**Last Updated**: 2025-10-23
