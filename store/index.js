/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
import { storage, database } from '@/plugins/firebase';
import Vue from 'vue';

const state = () => ({
  // eslint-disable-next-line no-new-object
  fetchedFiles: {},
  currentPath: 'root',
});

const actions = {
  nuxtServerInit(vueContext) {
    return database.ref('root').once('value', (snap) => {
      vueContext.commit('SET_FILES_DATA', snap.val());
    });
  },
  uploadFile(context, e) {
    if (e.target.files.length === 0) {
      return;
    }
    const file = e.target.files[0];
    const { size } = e.target.files[0];
    const storageRef = storage.ref(`root/${file.name}`);

    storageRef.put(file)
      .then(() => {
        storageRef.getDownloadURL()
          .then((snap) => {
            let pushRef = database.ref(`${context.state.currentPath}`).push();
            if (context.state.currentPath.includes('/')) {
              const path = context.state.currentPath.split('/').join('-');
              pushRef = database.ref(`${path}`).push();
            }
            const data = {
              downloadURL: snap,
              type: 'file',
              fileName: file.name,
              storagePath: `${context.state.currentPath}/${file.name}`,
              updateTime: new Date().getTime(),
              key: pushRef.key,
              size,
              archive: false,
            };
            context.commit('ADD_FILES_DATA', data);
            pushRef.set(data);
          });
      });
  },
  deleteFile(context, key) {
    const storageRef = storage.ref();
    database.ref(`${context.state.currentPath.replace(/\//g, '-')}/${key}`)
      .once('value', (snap) => snap)
      .then((snap) => {
        const { storagePath, key } = snap.val();
        storageRef.child(storagePath)
          .delete()
          .then(() => {
            database.ref(`root/${key}`).remove();
          });
      })
      .then(() => {
        context.commit('REMOVE_FILES_DATA', key);
      });
  },
  toggleArchive(context, { key, archive }) {
    database.ref(`root/${key}/archive`)
      .set(!archive)
      .then(() => {
        context.commit('SET_FILES_ARCHIVE', { key, archive });
      });
  },
  createNewFolder(context, { folderName }) {
    const { currentPath } = context.state;
    const data = {
      folderName,
      type: 'folder',
      path: `${currentPath}/${folderName}`,
      updateTime: new Date().getTime(),
      archive: false,
    };
    return database.ref(`root/${data.folderName}`)
      .set(data)
      .then(() => {
        context.commit('ADD_FOLDER_DATA', data);
        const dashPath = data.path.split('/').join('-');
        database.ref(`/${dashPath}/init`).set(true);
      });
  },
  deleteFolder(context, { name, dashPath }) {
    database.ref(`root/${name}`).remove()
      .then(() => {
        context.commit('REMOVE_FILES_DATA', name);
        database.ref(dashPath).remove();
      });
  },
  toggleArchiveFolder(context, { path, archive }) {
    database.ref(`${path}/archive`)
      .set(!archive)
      .then(() => {
        context.commit('SET_FOLDER_ARCHIVE', { path, archive });
      });
  },
  updateCurrentPath(context, newPath) {
    console.log('newPath', newPath);
    context.commit('UPDATE_PATH', newPath);
  },
};

const mutations = {
  SET_FILES_DATA(state, data) {
    state.fetchedFiles = data;
  },
  ADD_FILES_DATA(state, data) {
    if (!state.fetchedFiles) {
      this.dispatch('nuxtServerInit');
    } else {
      Vue.set(state.fetchedFiles, data.key, data);
    }
  },
  ADD_FOLDER_DATA(state, data) {
    if (!state.fetchedFiles) {
      this.dispatch('nuxtServerInit');
    } else {
      Vue.set(state.fetchedFiles, data.folderName, data);
    }
  },
  REMOVE_FILES_DATA(state, key) {
    Vue.delete(state.fetchedFiles, key);
  },
  SET_FILES_ARCHIVE(state, { key, archive }) {
    state.fetchedFiles[key].archive = !archive;
  },
  SET_FOLDER_ARCHIVE(state, { path, archive }) {
    const pathArray = path.split('/');
    const propName = pathArray[pathArray.length - 1];
    state.fetchedFiles[propName].archive = !archive;
  },
  UPDATE_PATH(state, newPath) {
    state.currentPath = newPath;
  },
};

const getters = {
  fetchedFiles(state) {
    return state.fetchedFiles;
  },
  archivedFiles(state) {
    const data = {};
    Object.keys(state.fetchedFiles).forEach((key) => {
      if (state.fetchedFiles[key].archive) {
        data[key] = state.fetchedFiles[key];
      }
    });
    return data;
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
