<!-- SIGN IN FORM -->
<template>
  <div class="signIn">
    <form class="formSignIn" action="#" @submit.prevent="submit">
      <div class="wrap-input validate-input" data-validate = "Valid email is required: ex@abc.xyz">
        <input 
          class="input"
          type="email"
          name="email"
          placeholder="Email"
          required
          autofocus
          v-model="form.email"
        />
        <span class="focus-input"></span>
        <span class="symbol-input">
          <i class="material-icons" aria-hidden="true">email</i>
        </span>
      </div>
      <div class="wrap-input validate-input" data-validate = "Password is required">
        <input 
          class="input"
          type="password"
          name="password"
          placeholder="Mot de passe"
          required
          autofocus
          v-model="form.password"
        />
        <span class="focus-input"></span>
        <span class="symbol-input">
          <i class="material-icons" aria-hidden="true">lock_outline</i>
        </span>
      </div>
      <div class="btn-submit">
        <div v-if="error" class="connectionError">{{error}}</div>
        <button type="submit" class="button">Se connecter</button> 
      </div>
      <div>
        <div class="forgotPass" @click="toggleModal">Mot de passe oublié ?</div>
      </div>
    </form>
    <ForgotPass ref="forgotPassModal"/>
  </div>
</template>

<script>

import ForgotPass from '@/components/ForgotPass'
import firebase from 'firebase/app'
require('firebase/auth')
import { db } from '../services/firebase'


export default {
  name: 'SignIn',
  components: {
    ForgotPass
  },
  data() {
    return {
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
                })
              }
            })
          })
          this.$router.push({ name: 'PatientsList' })
        })
        .catch(() => {
          this.error = 'Identifiant ou mot de passe incorrect'
        })
    },
  }
}
</script>

<style scoped>
h2 {
  margin-bottom: 2vh;
}
p {
  font-size: 16px;
  margin-top: 2rem;
}
a {
  color: #FF8D8B;
}
.signIn {
  padding: 2rem;
}
.formSignIn {
  width: 100%;
}
.wrap-input {
  position: relative;
  width: 100%;
  z-index: 1;
  margin-bottom: 1.5rem;
}
input:-webkit-autofill,
input:-webkit-autofill:hover, 
input:-webkit-autofill:focus,
input:-webkit-autofill:active  {
  box-shadow: 0 0 0 30px white inset !important;
}
.input {
  font-size: 16px;
  line-height: 1.5;
  color: #222222;
  display: block;
  width: 100%;
  border: 1px solid #EBEBEB;
  height: 45px;
  border-radius: 25px;
  padding: 0 30px 0 68px;
}
/* Animation de la box-shadow */
.focus-input {
  display: block;
  position: absolute;
  border-radius: 25px;
  bottom: 0;
  left: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
  box-shadow: 0px 0px 0px 0px;
  color: #FF8D8B;
}
.input:focus + .focus-input {
  -webkit-animation: anim-shadow 0.5s ease-in-out forwards;
  animation: anim-shadow 0.5s ease-in-out forwards;
}
@-webkit-keyframes anim-shadow {
  to {
    box-shadow: 0px 0px 70px 25px;
    opacity: 0;
  }
}
@keyframes anim-shadow {
  to {
    box-shadow: 0px 0px 70px 25px;
    opacity: 0;
  }
}
.symbol-input {
  font-size: 16px;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  align-items: center;
  position: absolute;
  border-radius: 25px;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding-left: 35px;
  pointer-events: none;
  color: #B0B0B0;
  -webkit-transition: all 0.4s;
  -o-transition: all 0.4s;
  -moz-transition: all 0.4s;
  transition: all 0.4s;
}
.input:focus + .focus-input + .symbol-input {
  color: #FF8D8B;
  padding-left: 28px;
}
.btn-submit {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.connectionError {
  margin-bottom: 1rem;
}
.button {
  font-size: 16px;
  border-radius: 25px;
  height: 45px;
  width: 70%;
  border: none;
  background-color: #FF8D8B;
  color: #FFFFFF;
  padding: .5rem 1.5rem;
  cursor: pointer;
  transition: all .2s ease-in-out;
  font-weight: 500;
}
.button:hover {
  background-color: #ec8381;
}
.forgotPass {
  margin-top: 1rem;
  color: #FF8D8B;
  text-align: center;
  cursor: pointer;
}
.forgotPass:hover {
  transition: all .2s ease-in-out;
  color: #ec8381;
}
</style>