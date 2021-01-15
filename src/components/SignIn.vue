<template>
  <div class="signIn">
      <h2>Connexion</h2>
      <div v-if="error" class="connectionError">{{error}}</div>
    <form action="#" @submit.prevent="submit">
      <div class="">
        <label for="email" class="">Adresse mail</label>
        <div class="">
          <input
            id="email"
            type="email"
            name="email"
            value
            required
            autofocus
            v-model="form.email"
          />
        </div>
      </div>
      <div class="">
        <label for="password" class="">Mot de passe</label>
        <div class="">
          <input
            id="password"
            type="password"
            name="password"
            required
            v-model="form.password"
          />
        </div>
      </div>
      <div class="standartContainer">
        <button type="submit" class="submit">Se connecter</button>
      </div>
      <div>
          <div class="forgotPass" @click="toggleModal">Mot de passe oublié ?</div>
      </div>
    </form>
    <ForgotPass ref="forgotPassModal"/>
      <!-- <Input title="Email" type="email" name="email" v-bind:value.sync="m_valueEmail" :verifInput="checkInput" required/>
      <Input title="Mot de passe" type="password" name="password" v-bind:value.sync="m_valuePassword" :verifInput="checkInput" required/>
      <vs-button color="#FF8D8B" type="filled" v-on:click="goSignIn" id="button">Se connecter</vs-button> -->
      <!--<router-link to="/" id="forgotPass">Mot de passe oublié ?</router-link>-->
      <p> Vous n'avez pas encore de compte ? <router-link to="/signUp"> Inscrivez-vous </router-link> </p>
      <img class="plane" src="../assets/plane-illustration.svg"/>
  </div>
</template>

<script>

// import Input from '@/components/Input.vue'
//import logStore from '@/services/stores/logStore'
import ForgotPass from '@/components/ForgotPass'
import firebase from 'firebase/app'
require('firebase/auth')
import store from "../services/stores/logStore";
import { db } from '../services/firebase'


export default {
  name: 'SignIn',
  components: {
    // Input
    ForgotPass
  },
  data() {
    return {
      m_valueEmail : "",
      m_valuePassword : "",
      form: {
        email: "",
        password: ""
      },
      error: null
    }
  },
  methods:{
    toggleModal() {
      this.$refs.forgotPassModal.toggle()
    },
    submit() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.form.email, this.form.password)
        .then(() => {
          const user = firebase.auth().currentUser
          db.collection("users").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              if(doc.data().email == user.email){
                user.updateProfile({
                  displayName: doc.data().firstName + ' ' + doc.data().lastName
                });
              }
            });
          });
          store.dispatch("fetchUser", user)
          this.$router.push({ name: 'PatientsList' })
        })
        .catch(() => {
          this.error = 'Identifiant ou mot de passe incorrect.'
        });
    },
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
p {
  font-size: 12px;
  margin-top: 2rem;
}
a {
  color: #FF8D8B;
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
.forgotPass {
  font-size: 15px;
  margin-top: 10px;
  color: #FF8D8B;
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
.forgotPass:hover {
  cursor: default;
}
</style>