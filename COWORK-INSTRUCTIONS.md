# Instructions for Claude Cowork

## Context
This repository contains a FeverBee Community Platform Comparison Tool — currently a single 2,200+ line `index.html` file containing all CSS, HTML, JavaScript, and platform data inline. It works but is fragile and hard to maintain.

The tool compares 14 enterprise community platforms with scoring, interactive differentiators, AI-powered recommendations, side-by-side comparison, and individual platform profiles.

## Task 1: Split the monolith into separate files

Split `index.html` into a clean multi-file structure. The tool must work identically after splitting — no functionality changes, just file organisation.

### Target structure:
```
/
├── index.html              # Thin HTML shell (~100 lines)
├── css/
│   └── styles.css          # All CSS extracted from the <style> block
├── js/
│   ├── app.js              # All rendering, navigation, and UI logic
│   └── ai.js               # AI recommendation engine (file upload, API calls, results rendering)
├── data/
│   └── platforms.json      # All platform data as structured JSON
├── wordpress/
│   └── page-compare.php    # WordPress page template (already exists, update for new structure)
├── api/
│   ├── worker.js           # Cloudflare Worker for AI proxy (already exists)
│   └── wrangler.toml       # Worker config (already exists)
├── WORDPRESS-INSTALL.md    # Installation instructions (already exists, update for new structure)
└── README.md               # Project overview and setup instructions
```

### How to split:

**index.html** should become a thin shell:
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Community Platform Comparison Tool | FeverBee</title>
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/styles.css">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"></script>
  <script>pdfjsLib.GlobalWorkerOptions.workerSrc='https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';</script>
</head>
<body>
  <!-- All the HTML body content from <header> through </footer> and the compare-bar, back-to-top -->
  
  <script src="js/app.js"></script>
  <script src="js/ai.js"></script>
</body>
</html>
```

**css/styles.css**: Extract everything between `<style>` and `</style>` (lines ~11-467).

**data/platforms.json**: Extract the `platforms` array (lines ~653-1212), the `criteria` array, `tableStakes` array, `differentiators` array, and `weightHints` object into a JSON file:
```json
{
  "platforms": [...],
  "criteria": [...],
  "tableStakes": [...],
  "differentiators": [...],
  "weightHints": {...}
}
```

**js/app.js**: All the rendering and interaction JavaScript. At the top, load the data:
```javascript
let platforms, criteria, tableStakes, differentiators, weightHints;

fetch('data/platforms.json')
  .then(r => r.json())
  .then(data => {
    platforms = data.platforms;
    criteria = data.criteria;
    tableStakes = data.tableStakes;
    differentiators = data.differentiators;
    weightHints = data.weightHints;
    // Initialize the app
    renderPills();
    renderWeights();
    renderOverview();
    renderQuickPicks();
    updateCompareBar();
  });
```

**js/ai.js**: Extract the AI recommendation engine code (file upload handlers, `runAiAnalysis`, `buildPlatformSummary`, `renderAiResults`, `applyAiWeights`, `generateLocalSummary`, `generateAiSummary`, the `AI_PROXY_URL` constant, and the dropzone event listeners).

### Important:
- The `AI_PROXY_URL` constant should be at the top of `ai.js` for easy configuration
- All event listeners that are set up in the init section should move into an `initApp()` function in `app.js`
- The dropzone event listeners should move to `ai.js` and be initialised after DOM ready
- Make sure `platforms` and other data variables are accessible to both `app.js` and `ai.js` (use window globals or a shared module pattern)
- Test that ALL features still work: pathway cards, browse platforms toggle, platform profiles, comparison table, differentiator preferences, AI recommendations, PDF export, back-to-top

## Task 2: Update the WordPress template

Update `wordpress/page-compare.php` to work with the split file structure. Instead of parsing one giant HTML file, it should:
1. Load `css/styles.css` via `wp_enqueue_style`
2. Include the HTML body content directly
3. Load `js/app.js` and `js/ai.js` via `wp_enqueue_script`
4. Load `data/platforms.json` — either inline it in a `<script>` tag or ensure the fetch path is correct relative to the WordPress theme

## Task 3: Create a README.md

Create a project README with:
- What the tool is
- How to run locally (just open index.html)
- How to deploy to GitHub Pages
- How to deploy the AI proxy (Cloudflare Worker)
- How to install on WordPress
- How to update platform data (edit platforms.json)
- File structure overview

## Task 4: Validate

After splitting, verify:
- Open `index.html` directly in a browser — everything should work
- All 14 platforms render in the grid
- Clicking a platform opens its profile
- The comparison table works with 2+ selected platforms
- The AI section loads (even if API key isn't configured, the UI should render)
- PDF export works
- The "Browse All 14 Platforms" button toggles the grid
- Pathway cards switch between tabs
- Weight sliders update scores in real time

## Branch
Work on branch: `claude/community-platforms-comparison-38G0H`
Commit and push when done.
