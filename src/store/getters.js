export const getters = {
    getCurrentPath: ( state ) => {
        if( state.currentPath ) {
            if( '/' === state.currentPath ) {
                return '/';
            }
            return state.currentPath.replace(/\/$/, "");
        }
    },
    getOffCanvasState: ( state ) => ( target ) => {
        return state[ target ];
    }
};