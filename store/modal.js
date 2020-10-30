/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
const state = () => ({
  visible: false,
});

const actions = {
  open(context) {
    context.commit('OPEN_MODAL');
  },
  close(context) {
    context.commit('CLOSE_MODAL');
  },
};

const mutations = {
  OPEN_MODAL(state) {
    state.visible = true;
  },
  CLOSE_MODAL(state) {
    state.visible = false;
  },
};

const getters = {
  modalVisibility(state) {
    return state.visible;
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
