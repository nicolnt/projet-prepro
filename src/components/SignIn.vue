<template>
  <div class="signIn">
      <!-- <h2>Connexion</h2> -->  
    <div v-if="error" class="connectionError">{{error}}</div>
    <form class="formSignIn" action="#" @submit.prevent="submit">
      <div class="wrap-input validate-input" data-validate = "Valid email is required: ex@abc.xyz">
        <input 
          id="email"
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
          id="password"
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
        <button type="submit" class="button">Se connecter</button>
      </div>
      <div>
        <div class="forgotPass" @click="toggleModal">Mot de passe oublié ?</div>
      </div>
    </form>
    <ForgotPass ref="forgotPassModal"/>
      <p> Vous n'avez pas encore de compte ? <router-link to="/signUp"> Inscrivez-vous </router-link> </p>
      <!-- <img class="plane" src="../assets/plane-illustration.svg"/> -->
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
                });
              }
            });
          });
          this.$router.push({ name: 'PatientsList' })
        })
        .catch(() => {
          this.error = 'Identifiant ou mot de passe incorrect.'
        });
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
  /* width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center; */
  padding: 50px;
  /* border-radius: 20px;
  box-shadow: 0px 2px 30px rgba(200, 200, 200, 0.73);
  background-color: #fff;
  text-align: left;
  position: relative;
  max-width: 100%;
  font-size: 16px; */
}
/* .plane {
  position: absolute;
  top: -21px;
  right: -48px;
} */
.formSignIn {
  width: 100%;
  /* margin-top: 2rem; */
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
  color: #292929;
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
  justify-content: center;
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
  transition: all .5s ease-in-out;
}
.button:hover {
  background-color: #9082FF;
}
.forgotPass {
  margin-top: 10px;
  color: #FF8D8B;
  text-align: center;
  cursor: pointer;
}
</style>