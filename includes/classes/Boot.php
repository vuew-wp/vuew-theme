<?php
/**
 * Boot object
 * Above the fold
 *
 * @since   z.z.z
 */

namespace Vuew\Core;

class Boot {

	private $default_args = [
		'posts_per_page' => 5
	];

	function __construct( $queried_object, $args = [] ) {
		$this->default_args = wp_parse_args( $args, $this->default_args );
	}

	public function home( $initial_object_type ) {

		return REST::query( $initial_object_type, [
			'posts_per_page'      => $this->default_args['posts_per_page'],
			'ignore_sticky_posts' => 1
		] );

	}

	public function post_type_archive( $initial_object_type, $post_type ) {

		return REST::query( $initial_object_type, [
			'posts_per_page' => $this->default_args['posts_per_page'],
			'post_type'      => $post_type
		] );

	}

	public function taxonomy( $initial_object_type, $item ) {

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
}