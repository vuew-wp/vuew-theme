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
                const isVisible = this.$store.getters['getOffCanvasState']( this.target );
                this.$store.dispatch('toggleOffCanvas', {target: this.target, open: !isVisible});
            }
        }
    }
</script>