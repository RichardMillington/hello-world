<?php
/**
 * Template Name: Platform Comparison Tool
 * Description: FeverBee Community Platform Comparison Tool
 *
 * INSTALLATION:
 * 1. Copy this file to your active WordPress theme folder
 * 2. Copy these folders/files to your theme directory:
 *    - css/styles.css
 *    - js/app.js
 *    - js/ai.js
 *    - data/platforms.js
 *    - index.html
 * 3. Create a new Page in WordPress
 * 4. Set slug to "compare"
 * 5. In Page Attributes, select "Platform Comparison Tool"
 * 6. Publish (leave content editor empty)
 *
 * Page appears at: feverbee.com/compare
 */

get_header();

$theme_uri = get_template_directory_uri();
$tool_dir = get_template_directory();
?>

<!-- Fonts & Libraries -->
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="<?php echo esc_url($theme_uri); ?>/css/styles.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"></script>
<script>pdfjsLib.GlobalWorkerOptions.workerSrc='https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';</script>

<?php
// Load the HTML body from index.html
$index_file = $tool_dir . '/index.html';

if (file_exists($index_file)) {
    $html = file_get_contents($index_file);
    // Extract body content (between <body> and the script tags at the end)
    if (preg_match('/<body>(.*?)<script src="data\//s', $html, $match)) {
        echo $match[1];
    }
} else {
    echo '<div style="max-width:800px;margin:40px auto;padding:40px;text-align:center;font-family:Montserrat,sans-serif;">';
    echo '<h2 style="color:#fff;">Platform Comparison Tool</h2>';
    echo '<p style="color:#888;">Tool files not found. Upload index.html and the css/, js/, data/ folders to: <code>' . esc_html($tool_dir) . '</code></p>';
    echo '</div>';
}
?>

<!-- Tool scripts -->
<script src="<?php echo esc_url($theme_uri); ?>/data/platforms.js"></script>
<script src="<?php echo esc_url($theme_uri); ?>/js/app.js"></script>
<script src="<?php echo esc_url($theme_uri); ?>/js/ai.js"></script>

<?php get_footer(); ?>
