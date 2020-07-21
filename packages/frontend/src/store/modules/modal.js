const state = {
  about: false
  // setting: false
};

const getters = {
  getAbout: state => state.about
  // getSetting: state => state.setting
};

const actions = {
  updateAbout({ commit }) {
    commit("UPDATE_ABOUT");
  }
  // updateSetting({ commit }) {
  //   commit('UPDATE_SETTING');
  // }
};
const mutations = {
  UPDATE_ABOUT(state) {
    state.about = !state.about;
  }
  // UPDATE_SETTING(state) {
  //   state.setting = !state.setting;
  // }
};
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
