<template>
  <div class="patientsList">
    <h1 id="title">Liste des patients</h1>
    <div id="actions">
      <vs-input id="search" icon="search" placeholder="Search" v-model="valueInputSearch"/>
      <vs-button @click="toggleModal" color="#9082FF" type="filled" id="addPatient">
        <p>Ajouter un patient</p>  
        <div class="material-icons">add_circle</div>
      </vs-button>
      <AddPatientModal ref="addPatientModal"/>
    </div>
    <div id="list">
      <ul>
        <li v-on:click="goPatientProfil">Patient1</li>
        <li v-on:click="goPatientProfil">Patient2</li>
        <li v-on:click="goPatientProfil">Patient3</li>
      </ul>
    </div>
  </div>
</template>
    
<script>
import AddPatientModal from '@/components/AddPatientModal.vue'
import { mapGetters } from "vuex";


export default {
  name: 'PatientsList',
  data(){
    return {
      valueInputSearch:''
    }
  },
  components: {
    AddPatientModal
  },
  computed: {
    // map `this.user` to `this.$store.getters.user`
    ...mapGetters({
      user: "user"
    })
  },
  methods: {
    goPatientProfil() {
      this.$router.push({name:'PatientProfil'})
    },
    toggleModal() {
      this.$refs.addPatientModal.toggle()
    }
  }
}
</script>
    
<style>
.vs-input-primary {
  margin: 3% ;
}
.material-icons {
  margin-left: 2%;
}
.con-color {
  height: 75%;
}
#dashboardContent {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
}
#actions {
  display: flex;
  flex-direction: row;
  align-items: center;
}
#addPatient {
  display: flex;
  flex-direction: row;
  align-items: center;
}
#title {
  width: 100%;
}
</style>
