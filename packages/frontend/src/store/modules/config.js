const state = {
  shouldHideReply: true,
  shouldHideOutOfLink: false,
  shouldUsePagination: false,
};

const getters = {
  shouldHideReply: state => state.shouldHideReply,
  shouldHideOutOfLink: state => state.shouldHideOutOfLink,
  shouldUsePagination: state => state.shouldUsePagination,
};

const actions = {
  updateHideReplyStatus({ commit }) {
    commit("UPDATE_HIDE_REPLY_STATUS");
  },
  updateHideOutOfLink({ commit }) {
    commit("UPDATE_HIDE_OUT_OF_LINK_STATUS");
  },
  updatePaginationStatus({ commit }) {
    commit("UPDATE_PAGINATION_STATUS");
  }
};
const mutations = {
  UPDATE_HIDE_REPLY_STATUS(state) {
    state.shouldHideReply = !state.shouldHideReply;
  },
  UPDATE_HIDE_OUT_OF_LINK_STATUS(state) {
    state.shouldHideOutOfLink = !state.shouldHideOutOfLink;
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
