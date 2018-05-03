<template>
    <section v-if="query">
        <code style="max-height: 250px; overflow: auto; display: block">
            <pre>{{ applyFilters('myTestFilter', queryData )}}</pre>
        </code>
        <component :is="query.component" :query-data="applyFilters( 'myTestFilter', queryData )"></component>
    </section>
</template>

<script>

    import Loading from '../Partials/Loading.vue';
    import Four04 from '../Templates/404.vue';

    const LoadingErrorComponents = {
        loading: Loading,
        error: Four04,
    };

    export default {
        components: {
            taxonomy:   () => ({
                component: import( '../Archive/Taxonomy.vue' ),
                ...LoadingErrorComponents
            }),
            post_type_archive:  () => ({
                component: import( '../Archive/PostType.vue' ),
                ...LoadingErrorComponents
            }),
            single:     () => ({
                component: import( '../Single/Single.vue' ),
                ...LoadingErrorComponents
            }),
            home:       () => ({
                component: parseInt( Vuew.config.pageOnFront ) > 0 ?
                    import( '../Templates/Home.vue' ) :
                    import( '../Templates/Index.vue' ),
                ...LoadingErrorComponents
            }),
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
