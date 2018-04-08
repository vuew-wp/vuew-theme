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
use Vuew\Core\Menu;
use Vuew\functions;

const VER = '0.0.1';
const ENV = 'dev';

/** URL & Path to theme */
define( __NAMESPACE__ . '\DIR', trailingslashit( get_template_directory() ) );
define( __NAMESPACE__ . '\URL', trailingslashit( get_template_directory_uri() ) );

/**
 * Includes
 */
//Functions
require_once( DIR . 'includes/functions/utilities.php' );
require_once( DIR . 'includes/functions/core.php' );
require_once( DIR . 'includes/functions/rest.php' );
require_once( DIR . 'includes/functions/boot.php' );
require_once( DIR . 'includes/functions/menus.php' );
//Classes
require_once( DIR . 'includes/classes/Factory.php' );
require_once( DIR . 'includes/classes/Menu.php' );


function boot(){
	define( __NAMESPACE__ . '\REST_BASES', functions\rest_api\map_bases() );
	Menu::create();
}
add_action( 'init', __NAMESPACE__ . '\boot' );

/** @TODO move to file */
add_action( 'wp_enqueue_scripts', '\Vuew\vuew_assets' );
function vuew_assets(){
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
		'rest_root'    => rest_url(),
		'base_url'     => home_url(),
		'nonce'        => wp_create_nonce( 'wp_rest' ),
		/**
		 * Routes and Menus
		 */
		'routing'      => Menu::get() + [ 'bases' => REST_BASES ],
		'boot'         => functions\boot\object(),
		'init'         => false,
		'historyLimit' => 20
	];

	$view_json_config = apply_filters( __FUNCTION__, $view_json_config );

	wp_localize_script( 'vuew', 'Vuew', $view_json_config );

}