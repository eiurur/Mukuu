import Vue from 'vue';
import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/ja';

import App from './App.vue';
import router from './router';
import store from './store';

import activateLink from './plugins/tweet';

Vue.use(ElementUI, { locale });

Vue.prototype.$activateLink = activateLink;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
  beforeCreate() {
    this.$store.dispatch('loadLocalStorage');
  }
}).$mount('#app');
