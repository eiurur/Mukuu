import { page } from "vue-analytics";
import post from "../../api/post";
import watch from "./watch";

const state = {
  limit: 4,
  skip: 0,
  searchOption: {
    sort: "createdAtDesc"
  },
  posts: [],
  isWatchEmpty: false,
  isLoading: false,
  isCompletedLoading: false
};
const getters = {
  getPosts: state => state.posts,
  isLoading: state => state.isLoading,
  isCompletedLoading: state => state.isCompletedLoading
};
const actions = {
  async initialize({ commit, dispatch }, value) {
    commit("SET_LOADING_STATUS", false);
    commit("SET_LOADING_COMPLETE_STATUS", false);
    commit("CLEAR_POST");
    await dispatch("loadPost");
  },
  async loadPost({ commit, state, rootGetters }, value) {
    commit("SET_LOADING_STATUS", true);
    const { data, url } = await post.fetch({
      ...{ limit: state.limit, skip: state.skip },
      ...value,
      ...state.searchOption
    });
    if (data.length < 1) {
      commit("SET_LOADING_STATUS", false);
      commit("SET_LOADING_COMPLETE_STATUS", true);
      return;
    }
    const expandedPosts = data.map(p => {
      const ret = p;
      if (p.entities) ret.entities = JSON.parse(p.entities);
      return ret;
    });
    const posts = [...state.posts, ...expandedPosts];
    page({
      location: url
    });
    commit("INCREMENT_SKIP");
    commit("SET_POST", posts);
    commit("SET_LOADING_STATUS", false);
  },
  close({ commit }) {
    commit("CLEAR_USER");
    commit("CLEAR_POST");
  }
};
const mutations = {
  SET_POST(state, payload) {
    state.posts = payload;
  },
  SET_WATCH_IS_EMPTY_STATUS(state, payload) {
    state.isWatchEmpty = payload;
  },
  SET_LOADING_STATUS(state, payload) {
    state.isLoading = payload;
  },
  SET_LOADING_COMPLETE_STATUS(state, payload) {
    state.isCompletedLoading = payload;
  },
  INCREMENT_SKIP(state) {
    state.skip += state.limit;
  },
  CLEAR_POST(state) {
    state.skip = 0;
    state.posts = [];
  }
};
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
