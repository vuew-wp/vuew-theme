<?php
/**
 * Vuew theme functions.php
 *
 * @since       0.0.1
 */

namespace Vuew;

/**
 * Constant
 */
use Vuew\functions;

const VER = '0.0.1';
const ENV = 'dev';

/** URL & Path to theme */
define( __NAMESPACE__ . '\DIR', trailingslashit( get_template_directory() ) );
define( __NAMESPACE__ . '\URL', trailingslashit( get_template_directory_uri() ) );

/** Includes */
require_once( DIR . 'includes/utilities.php' );
require_once( DIR . 'includes/core.php' );
require_once( DIR . 'includes/menus.php' );

/** @TODO move to file */
add_action( 'wp_enqueue_scripts', '\Vuew\vw_assets' );
function vw_assets(){
	if ( 'dev' === ENV ) {
		wp_enqueue_script( 'vuew', 'https://localhost:8080/assets/dist/main.js', [], VER, true );
	}
	if ( 'prod' === ENV ) {
		/** JS */
		wp_enqueue_script( 'vuew-vendor', URL . 'assets/dist/vendor.js', [], VER, true );
		wp_enqueue_script( 'vuew', URL . 'assets/dist/main.js', [ 'vuew-vendor' ], VER, true );
		/** CSS */
		wp_enqueue_style( 'vuew', URL . 'assets/dist/main.css', [], VER );
	}

	$view_json_config = [
		'rest_root' => rest_url(),
		'base_url'  => home_url(),
		'nonce'     => wp_create_nonce( 'wp_rest' ),
		'menus'     => functions\menus\get()
	];

	$view_json_config = apply_filters( 'vuew_config', $view_json_config );

	wp_localize_script( 'vuew', 'VuewConfig', $view_json_config );

}