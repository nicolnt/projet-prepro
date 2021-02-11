<template>
  <div class="patientProfil" v-if="patient != null">
    <a @click="$router.go(-1)"><i class="material-icons">arrow_back</i></a>
    <div id="patientDatasActions">
      <div id="patientDatas">
        <img class="avatar" v-if="patient.gender!= null && patient.gender == 1" alt="imgPatient" id="imgPatient" src="../assets/avatar-man-illustration.svg"/>
          <img class="avatar" v-if="patient.gender!= null && patient.gender == 0" alt="imgPatient" id="imgPatient" src="../assets/avatar-woman-illustration.svg"/>
        <div id="patientTxtDatas">
          <h1>{{patient.firstName}} {{patient.lastName}}</h1>
          <h3>Date de naissance : {{patient.birthday}}</h3>
          <h3>Adresse : {{patient.address}}, {{patient.cp}} {{patient.city}}</h3>
          <h3>Email : {{patient.email}}</h3>
          <p>Motif : {{patient.testReason}}</p>
          <p>Date de création : {{patient.dateCreation.toDate()}}</p>
        </div>
      </div>
      <div id="actions">
        <vs-button color="#9082FF" type="filled" class="btnPatient" @click="toggleModal">Modifier les informations</vs-button>
        <vs-button color="#9082FF" type="filled" class="btnPatient">Supprimer ce patient</vs-button>
      </div>
      <UpdateDataModal ref="updateDatasModal" :person="patient" :personType="'patient'"/>
    </div>
    <div id="tests-results">
      <vs-button color="#9082FF" type="filled" v-on:click="goResults" class="btn">Voir les résultats</vs-button>
      <vs-button color="#9082FF" type="filled" v-on:click="goListTests" class="btn">Démarrer un test</vs-button>
    </div>
  </div>
</template>

<script>
import UpdateDataModal from '@/components/UpdateDataModal.vue'
import  {mapState} from 'vuex'

export default {
  name: 'PatientProfil',
  components : {
    UpdateDataModal
  },
  data () {
    return {
      //patient:{}
    }
  },
  computed: {
    ...mapState({
      patient: 'currentPatient'
    })
  },
  created() {
    if(this.patient === null) {
      this.goPatientsList()
    }
  },
  methods: {
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
  justify-content: center;
}
.btnPatient {
  border-radius: 16px;
  margin: 10px 0;
}
.btn {
  border-radius: 16px;
  margin: 10px 0;
  width: 20%;
}
.patientProfil a {
  position: absolute;
  top: -40px;
  left: -28px;
  font-size: 30px;
  cursor: pointer;
}
#patientDatas {
  display: flex;
  flex-direction: row;
  width: 60%;
}
#patientTxtDatas {
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-top: 10px; 
}
#actions {
  background-color: #F0F0F0;
  border-radius: 15px;
  width: 20%;
  display: flex;
  flex-direction: column;
  align-content: flex-end;
  padding: 15px;
}
#patientDatasActions {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
#tests-results {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
}
#imgPatient {
  margin: 10px;
  width: 24%;
}
</style>