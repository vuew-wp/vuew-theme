/**
 * Vuex - Query module
 */

import {HTTP} from '../../common/http_proxy';

import { helpers } from "../../common/helpers";

/**
 * Stored properties
 * @type {{queries: Array, queryIndex: number}}
 */
const state = {
    /** Has query loaded */
    loaded: true,
    /** Has query pending */
    pending: false,
    /** Has query loaded */
    paginationPending: false
};

/**
 * Query mutations
 * @type {{UPDATE_QUERY_INDEX: (function(*, *)), UPDATE_QUERIES: (function(*, *=))}}
 */
const mutations = {
    ADD_404: (state, data) => {
        //Update queryIndex
        data.type = data.component = 'four04';
        data.type_value = false;
        //Add new queries object to stackTrace
        state.queries[data.path] = data;
    },

    UPDATE_REQUEST_STATE: (state, transition) => {
        state.pending = transition.pending;
        state.loaded  = transition.loaded;
    },

    PAGINATION_PENDING: (state, newState) => {
        state.paginationPending = newState;
    },

    UPDATE_CACHE_STORE: (state, type) => {
        state.cacheStore = type;
    }

};

/**
 * Query Actions
 * @type {{boot: (function(*, *)), navigate: (function(*, *=))}}
 */
const actions = {

    /**
     * Manage query on navigating
     *
     * @param store
     * @param queryVars
     */
    navigate: (store, queryVars) => {

        /** Notifications */
        store.dispatch( 'notify/clearNotification', null, { root: true } );
        store.dispatch( 'notify/addNotification',
            '<strong>> Navigation started</strong>', { root: true } );

        /** Init request state */
        store.commit("UPDATE_REQUEST_STATE", {
            loaded: false,
            pending: true
        });

        /** @type {string|*} path */
        const path = queryVars.path;

        /** Current path pointer */
        store.dispatch( 'updateCurrentPath', path, { root: true } );

        if( queryVars.type === 404 ){
            /** Add route query to cache */
            store.dispatch( 'force404', queryVars );
            return;
        }

        /** Bail if route query cache exists */
        if ( store.rootGetters[ 'cache/queryCacheExists' ] ) {

            /** If back or forward is clicked in browser */
            if( false === queryVars.id ){
                store.dispatch( 'notify/addNotification',
                    '<strong>> BACK / FORWARD in browser</strong>', { root: true } );
            } else {
                store.dispatch( 'notify/addNotification',
                    '<strong>> Cache exists</strong>', { root: true } );
            }

            store.commit( "UPDATE_REQUEST_STATE", {loaded: true, pending: false });
            return;

        }

        store.dispatch( 'notify/addNotification',
            '<strong>> Component</strong> -> ' + queryVars.component, { root: true } );

        /** Bail if post cache exists */
        if( store.rootGetters[ 'cache/postCacheExists' ](path) ){
            queryVars.payload.cached = true;
            store.dispatch( 'cache/addRouteQuery', queryVars, { root: true } );
            store.commit( "UPDATE_REQUEST_STATE", {loaded: true, pending: false });
            return;
        }

        /**
         * Archives
         */
        if( queryVars.isArchive ) {
            store.dispatch( 'fetchArchive', queryVars );
            return;
        }

        /** Main query */
        store.dispatch( 'notify/addNotification', '<strong>> Fetching from</strong> -> ' + queryVars.rest_base + '/' + queryVars.id, { root: true } );

        HTTP.get( queryVars.rest_base + '/' + queryVars.id )
            .then(response => {

                store.dispatch( 'notify/addNotification', '<strong>> Response rehtfhtceived</strong>', { root: true } );

                /** Add payload to query store */
                queryVars.payload = {
                    cached: true,
                    posts : [ response.data ]
                };

                /** Add route query to cache */
                store.dispatch( 'cache/addRouteQuery', queryVars, { root: true } );

                /** Update request state */
                store.commit("UPDATE_REQUEST_STATE", {loaded: true, pending: false});

            })
            .catch(e => {
                /** Add route query to cache */
                store.dispatch( 'force404', queryVars );
            });
    },

    force404: ( store, queryVars ) => {
        HTTP.get( 'VUEW_QUERY_FORCE_404?path=' + encodeURI( queryVars.path ) )
            .catch(e => {
                store.dispatch( 'cache/add404', queryVars, { root: true } );
                store.commit( "UPDATE_REQUEST_STATE", {
                    loaded: true,
                    pending: false
                });
                store.dispatch( 'notify/addNotification',
                    '<strong>> ERROR: Server response</strong> -> ' + e, { root: true } );
            });
    },

    /**
     * Add Post lists
     *
     * @param store
     * @param queryArgs
     */
    fetchArchive: (store, queryArgs) => {

        const endPoint = helpers.getArchiveEndpoint( queryArgs );

        store.dispatch( 'notify/addNotification',
            '<strong>> Fetching archive</strong> -> ' + endPoint, { root: true } );

        HTTP.get( endPoint )
            .then(response => {

                queryArgs.payload = response.data;

                store.dispatch('cache/addRouteQuery', queryArgs, {root: true});

                store.commit("UPDATE_REQUEST_STATE", {loaded: true, pending: false});

                store.dispatch( 'notify/addNotification',
                    '<strong>> Response received</strong> -> ' + response.data.found_posts + ' posts found.', { root: true } );

            })
            .catch(e => {
                console.log(e);
                store.commit("UPDATE_REQUEST_STATE", {loaded: true, pending: false});
            });
    },

    addPostsToList: ( store ) => {

        const currentQueriedObject = store.getters.getCurrentQueriedObject;
        const ppp = Vuew.config.query.ppp;
        const PostCount = currentQueriedObject.payload.post_count;
        const page = ( PostCount / ppp ) + 1;

        let endPoint = helpers.getArchivePaginationEndpoint( currentQueriedObject );
        //endPoint = endPoint + 'exclude=' + encodeURI( store.rootState.cache.excludeIds ) + '&';

        store.commit("PAGINATION_PENDING", true);

        HTTP.get( endPoint + 'page=' + page + '&per_page=' + ppp /*+ '&orderby=date&order=desc'*/ )
            .then(response => {

                store.dispatch('cache/updateQueryPostList', {
                    posts: response.data
                }, { root: true } );

                store.commit("PAGINATION_PENDING", false);

            })
            .catch(e => {
                store.commit("PAGINATION_PENDING", false);
                console.log(e)
            });
    }

};

/**
 * Query getters
 * @type {{getQueries: (function(*): Array), getCurrentQueriedObject: (function(*))}}
 */
const getters = {

    /**
     * @param state
     * @param getters
     * @param rootState
     * @param rootGetters
     * @returns {*}
     */
    getCurrentQueriedObject: ( state, getters, rootState, rootGetters ) => {

        const queries = rootGetters['cache/getQueriesCache'];
        let currentPath = rootGetters['getCurrentPath'];

        if( currentPath && queries.hasOwnProperty( currentPath ) ){
            return queries[ currentPath ];
        }
    },

    paginationPending: state => {
        return state.paginationPending
    },

    /**
     * @param state
     * @returns {boolean}
     */
    isLoaded: state => state.loaded,

    /**
     * @param state
     * @returns {boolean}
     */
    isPending: state => state.pending
};

/**
 * query/*
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