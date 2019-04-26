/**
 * WebPack Entry main
 *
 * @since       0.0.1
 */
/* eslint-disable import/first */
if (module.hot) {
  module.hot.accept();
}

/**
 * Imports
 */
import Vue from 'vue';

/**
 * Vue Router
 */
import router from './router';

/**
 * Vuex - Store/State
 */
import { store } from './store';

/**
 * Root App
 */
import App from './App.vue';

/**
 * LESS
 */
require('../assets/less/main.less');

/**
 * Instantiate Vue root component
 * @type {Vue}
 */
new Vue({
  router,
  store,
  /* created(){
      this.intersectionObserver =
    }, */
  render: h => h(App),
}).$mount('#vuew-app');
