import Vue from "vue";
import Vuex from "vuex";
import add from "./modules/add";
import bookmark from "./modules/bookmark";
import config from "./modules/config";
import drawer from "./modules/drawer";
import modal from "./modules/modal";
import searchHistory from "./modules/searchHistory";
import watch from "./modules/watch";

const debug = process.env.NODE_ENV !== "production";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    add,
    bookmark,
    config,
    drawer,
    modal,
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
        delete store.modal; // FIXME: プロパティがmergeされないので明示的に削除して初期stateが有効になるようにする。
        this.replaceState(Object.assign(state, store));
      }
    }
  }
});
