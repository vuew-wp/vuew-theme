<?php
/**
 * Vuew Footer
 */

?>

<div style="position: absolute; top: 0; width: 100%; z-index: 0; font-family: Noto Sans,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif;font-size: 16px;
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
</div>

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
