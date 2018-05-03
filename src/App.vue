<template>
    <main>
        <Header></Header>
        <p v-html="notify" class="uk-text-small"></p>
        <TemplateProxy v-if="isLoaded" :query="query"></TemplateProxy>
        <h1 v-else>Loading...</h1>
    </main>
</template>
<script>

    import Header from './Partials/Header.vue';
    import TemplateProxy from './Proxy/Template.vue';

    import { helpers } from './common/helpers';

    export default {

        components:{
            Header,
            TemplateProxy
        },
        mounted: function(){
            this.dispatchNavigation( this.$store, Vuew.config.boot );
        },
        watch: {
            '$route'( to, from ) {

                const params    = to.params;
                const id        = params.hasOwnProperty( 'id' ) ? params.id : false;
                const component = helpers.getComponent( params.type, id, to.path );

                this.dispatchNavigation(this.$store, {
                    path: to.path,
                    type: params.type,
                    type_value: params.type_value,
                    id: params.hasOwnProperty( 'id' ) ? params.id : false,
                    rest_base: 'home' === component && Vuew.config.pageOnFront > 0 ? 'pages': params.rest_base
                });

            }
        },
        methods: {
            dispatchNavigation: ( store, route ) => {
                store.dispatch( 'query/navigate', helpers.prepareQuery( route ), { root:true });
            }
        },
        computed:{
            query(){

                let currentQuery = this.$store.getters['query/getCurrentQueriedObject'];

                if( ! currentQuery )
                    return false;

                return currentQuery;

            },
            isLoaded(){
                return this.$store.getters[ 'query/isLoaded' ];
            },
            notify(){
                return this.$store.getters[ 'notify/getNotifications' ];
            }
        }
    }

</script>

<style lang="less">
    @import '../assets/less/app.less';
</style>