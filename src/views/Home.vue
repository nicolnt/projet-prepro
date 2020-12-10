<template>
  <div class="home">
    <NavBarAuth p_color="#FF8D8B" p_colorBG="#ffffff" />
    <h1>Page d'accueil</h1>
    <vs-button color="#FF8D8B" type="filled" v-on:click="goSignIn" id="btnSignUp">Inscription</vs-button>
    <Footer p_txtColor="#000000" p_colorBG="#ffffff"/>
  </div>
</template>

<script>
import NavBarAuth from '@/components/NavBarAuth.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'Home',
  components: {
    NavBarAuth,
    Footer
  },
  methods: {
    goSignIn() {
      this.$router.push({name:'AuthSignIn'})
    }
  }
}
</script>

<style scoped>
.home {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
#btnSignUp {
  display: flex;
  align-self: center;
}
</style>