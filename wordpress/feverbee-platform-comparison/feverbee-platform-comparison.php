<?php
/**
 * Plugin Name: FeverBee Platform Comparison Tool
 * Description: Registers a "Platform Comparison Tool" page template and bundles the community platform comparison app (built from the working master branch). The tool is served same-origin from feverbee.com and rendered server-side, so its content is crawlable. CSS is scoped to #fbpct so the WordPress theme cannot override it and the tool cannot leak into the theme. Theme-independent.
 * Version: 1.2.0
 * Author: FeverBee
 * Requires at least: 5.8
 */

if (!defined('ABSPATH')) { exit; }

define('FBPCT_PATH', plugin_dir_path(__FILE__));
define('FBPCT_URL', plugin_dir_url(__FILE__));
define('FBPCT_TEMPLATE_KEY', 'feverbee-platform-comparison');
define('FBPCT_PREVIEW_KEY', 'feverbee-platform-comparison-preview');
define('FBPCT_VER', '1.3.0');

/**
 * 1. Add the template to the Page Attributes > Template dropdown.
 */
add_filter('theme_page_templates', function ($templates) {
    $templates[FBPCT_TEMPLATE_KEY] = 'Platform Comparison Tool';
    $templates[FBPCT_PREVIEW_KEY] = 'Platform Comparison Tool (preview, nine-point)';
    return $templates;
});

/**
 * 2. Load the plugin's template file when a page is set to use it.
 */
add_filter('template_include', function ($template) {
    if (is_singular('page')) {
        $slug = get_post_meta(get_queried_object_id(), '_wp_page_template', true);
        if ($slug === FBPCT_TEMPLATE_KEY || $slug === FBPCT_PREVIEW_KEY) {
            $custom = FBPCT_PATH . 'templates/page-compare.php';
            if (file_exists($custom)) {
                return $custom;
            }
        }
    }
    return $template;
});

/**
 * Is the current request the comparison-tool page?
 */
function fbpct_current_template() {
    if (!is_singular('page')) {
        return '';
    }
    return get_post_meta(get_queried_object_id(), '_wp_page_template', true);
}

function fbpct_is_tool_page() {
    $t = fbpct_current_template();
    return ($t === FBPCT_TEMPLATE_KEY || $t === FBPCT_PREVIEW_KEY);
}

function fbpct_is_preview() {
    return fbpct_current_template() === FBPCT_PREVIEW_KEY;
}

/**
 * Add a body class on the tool page so we can set the page background.
 */
add_filter('body_class', function ($classes) {
    if (fbpct_is_tool_page()) {
        $classes[] = 'fbpct-page';
    }
    return $classes;
});

/**
 * 3. Enqueue the tool's assets, only on the tool page.
 *    Scoped stylesheet (styles.scoped.css) so the theme cannot override it.
 *    Chained dependencies force the working load order:
 *    platforms -> surveyData -> feverbee-scores -> app -> ai.
 */
add_action('wp_enqueue_scripts', function () {
    if (!fbpct_is_tool_page()) {
        return;
    }

    // Fonts + scoped tool stylesheet.
    wp_enqueue_style('fbpct-fonts', 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap', array(), null);
    wp_enqueue_style('fbpct-styles', FBPCT_URL . 'assets/css/styles.scoped.css', array(), FBPCT_VER);

    // Dark page background behind the tool and full-bleed wrapper, so there are no white gaps.
    wp_add_inline_style('fbpct-styles', "body.fbpct-page{background:#0D0D0D}#fbpct{width:100%;max-width:100%;overflow-x:hidden}#fbpct,#fbpct *{font-family:'Montserrat',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif}#fbpct button,#fbpct .pill,#fbpct .tab-btn,#fbpct input,#fbpct select,#fbpct textarea,#fbpct a{text-transform:none}#fbpct button::before,#fbpct button::after{content:none!important;display:none!important;background:none!important;border:0!important;clip-path:none!important}");

    // PDF libraries (CDN, matching the standalone tool).
    wp_enqueue_script('fbpct-html2pdf', 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js', array(), null, true);
    wp_enqueue_script('fbpct-pdfjs', 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js', array(), null, true);
    wp_add_inline_script('fbpct-pdfjs', "if(window.pdfjsLib){pdfjsLib.GlobalWorkerOptions.workerSrc='https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';}");

    // Tool data + application code (working master load order).
    wp_enqueue_script('fbpct-platforms', FBPCT_URL . 'assets/data/platforms.js', array(), FBPCT_VER, true);
    wp_enqueue_script('fbpct-survey', FBPCT_URL . 'assets/data/surveyData.js', array('fbpct-platforms'), FBPCT_VER, true);
    wp_enqueue_script('fbpct-scores', FBPCT_URL . 'assets/data/feverbee-scores.js', array('fbpct-survey'), FBPCT_VER, true);

    // Preview page only: re-base the scoring on the nine-point framework before app.js runs.
    $app_deps = array('fbpct-scores', 'fbpct-html2pdf', 'fbpct-pdfjs');
    if (fbpct_is_preview()) {
        wp_enqueue_script('fbpct-ninepoint', FBPCT_URL . 'assets/js/ninepoint-setup.js', array('fbpct-scores'), FBPCT_VER, true);
        $app_deps[] = 'fbpct-ninepoint';
    }
    wp_enqueue_script('fbpct-app', FBPCT_URL . 'assets/js/app.js', $app_deps, FBPCT_VER, true);
    wp_enqueue_script('fbpct-ai', FBPCT_URL . 'assets/js/ai.js', array('fbpct-app'), FBPCT_VER, true);

    // Live capability heatmap, sourced from the published Google Sheet.
    wp_enqueue_script('fbpct-sheet', FBPCT_URL . 'assets/js/sheet-capabilities.js', array('fbpct-app'), FBPCT_VER, true);
});
