<?php
/**
 * Core
 *
 * Loads WordPress theme bootstrapping related functionality
 *
 * @since       0.0.1
 */

namespace Vuew\Core;

function init() {
	$labels = array(
		'name'                  => _x( 'Products', 'Post Type General Name', 'text_domain' ),
		'singular_name'         => _x( 'Products', 'Post Type Singular Name', 'text_domain' ),
		'menu_name'             => __( 'Products', 'text_domain' ),
		'name_admin_bar'        => __( 'Product', 'text_domain' ),
		'archives'              => __( 'Product Archives', 'text_domain' ),
		'attributes'            => __( 'Product Attributes', 'text_domain' ),
		'parent_item_colon'     => __( 'Parent Item:', 'text_domain' ),
		'all_items'             => __( 'All Products', 'text_domain' ),
		'add_new_item'          => __( 'Add New Product', 'text_domain' ),
		'add_new'               => __( 'Add New', 'text_domain' ),
		'new_item'              => __( 'New Product', 'text_domain' ),
		'edit_item'             => __( 'Edit Product', 'text_domain' ),
		'update_item'           => __( 'Update Product', 'text_domain' ),
		'view_item'             => __( 'View Product', 'text_domain' ),
		'view_items'            => __( 'View Products', 'text_domain' ),
		'search_items'          => __( 'Search Products', 'text_domain' ),
		'not_found'             => __( 'Not found', 'text_domain' ),
		'not_found_in_trash'    => __( 'Not found in Trash', 'text_domain' ),
		'featured_image'        => __( 'Featured Image', 'text_domain' ),
		'set_featured_image'    => __( 'Set featured image', 'text_domain' ),
		'remove_featured_image' => __( 'Remove featured image', 'text_domain' ),
		'use_featured_image'    => __( 'Use as featured image', 'text_domain' ),
		'insert_into_item'      => __( 'Insert into item', 'text_domain' ),
		'uploaded_to_this_item' => __( 'Uploaded to this Product', 'text_domain' ),
		'items_list'            => __( 'Products list', 'text_domain' ),
		'items_list_navigation' => __( 'Products list navigation', 'text_domain' ),
		'filter_items_list'     => __( 'Filter Products list', 'text_domain' ),
	);
	$args   = array(
		'label'               => __( 'Products', 'text_domain' ),
		'description'         => __( 'Post Type Description', 'text_domain' ),
		'labels'              => $labels,
		'supports'            => array( 'title', 'editor', 'thumbnail' ),
		'hierarchical'        => false,
		'public'              => true,
		'show_ui'             => true,
		'show_in_menu'        => true,
		'menu_position'       => 5,
		'show_in_admin_bar'   => true,
		'show_in_nav_menus'   => true,
		'can_export'          => true,
		'has_archive'         => true,
		'exclude_from_search' => false,
		'publicly_queryable'  => true,
		'capability_type'     => 'post',
		'show_in_rest'        => true,
		'rest_base'           => 'products',
		'rewrite'             => array(
			'slug'         => 'products'
		)
	);
	register_post_type( 'tf-product', $args );

	$labels = array(
		'name'                  => _x( 'Entries', 'Post Type General Name', 'text_domain' ),
		'singular_name'         => _x( 'Entries', 'Post Type Singular Name', 'text_domain' ),
		'menu_name'             => __( 'Entries', 'text_domain' ),
		'name_admin_bar'        => __( 'Entry', 'text_domain' ),
		'archives'              => __( 'Entry Archives', 'text_domain' ),
		'attributes'            => __( 'Entry Attributes', 'text_domain' ),
		'parent_item_colon'     => __( 'Parent Item:', 'text_domain' ),
		'all_items'             => __( 'All Entries', 'text_domain' ),
		'add_new_item'          => __( 'Add New Entry', 'text_domain' ),
		'add_new'               => __( 'Add New', 'text_domain' ),
		'new_item'              => __( 'New Entry', 'text_domain' ),
		'edit_item'             => __( 'Edit Entry', 'text_domain' ),
		'update_item'           => __( 'Update Entry', 'text_domain' ),
		'view_item'             => __( 'View Entry', 'text_domain' ),
		'view_items'            => __( 'View Entries', 'text_domain' ),
		'search_items'          => __( 'Search Entries', 'text_domain' ),
		'not_found'             => __( 'Not found', 'text_domain' ),
		'not_found_in_trash'    => __( 'Not found in Trash', 'text_domain' ),
		'featured_image'        => __( 'Featured Image', 'text_domain' ),
		'set_featured_image'    => __( 'Set featured image', 'text_domain' ),
		'remove_featured_image' => __( 'Remove featured image', 'text_domain' ),
		'use_featured_image'    => __( 'Use as featured image', 'text_domain' ),
		'insert_into_item'      => __( 'Insert into item', 'text_domain' ),
		'uploaded_to_this_item' => __( 'Uploaded to this Entry', 'text_domain' ),
		'items_list'            => __( 'Entries list', 'text_domain' ),
		'items_list_navigation' => __( 'Entries list navigation', 'text_domain' ),
		'filter_items_list'     => __( 'Filter Entries list', 'text_domain' ),
	);
	$args   = array(
		'label'               => __( 'Entries', 'text_domain' ),
		'description'         => __( 'Post Type Description', 'text_domain' ),
		'labels'              => $labels,
		'supports'            => array( 'title', 'editor', 'thumbnail' ),
		'hierarchical'        => false,
		'public'              => true,
		'show_ui'             => true,
		'show_in_menu'        => true,
		'menu_position'       => 5,
		'show_in_admin_bar'   => true,
		'show_in_nav_menus'   => true,
		'can_export'          => true,
		'has_archive'         => 'entries',
		'exclude_from_search' => false,
		'publicly_queryable'  => true,
		'capability_type'     => 'post',
		'show_in_rest'        => true,
		'rest_base'           => 'entries',
		'rewrite'             => array(
			'slug'         => 'entries'
		)
	);
	register_post_type( 'tf-entry', $args );

	$tax_labels = array(
		'name'                       => _x( 'Categories', 'Taxonomy General Name', 'vuew' ),
		'singular_name'              => _x( 'Category', 'Taxonomy Singular Name', 'vuew' ),
		'menu_name'                  => __( 'Category', 'vuew' ),
		'all_items'                  => __( 'All categories', 'vuew' ),
		'parent_item'                => __( 'Parent Category', 'vuew' ),
		'parent_item_colon'          => __( 'Parent Category:', 'vuew' ),
		'new_item_name'              => __( 'New Category Name', 'vuew' ),
		'add_new_item'               => __( 'Add New Category', 'vuew' ),
		'edit_item'                  => __( 'Edit Category', 'vuew' ),
		'update_item'                => __( 'Update Category', 'vuew' ),
		'view_item'                  => __( 'View Category', 'vuew' ),
		'separate_items_with_commas' => __( 'Separate categories with commas', 'vuew' ),
		'add_or_remove_items'        => __( 'Add or remove categories', 'vuew' ),
		'choose_from_most_used'      => __( 'Choose from the most used', 'vuew' ),
		'popular_items'              => __( 'Popular categories', 'vuew' ),
		'search_items'               => __( 'Search categories', 'vuew' ),
		'not_found'                  => __( 'Not Found', 'vuew' ),
		'no_terms'                   => __( 'No categories', 'vuew' ),
		'items_list'                 => __( 'Categories list', 'vuew' ),
		'items_list_navigation'      => __( 'Categories list navigation', 'vuew' ),
	);
	$rewrite    = array(
		'slug'         => 'categories',
		'with_front'   => false,
		'hierarchical' => true,
	);
	$args       = array(
		'labels'            => $tax_labels,
		'hierarchical'      => true,
		'public'            => true,
		'show_ui'           => true,
		'show_admin_column' => true,
		'show_in_nav_menus' => true,
		'show_tagcloud'     => true,
		'rewrite'           => $rewrite,
		'show_in_rest'      => true,
		'rest_base'         => 'entry-categories',
	);
	register_taxonomy( 'entry-category', array( 'tf-entry' ), $args );

}

add_action( 'init', __NAMESPACE__ . '\\init' );