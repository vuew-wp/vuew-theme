<?php
/**
 * Vuew Footer
 */

?>

<script defer>
  //<![CDATA[
  var Vuew = <?php echo \Vuew\functions\boot\vw_json();?>;
  //]]>
</script>
<?php if ( ! WP_DEBUG ) : ?>
    <script defer>
      //<![CDATA[
	  <?php echo file_get_contents( get_theme_file_path( 'dist/vendor.js' ) ); ?>
	  <?php echo file_get_contents( get_theme_file_path( 'dist/main.js' ) ); ?>
      //]]>
    </script>
    <script type="text/javascript">
      /*(function () {
        if ('serviceWorker' in navigator) {
          window.addEventListener('load', function () {
            navigator.serviceWorker.register('<!?php // echo get_theme_file_uri('sw.js'); ?>');
          });
        }
      })();*/
    </script>
    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-121620171-1"></script>
    <script>
      window.dataLayer = window.dataLayer || [];

      function gtag() {
        dataLayer.push(arguments);
      }

      gtag('js', new Date());

      gtag('config', 'UA-121620171-1');
    </script>
<?php endif; ?>

<?php wp_footer(); ?>

</body>
</html>
