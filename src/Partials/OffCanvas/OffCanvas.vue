<template>
    <div>
        <div class="vw-off-canvas-bar uk-box-shadow-small">
            <slot></slot>
        </div>
        <off-canvas-toggle :target="target"
                class="vw-off-canvas-overlay uk-position-top uk-position-fixed uk-width-1-1 uk-height-1-1"></off-canvas-toggle>
    </div>
</template>
<script>

    import OffCanvasToggle from "./OffCanvasToggle";

    export default {

        components: {
            OffCanvasToggle
        },
        props: {
            target: ""
        },
        mounted() {
            this.$store.dispatch( 'toggleOffCanvas', { target: this.target, open: false } );
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
                return this.$store.getters['getOffCanvasState']( this.target );
            }
        }
    };

</script>