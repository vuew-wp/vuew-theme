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

	<?php // @todo make dynamic ?>
    <title>VUEW</title>
    <meta name="Description" content="A VueJS and WordPress Theme">

    <link rel="manifest" href="<?php echo \Vuew\URL; ?>manifest.json">
    <meta name="theme-color" content="#15a9d1"/>

	<?php wp_head(); ?>

    <!--<link rel="preload" href="https://fonts.googleapis.com/css?family=Noto+Sans" as="style">-->
    <link rel="preload" href="<?php echo get_theme_file_uri( 'dist/main.css' ); ?>" as="style">

    <!--https://github.com/filamentgroup/loadCSS/>
<link rel="preload" href="https://fonts.googleapis.com/css?family=Noto+Sans" as="style" onload="this.onload=null;this.rel='stylesheet'">
<link rel="preload" href="<?php /*echo get_theme_file_uri( 'dist/main.css' ); */?>" as="style" onload="this.onload=null;this.rel='stylesheet'">-->

    <style>
        body {margin: 0;}
    </style>
</head>

<body <?php body_class(); ?>>
<div style="display:none; position: absolute; top: 0; width: 100%; z-index: 0; font-family: Noto Sans,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif;font-size: 16px;
    font-weight: 400;
    line-height: 1.5;">
    <header style="z-index: 2;
			top: 0;
			transition: top 0.3s;
			box-shadow: 0 2px 8px rgba(0,0,0,.08);
			min-height: 100px;
			position: relative;">
        <a href="/" class="uk-active" title="Vuew - WordPress and VuewJS theme" style="min-width: 100px; float: left;">
            <div style="width: 100px;"><!--?xml version="1.0" encoding="utf-8"?-->
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px"
                     y="0px" viewBox="0 0 300 300" style="enable-background:new 0 0 300 300" xml:space="preserve"> <style
                            type="text/css">.st0 {
                            display: none
                        }

                        .st1 {
                            display: inline
                        }

                        .st2 {
                            fill: #15a9d1
                        }

                        .st3 {
                            fill: #18a5c6
                        }

                        .st4 {
                            fill: #ccc
                        }

                        .st5 {
                            fill: #1eb5d8
                        }

                        .st6 {
                            fill: #999
                        }

                        .st7 {
                            fill: #aaa
                        }

                        .st8 {
                            fill: #888
                        }</style>
                    <g id="Layer_2" class="st0"></g>
                    <g id="Layer_1" class="st0">
                        <g class="st1">
                            <path id="v_1_" class="st2"
                                  d="M236.2,77.1l-39.5,124L157.8,86.8l-16.1,2L187,220h19.5l47.3-145L236.2,77.1z"></path>
                            <path id="v_2_" class="st3" d="M159.8,93.2l-2-6.5l-16.1,2l9.5,27.6L159.8,93.2z"></path>
                            <path id="v_copy_1_" class="st4"
                                  d="M54.2,99.6L93.6,220h19.5l44.7-133.2l-18.6,2.3l0,0l-36,112.1L70.4,97.6L54.2,99.6z"></path>
                        </g>
                    </g>
                    <g id="Layer_3">
                        <g>
                            <path class="st2" d="M201.1,126.3L175.6,67c-0.6-1.5-2.1-2.4-3.7-2.3L135.4,67c-2.6,0.2-4.3,2.9-3.3,5.3L187.3,201
			c6.5,15.2,28,15.2,34.5,0l54.5-127.1c3.2-7.5-2.6-15.7-10.7-15.1l-20,1.3c-5.8,0.4-10.9,3.9-13.1,9.3l-24.4,57
			C206.8,129.4,202.4,129.4,201.1,126.3z"></path>
                            <polygon class="st5" points="157.3,131.1 130,67.3 174.6,64.5 180.3,77.8 		"></polygon>
                            <g>
                                <polygon class="st6"
                                         points="67.1,71.1 72.4,71.5 99.7,134.5 94.3,134.1 			"></polygon>
                                <polygon class="st7"
                                         points="122.4,67.3 169.1,64.1 94.9,240.9 22.8,74.2 67.1,71.1 94.3,134.1 			"></polygon>
                                <polygon class="st8"
                                         points="169.1,64.1 174.5,64.4 100.2,241.2 94.9,240.9 			"></polygon>
                            </g>
                        </g>
                    </g> </svg>
            </div>
        </a>
    </header>
    <ul style="margin: 0 0 20px; background-color:#15a9d1; z-index: 0">
        <li style="list-style: none;
			display: inline-block;
			margin: 10px 0 10px 20px;
			padding: 0 20px 0 0;">&nbsp;
        </li>
    </ul>
</div>