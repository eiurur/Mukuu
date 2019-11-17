import post from '../../api/post';
import user from '../../api/user';

const state = {
  user: null,
  screenName: '',
  limit: 3,
  skip: 0,
  searchOption: {
    sort: 'createdAtDesc',
  },
  posts: [],
  isLoading: false,
  isCompletedLoading: false,
};
const getters = {
  getUser: state => state.user,
  getPosts: state => state.posts,
  isLoading: state => state.isLoading,
  isCompletedLoading: state => state.isCompletedLoading,
};
const actions = {
  async initialize({ commit, dispatch }, value) {
    commit('SET_LOADING_STATUS', false);
    commit('SET_LOADING_COMPLETE_STATUS', false);
    commit('CLEAR_USER');
    commit('CLEAR_POST');
    await dispatch('loadUser', value);
    await dispatch('loadPost');
  },
  async loadUser({ commit }, value) {
    if (value && value._id) {
      commit('SET_USER', value);
      return;
    }
    const { data } = await user.fetch({ postedBy: value });
    commit('SET_USER', data);
  },
  async loadPost({ commit, state }) {
    commit('SET_LOADING_STATUS', true);
    if (!state.user || !state.user._id) return;
    const newPosts = await post.fetch(
      Object.assign(
        { limit: state.limit, skip: state.skip },
        { postedBy: state.user._id },
        state.searchOption,
      ),
    );
    if (newPosts.length < 1) {
      commit('SET_LOADING_STATUS', false);
      commit('SET_LOADING_COMPLETE_STATUS', true);
      return;
    }
    const expandedPosts = newPosts.map(p => {
      const ret = p;
      if (p.entities) ret.entities = JSON.parse(p.entities);
      return ret;
    });
    const posts = [...state.posts, ...expandedPosts];
    commit('INCREMENT_SKIP');
    commit('SET_POST', posts);
    commit('SET_LOADING_STATUS', false);
  },
  close({ commit }) {
    commit('CLEAR_USER');
    commit('CLEAR_POST');
  },
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
  CLEAR_USER(state) {
    state.user = null;
  },
  CLEAR_POST(state) {
    state.skip = 0;
    state.posts = [];
  },
};
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
