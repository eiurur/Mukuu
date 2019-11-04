import Vue from 'vue';
import Vuex from 'vuex';
import drawer from './modules/drawer';

const debug = process.env.NODE_ENV !== 'production';
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    drawer
  },
  strict: debug,
  actions: {
    saveLocalStorage({ commit }) {
      commit('SAVE');
    },
    loadLocalStorage({ commit }) {
      commit('LOAD');
    }
  },
  mutations: {
    SAVE(state) {
      localStorage.setItem('store', JSON.stringify(state));
    },
    LOAD(state) {
      if (localStorage.getItem('store')) {
        const store = JSON.parse(localStorage.getItem('store'));
        this.replaceState(Object.assign(state, store));
      }
    }
  }
});
