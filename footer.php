<?php
/**
 * Vuew Footer
 */

?>

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

<?php wp_footer(); ?>

<script>
    wp.hooks.addFilter('myTestFilter', function (query) {
        //query.payload.collection = 'poo';
        return query;
    });
</script>

</body>
</html>
