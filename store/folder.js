/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
/* eslint-disable */
import { database } from '@/plugins/firebase';

const state = () => ({
  folderfiles: {},
});

const actions = {
  fetchFolderFiles(context, { path }) {
    return database.ref(path).once('value', (snap) => {
      context.commit('SET_FOLDER_FILES', snap.val());
    })
  }
};

const mutations = {
  SET_FOLDER_FILES(state, data) {
    state.folderfiles = data;
  },
};

const getters = {
  folderfiles(state) {
    return state.folderfiles;
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
