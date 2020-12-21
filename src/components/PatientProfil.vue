<template>
  <div class="patientProfil">
    <h1>Profil du patient</h1>
      <vs-button color="#9082FF" type="filled" v-on:click="goResults" class="btn">Voir les résultats</vs-button>
      <vs-button color="#9082FF" type="filled" v-on:click="goListTests" class="btn">Démarrer un test</vs-button>
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
    }
  }
}
</script>

<style scoped>
.patientProfil {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.btn {
  border-radius: 16px;
  margin: 10px 0;
}
</style>