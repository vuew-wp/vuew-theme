export const getters = {
    getCurrentPath: ( state ) => {
        if( state.currentPath ) {
            if( '/' === state.currentPath ) {
                return '/';
            }
            return state.currentPath.replace(/\/$/, "");
        }
    },
    isFirstLoad: ( state ) => {
        return state.firstLoad;
    },
    isArchive: ( state ) => {
        return state.isArchive;
    }
};