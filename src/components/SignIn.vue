<template>
  <div class="signIn">
      <h2>Connexion</h2>
      <Input title="Email" type="email" name="email" v-bind:value.sync="m_valueEmail" :verifInput="checkInput" required/>
      <Input title="Mot de passe" type="password" name="password" v-bind:value.sync="m_valuePassword" :verifInput="checkInput" required/>
      <vs-button color="#FF8D8B" type="filled" v-on:click="goSignIn" id="button">Se connecter</vs-button>
      <p> Vous n'avez pas encore de compte ? <router-link to="/signUp"> Inscrivez-vous </router-link> </p>
      <img class="plane" src="../assets/plane-illustration.svg"/>
  </div>
</template>

<script>

import Input from '@/components/Input.vue'
//import logStore from '@/services/stores/logStore'

export default {
  name: 'SignIn',
  components: {
    Input
  },
  data() {
    return {
      m_valueEmail : "",
      m_valuePassword : ""
    }
  },
  methods:{
    goSignIn() {
      this.checkInput(this.m_valueEmail)
      this.checkInput(this.m_valuePassword)
      this.$router.push({name:'PatientsList'})
    },
    checkInput(value) {
      if(value != null && value != undefined && value != "") {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style scoped>
h2 {
  margin-bottom: 2vh;
}
.signIn {
  width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px;
  border-radius: 20px;
  box-shadow: 0px 2px 30px rgba(200, 200, 200, 0.73);
  background-color: #fff;
  text-align: left;
  position: relative;
  max-width: 100%;
}
p {
  font-size: 12px;
  margin-top: 2rem;
}
.plane {
  position: absolute;
  top: -21px;
  right: -48px;
}
#button {
  border-radius: 16px;
  padding: .5rem 1.5rem;
  margin-top: 1rem;
}
a {
  color: #FF8D8B;
}
</style>