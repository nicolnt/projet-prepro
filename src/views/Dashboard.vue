<template>
  <div class="dashboard">
    <!-- <NavBar p_color="" p_colorBG=""/> -->
    <div id="dashboardContent">
      <SideBar ref="sideBar"/>
      <div id="content">
        <vs-button class="buttonDeconnexion" color="#000000" type="flat" @click.prevent="signOut">Déconnexion</vs-button>
        <router-view></router-view>
      </div>
    </div>
    <Footer p_txtColor="#000000" p_colorBG="#ffffff"/>
  </div>
</template>

<script>
// import NavBar from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue'
import SideBar from '@/components/SideBar.vue'

import firebase from 'firebase/app'
require('firebase/auth')

export default {
  name: 'Dashboard',
  components : {
    // NavBar,
    Footer,
    SideBar
  },
  methods:{
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          // commit pour mutation
          this.$store.dispatch("SIGN_OUT")
          this.$router.replace({
            name: "Home"
          });
          //this.$store.commit("SET_LOGGED_OUT")
        });
    },
  }
}
</script>

<style scoped>
.dashboard {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: linear-gradient(135deg, #ffffff, 80%, #EDEDED) no-repeat;
}
#content {
  padding: 2rem 0 0 3rem;
  width: 100%;
}
.buttonDeconnexion {
  position: absolute;
  right: 2rem;
  top: 2rem;
  font-size: 16px;
}
</style>