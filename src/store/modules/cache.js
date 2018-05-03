/**
 * Import Vue
 * used for setting object keys and maintaining reactivity.
 *
 * @since   0.0.1
 */
import Vue from 'vue';

import { helpers } from "../../common/helpers";

/**
 * Cache State
 *
 * @type {{queriesCache: {}, pathsCache: Array, postsCache: {}}}
 *
 * @since   0.0.1
 */
const state = {
    excludeIds   : [],
    queriesCache : {},
    pathsCache   : [],
    postsCache   : {}
};

/**
 * Cache Mutations
 * @type    {{CACHE_ADD_POST: mutations.CACHE_ADD_POST, CACHE_ADD_QUERY: mutations.CACHE_ADD_QUERY, CACHE_UPDATE_QUERY_POST_LIST: mutations.CACHE_UPDATE_QUERY_POST_LIST}}
 *
 * @since   0.0.1
 */
const mutations = {
    CACHE_ADD_IDS_TO_EXCLUDE: (state, id) => {
        state.excludeIds.push( id );
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
        /*post.path = post.route.path;
        post.rest_base = post.route.rest_base;
        post.type_value = post.route.type_value;*/
        console.log('CACHE_ADD_POST', state.postsCache);
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
        Vue.set( state.queriesCache, query.path, query );
        console.log('CACHE_ADD_QUERY', state.queriesCache);
    },
    /**
     * Update query post list, commonly used for pagination
     *
     * @param state
     * @param args
     * @constructor
     */
    CACHE_UPDATE_QUERY_POST_LIST: (state, args) => {
        Vue.set( state.queriesCache[ args.path ].payload, 'post_paths', [
            ...state.queriesCache[ args.path ].payload.post_paths,
            ...args.posts
        ]);
        state.queriesCache[ args.path ].payload.post_count += args.posts.length;
        console.log('CACHE_UPDATE_POST_LIST',state.queriesCache[ args.path ].payload.post_paths);
    },
    CACHE_ADD_404: (state, query) => {
        //Update queryIndex
        Vue.set( state.queriesCache, query.path, query );
        console.log(state.queriesCache);
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
    addIdToExclude: ( store, path ) => {
        store.commit( 'CACHE_ADD_PATH', path );
    },
    /**
     * Add post to query cache item
     *
     * @param store
     * @param post
     *
     * @since   0.0.1
     */
    addPostToCache: ( store, post ) => {
        store.commit( 'CACHE_ADD_POST', post );
        store.dispatch( 'notify/addNotification', '<strong>> Post cached</strong> -> ' + post.title, { root: true } );
    },
    /**
     * Batch add posts to query item cache
     *
     * @param store
     * @param posts
     *
     * @since   0.0.1
     */
    addPostsToCache: ( store, posts ) => {
        let postTitles = '';
        for( let i in posts ) {
            store.commit('CACHE_ADD_POST', posts[i]);
            postTitles += posts[i].title + ', ';
        }
        store.dispatch( 'notify/addNotification', '<strong>> Posts cached</strong> -> ' + postTitles, { root: true } );
    },
    /**
     * Add route query to cache and if has posts, save the paths.
     *
     * @param store
     * @param data
     *
     * @since   0.0.1
     */
    addRouteQuery: ( store, data ) => {

        let postsPathsToSave = [];
        let queryToSave = data;

        queryToSave.payload.path = store.rootGetters[ 'getCurrentPath' ];

        if( queryToSave.payload.hasOwnProperty( 'posts' ) ) {
            const posts = queryToSave.payload.posts;
            for (let post in posts) {
                postsPathsToSave.push(posts[post].route.path);
                store.commit( 'CACHE_ADD_IDS_TO_EXCLUDE', posts[post].id);
            }
            queryToSave.payload.post_paths = postsPathsToSave;
            delete queryToSave[ 'payload' ][ 'posts' ];
            store.dispatch( 'addPostsToCache', posts );
        }
        store.commit( 'CACHE_ADD_QUERY', queryToSave );
        store.dispatch( 'notify/addNotification', '<strong>> Route query cached</strong>', { root: true } );
    },
    /**
     * Add post paths to archive route query
     *
     * @param store
     * @param args
     *
     * @since   0.0.1
     */
    updateQueryPostList: ( store, args ) => {
        let paths = [];
        for( let post in args.posts ){
            paths.push( args.posts[ post ].route.path );
            store.commit( 'CACHE_ADD_IDS_TO_EXCLUDE', args.posts[post].id);
        }
        store.dispatch( 'addPostsToCache', args.posts );
        store.commit( 'CACHE_UPDATE_QUERY_POST_LIST', { path: store.rootGetters['getCurrentPath'], posts: paths } );

        store.dispatch( 'notify/addNotification', '<strong>> Query post list updated</strong>', { root: true } );

    },

    add404: ( store, queryVars ) => {
        store.commit( "CACHE_ADD_404", queryVars );
    }
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
    cacheExists: ( state, getters ) => ( path ) => {
        return state.pathsCache.indexOf( path ) >= 0
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
    postCacheExists: ( state, getters ) => ( currentPath ) => {
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
    queryCacheExists: ( state, getters, rootState, rootGetters ) => {
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
    getQueriesCache: ( state ) => {
        return state.queriesCache;
    },
    getPostsCache: ( state ) => {
        return state.postsCache;
    }
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
    mutations
}