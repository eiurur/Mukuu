import Vue from "vue";
import ElementUI from "element-ui";
import VueAnalytics from "vue-analytics";
import VueLazyload from "vue-lazyload";
import locale from "element-ui/lib/locale/lang/ja";

import App from "./App.vue";
import router from "./router";
import store from "./store";

import activateLink from "./plugins/tweet";

const isProd = process.env.NODE_ENV === "production";

Vue.use(ElementUI, { locale });
Vue.use(VueAnalytics, {
  id: "UA-42893827-25",
  router,
  debug: {
    enabled: !isProd,
    sendHitTask: isProd
  }
});
Vue.use(VueLazyload, {
  preLoad: 1.3,
  filter: {
    progressive(listener) {
      listener.el.setAttribute("lazy-progressive", "true");
      listener.loading = listener.src.replace("name=medium", "name=small");
    }
  }
});

Vue.prototype.$activateLink = activateLink;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
  beforeCreate() {
    this.$store.dispatch("loadLocalStorage");
  }
}).$mount("#app");
