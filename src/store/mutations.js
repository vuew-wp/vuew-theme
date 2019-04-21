import Vue from 'vue'

export const mutations = {
    'UPDATE_CURRENT_PATH': (state, path) => {
        Vue.set( state, 'currentPath', path );
    },
    'TOGGLE_FIRST_LOAD': ( state, isFirstLoad ) => {
        state.isFirstLoad = isFirstLoad;
    },
    'TOGGLE_IS_ARCHIVE': ( state, isArchive ) => {
        state.isArchive = isArchive;
    },
    'TOGGLE_IS_HOME': ( state, isHome ) => {
        state.isHome = isHome;
    },
    'USER_ID': ( state, id ) => {
        state.userId = id;
    }
};
