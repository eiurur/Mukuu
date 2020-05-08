const MAX_SIZE = 20;

const state = {
  searchWords: []
};
const getters = {
  searchWords: state => state.searchWords
};
const actions = {
  // async initialize({ commit }, value) {},
  addSearchWord({ commit }, value) {
    console.log(value);
    const payload = { ...value, ...{ id: value.word } };
    commit("ADD_SEARCH_WORD", payload);
  }
};
const mutations = {
  ADD_SEARCH_WORD(state, payload) {
    console.log([...state.searchWords, payload]);
    state.searchWords = [payload, ...state.searchWords].filter(
      (b1, i, words) => words.findIndex(b2 => b1.id === b2.id) === i
    );
    state.searchWords.length = Math.min(state.searchWords.length, MAX_SIZE);
  },
  CLEAR_SEARCH_WORD(state) {
    state.searchWords = [];
  }
};
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
