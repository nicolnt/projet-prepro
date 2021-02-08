<template lang="html">
  <div id="modalPatient">
    <vs-popup title="Modifier les informations" :active.sync="popupActivo">
    <div v-if="personType === 'patient'" id="modalContentClient">
      <form action="#" @submit.prevent="submit">
        <div>
          <div>
            <input id="lastName" type="text" name="lastName" :placeholder="person.lastName" required autofocus v-model="form.lastName"/>
          </div>
        </div>
        <div>
          <div>
            <input id="firstName" type="text" name="firstName" :placeholder="person.firstName" required v-model="form.firstName"/>
          </div>
        </div>
        <div>
          <div>
            <input id="birthday" type="date" name="birthday" :placeholder="person.birthday" required v-model="form.birthday"/>
          </div>
        </div>
        <div>
          <div>
            <input id="email" type="email" name="email" :placeholder="person.email" required v-model="form.email"/>
          </div>
        </div>
        <div>
          <div>
            <select id="gender" name="gender" :placeholder="person.gender" required v-model="form.gender">
              <option value="" disabled>--Merci de choisir--</option>
              <option value="0">Femme</option>
              <option value="1">Homme</option>
          </select>
        </div>
        <div>
          <div>
            <input id="address" type="text" name="address" :placeholder="person.address" required v-model="form.address"/>
          </div>
        </div>
        <div>
          <div>
            <input id="cp" type="number" name="cp" :placeholder="person.cp" required v-model="form.cp"/>
          </div>
        </div>
        <div>
          <div>
            <input id="city" type="text" name="city" :placeholder="person.city" required v-model="form.city"/>
          </div>
        </div>
        <div>
          <div>
            <input id="reason" type="text" name="reason" :placeholder="person.testReason" required v-model="form.reason"/>
          </div>
        </div>
        </div>
        <div v-if="error" class="connectionError">{{error}}</div>
        <button color="#9082FF" type="submit" id="button">Modifier</button>
      </form>
      <img class="plane-purple" src="../assets/plane-purple-illustration.svg"/>
    </div>

    <div v-if="personType === 'psy'" id="modalContentClient">
      <form action="#" @submit.prevent="submit">
        <div>
          <div>
            <input id="lastName" type="text" name="lastName" :placeholder="person.displayName" required autofocus v-model="form.lastName"/>
          </div>
        </div>
        <div>
          <div>
            <input id="firstName" type="text" name="firstName" :placeholder="person.displayName" required autofocus v-model="form.firstName"/>
          </div>
        </div>
        <div>
          <div>
            <input id="email" type="email" name="email" :placeholder="person.email" required autofocus v-model="form.email"/>
          </div>
        </div>
      </form>
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
        firstName: "",
        lastName: "",
        email: "",
        birthday: "",
        address: "",
        cp: "",
        city: "",
        reason: "",
        gender: "",
      },
      error: null,
      id:null
    }
  },
  computed: {
    ...mapGetters({
    // map `this.user` to `this.$store.getters.user`
      user: "user"
    }),
    created: {
      // filtrer pour retenir que le nom et prenom
    }
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
      console.log(this.person)
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
      this.popupActivo = !this.popupActivo
      this.$router.go(0)
    }
  }
}
</script>

<style lang="css">
.vs-popup {
  position: relative;
  font-family: Poppins;
  background-color: #eaedf0;
  border-radius: 20px;
  box-shadow: 0px 2px 30px rgba(200, 200, 200, 0.7);    
  width: 475px!important;
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