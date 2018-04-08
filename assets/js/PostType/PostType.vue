<template>
    <div>
        <h1>POST TYPE QUERY:</h1>

        <<<<< {{ havePosts }} >>>>>
        <ul class="uk-h3">
            <li>object_type: {{ query.type }} </li>
            <li>object_value: {{ query.id }} </li>
            <li>object_id: {{ query.type_value }} </li>
        </ul>
        <!--<div class="uk-block" v-html="taxonomy.theTaxDescription"></div>-->
    </div>
</template>

<script>

    import { mapGetters } from 'vuex'

    export default {

        props:[
            'query',
        ],

        data(){
            return {
                loaded:false,
                title: 'Loading...',
            }
        },

        computed: {
            ...mapGetters({
                havePosts: 'post_type/getPayload'
            }),
            /*havePosts: function() {

                /!*console.log('CPT');

                const vm = this;
                let base = 'wp/v2/' + vm.query.rest_base + '/' + vm.query.id;

                vm.$http.get( base )
                    .then( ( res ) => {
                        vm.thePost.title = res.data.rendered.title;
                        console.log('queried');
                        return true;
                    } )
                    .catch( ( res ) => { return false; });*!/



                return this.$store.getters[ 'post_type/getPayload' ];

            }*/
        }

    };
</script>
