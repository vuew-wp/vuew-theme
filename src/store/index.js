/* eslint-disable */
import Vue from 'vue';
import Vuex from 'vuex';

/**
 * Root store
 * Manages and maintains root state management
 */
import { actions } from './actions';
import { getters } from './getters';
import { mutations } from './mutations';

/**
 * Modules
 */
/** Maintains query state */
import query from './modules/query';
/** Maintains cache delivery between queries */
import cache from './modules/cache';
/** Displaying data delivery stacktrace */
import notify from './modules/notify';
/** Displaying data delivery stacktrace */
import layout from './modules/layout';
/** User store management */
import user from './modules/user';

Vue.use(Vuex);

/**
 * Initialise VUEX
 * @type {Vuex.Store}
 */
export const store = new Vuex.Store({
  state: {
    currentPath: '',
    isFirstLoad: null,
    isArchive: null,
    isHome: null,
  },
  actions,
  getters,
  mutations,
  modules: {
    query,
    cache,
    notify,
    layout,
    user,
  },
  strict: process.env.NODE_ENV !== 'production',
  plugins: [],
});
