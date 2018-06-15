<template>
    <router-link :to="setHomeRouteParams" exact>
        <Attachment :alt="brandName" v-if="customLogo" :src="customLogo"></Attachment>
        <div style="width: 100px;" v-else v-html="require( '../svg/vuew-logo.svg' )"></div>
    </router-link>
</template>

<script>

    import Attachment from "./Attachment";

    export default {

        components: {
            Attachment
        },

        mounted: function(){
            this.customLogo = Vuew.config.customLogo;
        },

        data() {
            return {
                brandName: 'VUEW - A VueJs and WordPress theme',
                customLogo: false
            }
        },

        computed: {
            setHomeRouteParams: function () {

                const pageOnFront = Vuew.config.pageOnFront;
                let route = {
                    name: 'home',
                    params: {
                        base: 'home',
                        id: 0,
                        type: 'home',
                        type_value: false,
                        rest_base: false
                    }
                };

                if( pageOnFront > 0 ){
                    route.params.base = 'pages';
                    route.params.id = pageOnFront;
                    route.params.type = 'post_type';
                    route.params.type_value = 'page';
                    route.params.rest_base = 'pages';
                }

                return route;
            }
        }

    };
</script>
