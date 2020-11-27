/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
const state = () => ({
  visible: false,
});

const actions = {
};

const mutations = {
  OPEN(state) {
    state.visible = true;
  },
  CLOSE(state) {
    state.visible = false;
  },
};

const getters = {
  visible(state) {
    return state.visible;
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
