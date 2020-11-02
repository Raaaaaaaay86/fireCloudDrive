/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
import { auth } from '@/plugins/firebase';

const state = () => ({
  uid: '',
});

const actions = {
  async logIn(context, { email, password }) {
    try {
      const user = await auth.signInWithEmailAndPassword(email, password);
      const token = await auth.currentUser.getIdToken(true);
      const status = await this.$axios.$post('/api/login', { uid: user.user.uid, token });
      console.log('status', status);
    } catch (error) {
      console.log(error);
    }
  },
  async logOut({ commit }) {
    await auth.signOut();
    await commit('SET_UID', null);
    const { status } = await this.$axios.$post('/api/logout');
    console.log(`[LOG OUT] - ${status}`);
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
