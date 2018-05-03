<template>
    <div class="uk-grid">

        <p class="uk-width-1-1">{{queryData.post_count}}/{{queryData.found_posts}}</p>

        <Post v-if="index <= offset" v-for="( post, index ) in getPosts" :key="post.path" :post="post"></Post>

        <Post v-if="index > offset" style="background:#777777" v-for="( newPost, index ) in getPosts" :key="newPost.path" :post="newPost"></Post>

        <div class="uk-width-1-1">
            <button v-if="queryData.post_count < queryData.found_posts" @click="loadPosts" class="uk-button uk-button-primary">{{ isPending ? 'Pending...' : 'Load More' }}</button>
        </div>

    </div>
</template>

<script>

    import Pagination from "../Pagination/Pagination";
    import Post from "./Post";

    export default {
        data(){
            return {
                offset: Vuew.config.query.ppp - 1
            }
        },
        props: [
            'queryData'
        ],
        components:{
            Pagination,
            Post
        },
        computed:{
            getPosts: function(){
                const postList = this.$store.getters['cache/getPostsCache'];
                let objectPostList = this.queryData.post_paths;
                let postsToDisplay = {};
                for( let i = 0, m = objectPostList.length; i < m; i++){
                    postsToDisplay[i] = postList[ objectPostList[i] ]
                }
                return postsToDisplay;
            },
            isPending:function(){
                return this.$store.getters[ 'query/paginationPending' ];
            },
            isLoaded(){
                return this.$store.getters[ 'query/isLoaded' ];
            }
        },
        methods: {
            loadPosts:function(){
                this.$store.dispatch( 'query/addPostsToList' );
            }
        }
    };

</script>
