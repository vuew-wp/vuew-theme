<template>
    <nav>
        <div :class="{ 'vw-navbar-disabled': isPending }">
            <ul class="tree">
                <menu-tree-item :key="menu.path" v-for="item in menu" :menu="item"></menu-tree-item>
            </ul>
        </div>
        <div v-show="isPending" class="uk-position-cover" style="background-color: rgba(255,255,255,0.4);">
            Loading...
        </div>
    </nav>
</template>

<script>

    import MenuTreeItem from './MenuTreeItem';

    export default {
        props: [
            'menu'
        ],
        components: {
            MenuTreeItem
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