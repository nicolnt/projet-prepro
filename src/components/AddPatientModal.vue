<template lang="html">
  <div id="modalPatient">
    <vs-popup title="Ajouter un patient" :active.sync="popupActivo">
    <div id="modalContent">
      <form action="#" @submit.prevent="submit">
        <div class="wrapperInfosForm">
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
        <div class="wrapperInfosForm">
          <div class="wrap-input validate-input" data-validate = "Valid birthday is required: 10/05/21">
            <input 
              id="birthday"
              class="input"
              type="date"
              name="birthday"
              placeholder="Date de naissance"
              required
              autofocus
              v-model="form.birthday"
            />
            <span class="focus-input"></span>
          </div>
          <div class="wrap-input validate-input" data-validate = "Selection is required">
            <select 
              id="gender"
              class="input"
              name="gender"
              placeholder="Genre"
              required
              autofocus
              v-model="form.gender"
            >
              <option value="" disabled>Genre</option>
              <option value="0">Femme</option>
              <option value="1">Homme</option>
            </select>
            <span class="focus-input"></span>
          </div>
        </div>
        <div class="wrap-input validate-input" data-validate = "Valid address is required">
          <input 
            id="adress"
            class="input"
            type="adress"
            name="adress"
            placeholder="Adresse"
            required
            autofocus
            v-model="form.address"
          />
          <span class="focus-input"></span>
          <span class="symbol-input">
            <i class="material-icons" aria-hidden="true">place</i>
          </span>
        </div>
        <div class="wrapperInfosForm">
          <div class="wrap-input validate-input" data-validate = "Valid code postal is required: 26730">
            <input 
              id="cp"
              class="input"
              type="cp"
              name="cp"
              placeholder="Code postal"
              required
              autofocus
              v-model="form.cp"
            />
            <span class="focus-input"></span>
            <span class="symbol-input">
              <i class="material-icons" aria-hidden="true">place</i>
            </span>
          </div>
          <div class="wrap-input validate-input" data-validate = "Valid city is required">
            <input 
              id="city"
              class="input"
              type="city"
              name="city"
              placeholder="Ville"
              required
              autofocus
              v-model="form.city"
            />
            <span class="focus-input"></span>
            <span class="symbol-input">
              <i class="material-icons" aria-hidden="true">place</i>
            </span>
          </div>
        </div>
        <div class="wrap-input validate-input" data-validate = "Valid reason is required">
          <textarea 
            id="reason"
            class="input"
            type="reason"
            name="reason"
            placeholder="Raison du test"
            required
            autofocus
            v-model="form.reason"
          />
          <span class="reason focus-input"></span>
        </div>

        <div v-if="error" class="connectionError">{{error}}</div>
        <div class="btn-submit">
          <button type="submit" class="button">Ajouter</button>
        </div>
      </form>
      <img class="plane-purple" src="../assets/plane-purple-illustration.svg"/>
    </div>
    </vs-popup>
  </div>
</template>

<script>
// import Input from '@/components/Input.vue'
import { db } from '../services/firebase'
import { mapGetters } from "vuex";
import firebase from 'firebase/app'
require('firebase/auth')

export default {
  name: 'AddPatientModal',
  data() {
    return { 
      popupActivo: false,
      m_valueLastName: "",
      m_valueFirstName: "",
      m_valueEmail: "",
      m_valueBirthday: "",
      m_valueAddress: "",
      m_valueCp: "",
      m_valueCity: "",
      m_valueReason : "",
      selectGenre: "Genre",
      options:[
        {text: 'Homme', value: 1},
        {text: 'Femme', value: 2}
      ],
      form: {
        firstName: "",
        lastName: "",
        email: "",
        birthday: "",
        address: "",
        cp: "",
        city: "",
        reason: "",
        gender: ""
      },
      error: null,
      id:null
    }
  },
  components: {
    // Input
  },
  computed: {
    ...mapGetters({
// map `this.user` to `this.$store.getters.user`
      user: "user"
    })
  },
  methods: {
    submit() {
      var self = this
      const user = firebase.auth().currentUser
      db.collection("users").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if(doc.data().email == user.email){
              self.id = doc.id
          }
        });
      }).then(function() {
        db.collection("patients").add({
        firstName: self.form.firstName,
        lastName: self.form.lastName,
        email: self.form.email,
        birthday: self.form.birthday,
        address: self.form.address,
        cp: self.form.cp,
        city: self.form.city,
        testReason: self.form.reason,
        gender: self.form.gender,
        dateCreation: new Date(),
        idUser: self.id
        })
        .then(function(docRef) {
          console.log("Document written with ID: ", docRef.id);
          self.confirm()
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        })
      })
      
    },
    toggle() {
      this.popupActivo = !this.open;
    },
    checkInput(value) {
      if(value != null && value != undefined && value != "") {
        return true
      } else {
        return false
      }
    },
    confirm() {
      /*this.checkInput(this.m_valueEmail)
      this.checkInput(this.m_valueLastName)
      this.checkInput(this.m_valueFirstName)*/
      this.popupActivo = !this.popupActivo
      this.$router.go(0)
    }
  }
}
</script>

<style lang="css">
#modalPatient .vs-popup {
  position: relative;
  font-family: Poppins;
  background-color: #eaedf0;
  border-radius: 20px;
  box-shadow: 0px 2px 30px rgba(200, 200, 200, 0.7);    
  width: 600px!important;
}
.wrapperInfosForm {
  display: flex;
  justify-content: space-between;
}
.wrapperInfosForm > div { 
  width: 48%;
}
.selectExample {
  margin: 10px;
}
.con-select-example {
  display: flex;
  align-items: center;
  justify-content: center;
}
.con-select {
  width: 300px !important;
}
.con-select .vs-select {
  width: 300px !important;
}
.vs-popup--close--icon {
  margin-right: 9%;
  margin-top: 3%;
}
.plane {
  position: absolute;
  top: 17px;
  right: 27%;
}
#modalContent {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.wrap-input {
  position: relative;
  width: 100%;
  z-index: 1;
  margin-bottom: 1.5rem;
}
.input {
  font-size: 14px;
  line-height: 1.5;
  color: rgb(118, 118, 118);
  display: block;
  width: 100%;
  border: 1px solid #EBEBEB;
  height: 45px;
  border-radius: 25px;
  padding: 0 30px 0 68px;
}
#birthday, #gender {
  padding: 0 30px;
}
#reason {
  border-radius: 0px;
  height: 80px;
  font-family: Arial;
  padding: 10px 30px;
}
.reason.focus-input {
  border-radius: 0;
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
.vs-popup--content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100% - 46px);
}
#btnConfirm {
  width: 110px;
  border-radius: 16px;
  margin-top: 1rem;
}
.btn-submit {
  display: flex;
  justify-content: center;
}
.button {
  font-size: 14px;
  border-radius: 25px;
  height: 45px;
  width: 45%;
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
#genreListTitle {
  font: 400 13.3333px Arial;
}
.plane-purple {
  position: absolute;
  top: -19px;
  left: -44px;
}
.vs-popup h3 {
  text-align: center;
}
</style>
