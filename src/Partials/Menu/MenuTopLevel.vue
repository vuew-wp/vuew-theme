<template>
    <nav class="vw-top-level">
        <ul class="uk-list-inline uk-list" :class="{ 'vw-navbar-disabled': isPending }">
            <anchor :key="menu.path" v-for="item in menu" :menu="item"></anchor>
        </ul>
        <div v-show="isPending" class="uk-position-cover" style="background-color: transparent;"></div>
    </nav>
</template>

<script>

    import MenuTreeItem from './MenuTreeItem';
    import Anchor from "../../Proxy/Anchor";

    export default {
        components: {
            Anchor,
            MenuTreeItem
        },
        data() {
            return {
                menu: Vuew.config.navigation.menus.top_level
            }
        },
        computed: {
            isPending: function () {
                return this.$store.getters['query/isPending'];
            }
        }
    };

</script>
<style lang="less">
    @import "../../../assets/less/base/vars";

    .vw-top-level {

        ul {
            padding-left: 15px;
            margin: 0;
            white-space: nowrap;
            overflow-x: auto;
            overflow-y: hidden;
            font-size: 0.9rem;
            background-color: @vw-color-primary;

            li{
                margin: 10px 0 10px 20px;
                padding: 0 20px 0 0;
                border-right: 1px solid rgba(255,255,255,0.5);

                &:last-child{
                    border-right: none;
                }
                &:first-child{
                    margin-left: 0;
                }
            }

            a{
                color: #ffffff;
            }
        }
    }
</style>