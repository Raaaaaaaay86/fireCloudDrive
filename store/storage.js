/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
import { storage, database } from '@/plugins/firebase';

const state = () => ({
});

const actions = {
  uploadFile(context, e) {
    if (e.target.files.length === 0) {
      return;
    }
    const file = e.target.files[0];
    const { size } = e.target.files[0];
    const storageRef = storage.ref(`files/${file.name}`);

    storageRef.put(file)
      .then(() => {
        storageRef.getDownloadURL()
          .then((snap) => {
            const pushRef = database.ref('/files').push();
            const data = {
              downdloadURL: snap,
              fileName: file.name,
              storagePath: `files/${file.name}`,
              updateTime: new Date().getTime(),
              key: pushRef.key,
              size,
            };
            pushRef.set(data);
          });
      });
  },
  deleteFile(context, key) {
    const storageRef = storage.ref();
    database.ref(`files/${key}`).once('value', (snap) => snap)
      .then((snap) => {
        const { storagePath, key } = snap.val();
        storageRef.child(storagePath)
          .delete()
          .then(() => {
            database.ref(`files/${key}`).remove();
          });
      });
  },
};

const mutations = {

};

const getters = {

};

export default {
  state,
  actions,
  mutations,
  getters,
};
