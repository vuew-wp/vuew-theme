export const getters = {
    getCurrentPath: ( state ) => {
        if( state.currentPath ) {
            if( '/' === state.currentPath ) {
                return '/';
            }
            return state.currentPath.replace(/\/$/, "");
        }
    },
    getOffCanvasState: ( state ) => {
        console.log(state)
        return state.offCanvasOpen;
    }
};