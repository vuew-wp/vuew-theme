<template>
    <div>
        <Attachment class="uk-position-relative" :src="postData.featured_media.large" :use-fallback="false" :type="'background'" style="height:300px; width:100%;"></Attachment>
        <h1 v-html="postData.title"></h1>
        <div class="uk-block" v-html="postData.content"></div>
    </div>
</template>

<script>
    import Attachment from '../Partials/Attachment';

    export default {

        components: {
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
