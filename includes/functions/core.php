<?php
/**
 * Core
 *
 * Loads WordPress theme bootstrapping related functionality
 *
 * @since       0.0.1
 */

namespace Vuew\Core;

use TF_Core\Core\Helpers\Post_Type;

function init(){
	Post_Type::create( 'Entry', 'Entries', [
			'supports'  => [ 'title', 'editor', 'thumbnail', 'custom-fields', 'excerpt', 'author' ],
			'menu_icon' => 'dashicons-tickets-alt'
		]
	)->taxonomy( [
		[
			'Entry Category',
			'Entry Categories',
			[],
			[
				'name'      => __( 'Categories' ),
				'menu_name' => __( 'Categories' )
			]
		]
	] )->rewrite( [
			'bases' => [
				'entry',
				'entries'
			]
		]
	);
}

add_action( 'init', __NAMESPACE__ . '\\init' );
