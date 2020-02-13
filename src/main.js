import Vue from "vue";
import App from "./App.vue";

// Install BootstrapVue
import { BootstrapVue } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
Vue.use(BootstrapVue);

// Lazy load images
import VueLazyload from "vue-lazyload";
Vue.use(VueLazyload, {
  preLoad: 1,
  attempt: 1
});

// Touch events
import Vue2TouchEvents from "vue2-touch-events";
Vue.use(Vue2TouchEvents);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
