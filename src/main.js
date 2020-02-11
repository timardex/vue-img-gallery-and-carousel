import Vue from "vue";
import App from "./App.vue";

// Install BootstrapVue
import { BootstrapVue } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
Vue.use(BootstrapVue);

// Lazy load images
import VueLazyload from "vue-lazyload";
import error from "./assets/svg/loading.svg";
import loading from "./assets/svg/loading.svg";
Vue.use(VueLazyload, {
  preLoad: 1,
  error: error,
  loading: loading,
  attempt: 1
});

// Touch events
import Vue2TouchEvents from "vue2-touch-events";
Vue.use(Vue2TouchEvents);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
