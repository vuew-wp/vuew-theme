<?php
/**
 * REST
 */

namespace Vuew\Core;

/**
 * Class REST
 *
 * @package Vuew\Core
 *
 * @since   0.0.1
 */
class REST extends Factory {

	const POST_TYPES = [
		'post',
		'page',
		'tf-entry',
		'tf-product'
	];

	const TAXONOMIES = [
		'category',
		'post_tag',
		'entry-category'
	];

	/**
	 * REST constructor.
	 */
	function __construct() {

		/** @var string $type */
		foreach ( apply_filters( __CLASS__ . '\prepare_post_type', static::POST_TYPES ) as $type ) {
			add_action( 'rest_prepare_' . $type, [ __CLASS__, 'intercept_rest_prepare' ], 10, 3 );
		}
		/** @var string $tax */
		foreach ( apply_filters( __CLASS__ . '\prepare_taxonomy', static::TAXONOMIES ) as $tax ) {
			add_action( 'rest_prepare_' . $tax, [ __CLASS__, 'intercept_rest_prepare' ], 10, 3 );
		}

		add_action( 'rest_prepare_post_type', [ __CLASS__, 'intercept_rest_prepare' ], 10, 3);
	}

	/**
	 * Intercept
	 *
	 * Proxy and guard method to all rest_prepare_* actions
	 *
	 * @param   $data
	 * @param   $item
	 * @param   $request
	 *
	 * @return  mixed
	 *
	 * @since   0.0.1
	 */
	static function intercept_rest_prepare( $data, $item, $request ){

		/** @var \WP_REST_Request $params */
		$params = $request->get_params();

		/** Ensure we only proceed if VuewQuery is set */
		if ( ! isset( $params['vq'] ) ) {
			return $data;
		}

		/** @var string $current_action */
		$current_action = str_replace( 'rest_prepare_', '', current_action() );
		/** If action is rest_prepare_{$post_type} */
		if( in_array( $current_action, static::POST_TYPES ) ){
			return static::prepare_post_type( $data, $item, $request );
		}
		/** If action is rest_prepare_{$taxonomy} */
		if( in_array( $current_action, static::TAXONOMIES ) ){
			return static::prepare_taxonomy_archive( $data, $item, $request );
		}
		/** If action is rest_prepare_post_type */
		if( 'post_type' === $current_action ){
			return static::prepare_post_type_archive( $data, $item, $request );
		}

		return $data;

	}

	/**
	 * Post Type
	 *
	 * Restructure all single post type objects to Vuew structure.
	 *
	 * @param   $data
	 * @param   $post
	 * @param   $request
	 *
	 * @return  mixed
	 *
	 * @since   0.0.1
	 */
	static function prepare_post_type( $data, $post, $request ) {

		/** @var array $_data */
		$_data = [];

		/** @var array $fields_to_keep */
		$fields_to_keep = [
			'id',
			'title',
			'excerpt',
			'content',
			'featured_media'
		];

		/**
		 * Modify existing fields
		 */
		foreach ( $fields_to_keep as $field ) {
			/** Remove rendered from fields */
			if ( in_array( $field, [ 'content', 'title', 'excerpt' ] ) ) {
				$_data[ $field ] = $data->data[ $field ]['rendered'];
				continue;
			}
			/**
			 * Handle featured images
			 */
			if ( 'featured_media' === $field ) {
				$featured_image = $featured_image_lrg = '';
				if ( ( $attachment_id = $data->data['featured_media'] ) > 0 ) {
					$featured_image = wp_get_attachment_image_url( $attachment_id, 'thumbnail' );
					$featured_image_lrg = wp_get_attachment_image_url( $attachment_id, 'large' );
				}
				$_data['featured_media']['thumbnail'] = $featured_image;
				$_data['featured_media']['large'] = $featured_image_lrg;
				continue;
			}
			$_data[ $field ] = $data->data[ $field ];
		}

		$_data['route'] = [
			'type'        => 'post_type',
			'rest_base'   => \Vuew\REST_BASES[ 'post_type' ][ $data->data['type'] ],
			'type_value'  => $data->data['type'],
			'breadcrumbs' => vw_make_bread( $data->data['link'] ),
			'path'        => untrailingslashit( parse_url( get_permalink( $data->data['ID'] ) )['path'] )
		];

		$data->data = $_data;

		return $data;

	}

	/**
	 * Taxonomy Archive
	 *
	 * Restructure all /wp/v2/{taxonomy} requests to Vuew structure.
	 *
	 * @param   $data
	 * @param   $item
	 * @param   $request
	 *
	 * @return  mixed
	 *
	 * @since   0.0.1
	 */
	static function prepare_taxonomy_archive( $data, $item, $request ) {

		static::query( $data->data, [
			'tax_query'      => [
				[
					'taxonomy' => $item->taxonomy,
					'field'    => 'id',
					'terms'    => $item->term_id
				]
			],
			/*'orderby'        => 'date',
			'order'          => "DESC",*/
			'posts_per_page' => get_option( 'posts_per_page' )
		] );

		global $wp_taxonomies;
		if ( isset( $wp_taxonomies[ $item->taxonomy ] ) ) {
			$data->data[ 'post_type' ] = $wp_taxonomies[ $item->taxonomy ]->object_type[0];
		}

		return $data;
	}

	/**
	 * Post Type Archive
	 *
	 * Restructure all /wp/v2/types/* requests to Vuew structure.
	 *
	 * @param   $data
	 * @param   $item
	 * @param   $request
	 *
	 * @return  mixed
	 *
	 * @since   0.0.1
	 */
	static function prepare_post_type_archive( $data, $item, $request ){

		/** @var \WP_REST_Request $params */
		$params = $request->get_params();

		static::query( $data->data, [
			'post_type'      => $params['type'],
			'posts_per_page' => get_option( 'posts_per_page' ),
			/*'orderby'        => 'date',
			'order'          => "DESC"*/
		] );

		return $data;
	}

	/**
	 * Query
	 *
	 * Method for performing all WP_Query's
	 *
	 * @param   $_data
	 * @param   $args
	 *
	 * @return  mixed
	 *
	 * @since   0.0.1
	 */
	static function query( &$_data, $args ){

		/** @var \WP_Query $query */
		$query = new \WP_Query( $args );

		if ( ! $query->have_posts() ) {

			wp_reset_postdata();
			return $_data;

		} else {

			$_data['post_count'] = $query->post_count;
			$_data['found_posts'] = (int) $query->found_posts;

			foreach ( $query->posts as $p ) {
				/** @var int $attachment_id */
				$attachment_id = has_post_thumbnail( $p->ID ) ? (int) get_post_thumbnail_id( $p->ID ) : '';
				/** @var array $post */
				$post = [
					'id'             => $p->ID,
					'type'           => $p->post_type,
					'title'          => $p->post_title,
					'excerpt'        => $p->post_excerpt,
					'content'        => $p->post_content,
					'featured_media' => [
						'thumbnail' => $attachment_id,
						'large'     => $attachment_id,
					],
					'route'          => [
						'breadcrumbs' => vw_make_bread( get_permalink( $p->ID ) ),
						'path'        => untrailingslashit( parse_url( get_permalink( $p->ID ) )['path'] ),
						'rest_base'   => \VUEW\REST_BASES['post_type'][ $p->post_type ],
						'type'        => 'post_type',
						'type_value'  => $p->post_type,
					],
				];

				if( has_post_thumbnail( $p->ID ) ) {
					$featured_image     = wp_get_attachment_image_url( $attachment_id, 'thumbnail' );
					$featured_image_lrg = wp_get_attachment_image_url( $attachment_id, 'large' );

					$post['featured_media']['thumbnail'] = $featured_image;
					$post['featured_media']['large'] = $featured_image_lrg;
				}

				$_data['posts'][] = $post;
			}
			wp_reset_postdata();
		}

		return $_data;

	}
}