<template>
    <div :id="'comment-' + commentData.comment_ID" class="comment vw-comment vw-block">

        <!--Comment-->
        <div class="uk-margin-bottom uk-width-1-1">
            <attachment :src="commentData.comment_author_avatar"
                        :type="'standard'"
                        style="width: 96px; height: 96px;"/>
            <span v-html="commentData.comment_author"></span>
            <p style="white-space: pre;" v-html="commentData.comment_content"></p>
            <a class="uk-button"
               @click="displayForm = !displayForm"
               v-text="displayForm ? 'X Close' : 'Reply'"></a>
            <br class="uk-clearfix"/>

            <!--Comment Form-->
            <div v-show="displayForm" class="comment-reply">
                <p class="uk-h4">Leave a reply:</p>
                <comment-form v-show="!commentPending"
                              :post-id="postId"
                              :comment-ancestors="ancestors"
                              v-on:comment-post="emitUpdate"
                              v-on:form-pending="formStateChange"
                              :comment-parent="parseInt(commentData.comment_ID)"/>
                <div v-show="commentPending"
                     v-text="'Loading'"></div>
            </div>

            <!--Comment Children-->
            <div v-if="commentData.children" style="border-left:1px solid red;">
                <comment v-for="comment in commentData.children"
                         :post-id="postId"
                         :depth="depth + 1"
                         :comment-data="comment"
                         :key="comment.comment_id"
                         :ancestors="getAncestors(comment.comment_ID)"
                         v-on:emit-update="emitUpdate"
                         style="margin-left: 30px"/>
            </div>

        </div>

    </div>
</template>

<script>
  import Attachment from "../Attachment";
  import CommentForm from "./CommentForm";

  export default {
    name: "Comment",
    components: {CommentForm, Attachment},
    data() {
      return {
        displayForm: false,
        commentPending: false
      }
    },
    props: {
      commentData: {
        type: Object,
        default: {}
      },
      postId: {
        type: Number,
        default: 0
      },
      ancestors: {
        type: Array,
        default: () => []
      },
      depth: {
        type: Number,
        default: 0
      },
    },
    methods: {
      /**
       * Assemble list of ancestors for easier
       * state changes later.
       * @param commentId
       * @returns {*}
       */
      getAncestors(commentId) {
        const ancestors = this.ancestors.slice(0);
        ancestors.push(parseInt(commentId));
        return ancestors;
      },
      emitUpdate(e) {
        const action = this.depth > 0 ? 'emit-update' : 'update-thread';
        this.$emit(action, e);
        this.displayForm = false;
      },
      formStateChange(e){
        this.commentPending = e;
      }
    },
  }
</script>
