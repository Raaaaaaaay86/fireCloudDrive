/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
const state = () => ({
  visible: true,
});

const actions = {
  open() {

  },
  close(context) {
    context.commit('CLOSE_MODAL');
  },
};

const mutations = {
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
