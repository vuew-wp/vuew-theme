<?php
/**
 * Vuew theme functions.php
 *
 * @since       0.0.1
 */

namespace Vuew;

/**
 * Constant
 */
const VER = '0.0.1';

define( __NAMESPACE__ . '/DIR', trailingslashit( get_template_directory() ) );
define( __NAMESPACE__ . '/URL', trailingslashit( get_template_directory_uri() ) );