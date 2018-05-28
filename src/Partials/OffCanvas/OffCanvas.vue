<template>
    <div>
        <div class="vw-off-canvas-bar uk-box-shadow-small">
            <nav-menu :menu="menu"></nav-menu>
        </div>
        <off-canvas-toggle
                class="vw-off-canvas-overlay uk-position-top uk-position-fixed uk-width-1-1 uk-height-1-1"></off-canvas-toggle>
    </div>
</template>
<script>

    import NavMenu from '../NavMenu/NavMenu.vue';
    import OffCanvasToggle from "./OffCanvasToggle";

    export default {

        components: {
            OffCanvasToggle,
            NavMenu
        },
        data() {
            return {
                menu: Vuew.config.navigation.menus.primary_menu
            };
        },
        mounted() {
            this.$store.dispatch('toggleOffCanvas', false);
        },
        watch: {
            isVisible: function (visible) {
                const bodyElem = document.body;
                if (visible) {
                    if (!bodyElem.classList.contains('vw-off-canvas-open')) {
                        bodyElem.classList.add('vw-off-canvas-open');
                    }
                    return;
                }
                if (bodyElem.classList.contains('vw-off-canvas-open')) {
                    bodyElem.classList.remove('vw-off-canvas-open');

                }

            }
        },
        computed: {
            isVisible: function () {
                return this.$store.getters['getOffCanvasState'];
            }
        }
    };

</script>
<style lang="less">
    @import "../../../assets/less/base/vars";
    @import "../../../assets/less/vendor/uikit/variables";
    /* The side navigation menu */
    .vw-off-canvas {

        &-bar {
            position: fixed;
            top: 100px;
            bottom: 0;
            width: @vw-pff-canvas-width;
            z-index: 1;
            left: -@vw-pff-canvas-width;
            background-color: @vw-color-lighter;
            overflow-x: hidden;
            transform: translateX(0);
            transition: transform 0.4s;

        }

        &-overlay {
            height: 0;
            opacity: 0;
            transition: height 0s, opacity 0.2s;
            background-color: @vw-color-lighter;
        }

        //Toggles class on root component
        &-open {

            .vw-off-canvas-bar {
                transform: translateX(100%);
            }

            .vw-site-container {
                transform: translateX(80%);
                opacity: 0.6
            }

            .vw-off-canvas-overlay {
                height: 100%;
                opacity: 0.6;
            }

        }
    }

    main {
        overflow: hidden;
    }

    .vw-site-container {
        transform: translateX(0);
        transition: transform 0.4s;
        display: block !important;
    }

    @media ( min-width: @breakpoint-medium ) {

        @vw-pff-canvas-width: 50%;

        .vw-off-canvas {

            &-bar {
                width: @vw-pff-canvas-width;
                left: -@vw-pff-canvas-width;
            }

            &-open {
                .vw-site-container {
                    transform: translateX(@vw-pff-canvas-width);
                }
            }
        }
    }

</style>