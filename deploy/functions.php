<?php
/**
 * Astuse Theme Functions
 *
 * @package Astuse
 * @version 1.0.0
 */

// ============================================================
// Theme Setup
// ============================================================
function astuse_theme_setup() {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('custom-logo');
    add_theme_support('html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
        'style',
        'script',
    ));

    // Register navigation menus
    register_nav_menus(array(
        'primary' => __('Menu Principal', 'astuse'),
    ));
}
add_action('after_setup_theme', 'astuse_theme_setup');

// ============================================================
// Enqueue Assets (React / Vite build)
// ============================================================

// WordPress does not natively add type="module" on enqueued scripts.
// Vite bundles are ES modules and MUST be loaded with type="module".
function astuse_add_module_type($tag, $handle, $src) {
    if ($handle === 'astuse-react-js') {
        $tag = str_replace('<script ', '<script type="module" ', $tag);
    }
    return $tag;
}
add_filter('script_loader_tag', 'astuse_add_module_type', 10, 3);

function astuse_enqueue_assets() {
    $theme_dir  = get_template_directory();
    $theme_uri  = get_template_directory_uri();

    // Vite build output lives in deploy/dist/
    $dist_dir   = $theme_dir . '/dist';
    $dist_uri   = $theme_uri . '/dist';

    $css_enqueued = false;
    $js_enqueued  = false;

    // ----------------------------------------------------------
    // Method 1: Vite manifest (generated with build.manifest: true)
    // Manifest paths are relative to dist/ (e.g. "assets/index-xxx.js")
    // ----------------------------------------------------------
    $manifest_path = $dist_dir . '/.vite/manifest.json';

    if (file_exists($manifest_path)) {
        $manifest = json_decode(file_get_contents($manifest_path), true);

        if (isset($manifest['index.html'])) {
            $entry = $manifest['index.html'];

            if (!empty($entry['css'])) {
                foreach ($entry['css'] as $i => $css_file) {
                    wp_enqueue_style("astuse-css-{$i}", $dist_uri . '/' . $css_file, array(), null);
                }
                $css_enqueued = true;
            }

            if (!empty($entry['file'])) {
                wp_enqueue_script('astuse-react-js', $dist_uri . '/' . $entry['file'], array(), null, true);
                $js_enqueued = true;
            }
        }
    }

    // ----------------------------------------------------------
    // Method 2: Auto-detect hashed files in dist/assets/
    // Fallback if manifest is missing.
    // ----------------------------------------------------------
    if (!$css_enqueued || !$js_enqueued) {
        $assets_dir = $dist_dir . '/assets';
        $assets_uri = $dist_uri . '/assets';

        if (is_dir($assets_dir)) {
            foreach (scandir($assets_dir) as $file) {
                if (!$css_enqueued && preg_match('/^index[.\-].*\.css$/', $file)) {
                    wp_enqueue_style('astuse-css', $assets_uri . '/' . $file, array(), null);
                    $css_enqueued = true;
                }
                if (!$js_enqueued && preg_match('/^index[.\-].*\.js$/', $file)) {
                    wp_enqueue_script('astuse-react-js', $assets_uri . '/' . $file, array(), null, true);
                    $js_enqueued = true;
                }
            }
        }
    }

    // ----------------------------------------------------------
    // Pass WordPress data to React  (available as window.wpData)
    // ----------------------------------------------------------
    if ($js_enqueued) {
        wp_localize_script('astuse-react-js', 'wpData', array(
            'ajaxUrl'     => admin_url('admin-ajax.php'),
            'nonce'       => wp_create_nonce('astuse_nonce'),
            'siteUrl'     => home_url(),
            'themeUrl'    => $theme_uri,
            'currentPage' => get_the_ID(),
            'pageSlug'    => get_post_field('post_name', get_the_ID()),
            'isHome'      => is_front_page(),
        ));
    }
}
add_action('wp_enqueue_scripts', 'astuse_enqueue_assets');

// ============================================================
// AJAX – Lead Form Handler
// ============================================================
function astuse_handle_lead_form() {
    check_ajax_referer('astuse_nonce', 'nonce');

    $name    = sanitize_text_field($_POST['name'] ?? '');
    $email   = sanitize_email($_POST['email'] ?? '');
    $company = sanitize_text_field($_POST['company'] ?? '');
    $message = sanitize_textarea_field($_POST['message'] ?? '');

    if (empty($name) || empty($email)) {
        wp_send_json_error(array('message' => 'Name and email are required.'));
    }

    // Save to database
    global $wpdb;
    $table_name = $wpdb->prefix . 'astuse_leads';

    $wpdb->insert($table_name, array(
        'name'       => $name,
        'email'      => $email,
        'company'    => $company,
        'message'    => $message,
        'created_at' => current_time('mysql'),
    ));

    // Send notification email
    $to      = get_option('admin_email');
    $subject = sprintf('[Astuse] New lead from %s', $name);
    $body    = sprintf(
        "Name: %s\nEmail: %s\nCompany: %s\nMessage: %s",
        $name, $email, $company, $message
    );
    wp_mail($to, $subject, $body);

    wp_send_json_success(array('message' => 'Lead submitted successfully'));
}
add_action('wp_ajax_submit_lead', 'astuse_handle_lead_form');
add_action('wp_ajax_nopriv_submit_lead', 'astuse_handle_lead_form');

// ============================================================
// Database – Create leads table on theme activation
// (register_activation_hook is for PLUGINS only – themes use
//  after_switch_theme)
// ============================================================
function astuse_activate() {
    global $wpdb;
    $table_name      = $wpdb->prefix . 'astuse_leads';
    $charset_collate = $wpdb->get_charset_collate();

    $sql = "CREATE TABLE IF NOT EXISTS $table_name (
        id mediumint(9) NOT NULL AUTO_INCREMENT,
        name varchar(255) NOT NULL,
        email varchar(255) NOT NULL,
        company varchar(255) DEFAULT '',
        message text,
        created_at datetime DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY  (id)
    ) $charset_collate;";

    require_once ABSPATH . 'wp-admin/includes/upgrade.php';
    dbDelta($sql);

    // Flush rewrite rules so pretty permalinks work immediately
    flush_rewrite_rules();
}
add_action('after_switch_theme', 'astuse_activate');

// ============================================================
// Admin – Leads Dashboard
// ============================================================
function astuse_leads_admin_menu() {
    add_menu_page(
        'Astuse Leads',
        'Leads',
        'manage_options',
        'astuse-leads',
        'astuse_leads_admin_page',
        'dashicons-email-alt',
        26
    );
}
add_action('admin_menu', 'astuse_leads_admin_menu');

function astuse_leads_admin_page() {
    global $wpdb;
    $table_name = $wpdb->prefix . 'astuse_leads';
    $leads      = $wpdb->get_results("SELECT * FROM $table_name ORDER BY created_at DESC");

    echo '<div class="wrap">';
    echo '<h1>Astuse Leads</h1>';

    if (empty($leads)) {
        echo '<p>No leads yet.</p>';
    } else {
        echo '<table class="wp-list-table widefat fixed striped">';
        echo '<thead><tr><th>Name</th><th>Email</th><th>Company</th><th>Message</th><th>Date</th></tr></thead>';
        echo '<tbody>';
        foreach ($leads as $lead) {
            echo '<tr>';
            echo '<td>' . esc_html($lead->name) . '</td>';
            echo '<td>' . esc_html($lead->email) . '</td>';
            echo '<td>' . esc_html($lead->company) . '</td>';
            echo '<td>' . esc_html($lead->message) . '</td>';
            echo '<td>' . esc_html($lead->created_at) . '</td>';
            echo '</tr>';
        }
        echo '</tbody></table>';
    }

    echo '</div>';
}

// ============================================================
// Admin Notice – Permalink structure check
// ============================================================
function astuse_check_permalinks() {
    if (empty(get_option('permalink_structure'))) {
        echo '<div class="notice notice-warning is-dismissible">';
        echo '<p><strong>Astuse :</strong> Les permaliens "Plain" ne sont pas compatibles avec ce thème. ';
        echo 'Allez dans <a href="' . esc_url(admin_url('options-permalink.php')) . '">Réglages → Permaliens</a> ';
        echo 'et sélectionnez « Nom de l\'article » (Post name).</p>';
        echo '</div>';
    }
}
add_action('admin_notices', 'astuse_check_permalinks');
