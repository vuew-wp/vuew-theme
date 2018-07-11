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

	const HTTP_HEADER_PREFIX = 'X-Vuew';

	const HTTP_HEADERS = [
		'user-reg'   => 'User-Registration',
		'user-login' => 'User-Login'
	];

	const API_NAMESPACE = 'vuew/v2';

	protected static $date_format = '';

	protected static $cache = [];

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

		add_action( 'rest_prepare_post_type', [ __CLASS__, 'intercept_rest_prepare' ], 10, 3 );

		add_action( 'rest_prepare_comment', [ __CLASS__, 'intercept_rest_prepare' ], 10, 3 );

		/** Load object cache */
		if( ! WP_DEBUG && class_exists( 'Redis' ) ) {
			add_action( 'rest_pre_dispatch', [ __CLASS__, 'pre_dispatch' ], 10, 3 );
		}

		static::$date_format = get_option( 'date_format' );

		/**
		 * Custom endpoints
		 */
		add_action( 'rest_api_init', [ __CLASS__, 'rest_api_init' ], 10 );
	}

	/**
	 * Intercept
	 *
	 * Proxy method to all rest_prepare_* actions
	 *
	 * @param   $data
	 * @param   $item
	 * @param   $request
	 *
	 * @return  mixed
	 *
	 * @since   0.0.1
	 */
	static function intercept_rest_prepare( $data, $item, $request ) {

		/** @var \WP_REST_Request $params */
		$params = $request->get_params();

		/** Ensure we only proceed if Vuew Request is set */
		if ( ! isset( $params['vr'] ) ) {
			return $data;
		}

		/** @var string $current_action */
		$current_action = str_replace( 'rest_prepare_', '', current_action() );
		/** If action is rest_prepare_{$post_type} */
		if ( in_array( $current_action, static::POST_TYPES ) ) {
			/** If request is simply to get comments */
			if ( isset( $params['vr_post_comments'] ) ) {
				return static::prepare_post_comments( $data, $item, $request );
			}

			//Get post, reduce payload of archives
			return static::prepare_post_type( $data, $item, $request );
		}
		/** If action is rest_prepare_{$taxonomy} */
		if ( in_array( $current_action, static::TAXONOMIES ) ) {
			return static::prepare_taxonomy_archive( $data, $item, $request );
		}
		/** If action is rest_prepare_post_type */
		if ( 'post_type' === $current_action ) {
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
			'date',
			'featured_media',
			'comment_status'
		];

		/**
		 * WP_Query returns 'ID' and API uses 'id'
		 */
		$p_id = $data->data['id'] ?? $data->data['ID'];

		/**
		 * Modify existing fields
		 */
		foreach ( $fields_to_keep as $field ) {
			/** Remove rendered from fields */
			if ( in_array( $field, [ 'content', 'title', 'excerpt' ] ) ) {
				if ( $field === 'title' ) {
					$_data[ $field ] = $data->data[ $field ]['rendered'];
					continue;
				}
				if ( $field === 'excerpt' ) {
					$excerpt         = isset( $data->data['excerpt'] ) ? $data->data['excerpt']['rendered'] : '';
					$_data[ $field ] = always_excerpt( $data->data['content']['rendered'], $excerpt );
					continue;
				}
				$_data[ $field ] = $data->data[ $field ]['rendered'];
				continue;
			}

			if ( 'comment_status' === $field ) {
				$_data[ $field ] = $data->data[ $field ] ?? null;
				continue;
			}

			/**
			 * Handle featured images
			 */
			if ( 'featured_media' === $field ) {
				$featured_image = $featured_image_lrg = $featured_image_med = '';
				if ( ( $attachment_id = $data->data['featured_media'] ) > 0 ) {
					$featured_image     = wp_get_attachment_image_url( $attachment_id, 'thumbnail' );
					$featured_image_med = wp_get_attachment_image_url( $attachment_id, 'medium' );
					$featured_image_lrg = wp_get_attachment_image_url( $attachment_id, 'large' );
				}
				$_data['featured_media']['thumbnail'] = $featured_image;
				$_data['featured_media']['medium']    = $featured_image_med;
				$_data['featured_media']['large']     = $featured_image_lrg;
				continue;
			}

			if ( 'date' === $field ) {
				$new_date        = date( static::$date_format, strtotime( $data->data[ $field ] ) );
				$_data[ $field ] = $new_date;
				continue;
			}

			$_data[ $field ] = $data->data[ $field ];
		}

		$_data[ 'comment_count' ] = (int) get_comments_number( $p_id );

		$_data['route'] = [
			'type'        => 'post_type',
			'rest_base'   => \Vuew\REST_BASES['post_type'][ $data->data['type'] ],
			'type_value'  => $data->data['type'],
			'breadcrumbs' => vw_make_bread( $data->data['link'] ),
			'path'        => untrailingslashit( parse_url( get_permalink( $p_id ) )['path'] )
		];

		$data->data = $_data;

		return $data;

	}

	static function prepare_post_comments( $data, $post, $request ) {

		/** @var int $p_id */
		$p_id = $data->data['id'] ?? $data->data['ID'];
		/** @var string $comment_order */
		$comment_order = strtoupper( get_option( 'comment_order', 'desc' ) );
		/** @var bool $can_thread_comments */
		$can_thread_comments = 1 === (int) get_option( 'thread_comments', 1 );
		/** @var int $thread_comments_depth */
		$thread_comments_depth = (int) get_option( 'thread_comments_depth', 5 );
		/** @var \WP_Comment_Query $comments */
		$comments = get_comments( [ 'order' => $comment_order, 'post_id' => $p_id ] );

		/**
		 * Mutate comments object
		 * by casting each comment as an array and adding the user
		 * avatar to each comment
		 *
		 * @var int $k
		 * @var \WP_Comment $comment
		 */
		foreach ( $comments as $k => $comment ) {
			$comments[ $k ]                          = (array) $comment;
			$comments[ $k ]['comment_author_avatar'] = get_avatar_url( $comments[ $k ]['comment_author_email'] );
		}
		/**
		 * @see vw_list_chunk_pluck()
		 * @var array $comments minimize payload by only sending what we need
		 */
		$comments = vw_list_chunk_pluck( $comments, [
			'comment_ID',
			'comment_date',
			'comment_parent',
			'comment_content',
			'comment_author_email',
			'comment_author_avatar',
		] );

		/**
		 * Return un-threaded comments if backend says no
		 */
		if ( ! $can_thread_comments ) {
			return $comments;
		}

		return apply_filters( 'Vuew\REST\Post\Comments', vw_tree( $comments, [
			'elem_id_key' => 'comment_ID',
			'parent_key'  => 'comment_parent',
			'depth_limit' => $thread_comments_depth
		] ) );

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
					'taxonomy'         => $item->taxonomy,
					'field'            => 'id',
					'terms'            => $item->term_id,
					'include_children' => false
				]
			],
			'posts_per_page' => get_option( 'posts_per_page' )
		] );

		global $wp_taxonomies;
		if ( isset( $wp_taxonomies[ $item->taxonomy ] ) ) {
			$data->data['post_type'] = $wp_taxonomies[ $item->taxonomy ]->object_type[0];
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
	static function prepare_post_type_archive( $data, $item, $request ) {

		/** @var \WP_REST_Request $params */
		$params = $request->get_params();

		static::query( $data->data, [
			'post_type'      => $params['type'],
			'posts_per_page' => get_option( 'posts_per_page' )
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
	static function query( &$_data, $args ) {

		/** @var \WP_Query $query */
		$query = new \WP_Query( $args );

		if ( ! $query->have_posts() ) {

			wp_reset_postdata();

			return $_data;

		} else {

			$_data['post_count']  = $query->post_count;
			$_data['found_posts'] = (int) $query->found_posts;

			foreach ( $query->posts as $p ) {
				/** @var int $attachment_id */
				$attachment_id = has_post_thumbnail( $p->ID ) ? (int) get_post_thumbnail_id( $p->ID ) : '';
				/** @var array $post */
				$post = [
					'id'             => $p->ID,
					'type'           => $p->post_type,
					'title'          => $p->post_title,
					'excerpt'        => always_excerpt( $p->post_content, $p->post_excerpt ),
					'content'        => $p->post_content,
					'date'           => date( static::$date_format, strtotime( $p->post_date ) ),
					'comment_status' => $p->comment_status,
					'comment_count'   => (int) get_comments_number( $p->ID ),
					'featured_media' => [
						'thumbnail' => $attachment_id,
						'medium'    => $attachment_id,
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

				if ( has_post_thumbnail( $p->ID ) ) {
					$featured_image     = wp_get_attachment_image_url( $attachment_id, 'thumbnail' );
					$medium_image       = wp_get_attachment_image_url( $attachment_id, 'medium' );
					$featured_image_lrg = wp_get_attachment_image_url( $attachment_id, 'large' );

					$post['featured_media']['thumbnail'] = $featured_image;
					$post['featured_media']['medium']    = $medium_image;
					$post['featured_media']['large']     = $featured_image_lrg;
				}

				$_data['posts'][] = $post;
			}
			wp_reset_postdata();
		}

		return $_data;

	}

	static function rest_api_init() {
		register_rest_route( self::API_NAMESPACE, '/user/login', [
			[
				'methods'  => \WP_REST_Server::CREATABLE,
				'callback' => array( __CLASS__, 'user_login' )
			]
		] );
		register_rest_route( self::API_NAMESPACE, '/user/register', [
			[
				'methods'  => \WP_REST_Server::CREATABLE,
				'callback' => array( __CLASS__, 'user_register' )
			]
		] );
	}

	/**
	 * @param $result
	 * @param $server \WP_REST_Server
	 * @param $request \WP_REST_Request
	 *
	 * @return bool|mixed
	 */
	static function pre_dispatch( $result, $server, $request ){

		$key = 'vuew_route_' . esc_url( self::API_NAMESPACE . $_SERVER['REQUEST_URI'] );

		if( in_array( $key, self::$cache ) ){
			return $result;
		}

		if( false === ( $rest_cache = wp_cache_get( $key, 'vuew_group' ) ) ){

			if( ! in_array( $key, self::$cache ) ) {
				array_push( self::$cache, $key );
			}

			$result  = $server->dispatch( $request );

			wp_cache_set( $key , $result, 'vuew_group', MINUTE_IN_SECONDS * 5 );
		}


		if ( is_callable([ $server, 'send_headers' ]) ) {
			$server->send_headers([
				self::HTTP_HEADER_PREFIX . '-Redis-Cache' => false === $rest_cache ? 'MISS' : 'HIT',
				'Cache-Control' => 'max-age=' . MINUTE_IN_SECONDS * 5
			]);
		}

		return $rest_cache;
	}

	/****************************
	 *********** USER ***********
	 ****************************/

	public static function auth_min_security( &$params ) {

		/**
		 * Return immediately if this is not a Vuew Request
		 */
		if ( ! isset( $params['vr'] ) ) {
			return static::format_response( 'rest_not_vuew_request', __( 'Not Vuew REST Request.' ), self::HTTP_HEADERS['user-reg'], 403 );
		}

		/**
		 * Already logged in
		 */
		if ( is_user_logged_in() ) {
			return static::format_response( 'rest_user_already_logged_in', __( 'User already logged in.' ), self::HTTP_HEADERS['user-reg'], 203 );
		}

		/**
		 * Don't take any nonsense!
		 */
		if ( ! wp_verify_nonce( $params['params']['nonce'], 'vuew_user_auth' ) ) {
			return static::format_response( 'rest_cookie_invalid_nonce', __( 'Nonce verification failure.' ), self::HTTP_HEADERS['user-reg'], 403 );
		}

		return true;
	}

	public static function user_login( \WP_REST_Request $request ) {

		/** @var array $params */
		$params = $request->get_params();
		$params = $params['params'];

		$info = [
			'user_login'    => $params['login-username'],
			'user_password' => $params['login-password'],
			'remember'      => isset( $params['login-password'] ) ? $params['login-password'] : true
		];

		$user_signon = wp_signon( $info, is_ssl() );

		if ( is_wp_error( $user_signon ) ) {
			$error     = isset( $user_signon->get_error_codes()[0] ) ? $user_signon->get_error_codes()[0] : null;
			$error_msg = __( 'Login failure, please check all fields and try again.' );
			if ( null !== $error ) {
				if ( $error === 'invalid_username' ) {
					$error_msg = __( 'Login failure, invalid username and/or password.' );
				}
				if ( $error === 'incorrect_password' ) {
					$error_msg = __( 'Login failure, invalid password.' );
				}
			}

			return static::format_response( null, $error_msg, self::HTTP_HEADERS['user-login'], 409 );
		}

		wp_set_current_user( $user_signon->ID );

		return static::format_response( null, __( 'Login successful.' ), self::HTTP_HEADERS['user-login'] );

	}

	public static function user_register( \WP_REST_Request $request ) {

		/** @var array $params */
		$params = $request->get_params();

		/**
		 * Return immediately if min security fails
		 */
		$min_security_pass = self::auth_min_security( $params );
		if ( true !== $min_security_pass ) {
			return $min_security_pass;
		}

		$params = $params['params'];

		/**
		 * WP Admin->Settings->General
		 */
		if ( 0 === (int) get_option( 'users_can_register' ) ) {
			return static::format_response( 'rest_user_registration_not_permitted', __( 'Registration is not permitted for this site.' ), self::HTTP_HEADERS['user-reg'], 403 );
		}

		$userdata = [
			'user_login' => $params['register-username'],
			'user_email' => $params['register-email'],
			'user_pass'  => $params['register-password']  // When creating an user, `user_pass` is expected.
		];

		if ( array_search( '', $userdata ) !== false ) {
			return static::format_response( 'rest_user_empty_field', __( 'One or more required fields found empty.' ), self::HTTP_HEADERS['user-reg'], 409 );
		}

		if ( ! is_email( $params['register-email'] ) ) {
			return static::format_response( 'rest_user_invalid_email', __( 'Invalid email.' ), self::HTTP_HEADERS['user-reg'], 409 );
		}

		$userdata['role'] = get_option( 'default_role', 'subscriber' );

		$user_register = wp_insert_user( $userdata );

		if ( is_wp_error( $user_register ) ) {
			return static::format_response( null, $user_register->get_error_message(), self::HTTP_HEADERS['user-reg'], 409 );
		}

		/**
		 * $userdata['user_password'] = $params['password'];
		 * unset( $userdata['user_pass'] );
		 *
		 * wp_set_current_user( $user_register, $userdata[ 'user_login' ] );
		 * wp_set_auth_cookie( $user_register, true, is_ssl() );
		 * do_action( 'wp_login', $params[ 'user_email' ] );
		 */

		return static::format_response( null, __( 'User authenticated.' ), self::HTTP_HEADERS['user-reg'] );

	}

	protected static function format_response( $code = null, $message = '', $header_key = '', $status_code = 200 ) {

		$message = '' !== $message ? $message : __( 'No message provided', 'vuew' );
		//$code = $code === null ? $message : $code;
		$response = new \WP_REST_Response( [
			'data'    => [
				'status' => $status_code
			],
			'code'    => $code,
			'message' => $message,
		] );

		$header_key = '' === $header_key ? $header_key : '-' . $header_key;

		$response->set_status( $status_code );
		$response->header( self::HTTP_HEADER_PREFIX . $header_key, $message );

		return $response;

	}
}