<?php get_header(); ?>

    <!-- APP - START -->
    <div style="position: absolute; top: 0; width: 100%; z-index: 0;">
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
			line-height: 100px;">MENU</a> / <a style="font-family: sans-serif;
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
    <div id="vuew-app">
    </div>
    <!-- APP - END -->

<?php get_footer(); ?>