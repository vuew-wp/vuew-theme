<template>
  <component
    :is="type"
    :posts="posts"
    :is-pending="isPending"
    :post-count="postCount"
    :found-posts="foundPosts"
    :columns="columns"
    :offset="offset"
    :elem-type="elemType"
  ></component>
</template>
<script>
import LoadMore from './PaginationLoadMore';

export default {
  props: [
    'type',
    'posts',
    'foundPosts',
    'postCount',
    'columns',
    'offset',
    'elemType',
  ],
  components: {
    LoadMore,
  },
  computed: {
    isPending: function() {
      return this.$store.getters['query/paginationPending'];
    },
  },
};
</script>
