import Vue from "vue";
import ElementUI from "element-ui";
import { Plugin } from "vue-fragment";
import VueAnalytics from "vue-analytics";
import VueLazyload from "vue-lazyload";
import VueMq from "vue-mq";

import dayjs from "dayjs";
import "dayjs/locale/ja";
import locale from "element-ui/lib/locale/lang/ja";
// import "element-ui/lib/theme-chalk/display.css";
import { errorImageBase64 } from "@mukuu/common/lib/constants";

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
  },
  error: errorImageBase64
});
Vue.use(VueMq, {
  breakpoints: {
    sm: 640,
    md: 1281, // NOTE: https://github.com/AlexandreBonaventure/vue-mq/issues/35
    lg: 1920,
    xl: Infinity
  },
  defaultBreakpoint: "lg"
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
