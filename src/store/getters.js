/* eslint-disable */
export const getters = {
  getCurrentPath: state => {
    if (state.currentPath) {
      if (state.currentPath === '/') {
        return '/';
      }
      return state.currentPath.replace(/\/$/, '').trim();
    }
  },
  isFirstLoad: state => {
    return state.isFirstLoad;
  },
  isArchive: state => {
    return state.isArchive;
  },
};
