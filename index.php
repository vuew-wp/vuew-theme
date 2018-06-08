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

    <header style="min-height: 100px;"
            class="vw-primary-header uk-position-fixed uk-width-1-1 uk-box-shadow-small uk-box-shadow-hover-medium"><a
                href="/" class="uk-active"><img
                    src="https://www.10pl8.com/wp-content/uploads/2018/06/Screen-Shot-2018-04-20-at-10.47.51-PM-1.jpg"
                    alt="VUEW - A VueJs and WordPress theme" style="min-width: 100px;"></a> <a>MENU</a> / <a>USER</a>
    </header>

</div>
<!-- APP - END -->

<?php wp_footer(); ?>

<script>
    wp.hooks.addFilter('myTestFilter', function (query) {
        //query.payload.collection = 'poo';
        return query;
    });
</script>

</body>
</html>