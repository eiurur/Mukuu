import axios from "axios";
import times from "@/plugins/times";

const state = {
  works: [],
};
const getters = {
  works: state => state.works || [],
  take: state => n => state.works.slice().sort(() => Math.random() - Math.random()).slice(0, n < 0 ? 0 : n)
};
const actions = {
  async fetch({ commit }) {
    const day = times().format("YYYY-MM-DD");
    const conditions = [
      `/api/v1/adds?term=days&range=new&type=pro&category=game&aid=maidimaid&day=${day}`,
      `/api/v1/adds?term=days&range=new&type=maniax&category=voice&sub=SOU&aid=maidimaid&day=${day}`,
      `/api/v1/adds?term=days&range=new&type=maniax&category=voice&sub=SOU&aid=maidimaid&day=${day}`,
      `/api/v1/adds?term=days&range=new&type=maniax&category=voice&sub=SOU&aid=maidimaid&day=${day}`,
      `/api/v1/adds?term=days&range=new&type=maniax&category=game&aid=maidimaid&day=${day}`,
      `/api/v1/adds?term=days&range=new&type=maniax&category=comic&aid=maidimaid&day=${day}`,
      `/api/v1/adds?term=days&range=new&type=maniax&aid=maidimaid&day=${day}`,
      `/api/v1/adds?term=days&range=new&type=maniax&aid=maidimaid&day=${day}`,
      `/api/v1/adds?term=days&range=new&type=maniax&aid=maidimaid&day=${day}`,
      `/api/v1/adds?term=days&range=new&type=maniax&aid=maidimaid&day=${day}`
    ];
    const idx = Math.floor(Math.random() * conditions.length);
    const url = conditions[idx];
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
