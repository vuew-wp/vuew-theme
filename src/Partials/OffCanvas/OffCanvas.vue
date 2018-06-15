<template>
    <div :is-visible="isVisible" :class="'vw-off-canvas-bar-' + target" class="vw-off-canvas-bar uk-box-shadow-small">
        <slot></slot>
    </div>
</template>
<script>

    export default {

        props: {
            target: ""
        },

        mounted() {
            this.$store.dispatch( 'layout/addOffCanvas', { target: this.target, open: false }, { root: true } );
        },

        watch: {
            isVisible: function (visible) {
                const bodyElem = document.body;
                const cssClass = 'vw-off-canvas-open-' + this.target;
                if (visible) {
                    if (!bodyElem.classList.contains( cssClass ) ) {
                        bodyElem.classList.add( cssClass );
                    }
                    return;
                }
                if (bodyElem.classList.contains( cssClass ) ) {
                    bodyElem.classList.remove( cssClass );
                }

            }
        },

        computed: {
            isVisible: function () {
                return this.$store.getters['layout/offCanvasState']( this.target );
            }
        }

    };

</script>
<style lang="less">
    @import "../../../assets/less/base/vars";
    @import "../../../assets/less/partials/off-canvas";
</style>