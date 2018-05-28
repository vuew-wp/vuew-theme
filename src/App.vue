<template>
    <main :class="[ bodyClass, isLoaded ? 'vw-component-loaded' : 'vw-component-pending' ]">
        <vw-header></vw-header>
        <p v-if="false" v-html="notify" class="uk-text-small"></p>
        <transition name="vw-fade-transition">
            <vw-template v-if="!pending" :query="query"></vw-template>
        </transition>
        <pre-loader v-show="!isLoaded"></pre-loader>
        <vw-footer></vw-footer>
        <off-canvas></off-canvas>
    </main>
</template>
<script>

    import VwHeader from './Partials/Header.vue';
    import VwFooter from './Partials/Footer.vue';
    import VwTemplate from './Proxy/Template.vue';

    import { helpers } from './common/helpers';
    import PreLoader from './Proxy/PreLoader';
    import OffCanvas from "./Partials/OffCanvas/OffCanvas";

    export default {

        components:{
            OffCanvas,
            PreLoader,
            VwHeader,
            VwFooter,
            VwTemplate
        },
        data(){
            return {
                pending: true
            }
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