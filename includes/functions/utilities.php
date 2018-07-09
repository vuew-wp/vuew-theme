<?php
/**
 * List chunk pluck
 *
 * Like wp_list_pluck() but with the ability to match chunks of data using a index array of items to
 * pluck from associative array|object
 *
 * @param   $list
 * @param   array $keys_to_plucks
 *
 * @return  mixed
 *
 * @since   0.0.1
 */
function vw_list_chunk_pluck( $list, $keys_to_plucks = [] ){

	/** @var array $plucks */
	$plucks = $reduced_fields = [];

	//Negate early
	if( ! isset( $keys_to_plucks[ 0 ] ) ){
		return $list;
	}

	//Make keys to pluck an associative array
	foreach( $keys_to_plucks as $pluck ){
		$plucks[ $pluck ] = null;
	}

	//Match up the items from required
	//keys and intersect with object|array passed.
	foreach ( $list as $k => $value ) {
		/** Added reduced array(s) to returned menus */
		$reduced_fields[ $k ] = array_intersect_key( (array) $value, $plucks );
	}

	return $reduced_fields;

}

function vw_make_bread( $url ){
	$path = trim( parse_url( $url )['path'], '/' );
	$path = '' === $path ? '/' : $path;
	$slug_pieces = explode( '/', $path );

	return $slug_pieces;
}

function vw_get_requested_uri(){
	global $wp;
	return home_url( add_query_arg( array(), $wp->request ) );
}

function always_excerpt( $content, $excerpt = '' ){
	if( '' !== $excerpt && null !== $excerpt ) {
		return nl2br( $excerpt );
	}
	$text = strip_shortcodes( $content );
	//$text = apply_filters( 'the_content', $text );
	$text = str_replace(']]>', ']]&gt;', $text);

	$excerpt_length = apply_filters( 'excerpt_length', 20 );
	$excerpt_more = apply_filters( 'excerpt_more', '...' );

	$text = wp_trim_words( $text, $excerpt_length, $excerpt_more );
	return nl2br( $text );
}

remove_filter ('the_excerpt', 'wpautop' );

function vw_tree( $elements, $args = [] ) {

	$args = wp_parse_args( $args, [
		'parent_id'   => 0,
		'parent_key'  => 'parent',
		'elem_id_key' => 'ID'
	] );

	/** @var array $branch */
	$branch = [];

	foreach ( $elements as $element ) {

		$element = (array) $element;

		if ( (int) $element[ 'comment_parent' ] === (int)$args['parent_id'] ) {

			$children = vw_tree( (array) $elements, [
				'parent_key' => $args['parent_key'],
				'parent_id'  => $element['comment_ID']
			] );

			if ( ! empty( $children ) ) {
				$element[ 'children' ] = $children;
			} else {
				$element[ 'children' ] = false;
			}
			$branch[] = $element;
		}
	}

	return $branch;
}