<template>

    <transition name="slide-fade">

        <div class="row rt-main" v-if="loaded">

            <h2 class="uk-h2"> {{ page.theTitle }}</h2>

            <div class="uk-block" v-html="page.theContent"></div>

        </div>

    </transition>


</template>

<script>
    export default {

        mounted: function() {
            this.getPage();
        },

        data() {
            return {
                loaded: false,
                page: {}
            };
        },
        methods: {
            getPage: function() {

                const vm = this;
                vm.loaded = false;

                vm.$http.get( VuewConfig.rest_root + 'wp/v2/pages/' + vm.$route.params.id )
                    .then( ( res ) => {

                        vm.page = {
                            theTitle: res.data.title.rendered,
                            theContent: res.data.content.rendered
                        };
                        vm.loaded = true;

                    } )
                    .catch( ( res ) => {

                        //console.log( `Something went wrong : ${ res }` );

                    } );

            }
        },
        watch: {

            '$route'( to, from ) {
                // react to route changes...
                this.getPage();
            }

        }

    };
</script>
