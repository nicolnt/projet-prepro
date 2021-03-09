import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import Vuesax from 'vuesax'
import firebase from 'firebase/app'
import 'firebase/auth'

import 'vuesax/dist/vuesax.css' //Vuesax styles
import 'material-icons/iconfont/material-icons.css'
import store from "./services/stores/logStore";

import VueApexCharts from 'vue-apexcharts'

import { rtdbPlugin } from 'vuefire'
Vue.use(rtdbPlugin)

Vue.config.productionTip = false

Vue.use(Vuesax);
Vue.use(VueApexCharts);

store.dispatch("FETCH_USER");

let app;
firebase.auth().onAuthStateChanged(() => {
  if(!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App),
    }).$mount('#app')
  }
})