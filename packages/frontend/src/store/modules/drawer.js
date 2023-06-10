import { page } from "vue-analytics";
import { expandRecusively } from "@/plugins/post";
import post from "../../api/post";
import user from "../../api/user";

const state = {
  user: null,
  screenName: "",
  limit: 3,
  skip: 0,
  searchOption: {
    sort: "createdAtDesc"
  },
  posts: [],
  history: [],
  isLoading: false,
  isCompletedLoading: false
};
const getters = {
  getUser: state => state.user,
  getPosts: state => state.posts,
  getHistory: state => state.history,
  isLoading: state => state.isLoading,
  isCompletedLoading: state => state.isCompletedLoading
};
const actions = {
  async initialize({ commit, dispatch }, value) {
    commit("SET_LOADING_STATUS", false);
    commit("SET_LOADING_COMPLETE_STATUS", false);
    commit("CLEAR_USER");
    commit("CLEAR_POST");
    await dispatch("loadUser", value);
    await dispatch("loadPost");
  },
  async loadUser({ commit }, value) {
    if (value && value._id) {
      commit("SET_USER", value);
      commit("UPDATE_HISTORY", value);
      return;
    }
    const { data } = await user.fetch({ postedBy: value });
    commit("SET_USER", data);
    commit("UPDATE_HISTORY", data);
  },
  async loadPost({ commit, state, rootState }) {
    commit("SET_LOADING_STATUS", true);
    if (!state.user || !state.user._id) return;

    const column = {};
    column.postedBy = state.user._id;
    if (rootState.config.shouldHideReply) column.isReply = false;
    if (rootState.config.shouldHideOutOfLink) column.isOutOfLink = false;

    const { data, url } = await post.fetch({
      ...{ limit: state.limit, skip: state.skip },
      ...{ column },
      ...state.searchOption
    });
    if (data.length < 1) {
      commit("SET_LOADING_STATUS", false);
      commit("SET_LOADING_COMPLETE_STATUS", true);
      return;
    }
    const expandedPosts = data.map(p => expandRecusively(p));
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
  SET_USER(state, payload) {
    state.user = payload;
  },
  SET_POST(state, payload) {
    state.posts = payload;
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
  UPDATE_HISTORY(state, payload) {
    if (!state.history) state.history = [];
    const users = [payload, ...state.history];
    state.history = Array.from(
      new Map(users.map((user) => [user._id, user])).values()
    ).slice(0, 12); // 履歴の最大は12人
  },
  CLEAR_USER(state) {
    state.user = null;
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
