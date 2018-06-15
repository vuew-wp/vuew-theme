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
 * @todo        Replace array_map with standard loop
 */
class Menu extends Factory {

	/**
	 * Create WP Nav Menus
	 * @since   0.0.1
	 */
	public static function init() {
		\register_nav_menus(
			[
				'top_level' => __( 'Top level' ),
				'off_canvas' => __( 'Off canvas' ),
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
		$vuew_menus = [ 'off_canvas', 'top_level', 'footer_menu' ];
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

		$page_on_front = (int) get_option( 'page_on_front' );

		foreach ( $vuew_menus as $vuew_menu ) {
			if ( isset( $menu_locations[ $vuew_menu ] ) ) {

				if ( false === ( $nav_object = \wp_get_nav_menu_items( $menu_locations[ $vuew_menu ] ) ) ) {
					continue;
				}

				array_map( function ( $v ) use ( $page_on_front ) {

					/** Unless url is '/' lets remove the last slash from the URL. */
					$v->url = '/' !== $v->url ? untrailingslashit( $v->url ) : '/';

					/** @var  $path */
					$path = parse_url( $v->url );
					$path   = isset( $path['path'] ) ? trim( $path['path'], '/' ) : '/';

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
							if ( $page_on_front > 0 ) {
								$v->id         = $page_on_front;
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


					} else if ( $v->type !== 'post_type_archive' ) {
						$v->rest_base = \Vuew\REST_BASES[ $v->type ][ $v->object ];
					}

					else {
						$v->id        = 0;
						$v->rest_base = \Vuew\REST_BASES['post_type'][ $v->object ];
					}

				}, $nav_object );

				$found_menus[ $vuew_menu ] = \vw_list_chunk_pluck( $nav_object, $fields_to_get );
				$found_menus[ $vuew_menu ] = $hierarchical ? static::tree( $found_menus[ $vuew_menu ] ) : $found_menus[ $vuew_menu ];
			}

		}

		return [ 'menus' => $found_menus, 'paths' => static::get_routes() ];
	}

	protected static function get_routes(){
		/** @var array $depths */
		$depths = apply_filters( 'Vuew\\Routes', [
			'home'              => 0,
			'taxonomy'          => 6,
			'post_type'         => 6,
			'post_type_archive' => 2,
		]);
		$routes = [];
		foreach( $depths as $type => $depth ){

			$depths[ $type ] = apply_filters( 'Vuew\\Route\\Depth\\' . $type, $depth );
			if( $depths[ $type ] === 0 ) {
				$routes[ $type ] = '/';
				continue;
			}
			$route = '/:base';
			for( $i = 1, $m = $depths[ $type ]; $i <= $m; $i++ ){
				$route .= '/:slug' . $i . '?';
			}
			$routes[ $type ] = $route;

		}
		return $routes;
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