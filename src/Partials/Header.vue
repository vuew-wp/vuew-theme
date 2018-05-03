<template>
    <header>
        <custom-logo></custom-logo>
        <nav-menu id="site-navigation" :menu="menus.primary_menu"></nav-menu>
    </header>
</template>

<script>

    import CustomLogo from './CustomLogo';
    import NavMenu from './NavMenu/NavMenu.vue';

    export default {

        components:{
            'nav-menu': NavMenu,
            'custom-logo': CustomLogo
        },
        data() {
            return {
                menus: {
                    primary_menu: Vuew.config.navigation.menus.primary_menu
                },
                site_name: "Vuew Theme",
                isActive: true

            };
        },
        methods: {
            toggleMenu: function() {
                this.isActive = ! this.isActive;
            }
        }
    };
</script>