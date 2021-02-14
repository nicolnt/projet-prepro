import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import Vuesax from 'vuesax'
import firebase from 'firebase/app'
import 'firebase/auth'

import 'vuesax/dist/vuesax.css' //Vuesax styles
import 'material-icons/iconfont/material-icons.css'
import store from "./services/stores/logStore";

Vue.config.productionTip = false

Vue.use(Vuesax);

firebase.auth().onAuthStateChanged(user => {
  store.dispatch("fetchUser", user);
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
