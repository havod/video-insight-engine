<?php
/**
 * Astuse Theme Functions
 */

// Enqueue React build files
function astuse_enqueue_react_app() {
    // Obtenir les fichiers du build
    $asset_manifest = get_template_directory() . '/assets/.vite/manifest.json';
    
    if (file_exists($asset_manifest)) {
        $manifest = json_decode(file_get_contents($asset_manifest), true);
        
        // Charger le CSS principal
        if (isset($manifest['index.html']['css'])) {
            foreach ($manifest['index.html']['css'] as $css_file) {
                wp_enqueue_style(
                    'astuse-react-css',
                    get_template_directory_uri() . '/assets/' . $css_file,
                    array(),
                    '1.0'
                );
            }
        }
        
        // Charger le JS principal
        if (isset($manifest['index.html']['file'])) {
            wp_enqueue_script(
                'astuse-react-js',
                get_template_directory_uri() . '/assets/' . $manifest['index.html']['file'],
                array(),
                '1.0',
                true
            );
        }
    } else {
        // Fallback si pas de manifest (en développement)
        wp_enqueue_style('astuse-react-css', get_template_directory_uri() . '/assets/index.css');
        wp_enqueue_script('astuse-react-js', get_template_directory_uri() . '/assets/index.js', array(), '1.0', true);
    }
    
    // Passer des données WordPress à React
    wp_localize_script('astuse-react-js', 'wpData', array(
        'ajaxUrl' => admin_url('admin-ajax.php'),
        'nonce' => wp_create_nonce('astuse_nonce'),
        'siteUrl' => get_site_url(),
        'currentPage' => get_the_ID(),
        'pageSlug' => get_post_field('post_name', get_the_ID())
    ));
}
add_action('wp_enqueue_scripts', 'astuse_enqueue_react_app');

// Support des fonctionnalités WordPress
function astuse_theme_support() {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('custom-logo');
}
add_action('after_setup_theme', 'astuse_theme_support');

// AJAX handler pour le formulaire de leads
function astuse_handle_lead_form() {
    check_ajax_referer('astuse_nonce', 'nonce');
    
    $name = sanitize_text_field($_POST['name']);
    $email = sanitize_email($_POST['email']);
    $company = sanitize_text_field($_POST['company']);
    $message = sanitize_textarea_field($_POST['message']);
    
    // Option 1: Sauvegarder dans la base de données WordPress
    global $wpdb;
    $table_name = $wpdb->prefix . 'leads';
    
    $wpdb->insert($table_name, array(
        'name' => $name,
        'email' => $email,
        'company' => $company,
        'message' => $message,
        'created_at' => current_time('mysql')
    ));
    
    // Option 2: Envoyer un email
    $to = get_option('admin_email');
    $subject = 'New Lead from ' . $name;
    $body = "Name: $name\nEmail: $email\nCompany: $company\nMessage: $message";
    wp_mail($to, $subject, $body);
    
    // Option 3: Intégrer avec un plugin (WPForms, Gravity Forms, etc.)
    // do_action('wpforms_process_complete', $form_data);
    
    wp_send_json_success(array('message' => 'Lead submitted successfully'));
}
add_action('wp_ajax_submit_lead', 'astuse_handle_lead_form');
add_action('wp_ajax_nopriv_submit_lead', 'astuse_handle_lead_form');

// Créer la table des leads à l'activation
function astuse_create_leads_table() {
    global $wpdb;
    $table_name = $wpdb->prefix . 'leads';
    $charset_collate = $wpdb->get_charset_collate();
    
    $sql = "CREATE TABLE IF NOT EXISTS $table_name (
        id mediumint(9) NOT NULL AUTO_INCREMENT,
        name varchar(255) NOT NULL,
        email varchar(255) NOT NULL,
        company varchar(255),
        message text,
        created_at datetime DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY  (id)
    ) $charset_collate;";
    
    require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
    dbDelta($sql);
}
register_activation_hook(__FILE__, 'astuse_create_leads_table');

// Ajouter une page admin pour voir les leads
function astuse_leads_admin_menu() {
    add_menu_page(
        'Leads',
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
    $table_name = $wpdb->prefix . 'leads';
    $leads = $wpdb->get_results("SELECT * FROM $table_name ORDER BY created_at DESC");
    
    echo '<div class="wrap">';
    echo '<h1>Leads</h1>';
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
    echo '</div>';
}
?>