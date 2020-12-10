<template>
  <div class="signIn">
      <h2>Connexion</h2>
      <Input title="Email" type="email" name="email" v-bind:value.sync="m_valueEmail" :verifInput="checkInput" required/>
      <Input title="Mot de passe" type="password" name="password" v-bind:value.sync="m_valuePassword" :verifInput="checkInput" required/>
      <vs-button color="#5252e8" type="filled" v-on:click="goSignIn" id="button">Se connecter</vs-button>
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
      this.$router.push({name:'Dashboard'})
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
    display: flex;
    flex-direction: column;
    align-items: center;
}
#button {
    background-color: white;
    border: 1px solid #2c3e50;
    border-radius: 6px;
    margin-top: 1vh;
}
</style>