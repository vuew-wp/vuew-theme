<template>
    <div>
        <figure class="vw-featured-image">
            <Attachment class="uk-position-relative" :src="postData.featured_media.large" :type="'background'" style="height:300px; width:100%;">
                <h1 class="uk-container uk-position-center">
                    <span v-html="postData.title"></span>
                </h1>
            </Attachment>
        </figure>
        <div class="uk-container uk-article">
            <div class="uk-block" v-html="postData.content"></div>
        </div>
        <comments v-if="'open' === postData.comment_status" :post-id="postData.id" :comment-count="postData.has_comments"></comments>
    </div>
</template>

<script>
    import Attachment from '../Partials/Attachment';
    import Comments from "../Partials/Comments";

    export default {

        components: {
	        Comments,
            Attachment
        },

        props:[
            'queryData',
        ],

        computed:{
            postData: function(){
                if( ! this.queryData.payload.hasOwnProperty( 'cached' ) ){
                    return this.queryData.payload;
                } else {
                    const posts = this.$store.getters['cache/getPostsCache'];
                    return posts[ this.$store.getters['getCurrentPath'] ];
                }
            }
        },

        data(){
            return {
                title: 'Loading...'
            }
        }

    };
</script>
