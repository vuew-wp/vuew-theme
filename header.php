<?php
/**
 * Vuew head
 */
?>

<!DOCTYPE html>
<html <?php language_attributes(); ?>>
    <head>

        <meta charset="<?php bloginfo( 'charset' ); ?>">
        <meta name="viewport" content="width=device-width, initial-scale=1">

		<?php // @todo make dynamic ?>
        <title>VUEW</title>
        <meta name="Description" content="A VueJS and WordPress Theme">

        <link rel="manifest" href="<?php echo get_theme_file_uri( 'manifest.json' ); ?>">
        <link rel="canonical" href="<?php echo vw_get_current_url();?>" />

        <meta name="theme-color" content="#15a9d1"/>

		<?php wp_head(); ?>

        <style>
            <?php if( ! WP_DEBUG ) : ?>
                <?php echo file_get_contents( get_theme_file_path('dist/main.css') ); ?>
            <?php endif; ?>
        </style>

    </head>

<body <?php body_class(); ?>>
<?php
