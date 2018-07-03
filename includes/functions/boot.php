<?php

namespace Vuew\functions\boot;

use Vuew\Core\Boot;
use Vuew\functions;

/**
 * @return array
 */
function object() {

	$initial_object_type = [];
	$queried_object      = get_queried_object();

	$boot = new Boot( $queried_object );

	if( is_front_page() || is_home() ){
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
	} else if( is_archive() ){
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
	} else if( is_single() || is_singular() ){
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
