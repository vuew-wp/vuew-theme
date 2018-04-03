<template>

    <header id="masthead" class="site-header" role="banner">

        <div class="row">


            <div class="column large-10 medium-10 small-10">

                <router-link :to="{ name: 'home'}" class="site-name"> {{ site_name }} </router-link>

            </div>

            <div class="column large-2 medium-2 small-2 end">

                <a id="nav-icon1" v-on:click="toggleMenu" v-bind:class="{open: isActive}">
                    <div>|</div>
                    <div>|</div>
                    <div>|</div>
                </a>

                <nav id="site-navigation" v-bind:class="{open: isActive}">

                    <ul>
                        <li v-for="item in menus">
                            <router-link :to="{
                                name: item.type,
                                params: {
                                    id: item.object_id,
                                    type_value: item.object
                                }}">
                                    {{ item.type }} /
                                    {{ item.object }} /
                                    {{ item.object_id }}
                            </router-link>
                        </li>

                    </ul>

                </nav>

            </div>

        </div>

    </header>

</template>

<script>
    export default {

        mounted: function() {

            //console.log( wp.api.collections );
            this.getMenu();
        },
        data() {
            return {

                menus: [],
                site_name: "poo",
                isActive: false

            };
        },
        methods: {

            getMenu: function() {

                this.menus = window.VuewConfig.menus.primary_menu;

            },
            getUrlName: function( url ) {

                const array = url.split( '/' );
                return array[ array.length - 2 ];
            },
            toggleMenu: function() {
                this.isActive = ! this.isActive;
            }

        }
    };
</script>

<style>


</style>
