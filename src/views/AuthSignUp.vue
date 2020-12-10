<template>
  <div class="authSignUp">
    <NavBarAuth/>
    <router-link to="/" id="home">Accueil</router-link>
    <div id="authForms">
      <SignUp class="sign"/>
    </div>
    <Footer p_txtColor="rgb(82, 82, 232)" p_colorBG="#dedfff" />
  </div>
</template>

<script>

import SignUp from '@/components/SignUp.vue'
import NavBarAuth from '@/components/NavBarAuth.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'AuthSignUp',
  components: {
    SignUp,
    NavBarAuth,
    Footer
  }
}
</script>

<style scoped>
.authSignUp {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
#authForms {
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