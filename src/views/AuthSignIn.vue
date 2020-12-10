<template>
  <div class="authSignIn">
    <NavBarAuth/>
    <router-link to="/" id="home">Accueil</router-link>
    <div id="authForm">
      <SignIn class="sign"/>
    </div>
    <Footer p_txtColor="rgb(82, 82, 232)" p_colorBG="#dedfff" />
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
}
#authForm {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
#home {
  position: absolute;
  left: 10px;
  top: 80px;
}
</style>