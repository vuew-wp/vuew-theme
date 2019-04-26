<template>
  <div>
    <component
      :is="elemType"
      v-if="index > offset"
      v-for="(newPost, index) in posts"
      :key="newPost.path"
      :post="newPost"
      :columns="columns"
    >
      <p v-html="'Thing I want to say'"></p>
      <div class="uk-alert" v-if="index % columns === 0">THIS IS my alert</div>
    </component>

    <div
      v-if="isPending"
      v-for="i in ppp"
      :class="'uk-width-large-1' + columns"
      class="uk-margin-bottom"
    >
      <div
        class="vw-flicker-loading-post"
        :style="{ animationDelay: getRandomDelay() + 's' }"
      ></div>
    </div>

    <div class="uk-width-1-1">
      <button
        v-if="postCount < foundPosts"
        @click="loadPosts"
        class="uk-button uk-button-primary uk-width-1-1"
      >
        {{ isPending ? 'Pending...' : 'Load More' }} / ( {{ postCount }} /
        {{ foundPosts }} )
      </button>
    </div>
  </div>
</template>

<script>
/**
 * @todo The loader effect doesn't work as desired on first load
 * if ppp does not equal a multiple of column count.
 */

import Post from '../Loop/Post';
import PostVuew from '../Loop/PostVuew';

export default {
  components: {
    Post,
    PostVuew,
  },
  props: [
    'posts',
    'foundPosts',
    'postCount',
    'isPending',
    'columns',
    'offset',
    'elemType',
  ],
  data() {
    return {
      /**
       * @todo use column count variable here
       */
      ///offset: ( Math.ceil( Vuew.config.query.ppp / 3 ) * 3 ) - 1,
      ppp: Vuew.config.query.ppp,
    };
  },
  methods: {
    loadPosts: function() {
      this.$store.dispatch('query/addPostsToList');
    },
    getRandomDelay: function() {
      /** Range */
      const min = 0;
      const max = 5;

      /** Either a + or - */
      const plusOrMinus = Math.random() < 0.5 ? '-' : '+';
      /** Generate random number between 0.00 and 3.00 */
      const randumNum = (Math.random() * (max - min + 1) + min).toFixed(2);

      return plusOrMinus + randumNum;
    },
  },
  computed: {
    /** */
  },
};
</script>
