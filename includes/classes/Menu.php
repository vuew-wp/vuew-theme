<?php
/**
 * Menu
 */

namespace Vuew\Core;

use Vuew\functions;

/**
 * Class Menu
 * @package Vuew\Core
 *
 * @todo        add way to filter paths
 */
class Menu extends Factory {

	/** @var array $routes */
	static $routes = [];

	/** @var bool|int $page_on_front */
	static $page_on_front = false;

	/**
	 * Menu constructor.
	 */
	function __construct() {
		self::$page_on_front = (int) get_option( 'page_on_front' );
		static::register();
	}

	/**
	 * Create WP Nav Menus
	 * @since   0.0.1
	 */
	public static function register() {
		\register_nav_menus(
			[
				'primary_menu' => __( 'Primary Menu' ),
				'footer_menu'  => __( 'Footer Menu' ),
			]
		);
	}

	/**
	 * @param bool $hierarchical
	 *
	 * @return array
	 */
	public static function routing( $hierarchical = true ) {

		/** @var array $menu_locations */
		$menu_locations = get_nav_menu_locations();
		/** @var array $vuew_menus */
		$vuew_menus = [ 'primary_menu', 'footer_menu' ];
		/** @var array $fields_to_get Only these fields must be plucked */
		$fields_to_get = [
			'ID',
			'id',
			'type',
			'slug',
			'href',
			'title',
			'target',
			'type_value',
			'rest_base',
			'breadcrumb',
			'menu_item_parent',
		];
		/** @var array $found_menus */
		$found_menus = $routes = [];

		foreach ( $vuew_menus as $vuew_menu ) {
			if ( isset( $menu_locations[ $vuew_menu ] ) ) {

				if ( false === ( $nav_object = \wp_get_nav_menu_items( $menu_locations[ $vuew_menu ] ) ) ) {
					continue;
				}

				//var_dump(\Vuew\REST_BASES);

				/** Cast all object_id as int and add slug */
				array_map( function ( $v ) {

					/** Unless url is '/' lets remove the last slash from the URL. */
					$v->url = '/' !== $v->url ? untrailingslashit( $v->url ) : '/';
					$path   = trim( parse_url( $v->url )['path'], '/' );

					$slug_pieces = explode( '/', $path );

					$v->object_id  = (int) $v->object_id;
					$v->type_value = $v->object;
					$v->id         = (int) $v->object_id;
					$v->breadcrumb = $slug_pieces;

					$site_url = untrailingslashit( home_url() );

					/** special treatment if we have a static home page & a custom menu item with "/" url exists */
					if ( $v->type === 'custom' ) {

						$v->id         = null;
						$v->type       = 404;
						$v->type_value = false;
						$v->rest_base  = 404;

						if ( $v->url === '/' || $v->url === $site_url ) {
							$v->type = 'home';
							if ( self::$page_on_front > 0 ) {
								$v->id         = self::$page_on_front;
								$v->type_value = 'post_type';
								$v->rest_base  = 'pages';
							} else {
								$v->id         = 0;
								$v->type_value = 'post';
								$v->rest_base  = 'types';
							}

						} else {

							$url_to_check = $v->url;

							if ( ! filter_var( $v->url, FILTER_VALIDATE_URL ) ) {
								$url_to_check = trailingslashit( $site_url ) . $path;
							}

							/**
							 * External links
							 */
							if ( false === strpos( $url_to_check, $site_url ) ) {
								$v->id        = null;
								$v->type      = 'external';
								$v->href      = $url_to_check;
								$v->rest_base = false;
							}
							/** Last resort */
							else {

								$post_id = url_to_postid( $url_to_check );

								/** Attempt to parse URL as post */
								if ( $post_id > 0 ) {

									$post = get_post( $post_id );

									$v->id         = $post->ID;
									$v->type       = 'post_type';
									$v->type_value = $post->post_type;
									$v->rest_base  = \Vuew\REST_BASES['post_type'][ $v->type_value ];

								}
								/** Finally, attempt to parse as taxonomy */
								else {
									foreach ( \Vuew\REST_BASES['taxonomy'] as $taxonomy => $rest_base ) {
										if ( false === $cat = get_term_by( 'slug', end( $slug_pieces ), $taxonomy ) ) {
											continue;
										} else {
											$v->id         = $cat->term_id;
											$v->type       = 'taxonomy';
											$v->type_value = $cat->taxonomy;
											$v->rest_base  = \Vuew\REST_BASES['taxonomy'][ $cat->taxonomy ];
										}
									}
								}
							}
						}


					} else {
						$v->rest_base = \Vuew\REST_BASES[ $v->type ][ $v->object ];
					}

					if ( $v->type === 'post_type_archive' ) {
						$v->id        = 0;
						$v->rest_base = \Vuew\REST_BASES['post_type'][ $v->object ];
					}
					if ( $v->type !== 'external' ) {
						static::$routes[ $v->type ][] = static::create_route( $slug_pieces );
					}

				}, $nav_object );

				/**
				 * @todo make less dynamic
				 */

				foreach ( static::$routes as $type => $object_type ) {

					$max    = '';
					$maxlen = 0;

					foreach ( $object_type as $object ) {
						$len = strlen( $object );
						if ( $len > $maxlen ) {
							$maxlen = $len;
							$max    = $object;
						}
					}
					$routes[ $type ] = $max;
				}

				$found_menus[ $vuew_menu ] = \vw_list_chunk_pluck( $nav_object, $fields_to_get );
				$found_menus[ $vuew_menu ] = $hierarchical ? static::tree( $found_menus[ $vuew_menu ] ) : $found_menus[ $vuew_menu ];
			}

		}

		//var_dump( $found_menus);

		return [ 'menus' => $found_menus, 'paths' => $routes ];
	}

	/**
	 * @param $slug_pieces
	 * @param $type
	 *
	 * @return string
	 */
	protected static function create_route( $slug_pieces ) {

		//We're home
		if ( '' === $slug_pieces[0] ) {
			return '/';
		}

		$route = '';

		unset( $slug_pieces[0] );

		$count = count( $slug_pieces );

		foreach ( $slug_pieces as $k => $piece ) {
			if ( -- $count <= 0 ) {
				$route .= 'slug' . $k . '?';
				break;
			} else {
				$route .= 'slug' . $k . '?/:';
			}
		}

		return $route === '' ? '/:base' : '/:base/:' . $route;
	}

	/**
	 * @param array $elements
	 * @param int $parentId
	 *
	 * @return array
	 *
	 * @link        https://stackoverflow.com/questions/8587341/recursive-function-to-generate-multidimensional-array-from-database-result#answer-8587437
	 */
	protected static function tree( array $elements, $parentId = 0 ) {
		/** @var array $branch */
		$branch = [];

		foreach ( $elements as $element ) {

			if ( $element['menu_item_parent'] == $parentId ) {

				/** @var Menu::tree $children */
				$children = static::tree( $elements, $element['ID'] );

				//These keys are redundant after this.
				unset( $element['menu_item_parent'] );
				unset( $element['ID'] );

				//Add child element is not emoty
				if ( ! empty( $children ) ) {
					$element['children'] = $children;
				} else {
					$element['children'] = false;
				}
				$branch[] = $element;
			}
		}

		return $branch;
	}

	protected static function parse_url( $url ) {

	}
}