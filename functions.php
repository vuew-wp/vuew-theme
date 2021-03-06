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

const VER = '0.0.4';

/** URL & Path to theme */
define( __NAMESPACE__ . '\DIR', trailingslashit( get_template_directory() ) );
define( __NAMESPACE__ . '\URL', trailingslashit( get_template_directory_uri() ) );
define( __NAMESPACE__ . '\PROTOCAL', is_ssl() ? 'https' : 'http' );
define( __NAMESPACE__ . '\DIST', SCRIPT_DEBUG ? PROTOCAL . '://localhost:4000/dist/' : URL . '/dist/' );

/**
 * Includes
 */
//Functions
require_once( DIR . 'includes/functions/utilities.php' );
require_once( DIR . 'includes/functions/core.php' );
require_once( DIR . 'includes/functions/rest.php' );

//Classes
require_once( DIR . 'includes/classes/Factory.php' );
require_once( DIR . 'includes/classes/Menu.php' );
require_once( DIR . 'includes/classes/REST.php' );
require_once( DIR . 'includes/classes/Boot.php' );

require_once( DIR . 'includes/functions/boot.php' );

REST::create();

add_filter('jpeg_quality', function(){
	return 40;
});

function boot() {
	/** @const array \Vuew\REST_BASES */
	define( __NAMESPACE__ . '\REST_BASES', functions\rest_api\map_bases() );
	Menu::init();
}

add_action( 'init', __NAMESPACE__ . '\boot' );

function deregister_scripts(){
	wp_deregister_script( 'wp-embed' );
}
add_action( 'wp_footer', '\Vuew\deregister_scripts' );

function allow_svg( $mimes ) {
	$mimes[ 'svg' ] = 'image/svg+xml';
	return $mimes;
}
add_filter( 'upload_mimes', '\Vuew\allow_svg' );

function defer_async($tag, $handle) {
	if ( false === strpos( $handle, 'vuew' ) )
		return $tag;
	return str_replace( ' src', ' defer src', $tag );
}
add_filter('script_loader_tag', '\Vuew\defer_async', 10, 2);

/** @TODO move to file */
add_action( 'wp_head', '\Vuew\vuew_assets' );
function vuew_assets() {

	wp_dequeue_script( 'jquery' );

	if ( SCRIPT_DEBUG ) {
		wp_enqueue_script( 'vuew', PROTOCAL . '://localhost:4000/dist/main.js', [], VER, true );
	}

}

require_once( DIR . 'includes/Blocks/Blocks.php' );
new Core\Utils\Blocks();

/**
 *
 * Modified from: Sunyatasattva
 * https://wordpress.stackexchange.com/questions/81522/change-html-structure-of-all-img-tags-in-wordpress
 *
 * @param $the_content
 *
 * @return string
 *
 *
 * Initial use of code gave warning: DOMDocument::loadHTML(): Unexpected end tag : p
 * Due to invalid HTML
 *
 * https://stackoverflow.com/questions/11819603/dom-loadhtml-doesnt-work-properly-on-a-server
 *
 * libxml_use_internal_errors(true);
 */

if( ! is_admin() && defined('REST_REQUEST' ) && true !== \REST_REQUEST ) {
	//add_filter( 'the_content', 'shortcode_unautop', 100 );
	add_filter( 'the_content', '\Vuew\gs_add_img_lazy_markup', 15 );
	function gs_add_img_lazy_markup( $object ) {

		var_dump($object);

		return $object;

		/** @var string $content - Remove <p> wrapping on images */
		$content = preg_replace( '/<p>\s*(<a .*>)?\s*(<img .* \/>)\s*(<\/a>)?\s*<\/p>/iU', '\1\2\3', $object );

		/** @var \DOMDocument $dom */
		$dom = new \DOMDocument( 'UTF-8' );
		//libxml_use_internal_errors( true );
		$dom->loadHTML( utf8_decode( $content ), LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD );
		$dom->preserveWhiteSpace = false;
		$images                  = $dom->getElementsByTagName( 'img' );

		/** @var \DOMElement $image */
		foreach ( $images as $image ) {

			$clone_img = $image->cloneNode();

			// Build Pinterest URL format
			$pin_url = sprintf( 'http://pinterest.com/pin/create/button/?url=%s&media=%s&description=%s',
				urlencode( get_permalink() ),
				$image->getAttribute( 'src' ),
				urlencode( get_bloginfo( 'name' ) . ' - ' . get_the_title() )
			);

			// Create DIV container
			$pin_wrap = $dom->createElement( 'div' );
			$pin_wrap->setAttribute( 'class', 'pinterest-button' );

			// Create link to share with no content and attributes
			$pin_link = $dom->createElement( 'a', ' ' );
			$pin_link->setAttribute( 'class', 'share-pinterest icon-pinterest' );
			$pin_link->setAttribute( 'title', __( 'Compartir en Pinterest', 'tindas' ) );
			$pin_link->setAttribute( 'href', $pin_url );

			// Add to image to new container
			$pin_wrap->appendChild( $clone_img );

			// Add Pinterest link to container
			$pin_wrap->appendChild( $pin_link );
			// Replace img object with all new elements

			$pin_wrap = $dom->createElement( 'vuew-component' );

			$image->replaceChild( $pin_wrap, $image );
		} // end if count

		$new_dom = $dom->saveHTML();

		/*$new_dom = preg_replace( '/<p>\s*(<a .*>)?\s*(<img .* \/>)\s*(<\/a>)?\s*<\/p>/iU', '\1\2\3', $object );*/

		var_dump( $new_dom );

		return $new_dom;
	}
}

/*add_action( 'rest_api_init', __NAMESPACE__ . '\create_api_posts_meta_field' );

function create_api_posts_meta_field() {
	register_rest_field( [ 'post', 'tf-entry', 'page' ], 'myfield', array(
			'get_callback' => __NAMESPACE__ . '\gs_add_img_lazy_markup',
			'schema'       => null,
		)
	);
}

function get_post_meta_for_api( $object ) {
	//get the id of the post object array
	$post_id = $object['id'];

	//return the post meta
	return $object['content']['rendered'];
}*/

add_action( 'after_setup_theme', function () {

	add_theme_support( 'custom-logo' );

	// Add theme support for Featured Images
	add_theme_support( 'post-thumbnails' );

	remove_action( 'wp_head', 'wp_generator' );
	remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
	remove_action( 'wp_print_styles', 'print_emoji_styles' );
	remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
	remove_action( 'admin_print_styles', 'print_emoji_styles' );
	remove_action( 'wp_head', 'rsd_link' );
	remove_action( 'wp_head', 'wlwmanifest_link' );
	remove_action( 'wp_head', 'wp_shortlink_wp_head' );
	remove_action( 'get_header', 'remove_admin_login_header' );
	remove_action( 'wp_head', 'feed_links', 2 );
	remove_action( 'wp_head', 'feed_links_extra', 3 );
} );
