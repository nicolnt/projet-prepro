<template>
  <div class="home">
    <NavBarAuth/>
    <h1>Page d'accueil</h1>
    <vs-button color="#8a94db" gradient-color-secondary="#5252e8" type="gradient" v-on:click="goSignIn" id="btnConnexion">Connexion</vs-button>
    <Footer p_txtColor="rgb(82, 82, 232)" p_colorBG="#dedfff" />
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
#btnConnexion {
  display: flex;
  align-self: center;
}
</style>