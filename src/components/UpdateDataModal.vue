<!-- MODAL WITH FORM TO UPDATE PSY'S OR PATIENT'S INFORMATIONS -->
<template lang="html">
  <div>
    <vs-popup class="modalPatient" title="Modifier les informations" :active.sync="popupActivo">
      <!-- Update patient's informations -->
      <div v-if="personType === 'patient'" id="modalContentClient">
        <form action="#" @submit.prevent="submit">
          <div class="wrapperInfosForm">
            <div class="wrap-input validate-input" data-validate = "Valid last name is required">
              <input class="input" id="lastName" type="text" name="lastName" required autofocus v-model="form.lastName"/>
              <span class="focus-input"></span>
              <span class="symbol-input">
                <i class="material-icons" aria-hidden="true">person</i>
              </span>
            </div>
            <div class="wrap-input validate-input" data-validate = "Valid first name is required">
              <input class="input" id="firstName" type="text" name="firstName" required v-model="form.firstName"/>
              <span class="focus-input"></span>
              <span class="symbol-input">
                <i class="material-icons" aria-hidden="true">person</i>
              </span>
            </div>
          </div>
          <div class="wrap-input validate-input" data-validate = "Valid email is required: ex@abc.xyz">
            <input class="input" id="email" type="email" name="email" required v-model="form.email"/>
            <span class="focus-input"></span>
            <span class="symbol-input">
              <i class="material-icons" aria-hidden="true">email</i>
            </span>            
          </div>
          <div class="wrapperInfosForm">
            <div class="wrap-input validate-input" data-validate = "Valid birthday is required: 10/05/21">
              <input class="input" id="birthday" type="date" name="birthday" required v-model="form.birthday"/>
              <span class="focus-input"></span>
            </div>
            <div class="wrap-input validate-input" data-validate = "Selection is required">
              <select class="input" id="gender" name="gender" required v-model="form.gender">
                <option value="0">Femme</option>
                <option value="1">Homme</option>
              </select>
              <span class="focus-input"></span>
            </div>
          </div>
          <div class="wrap-input validate-input" data-validate = "Valid address is required">
            <input class="input" id="address" type="text" name="address" required v-model="form.address"/>
            <span class="focus-input"></span>
            <span class="symbol-input">
              <i class="material-icons" aria-hidden="true">place</i>
            </span>
          </div>
          <div class="wrapperInfosForm">
            <div class="wrap-input validate-input" data-validate = "Valid code postal is required: 26730">
              <input class="input" id="cp" type="number" name="cp" required v-model="form.cp"/>
              <span class="focus-input"></span>
              <span class="symbol-input">
                <i class="material-icons" aria-hidden="true">place</i>
              </span>
            </div>
            <div class="wrap-input validate-input" data-validate = "Valid city is required">
              <input class="input" id="city" type="text" name="city" required v-model="form.city"/>
              <span class="focus-input"></span>
              <span class="symbol-input">
                <i class="material-icons" aria-hidden="true">place</i>
              </span>
            </div>
          </div>
          <div class="wrap-input validate-input" data-validate = "Valid reason is required">
            <input class="input" id="reason" type="text" name="reason" required v-model="form.reason"/>
            <span class="reason focus-input"></span>
          </div>
          <div v-if="error" class="connectionError">{{error}}</div>
          <button color="#9082FF" type="submit" class="button">Modifier</button>
        </form>
        <img class="plane-purple" src="../assets/plane-purple-illustration.svg"/>
      </div>

      <!-- Update psy's informations -->
      <div v-if="personType === 'psy'" id="modalContentPsy">
        <form action="#" @submit.prevent="submit">
          <div class="wrapperPsyInfosForm">
            <div class="wrap-input validate-input" data-validate = "Valid last name is required">
              <input class="input" id="lastName" type="text" name="lastName" required autofocus v-model="form.lastName"/>
              <span class="focus-input"></span>
              <span class="symbol-input">
                <i class="material-icons" aria-hidden="true">person</i>
              </span>
            </div>
            <div class="wrap-input validate-input" data-validate = "Valid first name is required">
              <input class="input" id="firstName" type="text" name="firstName" required v-model="form.firstName"/>
              <span class="focus-input"></span>
              <span class="symbol-input">
                <i class="material-icons" aria-hidden="true">person</i>
              </span>
            </div>
            <div class="wrap-input validate-input" data-validate = "Valid email is required: ex@abc.xyz">
              <input class="input" id="email" type="email" name="email" required v-model="form.email"/>
              <span class="focus-input"></span>
              <span class="symbol-input">
                <i class="material-icons" aria-hidden="true">email</i>
              </span>            
            </div>
            <div v-if="error" class="connectionError">{{error}}</div>
            <button color="#9082FF" type="submit" class="button">Modifier</button>
          </div>
        </form>
        <img class="plane-purple" src="../assets/plane-purple-illustration.svg"/>
      </div>

    </vs-popup>
  </div>
</template>

<script>
import { db } from '../services/firebase'
import { mapGetters } from "vuex";
import firebase from 'firebase/app'
require('firebase/auth')

export default {
  name: 'AddPatientModal',
  props: {
    person: {type: Object, required: true},
    personType: {type: String}
  },
  data() {
    return { 
      popupActivo: false,
      m_person: {type: "", datas: {}},
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
        firstName: this.person.firstName,
        lastName: this.person.lastName,
        email: this.person.email,
        birthday: this.person.birthday,
        address: this.person.address,
        cp: this.person.cp,
        city: this.person.city,
        reason: this.person.testReason,
        gender: this.person.gender,
      },
      error: null,
      id:null
    }
  },
  computed: {
    ...mapGetters({
      // map `this.user` to `this.$store.getters.user`
      user: "user",
      patient: "currentPatient"
    }),
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
      })
      if(this.personType === 'psy') {
        user.updateProfile({
          displayName: self.form.firstName + ' ' + self.form.lastName,
          email: self.form.email
        }).then(function() {
          db.collection("users").doc(self.id).update({
            firstName: self.form.firstName,
            lastName: self.form.lastName,
            email: self.form.email
          }).then(function() {
          self.confirm()
          })
        }).catch(function(error) {
          console.error("Error adding document: ", error);
        });
      } else if(this.personType === 'patient') {
        this.popupActivo = !this.popupActivo
        const updatePatient = {
          firstName: self.form.firstName,
          lastName: self.form.lastName,
          email: self.form.email,
          birthday: self.form.birthday,
          address: self.form.address,
          cp: self.form.cp,
          city: self.form.city,
          testReason: self.form.reason,
          gender: self.form.gender
        }
        db.collection("patients").doc(self.patient.id)
          .update(updatePatient)
          .catch(function(error) {
          console.error("Error adding document: ", error);
        });
        this.$store.commit("SET_CURRENT_PATIENT", updatePatient)
      }
    },
    confirm() {
      location.reload()
    },
    toggle() {
      this.popupActivo = !this.open;
      if(this.popupActivo) {
        if(this.personType === "psy"){
          const names = this.person.displayName.split(" ")
          this.form.firstName = names[0]
          this.form.lastName = names[1]
        }
      }
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

.modalPatient >>> .vs-popup {
  position: relative;
  font-family: 'Poppins';
  background-color: #eaedf0;
  border-radius: 20px;
  box-shadow: 0px 2px 30px rgba(200, 200, 200, 0.7);    
  width: 600px!important;
  text-align: center;
}
.wrapperInfosForm {
  display: flex;
  justify-content: space-between;
}
.wrapperPsyInfosForm {
  display: flex;
  flex-direction: column;
  align-items: center;
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
.wrap-input {
  position: relative;
  width: 100%;
  z-index: 1;
  margin-bottom: 1.5rem;
}
.input {
  font-size: 15px;
  font-family: 'Poppins';
  line-height: 1.5;
  color: rgb(118, 118, 118);
  display: block;
  width: 100%;
  border: 1px solid #EBEBEB;
  height: 45px;
  border-radius: 25px;
  padding: 0 30px 0 68px;
}
#modalContentClient, #modalContentPsy {
  display: flex;
  flex-direction: column;
  align-items: center;
}
#birthday, #gender {
  padding: 0 30px;
  font-family: 'Poppins';
}
#reason {
  border-radius: 0px;
  height: 80px;
  font-family: 'Poppins';
  padding: 10px 30px;
}
.reason.focus-input {
  border-radius: 0;
}
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
  font-size: 16px;
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
</style>