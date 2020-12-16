<template>
  <div class="home">
    <NavBarAuth p_color="#FF8D8B" p_colorBG="#ffffff" />
    <div class="introduction-application">
      <div class="presentation-application">
        <h1> Lorem ipsum dolor sit amet </h1>
        <p> Lorem ipsum dolor sit amet, consectetur, Lorem ipsum dolor sit amet, consectetur </p>
        <vs-button color="#FF8D8B" type="filled" v-on:click="goSignIn" id="btnSignUp">inscription</vs-button>
      </div>
      <div class="illustration-application">
        <img src="../assets/illustration-home.svg"/>
      </div>
    </div>
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
  background-image: url("../assets/background.svg");
  background-repeat: no-repeat;
  background-position:right bottom;
  font-weight: 400;
}
.introduction-application {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 70%;
  margin: auto;
}
.presentation-application {
  text-align: left;
  margin-right: 5rem;
}
h1 {
  font-size: 48px;
  font-weight: 600;
  color: #382C50;
}
p {
  font-size: 18px;
  margin: 1rem auto;
}
img {
  max-width: 100%;
}
#btnSignUp {
  display: flex;
  align-self: center;
  padding: .5rem 1rem;
  font-size: 16px;
}
</style>