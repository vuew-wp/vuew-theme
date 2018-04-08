<?php

namespace Vuew\Core;

/**
 * Class Factory
 * @package Vuew\Core
 */
abstract class Factory
{
	/**
	 * Create
	 *
	 * @return object
	 */
	final public static function create(){
		/** @var string $called_class */
		$called_class = get_called_class();
		/** @var array $args */
		$args = func_get_args();

		if( isset( $args[0] ) ) {
			return new $called_class( ...$args );
		} else {
			return new $called_class();
		}
	}


	/**
	 * @return null|\ReflectionClass
	 */
	final public static function singleton()
	{
		static $inst = null;
		if ( $inst === null ) {
			/** @var \ReflectionClass $called_class */
			$ref_class = new \ReflectionClass( get_called_class() );
			/** @var array $args */
			$args = func_get_args();
			/** @var \ReflectionClass $inst */
			$inst = $ref_class->newInstanceArgs( $args );
		}
		return $inst;
	}
}