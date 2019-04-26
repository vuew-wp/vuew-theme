<template>
  <main
    :class="[
      bodyClass,
      isLoaded ? 'vw-component-loaded' : 'vw-component-pending',
    ]"
  >
    <vw-header></vw-header>

    <div class="vw-site-container">
      <menu-top-level></menu-top-level>

      <!--<loop-above-the-fold v-if="query.isArchive && isFirstLoad" :query="query"></loop-above-the-fold>-->

      <above-the-fold
        v-if="query.isArchive && isFirstLoad"
        :query="query"
      ></above-the-fold>

      <transition name="vw-fade-transition">
        <above-the-fold
          v-if="query.isArchive && !isFirstLoad && !pending"
          :query="query"
        ></above-the-fold>
      </transition>

      <transition name="vw-fade-transition">
        <vw-template
          v-if="!pending"
          :query="query"
          class="uk-position-relative"
        ></vw-template>
      </transition>
    </div>

    <!--<pre-loader v-show="!isLoaded"></pre-loader>-->

    <vw-footer></vw-footer>

    <off-canvas-menu></off-canvas-menu>
    <user-off-canvas></user-off-canvas>
    <off-canvas-toggle
      class="vw-off-canvas-overlay uk-position-top uk-position-fixed uk-width-1-1 uk-height-1-1"
    ></off-canvas-toggle>
  </main>
</template>
<script>
/**
 * Import header components
 */
import VwHeader from './Partials/Header.vue';
import MenuTopLevel from './Partials/Menu/MenuTopLevel';
import AboveTheFold from './Proxy/AboveTheFold';
import OffCanvasToggle from './Partials/OffCanvas/OffCanvasToggle';

/**
 * Import helpers
 */
import { helpers } from './common/helpers';

export default {
  components: {
    AboveTheFold,
    MenuTopLevel,
    'user-off-canvas': () => ({
      component: import(
        /* webpackChunkName: "off-canvas" */ './User/UserOffCanvas'
      ),
    }),
    'off-canvas-menu': () => ({
      component: import(
        /* webpackChunkName: "off-canvas" */ './Partials/OffCanvas/OffCanvasMenu'
      ),
    }),
    'vw-footer': () => ({
      component: import(
        /* webpackChunkName: "layout" */ './Partials/Footer.vue'
      ),
    }),
    'vw-template': () => ({
      component: import(
        /* webpackChunkName: "layout" */ './Proxy/Template.vue'
      ),
    }),
    OffCanvasToggle,
    VwHeader,
  },
  data() {
    return {
      pending: false,
      isFirstLoad: null,
      currentQuery: null,
      aboveTheFoldQuery: null,
    };
  },
  mounted: function() {
    this.toggleContext(this, Vuew.config.boot);
    this.dispatchNavigation(this.$store, Vuew.config.boot);
    /**
     * User
     */
    this.user();
  },
  watch: {
    $route(to, from) {
      const vm = this;
      const params = to.params;
      const id = params.hasOwnProperty('id') ? params.id : false;
      const component = helpers.getComponent(params.type, id, to.path);
      const route = {
        path: to.path,
        type: params.type,
        type_value: params.type_value,
        id: params.hasOwnProperty('id') ? params.id : false,
        rest_base:
          'home' === component && Vuew.config.pageOnFront > 0
            ? 'pages'
            : params.rest_base,
      };

      /** Only process GA in production */
      if ('production' === NODE_ENV) {
        gtag('config', Vuew.config.tracking.googleAnalytics, {
          page_path: to.path,
          page_title: 'Vuew title - ' + params.type_value + ' | ' + params.type,
        });
      }

      vm.toggleContext(vm, route);
      vm.dispatchNavigation(vm.$store, route);
    },
  },
  methods: {
    user() {
      this.$store.dispatch('user/updateUserId', window.Vuew.config.user.userId);
      this.$store.dispatch('user/updateNonce', {
        name: 'userAuth',
        nonce: window.Vuew.nonces.userAuth,
      });
      this.$store.dispatch('user/updateNonce', {
        name: 'wpRest',
        nonce: window.Vuew.nonces.wpRest,
      });
    },
    toggleContext: (vm, route) => {
      vm.isFirstLoad = vm.$store.getters['isFirstLoad'];

      if (null === vm.isFirstLoad) {
        vm.$store.dispatch('toggleFirstLoad', true);
      } else if (true === vm.isFirstLoad) {
        vm.$store.dispatch('toggleFirstLoad', false);
      }

      vm.isFirstLoad = vm.$store.getters['isFirstLoad'];

      vm.$store.dispatch('toggleIsArchive', helpers.isArchive(route));
      vm.$store.dispatch('toggleIsHome', 'home' === route.type);
    },
    dispatchNavigation: (store, route) => {
      store.dispatch('query/navigate', helpers.prepareQuery(route), {
        root: true,
      });
    },
  },
  computed: {
    query() {
      const vm = this;

      vm.currentQuery = vm.$store.getters['query/getCurrentQueriedObject'];

      if (!vm.currentQuery) return false;

      return vm.currentQuery;
    },
    isLoaded() {
      return this.$store.getters['query/isLoaded'];
    },
    notify() {
      return this.$store.getters['notify/getNotifications'];
    },
    bodyClass() {
      let cssClasses = '';
      const current = this.query;

      switch (current.component) {
        case 'post_type_archive':
          cssClasses +=
            'archive post-type-archive post-type-archive-' + current.type_value;
          break;
        case 'taxonomy':
          if ('post_tag' === current.type_value) {
            cssClasses += 'tag ';
          }
          if ('category' === current.type_value) {
            cssClasses += 'category ';
          }
          cssClasses +=
            'archive tax-' +
            current.type_value +
            ' term-' +
            current.payload.slug +
            ' term-' +
            current.id;
          break;
        case 'single':
          //@todo post template
          cssClasses +=
            'post-template-default single single-' +
            current.type_value +
            ' postid-' +
            current.id +
            ' single-format-standard';
          break;
        case 'home':
          cssClasses += 'home blog';
          break;
        case 'four04':
          cssClasses += 'error404';
          break;
      }

      return cssClasses;
    },
  },
};
</script>
