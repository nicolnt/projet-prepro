<!-- VIEW : HOME PAGE -->
<template>
  <div class="home">
    <div class="introduction-application">
      <div class="presentation-application">
        <h1> Tapitap </h1>
        <h2> L’application destinée aux psychologues </h2>
        <p> Tapitap permet de tester les aptitudes d’une personne à plusieurs niveaux, grâce à des tests simples et directement intégrés dans l’application. </p>
      </div>
      <Form/>
    </div>
  </div>
</template>

<script>
import Form from '@/components/Form.vue'
import { mapGetters } from "vuex";

export default {
  name: 'Home',
  components: {
    Form,
  },
  methods: {
    goSignUp() {
      if(this.$route.name != 'AuthSignUp')
        this.$router.push({name:'AuthSignUp'})
    }
  },
  mounted: function(){
    if(this.user.loggedIn==true){
      this.$router.push({path:'/dashboard/patientsList'})
    }
  },
  computed: {
    ...mapGetters({
      user: "user"
    })
  },
}
</script>

<style scoped>
.home {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url("../assets/background.svg");
  background-repeat: no-repeat;
  background-position:right bottom;
  position: relative;
}
.introduction-application {
  display: flex;
  width: 80%;
  position: relative;
}
.presentation-application {
  text-align: left;
  width: 40%;
}
h1 {
  font-size: 48px;
  font-weight: 600;
  color: #382C50;
  position: absolute;
  top: -6rem;
}
h2 {
  font-size: 32px;
  font-weight: 500;
  color: #382C50;
  margin-top: 2rem;
}
p {
  font-size: 18px;
  margin: 1rem auto;
}
img {
  max-width: 100%;
}
input:-webkit-autofill,
input:-webkit-autofill:hover, 
input:-webkit-autofill:focus,
input:-webkit-autofill:active  {
  box-shadow: 0 0 0 30px white inset !important;
}
#btnSignUp {
  display: flex;
  align-self: center;
  padding: .5rem 1rem;
  font-size: 16px;
}
</style>
