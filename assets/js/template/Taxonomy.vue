<template>

    <transition name="slide-fade">

        <div class="row rt-main" v-if="loaded">

            <h2 class="uk-h2"> {{ taxonomy.theTaxName }}</h2>

            <div class="uk-block" v-html="taxonomy.theTaxDescription"></div>

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
                loaded: 'false'
            };
        },
        methods: {
            getPage: function() {

                const vm = this;
                vm.loaded = 'false';

                let base = 'wp/v2/';

                if( 'post_tag' === vm.$route.params.taxonomy ){
                    base = base + 'tags/';
                }
                if( 'category' === vm.$route.params.taxonomy ){
                    base = base + 'categories/';
                }

                vm.$http.get( base + vm.$route.params.id )
                    .then( ( res ) => {
                        console.log(res.data.name)
                        vm.taxonomy = {
                            theTaxName: res.data.name,
                            theTaxDescription: res.data.description
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
