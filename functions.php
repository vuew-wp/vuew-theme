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
use Vuew\Core\REST;
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

//Classes
require_once( DIR . 'includes/classes/Factory.php' );
require_once( DIR . 'includes/classes/Menu.php' );
require_once( DIR . 'includes/classes/REST.php' );
REST::create();

function boot() {
	/** @const array \Vuew\REST_BASES */
	define( __NAMESPACE__ . '\REST_BASES', functions\rest_api\map_bases() );
	Menu::create();
}

add_action( 'init', __NAMESPACE__ . '\boot' );


/** @TODO move to file */
add_action( 'wp_enqueue_scripts', '\Vuew\vuew_assets' );
function vuew_assets() {

	wp_dequeue_script( 'jquery' );
	wp_dequeue_script( 'wp-embed' );

	if ( 'dev' === ENV ) {
		wp_enqueue_script( 'vuew', 'https://localhost:8080/dist/main.js', [], VER, true );
	}
	if ( 'prod' === ENV ) {
		/** JS */
		wp_enqueue_script( 'vuew-vendor', URL . 'dist/vendor.js', [], VER, true );
		wp_enqueue_script( 'vuew', URL . 'dist/main.js', [ 'vuew-vendor' ], VER, true );
		/** CSS */
		wp_enqueue_style( 'vuew', URL . 'dist/main.css', [], VER );
	}

	/** @var array $routing */
	$routing = Menu::routing();

	/** @var array $vuew_json_config */
	$vuew_json_config = [
		'restRoot' => rest_url(),
		'baseUrl'  => home_url(),
		'nonce'    => wp_create_nonce( 'wp_rest' ),
		'config'   => apply_filters( 'Vuew\json', [
			'customLogo'  => false,
			'boot'        => functions\boot\object(),
			'pageOnFront' => (int) get_option( 'page_on_front' ),
			'navigation'  => [
				'menus'     => $routing['menus'],
				'paths'     => $routing['paths'],
				'restBases' => REST_BASES
			],
			'query'       => [
				'ppp' => (int) get_query_var( 'posts_per_page', 6 )
			]
		] )
	];

	if ( has_custom_logo() ) {
		$custom_logo_id = get_theme_mod( 'custom_logo' );
		$logo           = wp_get_attachment_image_src( $custom_logo_id, 'full' );

		$vuew_json_config['config']['customLogo'] = $logo[0];
	}

	$vuew_json_config = apply_filters( __FUNCTION__, $vuew_json_config );

	wp_localize_script( 'vuew', 'Vuew', $vuew_json_config );

}


}