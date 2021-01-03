<template>
  <div class="psyInformations">
    <span class="material-icons" id="icon_back" v-on:click="goPatientsList"> keyboard_backspace </span>
    <div id="psyDatas">
      <img src="../assets/google-illustration.svg" alt="imgPatient" id="imgPatient">
      <h1>Nom du psychologue</h1>
    </div>
    <vs-button color="#9082FF" type="filled" id="btnModif">Modifier les informations</vs-button>
  </div>
</template>

<script>

export default {
  name: 'PsyInformations',
  methods: {
    goPatientsList() {
      this.$router.push({name:'PatientsList'})
    }
  }
}
</script>

<style scoped>
.psyInformations {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
#icon_back {
  display: flex;
  align-self: flex-start;
  margin-top: 12px;
}
#btnModif {
  border-radius: 16px;
}
#psyDatas {
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
}
#imgPatient {
  margin-right: 10px;
}
</style>