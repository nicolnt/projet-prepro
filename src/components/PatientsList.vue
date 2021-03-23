<!-- PAGE PATIENTS LIST -->
<template>
  <div class="patientsList">
    <Hero title="Liste des patients"/>
    <div id="patientsList">
      <div id="actions">
        <form class="form" v-on:submit.prevent>
          <input type="text" class="form-field" v-model="message" placeholder="Rechercher un patient" />
          <button type="button" class="btn--search btn--inside"><i class="material-icons">search</i></button>
        </form>
        <button class="add-patient" @click="toggleModal">
          <p> Ajouter un patient </p>
          <div class="material-icons">add_circle</div>
        </button>
        <AddPatientModal ref="addPatientModal"/>
      </div>
      <div id="list">
        <ul>
          <li v-on:click="goPatientProfil(patient)" v-for="patient in patients" :key="patient.id">
            <img class="avatar" v-if="patient.gender == 1" alt="Avatar man" src="../assets/avatar-man-illustration.svg"/>
            <img class="avatar" v-if="patient.gender == 0"  alt="Avatar woman" src="../assets/avatar-woman-illustration.svg"/>
            {{patient.lastName}} {{patient.firstName}}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
    
<script>
import Hero from '@/components/Hero.vue'
import AddPatientModal from '@/components/AddPatientModal.vue'
import { mapGetters } from "vuex";
import { db } from '../services/firebase'
import firebase from 'firebase/app'
require('firebase/auth')

export default {
  name: 'PatientsList',
  data(){
    return {
      valueInputSearch:'',
      patients: [],
      patientsBackup: [],
      id: null,
      message: null
    }
  },
  components: {
    Hero,
    AddPatientModal
  },
  watch: {
    message: function (val) {
      this.getMessage(val)
    }
  },
  computed: {
    // map `this.user` to `this.$store.getters.user`
    ...mapGetters({
      user: "user"
    })
  },
  mounted: function(){
    this.getPatientList()
  },
  methods: {
    getMessage(val){
      if(val.length > 0){
        this.patients = this.patientsBackup.filter(patient => (patient.firstName.toLowerCase().trim().includes(val.toLowerCase().trim()) ||
        patient.lastName.toLowerCase().trim().includes(val.toLowerCase().trim())))
      }
      else{
        this.patients = this.patientsBackup
      }
    },
    goPatientProfil(patient) {
      if(this.$route.name != 'PatientProfil') {
        this.$store.commit("SET_CURRENT_PATIENT", patient)
        this.$router.push({name:'PatientProfil'})
      }
    },
    toggleModal() {
      this.$refs.addPatientModal.toggle()
    },
    getPatientList(){
      var tmp = null
      var self = this
      db.collection("users").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if(doc.data().email == firebase.auth().currentUser.email){
              self.id = doc.id
          }
        })
      })
      db.collection("patients").orderBy("lastName").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if(doc.data().idUser == self.id){
            tmp = doc.data()
            tmp.id = doc.id
            self.patients.push(tmp)
            self.patientsBackup.push(tmp)
          }
        })
      })
    }
  }
}
</script>
    
<style scoped>
.patientsList {
  text-align: left;
  width: 100%;
}
#patientsList {
  margin-top: 5rem;
}
.form {
  margin-right: 3rem;
}
.form-field {
  width: 300px;
  background-color: #fff;
  border-radius: 25px;
  border: 1px solid #EBEBEB;
  padding: 10px 10px 10px 15px;
  font-size: 16px;
  color: #B0B0B0;
  box-shadow: 0 0 19px -6px rgba(0, 0, 0, 0.20);
  background-clip: padding-box;
}
.btn--search {
  width: 50px;
  display: inline-block;
  background-color: #9082FF;
  color: #fff;
  border-radius: 25px;
  border: 0;
  outline: 0;
  padding: 10px;
  cursor: pointer;
  transition: all 0.5s ease;
}
.btn--search i {
  font-size: 16px;
}
.btn--inside {
  margin-left: -50px;
}
.btn--search:hover {
  background-color: #7669d3;
}
.add-patient {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  border-radius: 25px;
  border: none;
  background-color: #9082FF;
  color: #fff;
  cursor: pointer;
  box-shadow: 0 0 19px 0 rgba(0, 0, 0, 0.20);
  transition: all 0.5s ease;
}

.add-patient p {
  margin-right: 1rem;
  font-size: 16px;
}

.add-patient:hover {
  background-color: #7669d3;
}
#dashboardContent {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  overflow: hidden;
}
#actions {
  display: flex;
  flex-direction: row;
  place-content: center;
  margin: 2rem 3rem 2rem 0;
}
#addPatient {
  display: flex;
  flex-direction: row;
  align-items: center;
}
#title {
  width: 100%;
}
#list ul {
  list-style: none;
  display: inline;
}
#list li {
  cursor: pointer;
  border-bottom: 1px solid rgb(241, 241, 241);
  padding: 5px 0;
  transition: all 0.5s ease;
}
#list li:hover {
  background: linear-gradient(90deg, rgba(241,241,241,0) 0%, rgba(241,241,241,1) 10%, rgba(241,241,241,1) 50%, rgba(241,241,241,1) 90%, rgba(241,241,241,0) 100%);
}
#list img {
  width: 40px;
  vertical-align: middle;
}

@media screen and (max-width: 1024px) {
  .form {
    margin-right: 1rem;
  }
  #actions {
    justify-content: space-between;
  }
}

@media screen and (max-width: 1025px) {
  #actions {
    flex-direction: column;
    align-items: center;
  }
  .add-patient {
    margin-top: 1rem;
    padding: .5rem;
  }
}
</style>
