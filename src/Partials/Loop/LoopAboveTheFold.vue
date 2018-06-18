<template>
    <div>
        <div v-for="( post, index ) in queriedObject.posts">
            <attachment v-if="index < 1" :src="post.featured_media.thumbnail" :type="'background'" style="padding-bottom: 80%" class="uk-width-1-1 uk-position-relative">
                <div style="position: absolute;bottom: 0;padding: 20px; color: #eaeaea; background-color: rgba(0,0,0,0.7); right: 0; left: 0;">
                    <h2 v-html="post.title" style="color: #ffffff; font-size: 2.5rem;"></h2>
                </div>
            </attachment>
        </div>
    </div>
</template>

<script>
    import Attachment from "../Attachment";
    export default {
        name: "LoopAboveTheFold",
        components: {
            Attachment
        },
        props: [
            'firstLoad'
        ],
        data(){
            return {
                queriedObject: Vuew.config.boot
            };
        }
    }
</script>