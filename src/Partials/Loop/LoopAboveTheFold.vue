<template>
    <div>
        <div v-for="( post, index ) in queriedObject.posts">
            <attachment v-if="index < 1" :src="post.featured_media.thumbnail" :type="'background'" style="padding-bottom: 100%" class="uk-width-1-1 uk-position-relative">
                <div style="position: absolute;bottom: 0;padding: 20px; color: #eaeaea; background-color: rgba(0,0,0,0.7)">
                    <h2 v-html="post.title" style="color: #ffffff;"></h2>
                    <p v-html="post.excerpt"></p>
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
        data(){
            return {
                queriedObject: Vuew.config.boot
            };
        }
    }
</script>

<style scoped>

</style>