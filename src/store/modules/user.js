/* eslint-disable */
/**
 * User store
 * Tracking user state and WordPress nonce's
 *
 * @since   0.0.1
 */

/**
 * Cache State object
 * @type {{excludeIds: Array, queriesCache: {}, pathsCache: Array, postsCache: {}, imagePaths: Array}}
 */
const state = {
  id: -1,
  userAuth: 0,
  wpRest: 0,
};

/**
 * Cache Mutations
 * @type    {{CACHE_ADD_POST: mutations.CACHE_ADD_POST, CACHE_ADD_QUERY: mutations.CACHE_ADD_QUERY, CACHE_UPDATE_QUERY_POST_LIST: mutations.CACHE_UPDATE_QUERY_POST_LIST}}
 *
 * @since   0.0.1
 */
const mutations = {
  /**
   * Update User ID
   * @param state
   * @param uid
   * @constructor
   */
  UPDATE_USER_ID: (state, uid) => {
    state.id = uid;
  },
  /**
   * Update Nonce
   * @param state
   * @param args
   * @constructor
   */
  NONCE_UPDATE: (state, args) => {
    state[args.name] = args.nonce;
  },
};

/**
 * User     Actions
 * @type    {{userIdUpdate: actions.userIdUpdate}}
 * @since   1.0.0
 */
const actions = {
  updateUserId: (store, uid) => {
    store.commit('UPDATE_USER_ID', uid);
  },
  updateNonce: (store, args) => {
    store.commit('NONCE_UPDATE', args);
  },
};

/**
 * Cache getters
 *
 * @type {{cacheExists: (function(*, *): function(*=): boolean), postCacheExists: (function(*, *): function(*): boolean), queryCacheExists: (function(*, *, *, *): boolean)}}
 *
 * @since   0.0.1
 */
const getters = {
  getId: state => {
    return state.id;
  },
  getNonce: state => name => {
    return state[name];
  },
};

/**
 * cache/*
 * @type {boolean}
 */
const namespaced = true;

export default {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
