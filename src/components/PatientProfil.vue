<!-- PAGE PATIENT PROFIL WITH SOME INFORMATIONS -->
<template>
  <div class="patientProfil" v-if="patient != null">
    <a @click="$router.go(-1)"><i class="material-icons">arrow_back</i></a>
    <div id="patientDatasActions">
      <div id="patientDatas">
        <img class="avatar" v-if="patient.gender!= null && patient.gender == 1" alt="imgPatient" id="imgPatient" src="../assets/avatar-man-illustration.svg"/>
          <img class="avatar" v-if="patient.gender!= null && patient.gender == 0" alt="imgPatient" id="imgPatient" src="../assets/avatar-woman-illustration.svg"/>
        <div id="patientTxtDatas">
          <h1>{{patient.firstName}} {{patient.lastName}}</h1>
          <p><span> Date de naissance : </span> {{ this.changeDateFormat(patient.birthday) }}</p>
          <p><span> Adresse : </span> {{patient.address}}, {{patient.cp}} {{patient.city}}</p>
          <p><span> Email : </span> {{patient.email}}</p>
          <p><span> Motif : </span> {{patient.testReason}}</p>
          <!-- <p><span> Date de création : </span> {{ this.getDate(patient.dateCreation.toDate()) }}</p> -->
          <div id="actionsPatient">
            <vs-button color="#9082FF" type="filled" class="btnPatient edit" @click.native="toggleModal">Modifier les informations</vs-button>
            <vs-button color="#9082FF" type="filled" class="btnPatient" @click.native="deletePatient">Supprimer ce patient</vs-button>
          </div>
        </div>
      </div>
      <div id="tests-results">
        <vs-button color="#9082FF" type="filled" @click.native="goListTests" class="btn">Démarrer un test</vs-button>
        <vs-button color="#9082FF" type="filled" @click.native="goResults" class="btn">Voir les résultats</vs-button>
      </div>
      <UpdateDataModal ref="updateDatasModal" :person="patient" :personType="'patient'"/>
    </div>
  </div>
</template>

<script>
import UpdateDataModal from '@/components/UpdateDataModal.vue'
import {mapGetters} from 'vuex'
import { db } from '../services/firebase'
require('firebase/auth')

export default {
  name: 'PatientProfil',
  components : {
    UpdateDataModal
  },
  computed: {
    ...mapGetters({
      patient: 'currentPatient'
    })
  },
  created() {
    if(this.patient === null) {
      this.goPatientsList()
    }
  },
  methods: {
    getDate(dateISO) { 
      let creationDate = new Date(dateISO)
      let month = creationDate.getMonth()
      month < 10 ? month = '0'+(month+1) : month = (month+1)
      const date = creationDate.getDate() +'/' + month + '/'+ creationDate.getFullYear()
      return date
    },
    changeDateFormat(date) {
      let newDate = date.split("-").reverse().join("/")
      return newDate
    },
    toggleModal() {
      this.$refs.updateDatasModal.toggle()
    },
    goResults() {
      if(this.$route.name != 'PatientResults')
        this.$router.push({name:'PatientResults'})
    },
    goListTests() {
      if(this.$route.name != 'TestList')
        this.$router.push({name:'TestList'})
    },
    goPatientsList() {
      if(this.$route.name != 'PatientsList')
        this.$router.push({name:'PatientsList'})
    },
    deletePatient() {
      db.collection('patients').doc(this.patient.id).get().then((doc) => {
        doc.ref.delete();
      })
      .catch(function(error) {
        console.error("Error delete patient ", error);
      })
      this.$store.commit("SET_CURRENT_PATIENT", null)
      this.$router.push({name:'PatientsList'})
    }
  }
}
</script>

<style scoped>
.patientProfil {
  position: relative;
  text-align: left;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}
.btnPatient {
  border-radius: 16px;
  margin: 10px 0;
  font-size: 16px;
  padding: 10px;
  flex-grow: 1;
}
.btnPatient.edit {
  margin-right: 20px;
}
.btn {
  border-radius: 16px;
  margin: 10px 0;
  font-size: 16px;
}
.patientProfil a {
  cursor: pointer;
}
#patientDatas {
  display: flex;
  flex-direction: row;
  flex: 1 75%;
}
#patientTxtDatas {
  display: flex;
  flex-direction: column;
  text-align: left;
  margin: 0 2rem;
  line-height: 2;
  flex-grow: 1;
}
#patientTxtDatas span {
  font-weight: 500;
}
#actionsPatient {
  width: 100%;
  display: flex;
  flex-direction: row;
}
#patientDatasActions {
  display: flex;
  flex-direction: row;
  background-color: white;
  box-shadow: 0px 0px 30px -20px rgba(0,0,0,0.25);
  border-radius: 16px;
  padding: 2rem;
  align-items: center;
  margin-top: 2rem;
  margin-right: 3rem;
}
#tests-results {
  background-color: white;
  border-radius: 15px;
  height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1 25%;
}
#imgPatient {
  margin: 10px;
  width: 125px;
}
#modalPatient {
  display: none;
}

@media screen and (max-width: 1024px) {
  #patientDatas, #patientDatasActions {
    flex-direction: column;
  }
  #patientDatas {
    width: 100%;
  }
  #patientTxtDatas {
    margin: 0;
  }
  #tests-results {
    width: 100%;
    margin-top: .5rem;
  }
  #imgPatient {
    width: 20%;
  }
}
</style>
