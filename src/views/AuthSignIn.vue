<template>
  <div class="authSignIn">
    <NavBar p_color="#FF8D8B" p_colorBG="#ffffff"/>
    <img class="man" src="../assets/man-illustration.svg"/>
    <div id="authForm">
      <SignIn class="sign"/>
    </div>
    <Footer p_txtColor="#000000" p_colorBG="#ffffff"/>
  </div>
</template>

<script>

import SignIn from '@/components/SignIn.vue'
import NavBar from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'AuthSignIn',
  components: {
    SignIn,
    NavBar,
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
  place-content: center;
}
.man {
  position: absolute;
  bottom: 150px;
  left: 70px;
  width: 100%;
  max-width: 300px;
  height: auto;
}
#home {
  position: absolute;
  left: 10px;
  top: 80px;
}
@media screen and (max-width: 400px) {
  .man {
    left: 0;
  }
}
</style>