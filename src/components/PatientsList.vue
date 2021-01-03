<template>
  <div class="patientsList">
    <Hero title="Liste des patients"/>
    <div id="actions">
      <form class="form">
        <input type="text" class="form-field" placeholder="Rechercher un patient" />
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
        <li v-on:click="goPatientProfil">Patient 1</li>
        <li v-on:click="goPatientProfil">Patient 2</li>
        <li v-on:click="goPatientProfil">Patient 3</li>
      </ul>
    </div>
  </div>
</template>
    
<script>
import Hero from '@/components/Hero.vue'
import AddPatientModal from '@/components/AddPatientModal.vue'

export default {
  name: 'PatientsList',
  data(){
    return {
      valueInputSearch:''
    }
  },
  components: {
    Hero,
    AddPatientModal
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
.patientsList {
  text-align: left;
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
  font-size: 14px;
  color: #B0B0B0;
  box-shadow: 0 0 19px -6px rgba(0, 0, 0, 0.20);
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
  font-size: 14px;
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
}

.add-patient:hover {
  background-color: #7669d3;
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
}
</style>
