<template>
  <off-canvas target="offCanvasMenu">
    <menu-tree :menu="menu"></menu-tree>
  </off-canvas>
</template>
<script>
import MenuTree from '../Menu/MenuTree';
import OffCanvas from './OffCanvas';

export default {
  components: {
    OffCanvas,
    MenuTree,
  },
  data() {
    return {
      menu: Vuew.config.navigation.menus.off_canvas,
    };
  },
};
</script>
