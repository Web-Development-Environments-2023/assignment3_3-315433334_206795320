import Vue from "vue";
import App from "./App.vue";
import VueAxios from "vue-axios";
import axios from "axios";

import routes from "./routes";
import VueRouter from "vue-router";
import VueCookies from "vue-cookies";


import Vuelidate from "vuelidate";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
// import '@fortawesome/fontawesome-free/css/all.css';
import 'vue-material-design-icons/styles.css';
// import proxy from './proxy'; 


import {
  FormGroupPlugin,
  FormPlugin,
  FormInputPlugin,
  ButtonPlugin,
  CardPlugin,
  NavbarPlugin,
  FormSelectPlugin,
  AlertPlugin,
  ToastPlugin,
  LayoutPlugin,
  CarouselPlugin,
} from "bootstrap-vue";


// axios.defaults.withCredentials=true;


Vue.use(VueRouter);
Vue.use(VueCookies);
// Vue.use(proxy);

const router = new VueRouter({
  routes
});
[
  FormGroupPlugin,
  FormPlugin,
  FormInputPlugin,
  ButtonPlugin,
  CardPlugin,
  NavbarPlugin,
  FormSelectPlugin,
  AlertPlugin,
  ToastPlugin,
  LayoutPlugin,
  CarouselPlugin
].forEach((x) => Vue.use(x));
Vue.use(Vuelidate);

// Vue.component("CreateRecipeModalEx", CreateRecipeModalEx)


axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    return config;
  },
  function(error) {
    // Do something with request errorrrr
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    return response;
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

Vue.use(VueAxios, axios);

Vue.config.productionTip = false;
/* eslint-disable camelcase */
const sharedData = {
  username: localStorage.username,
  // search_url_: localStorage.search_url_, // check this
  server_domain: "http://127.0.0.1:3000",
  // server_domain: "http://omer-sab.cs.bgu.ac.il",
  login(username) {
    localStorage.setItem("username", username);
    this.username = username;
    console.log("login", this.username);
  },
  logout() {
    console.log("logout");
    localStorage.removeItem("username");
    this.username = undefined;
  }
};
// console.log(sharedData);
/* eslint-enable camelcase */

// Vue.prototype.$root.store = sharedData;

new Vue({
  router,
  data() {
    return {
      store: sharedData
    };
  },
  methods: {
    toast(title, content, variant = null, append = false) {
      this.$bvToast.toast(`${content}`, {
        title: `${title}`,
        toaster: "b-toaster-top-center",
        variant,
        solid: true,
        appendToast: append,
        autoHideDelay: 3000
      });
    }
  },
  render: (h) => h(App)
}).$mount("#app");
