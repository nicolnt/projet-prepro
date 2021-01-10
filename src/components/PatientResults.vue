<template>
  <div class="patientResults">
    <div class="resultsHeader">
      <h1>Résultats de [NOM DU PATIENT] - évaluation [VALIDATION]</h1>
      <div class="resultsHeader-subtitle">
        <h3>Test effectué le [DATE CONSULTATION]</h3>
        <vs-button color="#9082FF" type="filled" v-on:click="download" id="btnDownload" icon="get_app">
          Télécharger les résultats
        </vs-button>
      </div>
    </div>
    <div class="patientResults-content">
      <div class="testMotricité">
        <div class="testMotricité-header header">
          <h3>Test motricité fine<span> - réussi à 55%</span><span> - non validé</span></h3> 
        </div>
        <div class="testMotricité-history">
          <!-- J'ai fait quelques petites recherches quand on devra brancher ça sur la bdd on pourra faire avec v-for et des props-->
          <div class="circuit">
            <h4>Circuit 1</h4>
            <div class = "circuit-info">
              <img src="../assets/img-path.svg">
              <div class="circuit-info-content">
                <ul>
                  <li>Score : 90/100 </li>
                  <li>Nombre d’obstacles touchés : 2</li>
                  <li>Temps réalisé : 15 sec</li>
                  <li>Circuit réussi : oui </li>
                </ul>                
              </div>
            </div>
          </div>
          <div class="circuit">
            <h4>Circuit 2</h4>
            <div class = "circuit-info">
              <img src="../assets/img-path.svg">
              <div class="circuit-info-content">
                <ul>
                  <li>Score : 90/100 </li>
                  <li>Nombre d’obstacles touchés : 2</li>
                  <li>Temps réalisé : 15 sec</li>
                  <li>Circuit réussi : oui </li>
                </ul>                
              </div>
            </div>
          </div>  
        </div>
        <h3>Commentaire à propos du test : <strong>Motricité fine</strong></h3>
        <div class ="testMotricité-comment">
          <textarea placeholder="Ajouter un commentaire"></textarea>
          <vs-button color="#9082FF" type="filled" id="btnMotComment">
            Enregistrer le commentaire
          </vs-button>
        </div> 
      </div>
      <div class="globalComments">
        <div class="globalComments-header header">
          <h3>Commentaire global</h3>
        </div>
        <div class="globalComments-content">
          <textarea placeholder="Ajouter un commentaire"></textarea>
          <vs-button color="#9082FF" type="filled" id="btnSaveGlobalComment">
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
  overflow-y: hidden;
}
.patientResults-content{
  background-color : #F0F0F0;
  box-shadow: 0 4px 16px 0 rgba(0,0,0,.05);
  width: 98%;
  margin: 0 auto;
  margin-top: 1%;
  border-radius: 16px;
  height: 68vh;
  overflow-y: scroll;
  padding-bottom: 2%;
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
  padding: 1.5% 0;
}
.header h3, .header span {
  margin-left: 2%;
}
.resultsHeader{
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
.globalComments-content, .testMotricité-comment{
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  margin-left:2%;
  margin-top: 2%;
  padding-bottom: 2%;
}
.globalComments-content textarea ,.testMotricité-comment textarea {
  width: 76%;
  height: 20vh;
  border: none;
  background-color: #F0F0F0;
  border-radius: 16px;
  padding: 10px;
}
.globalComments-content #btnSaveGlobalComment, .testMotricité-comment #btnMotComment{
  margin-left: 2%;
  width: 20%;
  border-radius: 16px;
}
.testMotricité h3{
  margin-left: 2%;
}
.testMotricité-history{
  display: flex;
  flex-direction: row;
  width:96%;
  margin-left: 2%;
  padding-bottom: 2%;
}
.circuit{
  width: 50%;
}
.circuit h4{
  margin: 3% 0;
  font-weight: 500;
}
.circuit img {
  width: 30%;
}
.circuit-info{
  display: flex;
  flex-direction: row;
}
.circuit-info .circuit-info-content li{
  list-style-type: none;
  margin-left: 2%;
}
</style>