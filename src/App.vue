<template>
    <main :class="[ bodyClass, isLoaded ? 'vw-component-loaded' : 'vw-component-pending' ]">

        <vw-header></vw-header>

        <menu-top-level></menu-top-level>

        <div class="vw-site-container">
            <loop-above-the-fold :first-load="firstLoad" v-if="!pending && isArchive"></loop-above-the-fold>
            <transition name="vw-fade-transition">
                <vw-template v-if="!pending" :query="query"></vw-template>
            </transition>
        </div>

        <!--<pre-loader v-show="!isLoaded"></pre-loader>-->

        <vw-footer></vw-footer>

        <off-canvas-menu></off-canvas-menu>
        <user-off-canvas></user-off-canvas>
        <off-canvas-toggle
                class="vw-off-canvas-overlay uk-position-top uk-position-fixed uk-width-1-1 uk-height-1-1"></off-canvas-toggle>

    </main>
</template>
<script>

    import VwHeader from './Partials/Header.vue';
    //import VwFooter from './Partials/Footer.vue';

    //import VwTemplate from './Proxy/Template.vue';
    //import PreLoader from './Proxy/PreLoader';

    import OffCanvasToggle from "./Partials/OffCanvas/OffCanvasToggle";

    import {helpers} from './common/helpers';
    import {debug} from './debug';
    import MenuTopLevel from "./Partials/Menu/MenuTopLevel";
    import LoopAboveTheFold from "./Partials/Loop/LoopAboveTheFold";

    export default {

        components: {
            LoopAboveTheFold,
            MenuTopLevel,
            'user-off-canvas': () => ({
                component: import( /* webpackChunkName: "off-canvas" */ './User/UserOffCanvas' )
            }),
            'off-canvas-menu': () => ({
                component: import( /* webpackChunkName: "off-canvas" */ './Partials/OffCanvas/OffCanvasMenu' )
            }),
            'vw-footer': () => ({
                component: import( /* webpackChunkName: "layout" */ './Partials/Footer.vue' )
            }),
            'vw-template': () => ({
                component: import( /* webpackChunkName: "layout" */ './Proxy/Template.vue' )
            }),
            OffCanvasToggle,
            //PreLoader,
            VwHeader
        },
        data() {
            return {
                pending: false,
                firstLoad: null,
                isArchive: null
            }
        },
        mounted: function () {
            this.dispatchNavigation(this.$store, Vuew.config.boot);
        },
        watch: {
            '$route'(to, from) {

                const params = to.params;
                const id = params.hasOwnProperty('id') ? params.id : false;
                const component = helpers.getComponent(params.type, id, to.path);

                this.dispatchNavigation(this.$store, {
                    path: to.path,
                    type: params.type,
                    type_value: params.type_value,
                    id: params.hasOwnProperty('id') ? params.id : false,
                    rest_base: 'home' === component && Vuew.config.pageOnFront > 0 ? 'pages' : params.rest_base
                });

            },
            query: function ( data ) {

                const vm = this;
                vm.$store.dispatch('toggleIsArchive', data.isArchive );
                vm.isArchive = data.isArchive;

                const isFirstLoad = vm.$store.getters['isFirstLoad'];
                if( null === isFirstLoad ){
                    vm.$store.dispatch('toggleFirstLoad', true );
                    vm.firstLoad = true;
                    vm.pending = false;
                    return;
                } else if( isFirstLoad ) {
                    vm.$store.dispatch('toggleFirstLoad', false );
                    vm.firstLoad = false;
                }
                vm.pending = true;
                if (vm.$store.getters['query/isLoaded']) {
                    debug.log("QUERY CHANGED");
                    setTimeout(function () {
                        vm.pending = false;
                    }, 400)
                }
            }
        },
        methods: {
            dispatchNavigation: (store, route) => {
                store.dispatch('query/navigate', helpers.prepareQuery(route), {root: true});
            }
        },
        computed: {
            query() {

                let currentQuery = this.$store.getters['query/getCurrentQueriedObject'];

                if (!currentQuery)
                    return false;

                return currentQuery;

            },
            isLoaded() {
                return this.$store.getters['query/isLoaded'];
            },
            notify() {
                return this.$store.getters['notify/getNotifications'];
            },
            bodyClass() {

                let cssClasses = '';
                const current = this.query;

                switch (current.component) {
                    case 'post_type_archive' :
                        cssClasses += 'archive post-type-archive post-type-archive-' + current.type_value;
                        break;
                    case 'taxonomy' :
                        if ('post_tag' === current.type_value) {
                            cssClasses += 'tag '
                        }
                        if ('category' === current.type_value) {
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