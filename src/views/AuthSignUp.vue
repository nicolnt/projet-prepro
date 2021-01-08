<template>
  <div class="authSignUp">
    <NavBarAuth p_color="#FF8D8B" p_colorBG="#ffffff"/>
    <img class="man-fauteuil" src="../assets/man-fauteuil-illustration.svg"/>
    <div id="authForms">
      <SignUp class="sign"/>
    </div>
    <Footer p_txtColor="#000000" p_colorBG="#ffffff"/>
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
  background-image: url("../assets/background.svg");
  background-repeat: no-repeat;
  background-position:right bottom;
  font-weight: 400;
}
#authForms {
  display: flex;
  flex-direction: row;
  place-content: center;
}
.man-fauteuil {
  position: absolute;
  bottom: 150px;
  left: 70px;
  /* width: 100%;
  max-width: 300px;
  height: auto; */
}
#home {
  position: absolute;
  left: 10px;
  top: 80px;
}
@media screen and (max-width: 400px) {
  .man-fauteuil {
    left: 0;
  }
}
</style>