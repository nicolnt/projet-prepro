<template>
  <div class="patientResults">
    <h1>Résultats du patient</h1>
    <h2>Nom du patient - date de la consultation</h2>
    <vs-button color="#9082FF" type="filled" v-on:click="download" id="btnDownload">Télécharger les résultats</vs-button>
    <div class="testMotricité">
      <div class="testMotricité-header">
        <h3>Test motricité fine</h3>
        <span> - réussi à 55%</span>
        <span> - non validé</span>
      </div> 
    </div>
  </div>
</template>

<script>

export default {
  name: 'PatientResults',
  methods: {
    download(){
      console.log("coucou")
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
#btnDownload{
  border-radius: 16px;
}
</style>