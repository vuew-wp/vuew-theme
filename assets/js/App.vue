<template>
    <main>
        <wp-header></wp-header>
        <component-proxy></component-proxy>
    </main>
</template>

<script>

    import Header from './Partials/Header.vue';
    import ComponentProxy from './Proxy/Component.vue';

    export default {

        components:{
            'wp-header': Header,
            'component-proxy': ComponentProxy
        },

        /*data: () => ({
            canLoad: false
        }),*/

        mounted: function(){
            //Initialise query
            console.log('BOOT', this.$store)
            this.$store.dispatch( 'query/boot', { root: true } );
        },

        watch: {
            '$route'( to, from ) {

                console.log('ROUTING',this.$store)

                const params = to.params;

                const id = params.hasOwnProperty( 'object_id' ) ? params.object_id : false;

                this.$store.dispatch( 'query/navigate', {
                    id          : id,
                    path        : to.path,
                    rest_base   : params.rest_base,
                    type        : params.object_type,
                    type_value  : params.object_value
                }, { root:true });

            }
        }
    }
</script>

<style lang="less">
    @import '../less/app.less';
</style>