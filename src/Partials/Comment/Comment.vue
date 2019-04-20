<template>
    <div>
        <span v-html="commentData.comment_author_email"></span>
        <attachment :src="commentData.comment_author_avatar" :type="'standard'" class="post-vuew-image uk-position-cover"></attachment>
        <span v-html="commentData.comment_content"></span>
        <comment v-if="commentData.children" v-for="comment in commentData.children"  :key="comment.comment_id" :comment-data="comment" style="padding-left:30px"></comment>
    </div>
</template>

<script>
	import Attachment from "../Attachment";
	export default {
		name: "Comment",
		components: { Attachment },
		props: {
			commentData: {
				type: Object,
				default: {}
			}
		},
	}
</script>

<style scoped>

</style>