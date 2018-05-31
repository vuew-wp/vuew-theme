<template>
    <main :class="[ bodyClass, isLoaded ? 'vw-component-loaded' : 'vw-component-pending' ]">
        <vw-header></vw-header>
        <p v-if="false" v-html="notify" class="uk-text-small"></p>
        <transition name="vw-fade-transition">
            <vw-template v-if="!pending" :query="query"></vw-template>
        </transition>
        <pre-loader v-show="!isLoaded"></pre-loader>
        <vw-footer></vw-footer>
        <off-canvas-menu></off-canvas-menu>
    </main>
</template>
<script>

    import VwHeader from './Partials/Header.vue';
    import VwFooter from './Partials/Footer.vue';
    import VwTemplate from './Proxy/Template.vue';

    import { helpers } from './common/helpers';
    import PreLoader from './Proxy/PreLoader';
    import OffCanvasMenu from "./Partials/OffCanvas/OffCanvasMenu";

    export default {

        components:{
            OffCanvasMenu,
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

            },
            query:function(){
                const vm = this;
                vm.pending = true;
                if( vm.$store.getters[ 'query/isLoaded' ] ){
                    console.log("QUERY CHANGED");
                    setTimeout(function () {
                        vm.pending = false;
                    }, 400 )
                }
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
            },
            bodyClass(){

                let cssClasses = '';
                const current = this.query;

                switch( current.component ){
                    case 'post_type_archive' :
                        cssClasses += 'archive post-type-archive post-type-archive-' + current.type_value;
                        break;
                    case 'taxonomy' :
                        if( 'post_tag' === current.type_value ) {
                            cssClasses += 'tag '
                        }
                        if( 'category' === current.type_value ){
                            cssClasses += 'category '
                        }
                        cssClasses += 'archive tax-' + current.type_value + ' term-' + current.payload.slug + ' term-' + current.id;
                        break;
                    case 'single' :
                        //@todo post template
                        cssClasses += 'post-template-default single single-' + current.type_value + ' postid-' + current.id + ' single-format-standard';
                        break;
                    case 'home' :
                        cssClasses += 'home blog';
                        break;
                    case 'four04' :
                        cssClasses += 'error404';
                        break;
                }

                return cssClasses;
            }
        }
    }

</script>

<style lang="less">
    @import '../assets/less/app.less';
</style>