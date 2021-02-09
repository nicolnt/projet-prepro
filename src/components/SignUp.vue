<template>
  <div class="signUp">
      <h2>Inscription</h2>
      <form class="formSignUp" action="#" @submit.prevent="submit">
        <div class="wrap-input validate-input" data-validate = "Valid last name is required">
          <input 
            id="lastName"
            class="input"
            type="text"
            name="lastName"
            placeholder="Nom"
            required
            autofocus
            v-model="form.lastName"
          />
          <span class="focus-input"></span>
          <span class="symbol-input">
            <i class="material-icons" aria-hidden="true">person</i>
          </span>
        </div>
        <div class="wrap-input validate-input" data-validate = "Valid first name is required">
          <input 
            id="firstName"
            class="input"
            type="text"
            name="firstName"
            placeholder="Prénom"
            required
            autofocus
            v-model="form.firstName"
          />
          <span class="focus-input"></span>
          <span class="symbol-input">
            <i class="material-icons" aria-hidden="true">person</i>
          </span>
        </div>
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
        <div class="wrap-input validate-input" data-validate = "Valid password is required">
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
        <div v-if="error" class="connectionError">{{error}}</div>
        <div class="btn-submit">
          <button type="submit" class="button">S'inscrire</button>
        </div>
      </form>
      <img class="cloud" src="../assets/cloud-illustration.svg"/>
  </div>
</template>

<script>
// import Input from '@/components/Input.vue'
import firebase from 'firebase/app'
require('firebase/auth')
import { db } from '../services/firebase'

export default {
  name: 'SignUp',
  components:{
    // Input
  },
  data() {
    return {
      m_valueLastName : "",
      m_valueFirstName : "",
      m_valueEmail : "",
      m_valuePassword : "",
      form: {
        firstName: "",
        lastName: "",
        email: "",
        password: ""
      },
      error: null
    }
  },
 
  methods:{
    submit() {
      if(this.form.password.length >= 6) {
        firebase
        .auth()
        .createUserWithEmailAndPassword(this.form.email, this.form.password)
        .then((data) => {
          data.user
            .updateProfile({
              displayName: this.form.firstName + ' ' + this.form.lastName
            })
            .then(() => { db.collection("users").add({
              firstName: this.form.firstName,
              lastName: this.form.lastName,
              email: this.form.email,
              codePin: 123,
              dateCreation: new Date()
            })
            .then(function(docRef) {
              console.log("Document written with ID: ", docRef.id);
            })
            .catch(function(error) {
              console.error("Error adding document: ", error);
            }).then(() => {
            const user = firebase.auth().currentUser
            user.sendEmailVerification().then(() => {
              this.$router.push({ name: 'PatientsList' }).catch(() => {})
            })
          })});
         
        })
        .catch(() => {
          this.error = 'Une erreur est survenue. Veuillez réessayer et nous contacter en cas de soucis'
        });
      }
      else {
         this.error = 'Le mot de passe doit contenir au moins 6 lettres ou chiffres.'
      }
    },
    goSignUp() {
      this.checkInput(this.m_valueEmail)
      this.checkInput(this.m_valuePassword)
      this.checkInput(this.m_valueLastName)
      this.checkInput(this.m_valueFirstName)
      if(this.$route.name != 'PatientsList')
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
.cloud {
  position: absolute;
  top: -21px;
  left: -48px;
}
.formSignUp {
  width: 100%;
  margin-top: 2rem;
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
  font-size: 14px;
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
  font-size: 15px;
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
  font-size: 14px;
  border-radius: 25px;
  height: 45px;
  width: 70%;
  border: none;
  background-color: #FF8D8B;
  color: #FFFFFF;
  padding: .5rem 1.5rem;
  cursor: pointer;
}
.button:hover {
  background-color: #9082FF;
}
</style>