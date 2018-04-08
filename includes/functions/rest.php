<?php
namespace Vuew\functions\rest_api;

/**
 * Can only be run after init hook has run.
 */
function map_bases(){

	$post_types = $taxonomies = [];

	$registered_post_types = get_post_types( [ 'public'   => true ] );
	$registered_taxonomies = get_taxonomies( [ 'public'   => true ] );

	foreach( $registered_post_types as $registered_post_type ){
		$post_types[ $registered_post_type ] = get_post_type_object( $registered_post_type )->rest_base;
	}

	foreach( $registered_taxonomies as $registered_taxonomy ){
		$taxonomies[ $registered_taxonomy ] = get_taxonomy( $registered_taxonomy )->rest_base;
	}

	/**
	 * add_filter( 'Vuew\functions\rest_api\map_bases' ... )
	 */
	return apply_filters( __FUNCTION__, [ 'taxonomy' => $taxonomies, 'post_type' => $post_types ] );
}
