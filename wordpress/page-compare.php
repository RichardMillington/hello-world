<?php
/**
 * Template Name: Platform Comparison Tool
 * Description: FeverBee Community Platform Comparison Tool
 * 
 * INSTALLATION:
 * 1. Copy this file to your active WordPress theme folder
 * 2. Create a new Page in WordPress
 * 3. Set the slug to "compare" 
 * 4. In Page Attributes, select "Platform Comparison Tool" as the template
 * 5. Publish (leave the content editor empty)
 * 
 * The page will appear at: feverbee.com/compare
 */

get_header(); ?>

<!-- Load external libraries -->
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"></script>
<script>pdfjsLib.GlobalWorkerOptions.workerSrc='https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';</script>

<?php
/**
 * Load the tool's CSS and HTML from the standalone index.html
 * 
 * We extract everything between <style> and </style> for CSS,
 * everything between <body> (specifically from <header>) to </body> for HTML,
 * and everything between <script> (main app) and </script> for JS.
 * 
 * For maintainability: when you update index.html, re-copy this file 
 * or update the sections below.
 */
?>

<!-- 
  IMPORTANT: The content below is auto-generated from index.html
  To update: copy the latest CSS, HTML body, and JS from index.html
  into the corresponding sections below.
  
  Alternatively, you can load the standalone index.html in an iframe:
  <iframe src="/wp-content/themes/your-theme/assets/compare/index.html" 
          style="width:100%;min-height:100vh;border:none;"></iframe>
-->

<div id="fb-compare-tool">
<?php 
  // Include the standalone file directly
  // This is the simplest approach - just include the full HTML
  // The WordPress header/footer wrap around it
  
  // Option A: Include the file directly (recommended)
  // Place index.html in your theme's assets/compare/ folder
  $tool_file = get_template_directory() . '/assets/compare/index.html';
  if (file_exists($tool_file)) {
    $html = file_get_contents($tool_file);
    // Strip the <!DOCTYPE>, <html>, <head>, and <body> tags - WordPress provides those
    // Extract just the <style> block, body content, and <script> block
    
    // Get the style block
    if (preg_match('/<style>(.*?)<\/style>/s', $html, $style_match)) {
      echo '<style>' . $style_match[1] . '</style>';
    }
    
    // Get everything from <header> to the closing </footer> tag 
    if (preg_match('/<header>(.*?)<\/footer>/s', $html, $body_match)) {
      // Also get the pathway cards and other elements before <header> that are in <body>
      echo '<header>' . $body_match[1] . '</footer>';
    }
    
    // Get elements between </footer> and <script> (compare-bar, back-to-top)
    if (preg_match('/<\/footer>(.*?)<script>/s', $html, $between_match)) {
      echo $between_match[1];
    }
    
    // Get the main script block (the last/largest one)
    if (preg_match_all('/<script>(.*?)<\/script>/s', $html, $script_matches)) {
      // The main app script is the largest one
      $scripts = $script_matches[1];
      $main_script = '';
      foreach ($scripts as $s) {
        if (strlen($s) > strlen($main_script)) {
          $main_script = $s;
        }
      }
      echo '<script>' . $main_script . '</script>';
    }
    
  } else {
    // Fallback: show instructions if file not found
    echo '<div style="max-width:800px;margin:40px auto;padding:40px;text-align:center;font-family:Montserrat,sans-serif;">';
    echo '<h2>Platform Comparison Tool</h2>';
    echo '<p style="color:#888;margin-top:10px;">Tool not found. Please upload <code>index.html</code> to:<br><code>' . esc_html($tool_file) . '</code></p>';
    echo '</div>';
  }
?>
</div>

<?php get_footer(); ?>
