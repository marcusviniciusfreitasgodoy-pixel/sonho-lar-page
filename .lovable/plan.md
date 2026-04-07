

## Plan: Add Google Tag Manager + Google Analytics (GA4)

### What will be done
Add both Google Tag Manager (GTM) and Google Analytics GA4 (ID: `G-2ZS12MZVQ1`) to the site. GTM will serve as a centralized tag management system, and GA4 will track pageviews and events directly.

### Technical Changes

**File: `index.html`**

1. Add **GA4 script** in `<head>` (before the Meta Pixel):
   - `gtag.js` async script with measurement ID `G-2ZS12MZVQ1`
   - `gtag('config', 'G-2ZS12MZVQ1')` initialization

2. Add **GTM script** in `<head>` (before GA4):
   - Standard GTM container snippet
   - Will need user's GTM Container ID (format: `GTM-XXXXXXX`)

3. Add **GTM `<noscript>` iframe** in `<body>` (after existing Meta Pixel noscript)

### Question needed
GTM requires a Container ID (e.g., `GTM-XXXXXXX`). GA4 is ready to go, but I'll need this GTM ID to complete the setup.

