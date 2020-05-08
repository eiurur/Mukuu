import Vue from "vue";
import Vuex from "vuex";
import bookmark from "./modules/bookmark";
import drawer from "./modules/drawer";
import searchHistory from "./modules/searchHistory";
import watch from "./modules/watch";

const debug = process.env.NODE_ENV !== "production";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    bookmark,
    drawer,
    searchHistory,
    watch
  },
  strict: debug,
  actions: {
    saveLocalStorage({ commit }) {
      commit("SAVE");
    },
    loadLocalStorage({ commit }) {
      commit("LOAD");
    }
  },
  mutations: {
    SAVE(state) {
      localStorage.setItem("store", JSON.stringify(state));
    },
    LOAD(state) {
      if (localStorage.getItem("store")) {
        const store = JSON.parse(localStorage.getItem("store"));
        this.replaceState(Object.assign(state, store));
      }
    }
  }
});
