<template>
  <div class="signUp">
      <h2>Inscription</h2>
      <div class="social-media">
        <img class="google" src="../assets/google-illustration.svg"/>
        <img class="facebook" src="../assets/facebook-illustration.svg"/>
        <img class="twitter" src="../assets/twitter-illustration.svg"/>
      </div>
      <hr>
      <Input title="Nom" type="text" name="nom" v-bind:value.sync="m_valueLastName" :verifInput="checkInput"/>
      <Input title="Prénom" type="text" name="prenom" v-bind:value.sync="m_valueFirstName" :verifInput="checkInput"/>
      <Input title="Email" type="email" name="email" v-bind:value.sync="m_valueEmail" :verifInput="checkInput"/>
      <Input title="Mot de passe" type="password" name="password" v-bind:value.sync="m_valuePassword" :verifInput="checkInput"/>
      <vs-button color="#FF8D8B" type="filled" v-on:click="goSignUp" id="button">S'inscrire</vs-button>
      <img class="cloud" src="../assets/cloud-illustration.svg"/>
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
.social-media {
  display: flex;
  flex-direction: row;
  place-content: center;
}
.social-media img {
  padding: .5rem;
  cursor: pointer;
}
hr {
  width: 50%;
  border: none;
  border-top: 1px solid #B0B0B0;
  color: #B0B0B0;
  overflow: visible;
  text-align: center;
  height: 5px;
  font-size: 12px;
  margin: 1rem 0 .5rem 0;
}
hr:after {
  background: #fff;
  content: 'ou';
  padding: 0 4px;
  position: relative;
  top: -10px;
}
.cloud {
  position: absolute;
  top: -21px;
  left: -48px;
}
#button {
  border-radius: 16px;
  padding: .5rem 1.5rem;
  margin-top: 1rem;
}
@media screen and (max-width: 400px) {
  .social-media {
    flex-direction: column;
  }
}
</style>