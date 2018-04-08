<template>
    <div>
        <!--<h2 class="uk-h2"> {{ getPage.theTaxName }} </h2>-->
        <ul class="uk-h3">
            <li>object_type: {{ query.type }} </li>
            <li>object_value: {{ query.id }} </li>
            <li>object_id: {{ query.type_value }} </li>
        </ul>
        <!--<div class="uk-block" v-html="taxonomy.theTaxDescription"></div>-->
    </div>
</template>

<script>
    export default {

        props:[
            'query'
        ],

        mounted: function() {
            //this.getPage();
            this.loaded = true;
        },

        data(){
            return {
                taxonomy: {},
                loaded: false
            }
        },

        computed: {
            getPage: function() {

                console.log('Taxonomy');

                const vm = this;
                vm.loaded = false;

                let base = 'wp/v2/' + vm.rest_base + '/' + vm.id;

                vm.$http.get( base )
                    .then( ( res ) => {
                        console.log(res);
                        return {
                            theTaxName: res.data.name,
                            theTaxDescription: res.data.description
                        };

                    } )
                    .catch( ( res ) => {});
            }
        },
        watch: {
            '$state'( state ) {
                console.log('STATE CHANGEDTaxonomy');
            }
        }

    };
</script>
