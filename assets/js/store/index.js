import Vue from 'vue'
import Vuex from 'vuex'

/** State root actions/getters */
import * as actions from './actions'
import * as getters from './getters'

/** Modules */
import query from './modules/query'
import post_type from './modules/post_type'

Vue.use(Vuex);

export const store =  new Vuex.Store({
    actions,
    getters,
    modules: {
        query: query,
        //taxonomy: taxonomy,
        post_type: post_type
    },
    strict: process.env.NODE_ENV !== 'production',
    plugins: []
})
