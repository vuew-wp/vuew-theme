<template>
    <router-link :to="setHomeRouteParams" exact>
        <Attachment v-if="customLogo" :src="customLogo" style="width: 100px;"></Attachment>
        <h1 v-else>{{ brandName }}</h1>
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
                brandName: 'VUEW',
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
