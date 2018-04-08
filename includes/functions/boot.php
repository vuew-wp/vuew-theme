<?php

namespace Vuew\functions\boot;

use Vuew\functions;

/**
 * @return array
 */
function object(){

	$initial_object_type = [];
	$queried_object = get_queried_object();

	//Single Post Type
	if ( is_single() || is_singular() ) {
		$initial_object_type = [
			'id'         => $queried_object->ID,
			'type'       => 'post_type',
			'type_value' => $queried_object->post_type,
			'rest_base'  => \Vuew\REST_BASES[ 'post_type' ][ $queried_object->post_type ]
		];
	} else if ( is_tag() || is_tax() || is_category() ) {
		$initial_object_type = [
			'id'         => $queried_object->term_id,
			'type'       => 'taxonomy',
			'type_value' => $queried_object->taxonomy,
			'rest_base'  => \Vuew\REST_BASES[ 'taxonomy' ][ $queried_object->taxonomy ]
		];
	}

	$initial_object_type[ 'path' ] = parse_url( tf_core_get_requested_uri() )['path'];

	$initial_object_type[ 'payload' ] = [
		'title' => 'This is Boot title',
		'content' => 'This is Boot content'
	];

	return $initial_object_type;
}