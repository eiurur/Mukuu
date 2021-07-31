const state = {
  watches: []
};
const getters = {
  watches: state => state.watches,
  find: state => id => state.watches.find(watch => watch.id === id)
};
const actions = {
  // async initialize({ commit }, value) {},
  addWatch({ commit }, value) {
    const payload = { ...value, ...{ id: value.idStr } };
    commit("ADD_WATCH", payload);
  },
  updateWatch({ commit }, value) {
    const payload = { ...value, ...{ id: value.idStr } };
    commit("UPDATE_WATCH", payload);
  },
  removeWatch({ commit }, value) {
    const payload = { ...value, ...{ id: value.idStr } };
    commit("REMOVE_WATCH", payload);
  }
};
const mutations = {
  ADD_WATCH(state, payload) {
    // NOTE: 最後に追加したユーザが先頭
    state.watches = [payload, ...state.watches].filter(
      (b1, i, watches) => watches.findIndex(b2 => b1.id === b2.id) === i
    );
  },
  UPDATE_WATCH(state, payload) {
    state.watches = state.watches.map(watch => {
      if (payload.id !== watch.id) return watch;
      watch = payload;
      return watch;
    });
  },
  REMOVE_WATCH(state, payload) {
    state.watches = state.watches.filter(watch => watch.id !== payload.id);
  },
  CLEAR_WATCH(state) {
    state.watches = [];
  }
};
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
