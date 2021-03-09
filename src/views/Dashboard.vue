<!-- VIEW : DASHBOARD WHICH WILL CONTAIN PATIENT PROFIL, PATIENT'S RESULTs, ETC. -->
<template>
  <div class="dashboard">
    <div id="dashboardContent">
      <SideBar ref="sideBar"/>
      <div id="content">
        <vs-button class="buttonDeconnexion" color="#9082FF" type="flat" @click.prevent="signOut">Déconnexion</vs-button>
        <transition name="fade" mode="out-in">
          <router-view/>
        </transition>
      </div>
    </div>
    <Footer p_txtColor="#000000" p_colorBG="#ffffff"/>
  </div>
</template>

<script>
import Footer from '@/components/Footer.vue'
import SideBar from '@/components/SideBar.vue'

import firebase from 'firebase/app'
require('firebase/auth')

export default {
  name: 'Dashboard',
  components : {
    Footer,
    SideBar
  },
  methods:{
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$store.dispatch("SIGN_OUT")
          this.$router.replace({
            name: "Home"
          })
        })
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
  background-color: rgb(248, 248, 248);
}
#dashboardContent {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
}
#content {
  padding: 2rem 3rem;
  width: calc(100% - 285px);
  overflow-y: scroll;
  z-index: 1;
}
@media screen and (max-width: 1025px) {
  #content {
    width: calc(100% - 180px);
  }
}
.buttonDeconnexion {
  position: absolute;
  right: 2rem;
  top: 2rem;
  font-size: 16px;
  z-index: 15;
}
.fade-enter-active, .fade-leave-active {
  transition-property: opacity;
  transition-duration: .2s;
}
.fade-leave-active {
  transition-delay: .2s;
}
.fade-enter, .fade-leave-active {
  opacity: 0
}
</style>