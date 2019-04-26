/* eslint-disable */
/**
 * Layout Vue
 * used for setting object keys and maintaining reactivity.
 *
 * @since   0.0.1
 */
import Vue from 'vue';

const state = {
  offCanvases: {
    active: '',
  },
};

const mutations = {
  TOGGLE_OFF_CANVAS: (state, data) => {
    const currentActiveCanvas = Object.keys(state.offCanvases).find(
      key => state.offCanvases[key] === true,
    );

    if (currentActiveCanvas === data.target) {
      state.offCanvases.active = '';
    } else {
      if (typeof currentActiveCanvas !== 'undefined') {
        Vue.set(state.offCanvases, [currentActiveCanvas], false);
        if (typeof data.target === 'undefined') {
          state.offCanvases.active = '';
          return;
        }
      }
      state.offCanvases.active = data.target;
    }

    Vue.set(state.offCanvases, [data.target], data.open);
  },
  ADD_OFF_CANVAS: (state, target) => {
    Vue.set(state.offCanvases, [target], false);
  },
};

const actions = {
  toggleOffCanvas: (store, data) => {
    store.commit('TOGGLE_OFF_CANVAS', { open: data.open, target: data.target });
  },
  addOffCanvas: (store, data = { open: true }) => {
    store.commit('ADD_OFF_CANVAS', data.target);
  },
};

const getters = {
  offCanvasState: state => target => {
    return state.offCanvases[target];
  },
  hasActiveCanvas: state => {
    return state.offCanvases.active !== '';
  },
};

const namespaced = true;

export default {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
