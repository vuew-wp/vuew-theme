export const actions = {
    updateCurrentPath: ( store, path ) => {
        store.commit( 'UPDATE_CURRENT_PATH', path );
        store.dispatch( 'notify/addNotification', '<strong>> Current path</strong> -> ' + path, { root: true } );
    },
    toggleFirstLoad: ( store, isFirstLoad ) => {
        store.commit( 'TOGGLE_FIRST_LOAD', isFirstLoad );
        store.dispatch( 'notify/addNotification', '<strong>> First load</strong>', { root: true } );
    },
    toggleIsArchive: ( store, isArchive ) => {
        store.commit( 'TOGGLE_IS_ARCHIVE', isArchive );
    }
};