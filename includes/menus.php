<?php
/**
 * Menus
 */

namespace Vuew\functions\menus;

if( ! function_exists( '\\Vuew_Child\\functions\\menus\\register' ) ) {
	function register() {
		\register_nav_menus(
			[
				'primary_menu' => __( 'Primary Menu' ),
				'footer_menu'  => __( 'Footer Menu' ),
			]
		);
	}
	add_action( 'init', __NAMESPACE__ . '\\register' );
}

/**
 * @param bool $hierarchical
 * @return array
 */
if( ! function_exists( '\\Vuew_Child\\functions\\menus\\get' ) ){
	function get( $hierarchical = true ){

		/** @var array $menu_locations */
		$menu_locations = get_nav_menu_locations();
		/** @var array $vuew_menus */
		$vuew_menus = [ 'primary_menu', 'footer_menu' ];
		/** @var array $fields_to_get Only these fields must be plucked */
		$fields_to_get = [
			'url',
			'type',
			'title',
			'child',
			'object',
			'object_id',
			'post_parent'
		];
		/** @var array $found_menus */
		$found_menus = [];

		foreach ( $vuew_menus as $vuew_menu ){
			if( isset( $menu_locations[ $vuew_menu ] ) ){

				if( false === ( $nav_object = \wp_get_nav_menu_items( $menu_locations[ $vuew_menu ] ) ) ){
					continue;
				}

				/** Cast all object_id as int */
				array_map( function ( $v ) {
					$v->object_id = (int) $v->object_id;
				}, $nav_object );

				//var_dump($nav_object);

				$found_menus[ $vuew_menu ] = \vw_list_chunk_pluck( $nav_object, $fields_to_get );
				$found_menus[ $vuew_menu ] = $hierarchical ? tree( $found_menus[ $vuew_menu ] ) : $found_menus[ $vuew_menu ];
			}
		}

		return $found_menus;
	}
}


/**
 * @link        https://stackoverflow.com/questions/8587341/recursive-function-to-generate-multidimensional-array-from-database-result#answer-8587437
 */
if( ! function_exists( '\\Vuew_Child\\menus\\tree' ) ) {
	function tree( array $elements, $parentId = 0 ) {
		/** @var array $branch */
		$branch = [];

		foreach ( $elements as $element ) {

			if ( $element['post_parent'] == $parentId ) {

				$children = tree( $elements, $element['object_id'] );

				//These keys are redundant after this.
				unset($element['post_parent']);

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