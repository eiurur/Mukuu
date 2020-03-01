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
  removeWatch({ commit }, value) {
    const payload = { ...value, ...{ id: value.idStr } };
    commit("REMOVE_WATCH", payload);
  }
};
const mutations = {
  ADD_WATCH(state, payload) {
    state.watches = [...state.watches, payload].filter(
      (b1, i, watches) => watches.findIndex(b2 => b1.id === b2.id) === i
    );
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
