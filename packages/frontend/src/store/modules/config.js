const state = {
  shouldHideReply: false,
  shouldHideNoImage: false
};

const getters = {
  shouldHideReply: state => state.shouldHideReply,
  shouldHideNoImage: state => state.shouldHideNoImage
};

const actions = {
  updateHideReplyStatus({ commit }) {
    commit("UPDATE_HIDE_REPLY_STATUS");
  },
  updateHideNoImage({ commit }) {
    commit("UPDATE_HIDE_NO_IMAGE_STATUS");
  }
};
const mutations = {
  UPDATE_HIDE_REPLY_STATUS(state) {
    state.shouldHideReply = !state.shouldHideReply;
  },
  UPDATE_HIDE_NO_IMAGE_STATUS(state) {
    state.shouldHideNoImage = !state.shouldHideNoImage;
  }
};
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
