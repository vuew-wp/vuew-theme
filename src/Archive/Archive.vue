<template>
  <div class="uk-container">
    <div class="uk-grid uk-grid-collapse uk-margin-bottom uk-margin-top">
      <div class="uk-width-1-2">
        <h1 class="uk-h1" v-html="queryData.payload.name"></h1>
      </div>
      <!--<div class="uk-text-right uk-width-1-2">
                <span class="vw-badge" v-html="queryData.payload.post_count + ' / ' + queryData.payload.found_posts"></span>
            </div>-->
    </div>
    <div class="uk-width-1-1 uk-margin-bottom">
      <p v-html="queryData.payload.description"></p>
    </div>
    <component
      :is="elemType"
      :query-data="queryData.payload"
      :archive-type="queryData.component"
    ></component>
  </div>
</template>
<script>
import Loop from '../Partials/Loop/Loop';
import PostVuewLoop from '../Partials/Loop/PostVuewLoop';

export default {
  components: {
    Loop,
    PostVuewLoop,
  },
  props: ['queryData', 'archiveType'],
  data() {
    return {
      elemType: Vuew.config.layout.archives[
        this.queryData.component
      ].hasOwnProperty('type')
        ? Vuew.config.layout.archives[this.queryData.component].type + '-loop'
        : 'loop',
    };
  },
};
</script>
