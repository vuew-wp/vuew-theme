<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>

    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">

	<?php wp_head(); ?>
</head>

<body <?php body_class() ?> >

<div id="content" class="site-content" style="display: none;">
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

<!-- APP - START -->
<div id="vuew-app"></div>
<!-- APP - END -->

<?php wp_footer(); ?>

</body>
</html>

