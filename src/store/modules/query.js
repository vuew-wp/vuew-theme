/**
 * Vuex - Query module
 */

import { HTTP } from '../../common/http_proxy';
import { debug } from '../../debug';
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
	ADD_404: ( state, data ) => {
		//Update queryIndex
		data.type = data.component = 'four04';
		data.type_value = false;
		//Add new queries object to stackTrace
		state.queries[ data.path ] = data;
	},

	UPDATE_REQUEST_STATE: ( state, transition ) => {
		state.pending = transition.pending;
		state.loaded = transition.loaded;
	},

	PAGINATION_PENDING: ( state, newState ) => {
		state.paginationPending = newState;
	},

	UPDATE_CACHE_STORE: ( state, type ) => {
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
	navigate: ( store, queryVars ) => {

		/** Init request state */
		store.commit( "UPDATE_REQUEST_STATE", {
			loaded: false,
			pending: true
		} );

		/** @type {string|*} path */
		const path = queryVars.path;

		/** Current path pointer */
		store.dispatch( 'updateCurrentPath', path, { root: true } );

		/**
		 * Is 404
		 */
		if ( queryVars.type === 404 ) {
			/** Add route query to cache */
			store.dispatch( 'force404', queryVars );
			return;
		}

		/**
		 * Bail if route query cache exists
		 */
		if ( store.rootGetters[ 'cache/queryCacheExists' ] ) {

			/** If back or forward is clicked in browser */
			if ( false === queryVars.id ) {
				debug.log( 'query/navigate', 'BACK / FORWARD in browser' );
			} else {
				debug.log( 'query/navigate', 'Cache exists' );
			}

			store.commit( "UPDATE_REQUEST_STATE", { loaded: true, pending: false } );
			return;

		}

		/**
		 * Edge case check.
		 */
		if ( false === queryVars.id ) {
			if ( !queryVars.rest_base && !queryVars.type && !queryVars.type_value ) {
				window.location.href = path;
				debug.log( 'query/navigate', 'Reload browser' );
			}
		}

		/** Bail if post cache exists */
		if ( store.rootGetters[ 'cache/postCacheExists' ]( path ) ) {
			queryVars.payload.cached = true;
			store.dispatch( 'cache/addRouteQuery', queryVars, { root: true } );
			store.commit( "UPDATE_REQUEST_STATE", { loaded: true, pending: false } );
			return;
		}

		/**
		 * Fetch Archives
		 */
		if ( queryVars.isArchive ) {
			store.dispatch( 'fetchArchive', queryVars );
			return;
		}

		/**
		 * Fetch by id - single post/post_types
		 */
		HTTP.get( queryVars.rest_base + '/' + queryVars.id )
		    .then( response => {

			    /** Add payload to query store */
			    queryVars.payload = {
				    cached: true,
				    posts: [ response.data ]
			    };

			    /** Add route query to cache */
			    store.dispatch( 'cache/addRouteQuery', queryVars, { root: true } );

			    /** Update request state */
			    store.commit( "UPDATE_REQUEST_STATE", { loaded: true, pending: false } );

		    } )
		    .catch( e => {
			    /** Add route query to cache */
			    store.dispatch( 'force404', queryVars );
		    } );
	},

	force404: ( store, queryVars ) => {
		HTTP.get( 'VUEW_QUERY_FORCE_404?path=' + encodeURI( queryVars.path ) )
		    .catch( e => {
			    store.dispatch( 'cache/add404', queryVars, { root: true } );
			    store.commit( "UPDATE_REQUEST_STATE", {
				    loaded: true,
				    pending: false
			    } );
		    } );
	},

	/**
	 * Add Post lists
	 *
	 * @param store
	 * @param queryArgs
	 */
	fetchArchive: ( store, queryArgs ) => {

		const endPoint = helpers.getArchiveEndpoint( queryArgs );

		if ( store.rootGetters.isFirstLoad && Vuew.config.layout.archives[ queryArgs.type ].hasOwnProperty( 'atf' ) ) {
			store.dispatch( 'cacheBoot', queryArgs );
			return;
		}

		/**
		 * Do archive request
		 */
		HTTP.get( endPoint )
		    .then( response => {

			    /** Add payload to queriedObject */
			    queryArgs.payload = response.data;
			    /** Dispatch route query */
			    store.dispatch( 'cache/addRouteQuery', queryArgs, { root: true } );
			    store.commit( "UPDATE_REQUEST_STATE", { loaded: true, pending: false } );

		    } )
		    .catch( e => {
			    debug.force( e );
			    store.commit( "UPDATE_REQUEST_STATE", { loaded: true, pending: false } );
		    } );
	},

	cacheBoot: ( store, queryArgs ) => {
		/** Add boot content */
		store.dispatch( 'cache/addRouteQuery', queryArgs, { root: true } );
		/** Add belowFold content */
		store.dispatch( 'addPostsToList' );
		store.commit( "UPDATE_REQUEST_STATE", { loaded: true, pending: false } );
	},

	addPostsToList: ( store ) => {

		const currentQueriedObject = store.getters.getCurrentQueriedObject;
		const ppp = Vuew.config.query.ppp;
		const postCount = currentQueriedObject.payload.post_count;

		let endPoint = helpers.getArchivePaginationEndpoint( currentQueriedObject );

		store.commit( "PAGINATION_PENDING", true );

		HTTP.get( endPoint + 'offset=' + postCount + '&per_page=' + ppp )
		    .then( response => {

			    store.dispatch( 'cache/updateQueryPostList', {
				    posts: response.data
			    }, { root: true } );

			    store.commit( "PAGINATION_PENDING", false );

		    } )
		    .catch( e => {
			    store.commit( "PAGINATION_PENDING", false );
			    console.log( e );
		    } );
	},

	getComments: ( store, postId ) => {
		//store.commit( "COMMENTS_PENDING", true );
		HTTP.get( 'posts/' + postId + '?vr_post_comments=1' ).then( response => {
			console.log( response.data );
			store.commit( "cache/CACHE_ADD_COMMENTS", { postId: postId, comments: response.data }, { root: true } )
			//store.commit( "COMMENTS_PENDING", false );
		} ).catch( e => {
			console.log( e );
			//store.commit( "COMMENTS_PENDING", false );
		} );
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

		const queries = rootGetters[ 'cache/getQueriesCache' ];
		let currentPath = rootGetters[ 'getCurrentPath' ];

		if ( currentPath && queries.hasOwnProperty( currentPath ) ) {
			return queries[ currentPath ];
		}
	},

	getComments: ( state ) => {

	},

	/**
	 * @param state
	 * @returns {boolean}
	 */
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