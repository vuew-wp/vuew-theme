import Vue from 'vue'

export const mutations = {
    'UPDATE_CURRENT_PATH': (state, path) => {
        Vue.set( state, 'currentPath', path );
    },
    'TOGGLE_FIRST_LOAD': ( state, isFirstLoad ) => {
        state.firstLoad = isFirstLoad;
    },
    'TOGGLE_IS_ARCHIVE': ( state, isArchive ) => {
        state.isArchive = isArchive;
    }
};