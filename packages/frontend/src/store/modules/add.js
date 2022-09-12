import axios from "axios";

const state = {
  works: [],
};
const getters = {
  works: state => state.works || [],
  take: state => n => state.works.slice().sort(() => Math.random() - Math.random()).slice(0, n < 0 ? 0 : n)
};
const actions = {
  async fetch({ commit }) {
    const url = "/api/v1/adds?term=days&range=new&type=maniax&category=voice&sub=SOU&aid=maidmaid";
    const { data } = await axios.get(url);
    commit("SET_WORKS", data);
  },
};
const mutations = {
  SET_WORKS(state, payload) {
    state.works = payload;
  },
};
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
