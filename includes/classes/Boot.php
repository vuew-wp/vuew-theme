<?php
/**
 * Boot object
 * Above the fold
 *
 * @since   z.z.z
 */

namespace Vuew\Core;

class Boot {
	function __construct( $queried_object ) {

	}
	public function home( $initial_object_type ){

		return REST::query( $initial_object_type, [
			'posts_per_page' => 2,
			'ignore_sticky_posts' => 1
		]);

	}
}