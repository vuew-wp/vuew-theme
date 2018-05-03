<?php
namespace Vuew\functions\rest_api;

/**
 * Can only be run after init hook has run.
 */
function map_bases(){

	/** @var array $post_types $taxonomies */
	$post_types = $taxonomies = [];

	/** @var array $registered_post_types */
	$registered_post_types = get_post_types( [ 'public'   => true ] );
	/** @var array $registered_taxonomies */
	$registered_taxonomies = get_taxonomies( [ 'public'   => true ] );

	/** @var array $taxonomy_blacklist - exclusion list */
	$taxonomy_blacklist = [ 'post_format' ];

	foreach( $registered_post_types as $registered_post_type ){
		$post_types[ $registered_post_type ] = get_post_type_object( $registered_post_type )->rest_base;
	}

	foreach( $registered_taxonomies as $registered_taxonomy ){
		if( in_array( $registered_taxonomy, $taxonomy_blacklist ) )
			continue;
		$taxonomies[ $registered_taxonomy ] = get_taxonomy( $registered_taxonomy )->rest_base;
	}

	/**
	 * add_filter( 'Vuew\functions\rest_api\map_bases' ... )
	 */
	return apply_filters( __FUNCTION__, [ 'taxonomy' => $taxonomies, 'post_type' => $post_types ] );
}
