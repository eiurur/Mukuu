import Vue from "vue";
import ElementUI from "element-ui";
import { Plugin } from "vue-fragment";
import VueAnalytics from "vue-analytics";
import VueLazyload from "vue-lazyload";
import dayjs from "dayjs";
import "dayjs/locale/ja";
import locale from "element-ui/lib/locale/lang/ja";

import App from "./App.vue";
import router from "./router";
import store from "./store";

import { activateLink, parseToExternalLinks } from "./plugins/tweet";

const isProd = process.env.NODE_ENV === "production";

dayjs.locale("ja");

Vue.use(ElementUI, { locale });
Vue.use(Plugin);
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
Vue.prototype.$parseToExternalLinks = parseToExternalLinks;
Vue.prototype.$dayjs = dayjs;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
  beforeCreate() {
    this.$store.dispatch("loadLocalStorage");
  }
}).$mount("#app");
