<template>
  <div class="patientResults">
    <span class="material-icons" id="icon_back" v-on:click="goPatientsList"> keyboard_backspace </span>
    <h1>Résultats du patient</h1>
  </div>
</template>

<script>

export default {
  name: 'PatientResults',
  methods: {
    goPatientsList() {
      this.$router.push({name:'PatientProfil'})
    }
  }
}
</script>

<style scoped>
.patientResults {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>