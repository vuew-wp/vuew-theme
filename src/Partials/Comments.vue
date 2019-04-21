<template>
    <div class="vw-comments uk-grid uk-grid-small uk-grid-match" v-if="loaded">
        <h2 class="uk-h2">Leave a comment:</h2>
        <comment-form :post-id="postId"
                      v-on:comment-post="updateThread"/>
        <comment v-for="comment in getComments"
                 v-on:update-thread="updateThread"
                 :depth="0"
                 :post-id="postId"
                 :key="comment.comment_ID"
                 :ancestors="[comment.comment_ID]"
                 :comment-data="comment"
                 class="uk-margin-bottom vw-block uk-width-1-1"/>
    </div>
    <div v-else class="vw-comments uk-grid uk-grid-small uk-grid-match">
        <h2 class="uk-h2">Loading comments...</h2>
    </div>
</template>

<script>
  import mixins from '../mixins/mixins';
  import Comment from "./Comment/Comment";
  import CommentForm from "../Partials/Comment/CommentForm";

  export default {
    name: "Comments",
    components: {Comment, CommentForm},
    mixins: [mixins.inViewPort],
    props: {
      postId: {
        type: Number,
        default: 0
      },
    },
    data() {
      return {
        hasComments: false,
        comments: {}
      }
    },
    methods: {
      inViewPort() {
        if(!this.$store.getters['cache/postCommentsExist'](this.postId)) {
          this.$store.dispatch('query/getComments', this.postId);
        }
      },
      updateThread(payload){
        console.log('This is how it should get done son!', payload);
        this.$store.dispatch('cache/addComment', {
          pId: this.postId,
          comment: payload.comment,
          ancestors: payload.ancestors,
        });
      }
    },
    computed: {
      getComments() {
        return this.$store.getters['cache/getPostComments'](this.postId);
      },
      loaded(){
        return !this.$store.getters['query/commentsPending'];
      }
    },
  }
</script>
