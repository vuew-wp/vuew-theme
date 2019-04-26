<template>
  <div>
    <!--<div class="uk-padding">
            <h2>Welcome to VUEW.</h2>
            <p class="uk-text-small">
                With the speed of VueJS and the flexibility of WordPress, VUEW is a beautifully presented highly performant theme.
            </p>
        </div>-->
    <div class="uk-overflow-auto" style="white-space: nowrap">
      <div
        v-for="post in queryData"
        :key="post.path"
        class="uk-display-inline-block"
        style="display: inline-block; width: 90vw;"
      >
        <router-link :to="setMenuItemParams(post)">
          <attachment
            :src="post.featured_media.thumbnail"
            :type="'background'"
            style="padding-bottom: 100%; background-color: #444;"
            class="uk-width-1-1 uk-position-relative"
          >
            <div
              style="position: absolute;bottom: 0;padding: 20px; color: #eaeaea; background-color: rgba(0,0,0,0.7); right: 0; left: 0;"
            >
              <h2 v-html="post.title" style="color: #ffffff;"></h2>
            </div>
          </attachment>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Attachment from '../Attachment';
import mixins from '../../mixins/mixins';

export default {
  name: 'LoopAboveTheFold',
  components: {
    Attachment,
  },
  props: ['query'],
  mixins: [mixins.anchor, mixins.loop],
  computed: {
    queryData: function() {
      console.log('called', this.query);
      if (!this.query) return {};

      if (this.query.type === 'four04') {
        return this.query.path;
      }
      return this.getPostsFromPaths(this.query);
    },
  },
};
</script>
