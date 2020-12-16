<template>
  <div class="signUp">
      <h2>Inscription</h2>
      <Input title="Nom" type="text" name="nom" v-bind:value.sync="m_valueLastName" :verifInput="checkInput"/>
      <Input title="Prénom" type="text" name="prenom" v-bind:value.sync="m_valueFirstName" :verifInput="checkInput"/>
      <Input title="Email" type="email" name="email" v-bind:value.sync="m_valueEmail" :verifInput="checkInput"/>
      <Input title="Mot de passe" type="password" name="password" v-bind:value.sync="m_valuePassword" :verifInput="checkInput"/>
      <vs-button color="#FF8D8B" type="filled" v-on:click="goSignUp" id="button">S'inscrire</vs-button>
  </div>
</template>

<script>

import Input from '@/components/Input.vue'

export default {
  name: 'SignUp',
  components:{
    Input
  },
  data() {
    return {
      m_valueLastName : "",
      m_valueFirstName : "",
      m_valueEmail : "",
      m_valuePassword : ""
    }
  },
  methods:{
    goSignUp() {
      this.checkInput(this.m_valueEmail)
      this.checkInput(this.m_valuePassword)
      this.checkInput(this.m_valueLastName)
      this.checkInput(this.m_valueFirstName)
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
.signUp {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 60px;
  border-radius: 20px;
  box-shadow: 0px 2px 30px rgba(200, 200, 200, 0.73);
}
#button {
  border-radius: 16px;
  margin-top: 1vh;
}
</style>