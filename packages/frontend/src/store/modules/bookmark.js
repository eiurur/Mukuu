import { createUID } from "@/plugins/util";

const state = {
  bookmarks: [],
  archives: []
};
const getters = {
  bookmarks: state => state.bookmarks || [],
  archives: state => state.archives || [],
  find: state => id => state.bookmarks.find(bookmark => bookmark.id === id),
  unearth: state => id => {
    if (!state.archives) return null;
    return state.archives.find(item => item.bookmarks.find(bookmark => bookmark.id === id));
  }
};
const actions = {
  // async initialize({ commit }, value) {},
  addBookmark({ commit }, value) {
    const payload = { ...value, ...{ id: value.idStr } };
    commit("ADD_BOOKMARK", payload);
  },
  removeBookmark({ commit }, value) {
    const payload = { ...value, ...{ id: value.idStr } };
    commit("REMOVE_BOOKMARK", payload);
  },
  removeBookmarkFromArchive({ commit }, value) {
    const payload = { ...value, ...{ id: value.idStr } };
    commit("REMOVE_BOOKMARK_FROM_HISTORY", payload);
  },
  addArchive({ commit }) {
    commit("ADD_HISTORY");
    commit("CLEAR_BOOKMARK");
  },
  removeArchive({ commit }, value) {
    const payload = { ...value };
    commit("REMOVE_HISTORY", payload);
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
  REMOVE_BOOKMARK_FROM_HISTORY(state, payload) {
    if (!state.archives) state.archives = [];
    state.archives = state.archives.map(item => ({
      ...item,
      bookmarks: item.bookmarks.filter(bookmark => bookmark.id !== payload.id)
    }));
  },
  CLEAR_BOOKMARK(state) {
    state.bookmarks = [];
  },
  ADD_HISTORY(state) {
    if (!state.archives) state.archives = [];
    state.archives = [
      {
        id: createUID(),
        createdAt: new Date(),
        bookmarks: [...state.bookmarks]
      },
      ...state.archives
    ];
  },
  REMOVE_HISTORY(state, payload) {
    if (!state.archives) state.archives = [];
    state.archives = state.archives.filter(item => item.id !== payload.id);
  }
};
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
