/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
import { auth } from '@/plugins/firebase';

const state = () => ({
  uid: '',
});

const actions = {
  logIn(context, { email, password }) {
    return auth.signInWithEmailAndPassword(email, password)
      .then(async (user) => {
        const token = await auth.currentUser.getIdToken(true);
        this.$axios.$post('/api/login', { uid: user.user.uid, token });
      });
  },
  async logOut({ commit }) {
    await auth.signOut();
    await commit('SET_UID', null);
    return this.$axios.$post('/api/logout');
  },
  setUID({ commit }, uid) {
    commit('SET_UID', uid);
  },
};

const mutations = {
  SET_UID(state, uid) {
    state.uid = uid;
  },
};

export default {
  state,
  actions,
  mutations,
};
