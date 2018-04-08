/**
 * Vuex - Query module
 */

import { HTTP } from '../../utils/http_proxy';

const state = {};

const mutations = {};

const actions = {
    addPayload: (store, payload ) => {
        //Do AJAX request
        HTTP.get( payload.query.rest_base + '/' + payload.query.id )
            .then(response => {
                store.dispatch( 'query/updateQuery', { data: response.data, i:payload.i }, { root: true } )
            })
            .catch(e => {
                cb(e)
            })
    }
};

/**
 * Query getters
 * @type {{getQueries: (function(*): Array), getQueriedObject: (function(*))}}
 */
const getters = {
    getPayload( state, getters, rootState, rootGetters ) {
        return rootGetters['query/getQueriedPayload'];
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