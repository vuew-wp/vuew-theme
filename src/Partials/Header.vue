<template>
    <header :style="{top: toggleVisibility}"
            style="min-height: 96px;"
            class="vw-primary-header uk-position-fixed uk-width-1-1 uk-box-shadow-small uk-box-shadow-hover-medium">
        <custom-logo class="uk-float-left vw-primary-header-brand"></custom-logo>
        <div class="uk-float-right vw-primary-header-menu">
            <off-canvas-toggle target="offCanvasMenu">MENU</off-canvas-toggle>
            /
            <off-canvas-toggle target="userOffCanvas">USER</off-canvas-toggle>
        </div>
    </header>
</template>
<script>

  import CustomLogo from './CustomLogo';
  import OffCanvasToggle from './OffCanvas/OffCanvasToggle';

  import _ from 'lodash';

  export default {

    components: {
      OffCanvasToggle,
      CustomLogo
    },
    computed: {
      toggleVisibility() {
        return this.visible ? "0" : "-100px";
      },
    },
    methods: {
      handleScroll: _.throttle(function () {

        const vm = this;
        let currentScrollPos = window.pageYOffset;

        if (
          vm.$store.getters['layout/hasActiveCanvas']
          || currentScrollPos < 100
          || currentScrollPos === vm.prevScrollPos
        ) {
          vm.prevScrollPos = currentScrollPos;
          this.visible = true;
          return;
        }

        const scrollingUp = vm.prevScrollPos > currentScrollPos;
        vm.prevScrollPos = currentScrollPos;

        if (scrollingUp) {
          if (!this.visible) {
            this.visible = true;
          }
          return;
        }

        if (this.visible) {
          this.visible = false;
        }

      }, 100)
    },
    data() {
      return {
        site_name: "Vuew Theme",
        prevScrollPos: 0,
        visible: true
      }
    },
    mounted() {
      window.addEventListener('scroll', this.handleScroll);
    },
    destroyed() {
      window.removeEventListener('scroll', this.handleScroll);
    }
  };
</script>
<style lang="less">
    @import "../../assets/less/base/vars";

    .vw-primary-header {
        z-index: 2;
        top: 0;
        transition: top 0.3s;
        line-height: @vw-header-height;

        &-brand {
            min-width: 100px;
            display: block;
        }

        &-menu {
            padding-right: 15px;
        }

        a {
            color: @vw-color-primary;
        }
    }

    .admin-bar {
        .vw-primary-header {
            top: 46px;
        }
    }
</style>
