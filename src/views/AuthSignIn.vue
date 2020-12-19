<template>
  <div class="authSignIn">
    <NavBarAuth p_color="#FF8D8B" p_colorBG="#ffffff"/>
    <img class="man" src="../assets/man-illustration.svg"/>
    <router-link to="/" id="home">Accueil</router-link>
    <div id="authForm">
      <SignIn class="sign"/>
    </div>
    <Footer p_txtColor="#000000" p_colorBG="#ffffff"/>
  </div>
</template>

<script>

import SignIn from '@/components/SignIn.vue'
import NavBarAuth from '@/components/NavBarAuth.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'AuthSignIn',
  components: {
    SignIn,
    NavBarAuth,
    Footer
  }
}
</script>

<style scoped>
.authSignIn{
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-image: url("../assets/background.svg");
  background-repeat: no-repeat;
  background-position:right bottom;
  font-weight: 400;
}
#authForm {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 70%;
  margin: auto;
}
.man {
  position: absolute;
  bottom: 150px;
  left: 70px;
}
#home {
  position: absolute;
  left: 10px;
  top: 80px;
}
</style>