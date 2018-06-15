/**
 * Notify
 *
 * @since   0.0.1
 */

const state = {
    routeChange         : '',
    routeChangeVerbose  : ''
};

const mutations = {
    ADD_NOTIFICATION: (state, msg) => {
        state.routeChange = msg;
    }
};

const actions = {
    clearNotification: ( store ) => {
        store.commit( 'ADD_NOTIFICATION', '' );
    },
    addNotification: ( store, msg ) => {
        const prevNotifications = store.getters[ 'getNotifications' ];
        store.commit( 'ADD_NOTIFICATION', prevNotifications + "<br>" + msg );
    }
};

const getters = {
    getNotifications: ( state ) => {
        return state.routeChange;
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