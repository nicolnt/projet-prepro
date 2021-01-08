<template>
  <div class="patientProfil">
    <a @click="$router.go(-1)"><i class="material-icons">arrow_back</i></a>
    <div id="patientDatasActions">
      <div id="patientDatas">
        <img src="../assets/avatar-woman-illustration.svg" alt="imgPatient" id="imgPatient">
        <div id="patientTxtDatas">
          <h1>Nom du patient</h1>
          <h3>Date de naissance</h3>
          <h3>Adresse</h3>
          <p>Motif : Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div>
      </div>
      <div id="actions">
        <vs-button color="#9082FF" type="filled" class="btnPatient">Modifier les informations</vs-button>
        <vs-button color="#9082FF" type="filled" class="btnPatient">Supprimer ce patient</vs-button>
      </div>
    </div>
    <div id="tests-results">
      <vs-button color="#9082FF" type="filled" v-on:click="goResults" class="btn">Voir les résultats</vs-button>
      <vs-button color="#9082FF" type="filled" v-on:click="goListTests" class="btn">Démarrer un test</vs-button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'PatientProfil',
  methods: {
    goResults() {
      this.$router.push({name:'PatientResults'})
    },
    goListTests() {
      this.$router.push({name:'TestList'})
    },
    goPatientsList() {
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
}
</style>