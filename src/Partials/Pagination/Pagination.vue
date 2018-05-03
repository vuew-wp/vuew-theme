<template>
    <div class="vw-pagination">x
        <p>{{queriedObject.foundPosts}}/{{queriedObject.postCount}}</p>
        {{offset}}
        <Post v-if="!isPending && index > 4" v-for="( post, index ) in posts" :key="post.path" :post="post"></Post>
        <button @click="queryPosts">Load More</button>
    </div>
</template>
<script>

    import Post from "../Loop/Post";

    export default {
        props: [
            'type',
            'posts'
        ],
        data(){
            return {
                allPosts: {},
                loadedPosts: {},
                offset: Vuew.config.query.ppp
            }
        },
        components:{
            Post
        },
        methods: {
            queryPosts:function(){
                this.$store.dispatch( 'query/addPostsToList' );
                this.allPosts = this.$store.getters[ 'query/getPostList' ];

                this.offset = this.offset + Vuew.config.query.ppp;

                this.loadedPosts = this.$store.getters[ 'query/getPostList' ];

                for (let post in this.allPosts) {
                    if( post >= Vuew.config.query.ppp ) {
                        this.$set(this.loadedPosts, post, this.allPosts[post])
                    }
                }
                console.log(this.loadedPosts)
            }
        },
        computed: {
            queriedObject:function(){
                return this.$store.getters[ 'query/getCurrentQueriedObject' ].payload;
            },
            /*loadedPosts:function(){
                return this.$store.getters[ 'query/getPostList' ];
            },*/
            isPending:function(){
                return this.$store.getters[ 'query/paginationPending' ];
            }
        }
    };
</script>