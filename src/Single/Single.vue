<template>
    <div>
        <figure class="vw-featured-image">
            <Attachment class="uk-position-relative" :src="postData.featured_media.large" :use-fallback="false" :type="'background'" style="height:300px; width:100%;">
                <h1 class="uk-container uk-position-center"><span v-html="postData.title"></span></h1>
            </Attachment>
        </figure>
        <div class="uk-container uk-section">
            <div class="uk-block" v-html="postData.content"></div>
        </div>
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
