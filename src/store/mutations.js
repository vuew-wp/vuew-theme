import Vue from 'vue'

export const mutations = {
    'UPDATE_CURRENT_PATH': (state, path) => {
        Vue.set( state, 'currentPath', path );
    }
};