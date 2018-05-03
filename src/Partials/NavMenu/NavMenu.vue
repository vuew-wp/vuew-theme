<template>
    <nav class="uk-navbar-container" ref="UKNavbar">
        <div class="uk-navbar-left" :class="{ 'vw-navbar-disabled': isPending }">
            <ul class="uk-navbar-nav uk-nav-primary">
                <nav-menu-item :key="menu.path" v-for="item in menu" :menu="item"></nav-menu-item>
            </ul>
        </div>
        <div v-show="isPending" class="uk-position-cover" style="background-color: rgba(255,255,255,0.4);">
            Loading...
        </div>
    </nav>
</template>

<script>

    import UIkit from 'uikit';

    import NavMenuItem from './NavMenuItem.vue';

    export default {
        props: [
            'menu'
        ],
        components:{
            'nav-menu-item': NavMenuItem
        },
        mounted:function(){
            UIkit.navbar(this.$refs.UKNavbar);
        },
        computed:{
            isPending: function(){
                return this.$store.getters['query/isPending'];
            }
        }
    };

</script>
