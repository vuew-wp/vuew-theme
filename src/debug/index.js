let debugObj = {
    error: function (...msg) {
        console.error(msg)
    },
    force: function ( ...msg ){
        console.error(msg)
    }
};

if ('development' === NODE_ENV) {
    debugObj.log = function (...msg) {
        if ('verbose' === VUEW_DEBUG) {
            console.log(msg);
        }
    };
} else {
    debugObj.log = function (...msg) {}
}

export const debug = debugObj;