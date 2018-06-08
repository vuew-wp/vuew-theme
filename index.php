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

</head>

<body <?php body_class(); ?>>

<noscript>
    <div id="content" class="site-content">
        <div class="uk-grid">
            <?php

            if ( have_posts() ) {

                if ( is_home() && ! is_front_page() ) {
                    echo '<h1>' . single_post_title( '', false ) . '</h1>';
                }

                while ( have_posts() ) {

                    the_post();

                    if ( is_singular() ) {
                        the_title( '<h1>', '</h1>' );
                    } else {
                        the_title( '<h2><a href="' . esc_url( get_permalink() ) . '">', '</a></h2>' );
                    }

                    the_content();
                }
            }

            ?>
        </div>
    </div>
</noscript>

<!-- APP - START -->
<div id="vuew-app">
    <header class="vw-primary-header uk-position-fixed uk-width-1-1 uk-box-shadow-small uk-box-shadow-hover-medium"><a href="/" class="uk-active">
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 13.8 7" style="enable-background:new 0 0 13.8 7" xml:space="preserve"> <style type="text/css">.st0{fill-rule:evenodd;clip-rule:evenodd;fill:#fff}</style> <polygon class="st0" points="7.3,6.5 13,0.7 12.7,0.4 6.9,6.1 1.2,0.4 0.8,0.7 6.6,6.5 6.9,6.8 "></polygon> </svg>
        </a> <a>MENU</a> / <a>USER</a></header>
</div>
<!-- APP - END -->

<?php wp_footer(); ?>

<script>
    wp.hooks.addFilter( 'myTestFilter', function( query ){
        //query.payload.collection = 'poo';
        return query;
    } );
</script>

</body>
</html>