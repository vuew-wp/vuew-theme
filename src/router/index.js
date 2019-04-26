/* eslint-disable */
/**
 * VueRouter
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import { store } from '../store';

/** Tell Vue to use vue-router as router */
Vue.use(VueRouter);

/**
 * Vue Router routes
 * @returns {[]}
 */
const routes = function() {
  const paths = [];

  for (const type in Vuew.config.navigation.paths) {
    paths.push({
      component: require('../Proxy/Template').default,
      path: Vuew.config.navigation.paths[type],
      name: type,
    });
  }

  paths.push({
    component: require('../Templates/404').default,
    path: '*',
    name: 'four04',
  });

  return paths;
};

const router = new VueRouter({
  mode: 'history',
  routes: routes(),
  linkActiveClass: 'uk-active',
  linkExactActiveClass: 'uk-active',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    if (to.hash) {
      return {
        selector: to.hash,
      };
    }
    return { x: 0, y: 0 };
  },
});

/**
 * Prevent navigation if any queries are pending.
 * @todo        Make sure this is the right way to do this.
 */
router.beforeEach((to, from, next) => {
  next(!store.getters['query/isPending']);
});

export default router;
