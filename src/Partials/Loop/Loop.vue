<template>
  <div class="uk-grid uk-grid-small uk-grid-match">
    <Post
      v-if="index <= offset"
      v-for="(post, index) in getPosts"
      :key="post.path"
      :post="post"
      :columns="columns"
    />

    <div class="uk-width-1-1">
      <Pagination
        class="uk-grid uk-grid-small"
        :posts="getPosts"
        type="LoadMore"
        :post-count="queryData.post_count"
        :found-posts="queryData.found_posts"
        :columns="columns"
        :offset="offset"
        elem-type="Post"
      />
    </div>
  </div>
</template>

<script>
import Post from './Post';

import Pagination from '../Pagination/Pagination';

export default {
  data() {
    return {
      /**
       * @todo use column count variable here
       * Returns the next highest multiple of column count
       */
      columns: Vuew.config.layout.archives[this.archiveType].columns,
    };
  },
  props: ['queryData', 'archiveType'],
  components: {
    Pagination,
    Post,
  },
  computed: {
    getPosts: function() {
      const postList = this.$store.getters['cache/getPostsCache'];
      let objectPostList = this.queryData.post_paths;
      let postsToDisplay = {};
      for (let i = 0, m = objectPostList.length; i < m; i++) {
        postsToDisplay[i] = postList[objectPostList[i]];
      }
      return postsToDisplay;
    },
    isPending: function() {
      return this.$store.getters['query/paginationPending'];
    },
    isLoaded() {
      return this.$store.getters['query/isLoaded'];
    },
    offset: function() {
      return Math.ceil(Vuew.config.query.ppp / this.columns) * this.columns - 1;
    },
  },
  methods: {
    loadPosts: function() {
      this.$store.dispatch('query/addPostsToList');
    },
  },
};
</script>
