<?php
/**
 * Menu
 */

namespace Vuew\Core;

use Vuew\functions;

class Menu extends Factory {

	static $routes = [];

	function __construct() {
		add_action( 'init', [ __CLASS__, 'register' ] );
	}

	public static function register() {
		\register_nav_menus(
			[
				'primary_menu' => __( 'Primary Menu' ),
				'footer_menu'  => __( 'Footer Menu' ),
			]
		);
	}

	public static function get( $hierarchical = true ) {

		/** @var array $menu_locations */
		$menu_locations = get_nav_menu_locations();
		/** @var array $vuew_menus */
		$vuew_menus = [ 'primary_menu', 'footer_menu' ];
		/** @var array $fields_to_get Only these fields must be plucked */
		$fields_to_get = [
			'ID',
			'type',
			'slug',
			'title',
			'object',
			'rest_base',
			'object_id',
			'breadcrumb',
			'menu_item_parent'
		];
		/** @var array $found_menus */
		$found_menus = $routes = [];

		foreach ( $vuew_menus as $vuew_menu ) {
			if ( isset( $menu_locations[ $vuew_menu ] ) ) {

				if ( false === ( $nav_object = \wp_get_nav_menu_items( $menu_locations[ $vuew_menu ] ) ) ) {
					continue;
				}

				/** Cast all object_id as int and add slug */
				array_map( function ( $v ) {

					$path        = trim( parse_url( $v->url )['path'], '/' );
					$slug_pieces = explode( '/', $path );

					$v->object_id  = (int) $v->object_id;
					$v->breadcrumb = $slug_pieces;
					$v->rest_base  = \Vuew\REST_BASES[$v->type][ $v->object ];

					static::$routes[ $v->type ][] = static::create_route( $slug_pieces, $v->type );

				}, $nav_object );

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

		return [ 'menus' => $found_menus, 'paths' => $routes ];
	}

	/**
	 * @param $slug_pieces
	 * @param $type
	 *
	 * @return string
	 */
	protected static function create_route( $slug_pieces, $type ) {

		$route = '/:base/:';

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

		return $route;
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

				$children = static::tree( $elements, $element['ID'] );

				//These keys are redundant after this.
				unset( $element['menu_item_parent'] );

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
}