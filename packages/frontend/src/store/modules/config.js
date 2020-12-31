const state = {
  shouldHideReply: false,
  shouldHideNoImage: false,
  shouldUsePagination: false,
};

const getters = {
  shouldHideReply: state => state.shouldHideReply,
  shouldHideNoImage: state => state.shouldHideNoImage,
  shouldUsePagination: state => state.shouldUsePagination,
};

const actions = {
  updateHideReplyStatus({ commit }) {
    commit("UPDATE_HIDE_REPLY_STATUS");
  },
  updateHideNoImage({ commit }) {
    commit("UPDATE_HIDE_NO_IMAGE_STATUS");
  },
  updatePaginationStatus({ commit }) {
    commit("UPDATE_PAGINATION_STATUS");
  }
};
const mutations = {
  UPDATE_HIDE_REPLY_STATUS(state) {
    state.shouldHideReply = !state.shouldHideReply;
  },
  UPDATE_HIDE_NO_IMAGE_STATUS(state) {
    state.shouldHideNoImage = !state.shouldHideNoImage;
  },
  UPDATE_PAGINATION_STATUS(state) {
    state.shouldUsePagination = !state.shouldUsePagination;
  }
};
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
