<template>
    <a @click="toggleOffCanvas">
        <slot></slot>
    </a>
</template>
<script>
    export default {
        props: {
            target: ""
        },
        methods: {
            toggleOffCanvas() {
                const isVisible = this.$store.getters['layout/offCanvasState']( this.target );
                this.$store.dispatch('layout/toggleOffCanvas', { target: this.target, open: ! isVisible }, { root:true });
            }
        }
    }
</script>