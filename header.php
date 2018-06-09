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
    <link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">

	<?php // @todo make dynamic ?>
    <title>VUEW</title>
    <meta name="Description" content="A VueJS and WordPress Theme">

    <link rel="manifest" href="<?php echo \Vuew\URL; ?>manifest.json">
    <meta name="theme-color" content="#32c8f2"/>

	<?php wp_head(); ?>

    <link href="https://fonts.googleapis.com/css?family=Noto+Sans" rel="stylesheet">

    <style>
        body {
            margin: 0;
        }
    </style>
</head>

<body <?php body_class(); ?>>