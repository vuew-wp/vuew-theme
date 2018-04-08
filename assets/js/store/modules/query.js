/**
 * Vuex - Query module
 */

/**
 * Stored properties
 * @type {{queries: Array, queryIndex: number}}
 */
const state = {
    queries   : [],
    //Acts as a pointer to the relevant state
    //query index for current route
    queryIndex: 0
};

/**
 * Query mutations
 * @type {{UPDATE_QUERY_INDEX: (function(*, *)), UPDATE_QUERIES: (function(*, *=))}}
 */
const mutations = {
    /**
     * Update current query pointer
     *
     * @param state
     * @param path
     * @constructor
     */
    UPDATE_QUERY_INDEX: (state, path) => {

        let newIndex = 0;
        let queries  = state.queries;

        for (let i = 0, m = queries.length; i < m; i++) {
            if (queries[i].hasOwnProperty('path') && queries[i].path === path) {
                newIndex = i;
                break;
            }
        }
        state.queryIndex = newIndex;

    },
    /**
     * Manage queries stacktrace
     *
     * @param state
     * @param payload
     * @constructor
     */
    UPDATE_QUERIES: (state, payload) => {

        if (payload.id) {

            //Add new queries object to stackTrace
            state.queries.push(payload);
            //Update queryIndex
            state.queryIndex = ( state.queries.length - 1 );

            //Lets keep state manageable to a limit
            if (( state.queries.length - 1 ) === Vuew.historyLimit) {
                state.queries.shift();
                //Update queryIndex
                state.queryIndex--;
            }

        }
        //Something didn't go according to plan.
        else {
            console.error("STATE IS FUCKED!");
        }

    },
    UPDATE_QUERY: ( state, payload ) => {
        const indexToUpdate = payload.i;
        const data = payload.data;

        state.queries[ indexToUpdate ].payload = data;

        //console.log('UPDATE_QUERY', payload);
    }
};

/**
 * Query Actions
 * @type {{boot: (function(*, *)), navigate: (function(*, *=))}}
 */
const actions = {
    /**
     * Insert initial state provided by WP
     *
     * @param store
     */
    boot: (store) => {
        store.commit("UPDATE_QUERIES", Vuew.boot);
    },
    /**
     * Manage query on navigating
     *
     * @param store
     * @param payload
     */
    navigate: (store, payload) => {
        if (false !== payload.id) {
            store.commit( "UPDATE_QUERIES", payload );
            if( ! payload.hasOwnProperty( 'payload' ) ) {
                store.dispatch('post_type/addPayload', { query: payload, i: state.queryIndex }, {root: true})
            }
        } else {
            store.commit( "UPDATE_QUERY_INDEX", payload.path );
        }
    },

    updateQuery: ( store, update ) => {
        store.commit( "UPDATE_QUERY", update );
    }
};

/**
 * Query getters
 * @type {{getQueries: (function(*): Array), getQueriedObject: (function(*))}}
 */
const getters = {
    /**
     * All stored queries
     * @param state
     */
    getQueries: state => state.queries,
    /**
     * Current queried object
     * @param state
     * @returns {*}
     */
    getQueriedObject: state => {
        return state.queries[state.queryIndex]
    },
    /**
     * Current queried object
     * @param state
     * @returns {*}
     */
    getQueriedPayload: state => {
        //console.log('getQueriedPayload', state.queries[state.queryIndex].payload.query)
        return state.queries[state.queryIndex]
    }
};

const namespaced = true;

export default {
    namespaced,
    state,
    getters,
    actions,
    mutations
}