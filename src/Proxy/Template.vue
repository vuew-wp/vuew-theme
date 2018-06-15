<template>
    <component :is="query.component" :query-data="queryData"></component>
</template>

<script>

    import PreLoader from '../Proxy/PreLoader';
    import Four04 from '../Templates/404';

    const LoadingErrorComponents = {
        error: Four04,
        loading: PreLoader
    };

    export default {
        components: {
            taxonomy:   () => ({
                component: import( /* webpackChunkName: "archive" */ '../Archive/Taxonomy.vue' ),
                ...LoadingErrorComponents
            }),
            post_type_archive:  () => ({
                component: import( /* webpackChunkName: "archive" */ '../Archive/PostType.vue' ),
                ...LoadingErrorComponents
            }),
            single:     () => ({
                component: import( /* webpackChunkName: "single" */ '../Single/Single.vue' ),
                ...LoadingErrorComponents
            }),
            home:       () => ({
                component: parseInt( Vuew.config.pageOnFront ) > 0 ?
                    import( /* webpackChunkName: "home" */ '../Templates/Home.vue' ) :
                    import( /* webpackChunkName: "index" */ '../Templates/Index.vue' )
                //...LoadingErrorComponents
            }),
            PreLoader,
            four04: Four04
        },
        props: [
            'query'
        ],
        data() {
            return {
                applyFilters: wp.hooks.applyFilters
            }
        },
        computed: {
            queryData: function(){
                if( this.query.type === 'four04' ) {
                    return this.query.path;
                }
                return this.query;
            }
        }
    };

</script>