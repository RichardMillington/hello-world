# Installing the Community Platform Comparison Tool on WordPress

## What You're Doing
Embedding the FeverBee comparison tool as a native page on feverbee.com so it looks like part of the site (same header, footer, navigation).

## Prerequisites
- WordPress admin access to feverbee.com
- Ability to edit theme files OR a plugin that allows custom page templates
- FTP/SFTP access OR access to the WordPress theme editor

---

## Method A: Using a Custom Page Template (Recommended)

### Step 1: Create the page template file

1. Connect to your WordPress site via FTP/SFTP
2. Navigate to your active theme folder: `wp-content/themes/your-theme-name/`
3. Create a new file called `page-compare.php`
4. Paste this content:

```php
<?php
/**
 * Template Name: Platform Comparison Tool
 */
get_header(); ?>

<div id="feverbee-compare-tool" style="max-width: 1200px; margin: 0 auto; padding: 20px;">
    <!-- The tool CSS and JS will be loaded here -->
</div>

<?php get_footer(); ?>
```

### Step 2: Upload the tool assets

1. In your theme folder, create a subfolder: `assets/compare/`
2. Split the `index.html` file into three files:
   - Copy everything between `<style>` and `</style>` into `compare-tool.css`
   - Copy everything between `<script>` (the main app script, not the library imports) and `</script>` into `compare-tool.js`
   - The HTML body content goes into the page template

**OR (easier):** Use Method B below which doesn't require splitting files.

### Step 3: Create the WordPress page

1. In WordPress Admin, go to Pages > Add New
2. Title: "Community Platform Comparison Tool" (or whatever you want)
3. Set the URL slug to: `compare`
4. In the Page Attributes panel (right sidebar), select "Platform Comparison Tool" as the template
5. Publish the page

Your tool will now be at: `feverbee.com/compare`

---

## Method B: Using a Shortcode Plugin (Easier, No FTP Needed)

### Step 1: Install a shortcode plugin

Install and activate one of these plugins:
- **"Insert Headers and Footers"** by WPCode (free)
- **"Custom CSS & JS"** by suspended (free)
- **"WPCode"** (free)

### Step 2: Add the scripts

Using WPCode or similar:
1. Go to WPCode > Add Snippet
2. Add a new **HTML Snippet**
3. Paste the contents of `compare-embed.html` (the WordPress-ready version - see below)
4. Set it to load on: "Specific Pages" and choose your comparison page
5. Set location: "Body" 
6. Save and activate

### Step 3: Create the page

1. Create a new page with slug `compare`
2. In the page editor, add this shortcode or HTML block:
```html
<div id="feverbee-compare-root"></div>
```
3. Publish

---

## Method C: iframe Embed (Simplest, 2 Minutes)

If the above methods are too complex, you can embed the tool in an iframe:

1. First, enable GitHub Pages:
   - Go to the GitHub repo Settings > Pages
   - Set source to the `claude/community-platforms-comparison-38G0H` branch
   - Save

2. Create a new WordPress page with slug `compare`

3. Add a Custom HTML block with:
```html
<div style="margin: -20px -20px 0; padding: 0;">
  <iframe 
    src="https://richardmillington.github.io/hello-world/" 
    style="width:100%;min-height:100vh;border:none;display:block;" 
    title="Community Platform Comparison Tool"
    loading="lazy">
  </iframe>
</div>
```

4. Publish

---

## Method D: Full Page Template with Inline Everything (Most Reliable)

This method puts everything in one WordPress page template file. No external dependencies except Google Fonts and PDF.js CDN.

### Step 1: Create `page-compare.php` in your theme folder

Copy the file `wordpress/page-compare.php` from this repository into your active theme's root folder.

### Step 2: Create the WordPress page

1. Pages > Add New
2. Title: "Compare Community Platforms" 
3. Slug: `compare`
4. Template: "Platform Comparison Tool" (in Page Attributes)
5. Leave the content editor empty
6. Publish

### Step 3: Add to navigation

1. Go to Appearance > Menus
2. Add the "Compare Community Platforms" page to your main navigation
3. Save

---

## After Installation

### To update the tool:
- Edit the page template file or the WPCode snippet
- The tool is self-contained — all data is in the JavaScript

### To update platform data:
- Find the `const platforms = [...]` array in the JavaScript
- Edit scores, editorial content, news, etc.
- Save the file

### To enable the AI recommendation feature:
1. Deploy the Cloudflare Worker from `api/worker.js`
2. Set your Anthropic API key: `wrangler secret put ANTHROPIC_API_KEY`
3. Update `AI_PROXY_URL` in the tool's JavaScript to your worker URL

### Styling adjustments:
The tool uses its own CSS variables. If it clashes with your WordPress theme:
- Wrap all the tool's CSS in `#feverbee-compare-tool { ... }` to scope it
- Adjust the `--bg` variable to match your site's background
- The tool's header/footer are already removed — your WordPress theme provides those

---

## Files in This Repository

| File | Purpose |
|------|---------|
| `index.html` | Standalone version of the tool |
| `wordpress/page-compare.php` | WordPress page template (Method D) |
| `api/worker.js` | Cloudflare Worker for AI proxy |
| `api/wrangler.toml` | Worker deployment config |
| `WORDPRESS-INSTALL.md` | This file |
