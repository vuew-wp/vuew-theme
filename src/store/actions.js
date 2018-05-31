export const actions = {
    updateCurrentPath: ( store, path ) => {
        store.commit( 'UPDATE_CURRENT_PATH', path );
        store.dispatch( 'notify/addNotification', '<strong>> Current path</strong> -> ' + path, { root: true } );
    },
    toggleOffCanvas: ( store, data = { open: true } ) => {
        store.commit( 'TOGGLE_OFF_CANVAS', { open: data.open, target: data.target } );
    }
};