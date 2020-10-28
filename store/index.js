/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
import { database } from '@/plugins/firebase';

const state = () => ({
  fetchedFiles: {},
});

const actions = {
  nuxtServerInit(vueContext) {
    return database.ref('files').once('value', (snap) => {
      vueContext.commit('SET_FILES_DATA', snap.val());
    });
  },
};

const mutations = {
  SET_FILES_DATA(state, data) {
    state.fetchedFiles = data;
  },
};

const getters = {
  fetchedFiles(state) {
    return state.fetchedFiles;
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
