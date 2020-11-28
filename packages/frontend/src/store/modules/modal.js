const DEFAULT = {
  about: false,
  config: false
};
const state = {
  about: false,
  config: false
};

const getters = {
  getAbout: state => state.about || DEFAULT.about,
  getConfig: state => state.config || DEFAULT.config
};

const actions = {
  updateAbout({ commit }) {
    commit("UPDATE_ABOUT");
  },
  updateConfig({ commit }) {
    commit("UPDATE_CONFIG");
  }
};
const mutations = {
  UPDATE_ABOUT(state) {
    state.about = !state.about;
  },
  UPDATE_CONFIG(state) {
    state.config = !state.config;
  }
};
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
