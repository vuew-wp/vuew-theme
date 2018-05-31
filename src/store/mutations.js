import Vue from 'vue'

export const mutations = {
    'UPDATE_CURRENT_PATH': (state, path) => {
        Vue.set( state, 'currentPath', path );
    },
    'TOGGLE_OFF_CANVAS': ( state, data ) => {
        if( data.hasOwnProperty( 'open' ) ){
            Vue.set( state, [ data.target ], data.open );
            return;
        }
        Vue.set( state, [ data.target ], ! state[ data.target ] );
    }
};