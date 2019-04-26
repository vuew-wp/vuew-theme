/* eslint-disable */
/**
 * Import Vue
 * used for setting object keys and maintaining reactivity.
 *
 * @since   0.0.1
 */
import Vue from 'vue';
import { debug } from '../../debug';
import { commentHelper } from '../../utilities/comments';

/**
 * Cache State object
 * @type {{excludeIds: Array, queriesCache: {}, pathsCache: Array, postsCache: {}, imagePaths: Array}}
 */
const state = {
  excludeIds: [],
  queriesCache: {},
  pathsCache: [],
  postsCache: {},
  imagePaths: [],
  comments: {},
};

/**
 * Cache Mutations
 * @type    {{CACHE_ADD_POST: mutations.CACHE_ADD_POST, CACHE_ADD_QUERY: mutations.CACHE_ADD_QUERY, CACHE_UPDATE_QUERY_POST_LIST: mutations.CACHE_UPDATE_QUERY_POST_LIST}}
 *
 * @since   0.0.1
 */
const mutations = {
  CACHE_ADD_IDS_TO_EXCLUDE: (state, id) => {
    state.excludeIds.push(id);
  },
  /**
   * Add individual post cache
   *
   * @param state
   * @param post
   * @constructor
   */
  CACHE_ADD_POST: (state, post) => {
    Vue.set(state.postsCache, post.route.path, post);
    debug.log('CACHE_ADD_POST', state.postsCache);
  },
  /**
   * Add route query to cache
   *
   * @param state
   * @param query
   * @constructor
   *
   * @since   0.0.1
   */
  CACHE_ADD_QUERY: (state, query) => {
    Vue.set(state.queriesCache, query.path, query);
    debug.log('CACHE_ADD_QUERY', state.queriesCache);
  },
  /**
   * Update query post list, commonly used for pagination
   *
   * @param state
   * @param args
   * @constructor
   */
  CACHE_UPDATE_QUERY_POST_LIST: (state, args) => {
    Vue.set(state.queriesCache[args.path].payload, 'post_paths', [
      ...state.queriesCache[args.path].payload.post_paths,
      ...args.posts,
    ]);
    state.queriesCache[args.path].payload.post_count += args.posts.length;
    debug.log(
      'CACHE_UPDATE_POST_LIST',
      state.queriesCache[args.path].payload.post_paths,
    );
  },

  CACHE_ADD_404: (state, query) => {
    // Update queryIndex
    Vue.set(state.queriesCache, query.path, query);
    debug.log(state.queriesCache);
  },

  CACHE_ADD_IMAGE_PATH: (state, image) => {
    // Cache image path
    state.imagePaths.push(image);
    debug.log('CACHE_ADD_IMAGE_PATH', state.imagePaths);
  },

  CACHE_ADD_COMMENTS: (state, args) => {
    Vue.set(state.comments, args.postId, args.comments);
  },

  CACHE_UPDATE_COMMENT_THREAD: (state, args) => {
    state.comments[args.postId].splice(args.threadIndex, 1, args.thread);
  },

  CACHE_ADD_COMMENT: (state, args) => {
    state.comments[args.postId].unshift(args.comment);
  },
};

/**
 * Cache Actions
 *
 * @type {{ addPathToCache: actions.addPathToCache, addPostToCache: actions.addPostToCache, addPostsToCache: actions.addPostsToCache, addRouteQuery: actions.addRouteQuery, updateQueryPostList: actions.updateQueryPostList}}
 *
 * @since   0.0.1
 */
const actions = {
  /**
   * Add cached path to 1 dimensional
   *
   * @param store
   * @param path
   *
   * @since   0.0.1
   */
  addIdToExclude: (store, path) => {
    store.commit('CACHE_ADD_PATH', path);
  },

  /**
   * Add post to query cache item
   *
   * @param store
   * @param post
   *
   * @since   0.0.1
   */
  addPostToCache: (store, post) => {
    store.commit('CACHE_ADD_POST', post);
  },

  /**
   * Batch add posts to query item cache
   *
   * @param store
   * @param posts
   *
   * @since   0.0.1
   */
  addPostsToCache: (store, posts) => {
    for (const i in posts) {
      /** Timestamp check */
      if (posts[i].hasOwnProperty('route')) {
        store.commit('CACHE_ADD_POST', posts[i]);
      }
    }
  },

  /**
   * Add route query to cache and if has posts, save the paths.
   *
   * @param store
   * @param data
   *
   * @since   0.0.1
   */
  addRouteQuery: (store, data) => {
    const postsPathsToSave = [];
    const queryToSave = data;

    queryToSave.payload.path = store.rootGetters.getCurrentPath;

    if (queryToSave.payload.hasOwnProperty('posts')) {
      const posts = queryToSave.payload.posts;
      for (const post in posts) {
        postsPathsToSave.push(posts[post].route.path);
        store.commit('CACHE_ADD_IDS_TO_EXCLUDE', posts[post].id);
      }
      queryToSave.payload.post_paths = postsPathsToSave;
      delete queryToSave.payload.posts;
      store.dispatch('addPostsToCache', posts);
    }
    store.commit('CACHE_ADD_QUERY', queryToSave);
  },

  /**
   * Add post paths to archive route query
   *
   * @param store
   * @param args
   *
   * @since   0.0.1
   */
  updateQueryPostList: (store, args) => {
    const paths = [];
    for (let i = 0, m = args.posts.length; i < m; i++) {
      /** Timestamp check */
      if (args.posts[i].hasOwnProperty('route')) {
        paths.push(args.posts[i].route.path);
        store.commit('CACHE_ADD_IDS_TO_EXCLUDE', args.posts[i].id);
      }
    }
    store.dispatch('addPostsToCache', args.posts);
    store.commit('CACHE_UPDATE_QUERY_POST_LIST', {
      path: store.rootGetters.getCurrentPath,
      posts: paths,
    });
  },

  /**
   * @param store
   * @param queryVars
   */
  add404: (store, queryVars) => {
    store.commit('CACHE_ADD_404', queryVars);
  },

  addImagePath: (store, image) => {
    store.commit('CACHE_ADD_IMAGE_PATH', image);
  },

  addComment: (store, args) => {
    const { ancestors } = args;
    const postedComment = args.comment;
    const { i, thread } = store.getters.getPostCommentThreadAndIndex(
      args.pId,
      ancestors[0],
    );
    if (i === -1) {
      store.commit('CACHE_ADD_COMMENT', {
        postId: args.pId,
        comment: commentHelper.cleanComment(args.comment),
      });
      return;
    }
    const t = JSON.parse(JSON.stringify(thread));
    t.children = commentHelper
      .addCheckpoints(ancestors)
      .updateThread(t, postedComment, ancestors);
    store.commit('CACHE_UPDATE_COMMENT_THREAD', {
      postId: args.pId,
      threadIndex: i,
      thread: t,
    });
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
  /**
   * Does path exist in paths cache
   *
   * @param state
   * @param getters
   * @returns {function(*=): boolean}
   *
   * @since   0.0.1
   */
  cacheExists: (state, getters) => path => {
    return state.pathsCache.indexOf(path) >= 0;
  },
  /**
   * Check if given post path is already cached
   *
   * @param state
   * @param getters
   * @returns {function(*): boolean}
   *
   * @since   0.0.1
   */
  postCacheExists: (state, getters) => currentPath => {
    return currentPath in state.postsCache;
  },
  /**
   * Is route query cached?
   *
   * @param state
   * @param getters
   * @param rootState
   * @param rootGetters
   * @returns {boolean}
   *
   * @since   0.0.1
   */
  queryCacheExists: (state, getters, rootState, rootGetters) => {
    return rootGetters.getCurrentPath in state.queriesCache;
  },
  /**
   * Get cached queries
   *
   * @param state
   * @returns {{}|state.queriesCache}
   *
   * @since   0.0.1
   */
  getQueriesCache: state => {
    return state.queriesCache;
  },

  getPostsCache: state => {
    return state.postsCache;
  },

  postCommentsExist: state => postId => {
    return Object.hasOwnProperty.call(state.comments, postId);
  },

  getPostCommentThreadAndIndex: state => (postId, commentId) => {
    let { comments } = state;
    comments = comments[postId];
    for (let i = 0, m = comments.length; i < m; i++) {
      if (commentId === parseInt(comments[i].comment_ID)) {
        return { i, thread: comments[i] };
      }
    }
    return { i: -1, thread: {} };
  },

  getPostComments: state => postId => {
    return state.comments[postId];
  },

  imageCached: state => imagePath => {
    for (let i = 0, m = state.imagePaths.length; i < m; i++) {
      if (state.imagePaths[i].src === imagePath) {
        return state.imagePaths[i];
      }
    }
    return false;
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
