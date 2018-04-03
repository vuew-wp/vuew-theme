<template>

    <transition name="slide-fade">

        <div class="row rt-main" v-if="loaded ==='true'">

            <div class="medium-12 small-12 column" >

                <div class="rt-post">

                    <h2 class="rt-post-title"> {{ taxonomy.name }}</h2>

                    <div class="rt-post-content rt-content" v-html="taxonomy.description"></div>

                </div>

            </div>

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
                taxonomy: {},
                loaded: 'false',
                taxonomyTitle: ''
            };
        },
        methods: {
            getPage: function() {

                const vm = this;
                vm.loaded = 'false';

                vm.$http.get( VuewConfig.rest_root + 'wp/v2/taxonomies/' + vm.$route.params.type_value )
                    .then( ( res ) => {

                        vm.taxonomy = res.data;
                        console.log(res.data,);
                        vm.loaded = 'true';

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
