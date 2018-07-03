<?php
/**
 * Vuew Footer
 */

?>

<?php wp_footer(); ?>

<?php if ( ! WP_DEBUG ) : ?>
    <script defer>
		//<![CDATA[
		<?php echo file_get_contents( get_theme_file_path( 'dist/vendor.js' ) ); ?>
		<?php echo file_get_contents( get_theme_file_path( 'dist/main.js' ) ); ?>
		//]]>
    </script>
    <script>
		/*if ('serviceWorker' in navigator) {
			window.addEventListener('load', function() {
				navigator.serviceWorker.register(" //echo get_theme_file_uri('sw.js'); ?>').then(function(registration) {
					// Registration was successful
					console.log('ServiceWorker registration successful with scope: ', registration.scope);
				}, function(err) {
					// registration failed :(
					console.log('ServiceWorker registration failed: ', err);
				});
			});
		}*/
    </script>
    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-121620171-1"></script>
    <script>
		window.dataLayer = window.dataLayer || [];

		function gtag() {
			dataLayer.push( arguments );
		}

		gtag( 'js', new Date() );

		gtag( 'config', 'UA-121620171-1' );
    </script>
<?php endif; ?>

</body>
</html>
