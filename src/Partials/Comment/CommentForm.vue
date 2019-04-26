<template>
  <div>
    <!--isLoggedIn:-->
    <!--<pre v-html="canDisplay"></pre>-->
    <!--Conditions:-->
    <!--<pre v-text="$options.conditions"></pre>-->
    <div class="vw-comment-form" v-if="canDisplay && '' === formState">
      <vw-form
        :form-data="$options.commentFormData"
        v-on:process-form="processComment"
      ></vw-form>
    </div>
    <div v-else-if="'registrationRequired' === formState">
      <off-canvas-toggle target="userOffCanvas"
        >registrationRequired</off-canvas-toggle
      >
    </div>
    <div v-else-if="'nameEmailRequired' === formState">
      nameEmailRequired.
    </div>
  </div>
</template>

<script>
import VwForm from '../../Form/VwForm';
import commentData from '../../Form/comment';

import { HTTP } from '../../common/http_proxy';
import { vwQuery } from '../../utilities/query';
import OffCanvasToggle from '../OffCanvas/OffCanvasToggle';
// @todo wp_options - show_comments_cookies_opt_in
// @todo wp_options - comment_whitelist
// @todo wp_options - thread_comments
export default {
  name: 'CommentForm',
  components: { OffCanvasToggle, VwForm },
  props: {
    postId: {
      type: Number,
      default: 0,
    },
    commentParent: {
      type: Number,
      default: 0,
    },
    commentAncestors: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      formState: '',
    };
  },
  created() {
    this.$options.commentFormData = commentData;
    this.$options.conditions = {
      ...window.Vuew.config.comments,
      commentsOpen: this.$store.getters['query/commentsOpen'],
    };
  },
  methods: {
    processComment(data) {
      this.$emit('form-pending', true);
      data.post = this.postId;
      data.author = this.$store.getters['user/getId'];
      // if (uid > 0) {
      //   data.author = uid;
      // }
      if (this.commentParent > 0) {
        data.parent = parseInt(this.commentParent);
      }
      HTTP.post(
        'comments',
        {
          ...data,
          vr_post_comments: 1,
        },
        {
          headers: {
            'X-WP-Nonce': this.$store.getters['user/getNonce']('wpRest'),
          },
        },
      )
        .then(response => {
          this.$emit('form-pending', false);
          this.$emit('comment-post', {
            pId: this.postId,
            comment: response.data,
            ancestors: this.commentAncestors,
          });
        })
        .catch(error => {
          this.$emit('form-pending', false);
          console.log(error);
        });
    },
  },
  computed: {
    canDisplay() {
      const userId = this.$store.getters['user/getId'];
      const isLoggedIn = userId > 0;
      const {
        requireNameEmail,
        commentRegistration,
      } = this.$options.conditions;

      if (commentRegistration && !isLoggedIn) {
        this.formState = 'registrationRequired';
        return false;
      } else if (requireNameEmail && !isLoggedIn) {
        this.formState = 'nameEmailRequired';
        return false;
      }
      return true;
    },
  },
};
</script>
