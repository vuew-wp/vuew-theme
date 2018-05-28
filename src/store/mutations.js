import Vue from 'vue'

export const mutations = {
    'UPDATE_CURRENT_PATH': (state, path) => {
        Vue.set( state, 'currentPath', path );
    },
    'TOGGLE_OFF_CANVAS': ( state, open ) => {
        if( typeof open !== 'undefined' ){
            Vue.set( state, 'offCanvasOpen', open );
            return;
        }
        Vue.set( state, 'offCanvasOpen', ! state.offCanvasOpen );
    }
};