export const actions = {
    updateCurrentPath: ( store, path ) => {
        store.commit( 'UPDATE_CURRENT_PATH', path );
    },
    toggleFirstLoad: ( store, isFirstLoad ) => {
        store.commit( 'TOGGLE_FIRST_LOAD', isFirstLoad );
    },
    toggleIsArchive: ( store, isArchive ) => {
        store.commit( 'TOGGLE_IS_ARCHIVE', isArchive );
    },
    toggleIsHome: ( store, isHome ) => {
        store.commit( 'TOGGLE_IS_HOME', isHome );
    }
};