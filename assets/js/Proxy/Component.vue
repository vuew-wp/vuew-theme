<template>
    <div>
        <h1>MAIN QUERY:</h1>
        {{ query }}
        <component v-if="query" :is="query.type" :query="query"></component>
    </div>
</template>

<script>

    import { mapGetters } from 'vuex'

    import { store } from '../store';

    import Taxonomy from '../Taxonomy/Taxonomy.vue';
    import PostType from '../PostType/PostType.vue';

    export default {

        components: {
            taxonomy: Taxonomy,
            post_type: PostType
        },
        computed: {
            ...mapGetters({
                query: 'post_type/getPayload'
            })
        },
        mounted: function(){
            console.log('Mounted!', this.$store);
        }
    };
</script>
