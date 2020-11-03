/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
import { storage, database, firebase } from '@/plugins/firebase';
import Vue from 'vue';

const state = () => ({
  fetchedFiles: {},
  pathFiles: {},
  archivedFiles: {},
  currentPath: 'root',
});

const actions = {
  nuxtServerInit({ commit }) {
    return database.ref('root')
      .once('value', (snap) => {
        commit('SET_FILES_DATA', snap.val());
      });
  },
  fetchPathFiles({ commit }, { path }) {
    return database.ref(path)
      .once('value', (snap) => {
        commit('SET_PATH_FILES', snap.val());
      });
  },
  fetchArchivedFiles({ commit }) {
    return database.ref('archives')
      .once('value', (snap) => {
        commit('SET_ARCHIVE_DATA', snap.val());
      });
  },
  async uploadFile({ state, commit, dispatch }, e) {
    if (e.target.files.length === 0) {
      return;
    }

    const file = e.target.files[0];
    const { size } = e.target.files[0];
    const { currentPath } = state;
    const storageRef = storage.ref(`${currentPath}/${file.name}`);
    const databaseRefNodeName = currentPath.replace(/\//g, '-'); // Convert to the nodeName of Database

    await storageRef.put(file);
    storageRef.getDownloadURL()
      .then((snap) => {
        const pushRef = database.ref(databaseRefNodeName).push();
        const data = {
          downloadURL: snap,
          type: 'file',
          fileName: file.name,
          name: file.name,
          storagePath: `${currentPath}/${file.name}`,
          path: currentPath,
          updateTime: new Date().getTime(),
          key: pushRef.key,
          size,
          archive: false,
        };
        commit('ADD_FILES_DATA', data); // Update Vuex state
        pushRef.set(data); // Set data Info in the DB.
        database.ref(currentPath).child('size') // Increase the parent folder's size
          .set(firebase.database.ServerValue.increment(size));
        database.ref('usedStorage') // Increase the total size of CloudDrive in DB
          .set(firebase.database.ServerValue.increment(size));
        dispatch('nuxtServerInit'); // Refetch the data from DB in order to update
      });
  },
  createNewFolder({ state, commit }, { folderName }) {
    const { currentPath } = state;
    const currentPathNodeName = currentPath.replace(/\//, '-');
    const data = {
      folderName,
      name: folderName,
      type: 'folder',
      path: `${currentPath}/${folderName}`,
      updateTime: new Date().getTime(),
      archive: false,
      size: 0,
    };

    return database.ref(`${currentPathNodeName}/${data.folderName}`)
      .set(data)
      .then(() => {
        commit('ADD_FOLDER_DATA', data);
        const newDatabaseNodeName = data.path.replace(/\//g, '-');
        database.ref(`/${newDatabaseNodeName}/init`).set(true);
      });
  },
  deleteFile({ commit, dispatch }, file) {
    const storageRef = storage.ref();
    const {
      path,
      storagePath,
      key,
      size,
    } = file;
    const databasePathNodeName = path.replace(/\//g, '-');

    database.ref(`${databasePathNodeName}/${key}`).remove()
      .then(() => {
        storageRef.child(storagePath).delete();
        commit('REMOVE_FILES_DATA', key);
      });
    database.ref(path).child('size') // Decrease the parent folder size in DB
      .set(firebase.database.ServerValue.increment(-size));
    database.ref('usedStorage') // Decrease the used storage in DB
      .set(firebase.database.ServerValue.increment(-size));
    dispatch('nuxtServerInit');
  },
  async deleteFolder({ commit }, folder) {
    const { path, folderName, size } = folder;
    const databasePathNodeName = path.replace(/\//g, '-');

    await database.ref(path).remove();
    commit('REMOVE_FILES_DATA', folderName);
    database.ref(`${databasePathNodeName}`).remove();
    database.ref('usedStorage') // Decrease the used storage in DB
      .set(firebase.database.ServerValue.increment(-size));
  },
  async toggleArchive({ commit }, file) {
    const { key, archive, storagePath } = file;
    const storagePathArray = storagePath.split('/');
    storagePathArray.pop();
    const path = storagePathArray.join('-');

    await database.ref(`${path}/${key}/archive`).set(!archive);
    commit('SET_FILES_ARCHIVE', { key, archive });

    const databaseRef = database.ref(`archives/${key}`);
    if (archive) {
      databaseRef.remove();
      commit('REMOVE_LOCAL_ARCHIVE', { key });
    } else {
      const uploadFile = { ...file };
      uploadFile.archive = true;
      databaseRef.set(uploadFile);
    }
  },
  async toggleArchiveFolder({ commit }, folder) {
    const { folderName, archive, path } = folder;

    // Toggle the Archive value of Database
    await database.ref(`${path}/archive`).set(!archive);
    commit('SET_FOLDER_ARCHIVE', { folderName, archive });

    // Adding or removing the folder info in the DB(archives/)
    const databaseArchiveNodeName = path.replace(/\//g, '-');
    const databaseRef = database.ref(`archives/${databaseArchiveNodeName}`);
    if (archive) {
      databaseRef.remove();
      commit('REMOVE_LOCAL_ARCHIVE', { key: databaseArchiveNodeName });
    } else {
      const uploadFolder = { ...folder };
      uploadFolder.archive = true;
      databaseRef.set(uploadFolder);
    }
  },
  updateCurrentPath(context, newPath) {
    context.commit('UPDATE_PATH', newPath);
  },
};

const mutations = {
  SET_FILES_DATA(state, data) {
    state.fetchedFiles = data;
  },
  SET_PATH_FILES(state, data) {
    state.pathFiles = data;
  },
  SET_ARCHIVE_DATA(state, data) {
    state.archivedFiles = data;
  },
  REMOVE_LOCAL_ARCHIVE(state, { key }) {
    if (!state.archivedFiles) {
      return;
    }
    if (state.archivedFiles[key]) {
      Vue.delete(state.archivedFiles, key);
    }
  },
  ADD_FILES_DATA(state, data) {
    const currentPath = this.$router.app.$route.params.path || 'root';

    if (!state.fetchedFiles) {
      this.dispatch('nuxtServerInit');
    } else if (currentPath === 'root') {
      Vue.set(state.fetchedFiles, data.key, data);
    } else {
      Vue.set(state.pathFiles, data.key, data);
    }
  },
  REMOVE_FILES_DATA(state, key) {
    const currentPath = this.$router.app.$route.params.path || 'root';
    if (currentPath === 'root') {
      Vue.delete(state.fetchedFiles, key);
    } else {
      Vue.delete(state.pathFiles, key);
    }
  },
  SET_FILES_ARCHIVE(state, { key, archive }) {
    if (state.currentPath === 'root') {
      state.fetchedFiles[key].archive = !archive;
    } else {
      state.pathFiles[key].archive = !archive;
    }
  },
  SET_FOLDER_ARCHIVE(state, { folderName, archive }) {
    if (state.currentPath === 'root') {
      state.fetchedFiles[folderName].archive = !archive;
    } else {
      state.pathFiles[folderName].archive = !archive;
    }
  },
  ADD_FOLDER_DATA(state, data) {
    const currentPath = this.$router.app.$route.params.path || 'root';

    if (!state.fetchedFiles) {
      this.dispatch('nuxtServerInit');
    } else if (currentPath === 'root') {
      Vue.set(state.fetchedFiles, data.folderName, data);
    } else {
      Vue.set(state.pathFiles, data.folderName, data);
    }
  },
  UPDATE_PATH(state, newPath) {
    state.currentPath = newPath;
  },
};

const getters = {
  fetchedFiles(state) {
    return state.fetchedFiles;
  },
  pathFiles(state) {
    return state.pathFiles;
  },
  archivedFiles(state) {
    return state.archivedFiles;
  },
  rootFileNames(state) {
    const fileNames = [];
    if (!state.fetchedFiles) return fileNames;
    Object.keys(state.fetchedFiles)
      .forEach((key) => {
        if (state.fetchedFiles[key].type === 'file') {
          fileNames.push(state.fetchedFiles[key].fileName);
        }
      });
    return fileNames;
  },
  rootFolderNames(state) {
    const folderNames = [];
    if (state.fetchedFiles) return folderNames;
    Object.keys(state.fetchedFiles)
      .forEach((key) => {
        if (state.fetchedFiles[key].type === 'folder') {
          folderNames.push(state.fetchedFiles[key].folderName);
        }
      });
    return folderNames;
  },
  pathFileNames(state) {
    const fileNames = [];
    if (!state.pathFiles) return fileNames;
    Object.keys(state.pathFiles)
      .forEach((key) => {
        if (state.pathFiles[key].type === 'file') {
          fileNames.push(state.pathFiles[key].fileName);
        }
      });
    return fileNames;
  },
  pathFolderNames(state) {
    const folderNames = [];
    if (!state.pathFiles) return folderNames;
    Object.keys(state.pathFiles)
      .forEach((key) => {
        if (state.pathFiles[key].type === 'folder') {
          folderNames.push(state.pathFiles[key].folderName);
        }
      });
    return folderNames;
  },
  currentPath(state) {
    return state.currentPath;
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
