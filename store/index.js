/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
import { storage, database } from '@/plugins/firebase';
import Vue from 'vue';

const state = () => ({
  fetchedFiles: {},
  pathFiles: {},
  archivedFiles: {},
  currentPath: 'root',
});

const actions = {
  nuxtServerInit(vueContext) {
    return database.ref('root').once('value', (snap) => {
      vueContext.commit('SET_FILES_DATA', snap.val());
    });
  },
  fetchPathFiles(context, { path }) {
    return database.ref(path).once('value', (snap) => {
      context.commit('SET_PATH_FILES', snap.val());
    });
  },
  fetchArchivedFiles(context) {
    return database.ref('archives').once('value', (snap) => {
      context.commit('SET_ARCHIVE_DATA', snap.val());
    });
  },
  uploadFile(context, e) {
    if (e.target.files.length === 0) {
      return;
    }
    const file = e.target.files[0];
    const { size } = e.target.files[0];
    const { currentPath } = context.state;
    const storageRef = storage.ref(`${currentPath}/${file.name}`);

    storageRef.put(file)
      .then(() => {
        storageRef.getDownloadURL()
          .then((snap) => {
            const databaseRef = currentPath.replace(/\//g, '-');
            const pushRef = database.ref(`${databaseRef}`).push();

            const data = {
              downloadURL: snap,
              type: 'file',
              fileName: file.name,
              storagePath: `${currentPath}/${file.name}`,
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
  createNewFolder(context, { folderName }) {
    const { currentPath } = context.state;
    const currentPathRef = currentPath.replace(/\//, '-');
    const data = {
      folderName,
      type: 'folder',
      path: `${currentPath}/${folderName}`,
      updateTime: new Date().getTime(),
      archive: false,
    };
    return database.ref(`${currentPathRef}/${data.folderName}`)
      .set(data)
      .then(() => {
        context.commit('ADD_FOLDER_DATA', data);
        const newDatabaseRef = data.path.replace(/\//g, '-');
        database.ref(`/${newDatabaseRef}/init`).set(true);
      });
  },
  deleteFolder(context, { name, path }) {
    const databasePathRef = path.replace(/\//g, '-');
    database.ref(`root/${name}`).remove()
      .then(() => {
        context.commit('REMOVE_FILES_DATA', name);
        database.ref(databasePathRef).remove();
      });
  },
  toggleArchive(context, file) {
    // const databasePathRef = context.state.currentPath.replace(/\//g, '-');
    const { key, archive, storagePath } = file;
    const storagePathArray = storagePath.split('/');
    storagePathArray.pop();
    const path = storagePathArray.join('-');

    database.ref(`${path}/${key}/archive`)
      .set(!archive)
      .then(() => {
        context.commit('SET_FILES_ARCHIVE', { key, archive });
      });

    if (archive) {
      database.ref(`archives/${key}`).remove();
      context.commit('REMOVE_LOCAL_ARCHIVE', { key });
    } else {
      const uploadFile = { ...file };
      uploadFile.archive = true;
      database.ref(`archives/${key}`).set(uploadFile);
    }
  },
  toggleArchiveFolder(context, folder) {
    const { folderName, archive, path } = folder;
    // Toggle the Archive value of Database
    database.ref(`${path}/archive`)
      .set(!archive)
      .then(() => {
        context.commit('SET_FOLDER_ARCHIVE', { folderName, archive });
      });
    // Adding or removing the folder info in the DB(archives/)
    if (archive) {
      const databaseArchivePathRef = path.replace(/\//g, '-');
      database.ref(`archives/${databaseArchivePathRef}`).remove();
      context.commit('REMOVE_LOCAL_ARCHIVE', { key: databaseArchivePathRef });
    } else {
      const databaseArchivePathRef = path.replace(/\//g, '-');
      const uploadFolder = { ...folder };
      uploadFolder.archive = true;
      database.ref(`archives/${databaseArchivePathRef}`).set(uploadFolder);
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
    Vue.delete(state.fetchedFiles, key);
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
};

export default {
  state,
  actions,
  mutations,
  getters,
};
