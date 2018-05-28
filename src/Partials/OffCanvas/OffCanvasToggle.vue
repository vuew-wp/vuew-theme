<template>
    <a @click="toggleOffCanvas">
        <slot></slot>
    </a>
</template>
<script>
    export default {
        methods:{
            toggleOffCanvas(){
                this.$store.dispatch( 'toggleOffCanvas' );
            }
        }
    }
</script>