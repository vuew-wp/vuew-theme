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
    
    <link rel="preload" href="https://fonts.googleapis.com/css?family=Noto+Sans" as="style">

    <style>
        body {
            margin: 0;
        }
    </style>
</head>

<body <?php body_class(); ?>>

<!--<div style="position: absolute; top: 0; width: 100%; z-index: 0; font-family: Noto Sans,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif;font-size: 16px;
    font-weight: 400;
    line-height: 1.5;">
    <header style="z-index: 2;
			top: 0;
			transition: top 0.3s;
			box-shadow: 0 2px 8px rgba(0,0,0,.08);
			min-height: 100px;
			position: relative;">
        <a href="/" class="uk-active" style="min-width: 100px; float: left;"><img
                    src="https://www.10pl8.com/wp-content/uploads/2018/04/Screen-Shot-2018-04-20-at-10.47.51-PM.png"
                    alt="VUEW - A VueJs and WordPress theme" style="width: 100px;"></a>
        <a style="font-family: sans-serif;
			color: #32c8f2;
			line-height: 100px;">MENU</a><span style="
    -webkit-text-size-adjust: 100%;
    background: #fff;
    color: #666;"> / </span><a style="font-family: sans-serif;
			color: #32c8f2;
			line-height: 100px;">USER</a>
    </header>
    <ul style="margin: 0 0 20px; background-color:#32c8f2;">
        <li style="list-style: none;
			display: inline-block;
			margin: 10px 0 10px 20px;
			padding: 0 20px 0 0;">&nbsp;
        </li>
    </ul>
</div>-->