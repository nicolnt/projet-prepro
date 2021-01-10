<template>
  <div class="patientResults">
    <div class="resultsHeader">
      <h1>Résultats de <span id="patientResults-name">[NOM DU PATIENT]</span> - évaluation <span id="patientResults-validation">[VALIDATION]</span></h1>
      <div class="resultsHeader-subtitle">
        <h3>Test effectué le <span id="patientResults-date">[DATE CONSULTATION]</span></h3>
        <vs-button color="#9082FF" type="filled" v-on:click="download" id="btnDownload" icon="get_app">
          Télécharger les résultats
        </vs-button>
      </div>
    </div>
    <div class="patientResults-content">
      <div class="testMotricité">
        <div class="testMotricité-header header">
          <h3>Test motricité fine</h3>
          <span> - réussi à 55%</span>
          <span> - non validé</span>
        </div>
        <div class="testMotricité-history">
        </div>
      </div>
      <div class="globalComments">
        <div class="globalComments-header header">
          <h3>Commentaire global</h3>
        </div>
        <div class="globalComments-content">
          <textarea placeholder="Ajouter un commentaire"></textarea>
          <vs-button color="#9082FF" type="filled" v-on:click="download" id="btnSaveGlobalComment">
            Enregistrer le commentaire
          </vs-button>
        </div>
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
}
.patientResults-content{
  background-color : #F0F0F0;
  width: 98%;
  margin: 0 auto;
  border-radius: 16px;
  margin-top:2%;
}
.testMotricité, .globalComments{
  background-color: white;
  box-shadow: 0 4px 16px 0 rgba(0,0,0,.05);
  border-radius: 16px;
  width: 95%;
  margin: 0 auto;
  text-align: left;
  margin-top:2%;
}
.header{
  background-color:#9082FF;
  border-radius: 16px;
  color: white;
  display: flex;
  flex-direction: row;
  padding : 1%;
}
.header h3, .header span {
  margin-left: 2%;
}
.resultsHeader{
  margin-left: 1%;
  margin-top: 2%;
  text-align: left;
}
.resultsHeader h1{
  margin-left:3%;
}
.resultsHeader-subtitle{
  display: flex;
  flex-direction: row;
  margin-left:3%;
  width: 93%;
  justify-content: space-between;
  align-items: flex-start;
}
#btnDownload{
  border-radius: 16px;
  display: flex;
  flex-direction: row;
}
.globalComments-content{
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  margin-left:5%;
  margin-top: 1%;
  padding-bottom: 1%;
}
.globalComments-content textarea {
  width: 70%;
  height: 20vh;
  border: none;
  background-color: #F0F0F0;
  border-radius: 16px;
  padding: 10px;
}
.globalComments-content #btnSaveGlobalComment {
  margin-left: 5%;
  width: 20%;
  border-radius: 16px;
}
</style>