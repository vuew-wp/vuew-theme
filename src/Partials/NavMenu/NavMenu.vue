<template>
    <nav>
        <div :class="{ 'vw-navbar-disabled': isPending }">
            <ul class="tree">
                <nav-menu-item :key="menu.path" v-for="item in menu" :menu="item"></nav-menu-item>
            </ul>
        </div>
        <div v-show="isPending" class="uk-position-cover" style="background-color: rgba(255,255,255,0.4);">
            Loading...
        </div>
    </nav>
</template>

<script>

    import NavMenuItem from './NavMenuItem.vue';

    export default {
        props: [
            'menu'
        ],
        components: {
            'nav-menu-item': NavMenuItem
        },
        computed: {
            isPending: function () {
                return this.$store.getters['query/isPending'];
            }
        }
    };

</script>
<style lang="less">
   // @import "../../../assets/less/partials/off-canvas";
</style>