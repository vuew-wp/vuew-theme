/* eslint-disable */
const debugObj = {
  error(...msg) {
    console.error(msg);
  },
  force(...msg) {
    console.error(msg);
  },
};

if (VUEW_DEBUG === 'development') {
  debugObj.log = function(...msg) {
    if (VUEW_DEBUG === 'verbose') {
      console.log(msg);
    }
  };
} else {
  debugObj.log = function(...msg) {};
}

export const debug = debugObj;
