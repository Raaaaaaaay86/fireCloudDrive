/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */

const state = () => ({
  uploadList: false,
  sortList: false,
  fileList: false,
});

const actions = {
  toggleUploadList(context) {
    context.commit('TOGGLE_UPLOAD_LIST');
  },
  toggleSortList(context) {
    context.commit('TOGGLE_SORT_LIST');
  },
  toggleFileList(context) {
    context.commit('TOGGLE_FILE_LIST');
  },
  closeAllList(context) {
    context.commit('CLOSE_ALL_LIST');
  },
};

const mutations = {
  TOGGLE_UPLOAD_LIST(state) {
    state.uploadList = !state.uploadList;
    state.sortList = false;
  },
  TOGGLE_SORT_LIST(state) {
    state.sortList = !state.sortList;
    state.uploadList = false;
  },
  TOGGLE_FILE_LIST(state) {
    state.fileList = !state.fileList;
  },
  CLOSE_ALL_LIST(state) {
    state.sortList = false;
    state.uploadList = false;
  },
};

const getters = {
  uploadList(state) {
    return state.uploadList;
  },
  sortList(state) {
    return state.sortList;
  },
  fileList(state) {
    return state.fileList;
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
