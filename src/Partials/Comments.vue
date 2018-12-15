<template>
    <div class="vw-comments">
        <comment v-for="comment in getComments" :key="comment.comment_id" :comment-data="comment"></comment>
    </div>
</template>

<script>
	import mixins from '../mixins/mixins';
	import Comment from "./Comment/Comment";

	export default {
		name: "Comments",
		components: { Comment },
		mixins: [ mixins.inViewPort ],
		props: {
			postId: {
				type: Number,
				default: 0
			},
		},
		data() {
			return {
				hasComments: false,
				pending: false,
				loaded: false,
				comments: {}
			}
		},
		methods: {
			inViewPort() {
				this.$store.dispatch( 'query/getComments', this.postId );
			}
		},
		computed: {
			getComments() {
				return this.$store.getters[ 'cache/getPostComments' ]( this.postId );
			}
		},
	}
</script>