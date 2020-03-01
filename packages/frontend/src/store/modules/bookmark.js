const state = {
  bookmarks: []
};
const getters = {
  bookmarks: state => state.bookmarks,
  find: state => id => state.bookmarks.find(bookmark => bookmark.id === id)
};
const actions = {
  // async initialize({ commit }, value) {},
  addBookmark({ commit }, value) {
    commit("ADD_BOOKMARK", value);
  },
  removeBookmark({ commit }, value) {
    commit("REMOVE_BOOKMARK", value);
  }
};
const mutations = {
  ADD_BOOKMARK(state, payload) {
    state.bookmarks = [...state.bookmarks, payload].filter(
      (b1, i, bookmarks) => bookmarks.findIndex(b2 => b1.id === b2.id) === i
    );
  },
  REMOVE_BOOKMARK(state, payload) {
    state.bookmarks = state.bookmarks.filter(bookmark => bookmark.id !== payload.id);
  },
  CLEAR_BOOKMARK(state) {
    state.bookmarks = [];
  }
};
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
