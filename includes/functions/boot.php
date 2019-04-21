<?php

namespace Vuew\functions\boot;

use Vuew\Core\Boot;
use Vuew\Core\Menu;
use Vuew\Core\REST;
use Vuew\functions;

/**
 * @return array
 */
function object() {

	$initial_object_type = [];
	$queried_object      = get_queried_object();

	$boot = new Boot( $queried_object );

	if ( is_front_page() || is_home() ) {
		/** not static home page */
		if ( is_home() ) {
			$initial_object_type = [
				'id'         => 0,
				'type_value' => false,
				'rest_base'  => false
			];
		}
		$initial_object_type['type'] = 'home';
		$initial_object_type['name'] = 'Latest Posts';

		/** @var array $initial_object_type - Get a couple posts to load without a HTTP request */
		$initial_object_type = $boot->home( $initial_object_type );
	} else if ( is_archive() ) {
		if ( is_tag() || is_tax() || is_category() ) {
			$initial_object_type = [
				'id'          => $queried_object->term_id,
				'type'        => 'taxonomy',
				'type_value'  => $queried_object->taxonomy,
				'rest_base'   => \Vuew\REST_BASES['taxonomy'][ $queried_object->taxonomy ],
				'post_type'   => get_post_type(),
				'name'        => $queried_object->name,
				'description' => $queried_object->description
			];
			$initial_object_type = $boot->taxonomy( $initial_object_type, $queried_object );
		} else if ( is_post_type_archive() ) {
			$initial_object_type = [
				'id'          => 0,
				'type'        => 'post_type_archive',
				'type_value'  => $queried_object->name,
				'rest_base'   => $queried_object->rest_base,
				'name'        => $queried_object->label,
				'description' => $queried_object->description
			];
			//var_dump($queried_object);
			$initial_object_type = $boot->post_type_archive( $initial_object_type, $queried_object->name );
		}
	} else if ( is_single() || is_singular() ) {
		$initial_object_type = [
			'id'         => $queried_object->ID,
			'type'       => 'post_type',
			'type_value' => $queried_object->post_type,
			'rest_base'  => \Vuew\REST_BASES['post_type'][ $queried_object->post_type ]
		];
	} else if ( is_404() ) {
		$initial_object_type = [
			'id'        => 'four04',
			'type'      => 404,
			'rest_base' => 404
		];
	}


	$current_uri                 = parse_url( vw_get_requested_uri() );
	$initial_object_type['path'] = isset( $current_uri['path'] ) ? $current_uri['path'] : '/';

	return $initial_object_type;
}

/**
 * @param $initial_object_type
 *
 * @return mixed
 */
function home_query( $initial_object_type ) {

	return REST::query( $initial_object_type, [
		'posts_per_page'      => $this->default_args['posts_per_page'],
		'ignore_sticky_posts' => 1
	] );

}

/**
 * @param $initial_object_type
 * @param $item
 *
 * @return mixed
 */
function taxonomy_query( $initial_object_type, $item ) {

	return REST::query( $initial_object_type, [
		'posts_per_page' => $this->default_args['posts_per_page'],
		'tax_query'      => [
			[
				'taxonomy'         => $item->taxonomy,
				'field'            => 'id',
				'terms'            => $item->term_id,
				'include_children' => false
			]
		]
	] );

}

/**
 * @param $initial_object_type
 * @param $post_type
 *
 * @return mixed
 */
function post_type_archive_query( $initial_object_type, $post_type ) {

	return REST::query( $initial_object_type, [
		'posts_per_page' => $this->default_args['posts_per_page'],
		'post_type'      => $post_type
	] );

}

function vw_json() {
	$vuew_config = get_transient( 'vuew_config' );

	if ( WP_DEBUG || isset( $_GET['transient_cache_bypass'] ) || false === $vuew_config ) {

		/** @var array $routing */
		$routing = Menu::routing();

		$ppp = (int) get_query_var( 'posts_per_page', 6 );

		/** @var array $vuew_json_config */
		$vuew_config = [
			'restRoot' => rest_url(),
			'baseUrl'  => home_url(),
			'themeUrl' => trailingslashit( get_theme_file_uri() ),
			'config'   => [
				'pageOnFront' => (int) get_option( 'page_on_front' ),
				'navigation'  => [
					'menus'     => $routing['menus'],
					'paths'     => $routing['paths'],
					'restBases' => \Vuew\REST_BASES
				],
				'transitions' => [
					'main' => 400
				],
				'user'        => [
					'canRegister' => 1 === (int) get_option( 'users_can_register' )
				],
				'comments'    => [
					'commentOrder'        => get_option( 'comment_order' ),
					'requireNameEmail'    => 1 === (int) get_option( 'require_name_email' ),
					'commentModeration'   => 1 === (int) get_option( 'comment_moderation' ),
					'commentRegistration' => 1 === (int) get_option( 'comment_registration' )
				],
				'tracking'    => [
					'googleAnalytics' => 'UA-121620171-1'
				],
				'query'       => [
					'ppp' => $ppp
				],
				'layout'      => [
					'archives' => [
						'home'              => [
							'columns' => 3,
							'type'    => 'post-vuew',
							/*'atf' => [
								[
									'postsPerComponent' => 2,
									'name'              => 'post-list-overflow',
									'excerpt'           => true,
									'options'           => [
									],
								],
								[
									'title'             => 'Other News',
									'postsPerComponent' => 3,
									'name'              => 'post-list',
									'excerpt'           => true,
									'options'           => [
									],
									'columns'           => [
										1
									]
								]
							],*/
							/** Above the fold */
							/** Above the fold */
							'atf'     => [
								[
									'postsPerComponent' => 4,
									'name'              => 'post-list-slider',
									'options'           => [
										'snapTo'         => 'left', //Center or right
										'flickTolerance' => 200,
										'slideWidth'     => [
											'm'      => 90,
											'd'      => 25,
											'suffix' => 'vw'
										],
									],
								]
							],
							/** Below the fold */
							'btf'     => [
								[
									'postsPerComponent' => $ppp,
									'name'              => 'post-list-expander',
									'columns'           => [
										1,
										3
									]
								]
							]
						],
						'post_type_archive' => [
							'columns' => 2
						],
						'taxonomy'          => [
							'columns' => 4,
							'atf'     => [
								[
									'title'             => 'Other News',
									'postsPerComponent' => 5,
									'name'              => 'post-list',
									'columns'           => [
										1
									]
								]
							],
						]
					]
				]
			]
		];

		if ( has_custom_logo() ) {
			$custom_logo_id = get_theme_mod( 'custom_logo' );
			$logo           = wp_get_attachment_image_src( $custom_logo_id, 'full' );

			$vuew_config['config']['customLogo'] = $logo[0];
		}

		/** Two minute transient */
		set_transient( 'vuew_config', $vuew_config, MINUTE_IN_SECONDS * 2 );

	}

	/**
	 * The following must not be stored in transient
	 */
	$vuew_config['nonces']                           = [
		'userAuth' => wp_create_nonce( 'vuew_user_auth' ),
		'wpRest'   => wp_create_nonce( 'wp_rest' )
	];
	$vuew_config['config']['user']['isUserLoggedIn'] = is_user_logged_in();
	$vuew_config['config']['user']['userId']         = ( $uid = get_current_user_id() ) > 0 ? $uid : - 1;
	$vuew_config['config']['boot']                   = functions\boot\object();

	return json_encode( $vuew_config );
}

/**
 * @link    https://remonpel.nl/2018/06/wordpress-rest-api-nonce-sense/
 */
add_action( 'set_logged_in_cookie', function ( $cookie_value ) {
	$_COOKIE[ LOGGED_IN_COOKIE ] = $cookie_value;
}, PHP_INT_MAX );
add_action( 'clear_auth_cookie', function () {
	$_COOKIE[ LOGGED_IN_COOKIE ] = ' ';
} );
add_action( 'wp_login', function ( $login, $user ) {
	wp_set_current_user( $user->ID );
}, PHP_INT_MAX, 2 );
add_action( 'wp_logout', function () {
	wp_set_current_user( 0 );
}, PHP_INT_MAX );
add_filter( 'rest_allow_anonymous_comments', '__return_true' );


add_filter( 'show_admin_bar', '__return_false' );

add_action( 'send_headers', function($h) {
	//var_dump($h);
	//header( 'Service-Worker-Allowed: /srv/www/sight/public_html/' );
	//header( 'Content-Type: application/javascript' );
}, 10, 2 );
