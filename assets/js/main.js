/**
 * WebPack Entry main
 *
 * @since       0.0.1
 */

/**
 * LESS
 */
require('../less/uikit.less');
require('../less/main.less');

/**
 * Imports
 */
import Vue from 'vue';

/**
 * Vue Router
 */
import router from './utils/router';

/**
 * Vuex - Store/State
 */
import { store } from './store';

/**
 * Root App
 */
import App from './App.vue';

/**
 * Vuew config
 * @type {{}}
 */
const Vuew = window.Vuew || {};

/**
 * Instantiate Vue root component
 * @type {Vue}
 */
new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#vuew-app');