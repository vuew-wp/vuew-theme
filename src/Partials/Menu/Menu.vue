<template>
  <nav>
    <div :class="{ 'vw-navbar-disabled': isPending }">
      <ul class="tree">
        <anchor :key="menu.path" v-for="item in menu" :menu="item"></anchor>
      </ul>
    </div>
    <div
      v-show="isPending"
      class="uk-position-cover"
      style="background-color: rgba(255,255,255,0.4);"
    ></div>
  </nav>
</template>

<script>
import MenuTreeItem from './MenuTreeItem';
import Anchor from '../../Proxy/Anchor';

export default {
  props: ['menu'],
  components: {
    Anchor,
    MenuTreeItem,
  },
  computed: {
    isPending: function() {
      return this.$store.getters['query/isPending'];
    },
  },
};
</script>
<style lang="less">
// @import "../../../assets/less/partials/off-canvas";
</style>
