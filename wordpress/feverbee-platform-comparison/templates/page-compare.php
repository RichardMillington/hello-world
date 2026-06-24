<?php
/**
 * Page template: Platform Comparison Tool
 *
 * Loaded by the FeverBee Platform Comparison Tool plugin (not a theme template).
 * Prints the tool's <body> content inline, wrapped in #fbpct so the tool's
 * (scoped) styles apply only inside the wrapper and the WordPress theme cannot
 * override them. Assets are enqueued by the plugin.
 */

if (!defined('ABSPATH')) { exit; }

get_header();

$index = FBPCT_PATH . 'assets/index.html';

if (file_exists($index)) {
    $html = file_get_contents($index);

    // Extract everything between <body> and the first bundled data <script>.
    if (preg_match('/<body[^>]*>(.*?)<script\s+src=["\']data\//s', $html, $m)) {
        echo '<div id="fbpct">';
        echo $m[1]; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- trusted bundled markup
        echo '</div>';
    } else {
        echo '<div style="max-width:800px;margin:60px auto;padding:0 20px;font-family:Montserrat,sans-serif;">';
        echo '<h2>Platform Comparison Tool</h2>';
        echo '<p>The tool markup could not be loaded. Please contact the site administrator.</p>';
        echo '</div>';
    }
}

get_footer();
