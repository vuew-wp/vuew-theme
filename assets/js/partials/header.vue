<template>
    <header>
        <div class="column large-10 medium-10 small-10">
            <router-link :to="{ name: 'home'}" class="site-name"> {{ site_name }} </router-link>
        </div>
        <nav id="site-navigation">
            <ul>
                <li v-for="item in menus.primary_menu">
                    <nav-menu v-bind:menu="item"></nav-menu>
                </li>
            </ul>
        </nav>
    </header>
</template>

<script>

    import NavMenu from './NavMenu.vue';

    export default {

        components:{
            'nav-menu': NavMenu
        },
        data() {
            return {

                menus: {
                    primary_menu: Vuew.routing.menus.primary_menu
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

<style>


</style>
