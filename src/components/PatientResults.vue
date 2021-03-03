<template>
  <div class="patientResults">
    <a @click="$router.go(-1)"><i class="material-icons">arrow_back</i></a>
    <div class="patientResultsHeader">
      <h1>Résultats de [NOM DU PATIENT] - évaluation [VALIDATION]</h1>
      <div class="patientResultsHeaderSubtitle">
        <h3>Test effectué le [DATE CONSULTATION]</h3>
        <vs-button color="#9082FF" type="filled" v-on:click="download" id="btnDownload" icon="get_app">
          Télécharger les résultats
        </vs-button>
      </div>
    </div>
    <div class="patientResultsContent">
      <div class="motricityResults results">
        <div class="header">
          <h3>Test motricité fine<span> - réussi à 55%</span><span> - non validé</span></h3> 
        </div>
        <div class="motricityResultsHistory">
          <!-- J'ai fait quelques petites recherches quand on devra brancher ça sur la bdd on pourra faire avec v-for et des props-->
          <div class="circuit">
            <h4>Circuit 1</h4>
            <div class = "circuitInfo">
              <img src="../assets/img-path.svg">
              <div class="circuitInfoContent">
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
            <div class = "circuitInfo">
              <img src="../assets/img-path.svg">
              <div class="circuitInfoContent">
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
        <div class ="motricityResultsComment">
          <textarea placeholder="Ajouter un commentaire"></textarea>
          <vs-button color="#9082FF" type="filled" id="btnMotricityComment">
            Enregistrer le commentaire
          </vs-button>
        </div> 
      </div>
      <div class="globalComment">
        <div class="header">
          <h3>Commentaire global</h3>
        </div>
        <div class="globalCommentContent">
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
//import Hero from '@/components/Hero.vue'

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
  
  text-align: left;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
}
.patientResults a {
  cursor: pointer;
} 
.patientResultsContent{
  background-color : #F0F0F0;
  box-shadow: 0 4px 16px 0 rgba(0,0,0,.05);
  width: 98%;
  margin: 0 auto;
  margin-top: 1%;
  border-radius: 16px;
  padding-bottom: 2%;
}
.results, .globalComment{
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
  border-radius: 16px 16px 0 0;
  color: white;
  padding: 1.5% 0;
}
.header h3, .header span {
  margin-left: 2%;
}
.patientResultsHeader{
  margin-top: 2%;
  text-align: left;
}
.patientResultsHeader h1{
  margin-left:3%;
}
.patientResultsHeaderSubtitle{
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
.globalCommentContent, .motricityResultsComment{
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  margin-left:2%;
  margin-top: 2%;
  padding-bottom: 2%;
}
.globalCommentContent textarea ,.motricityResultsComment textarea {
  width: 76%;
  height: 20vh;
  border: none;
  background-color: #F0F0F0;
  border-radius: 16px;
  padding: 10px;
}
.globalCommentContent #btnSaveGlobalComment, .motricityResultsComment #btnMotricityComment{
  margin-left: 2%;
  width: 20%;
  border-radius: 16px;
}
.motricityResults h3{
  margin-left: 2%;
}
.motricityResultsHistory{
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
.circuitInfo{
  display: flex;
  flex-direction: row;
}
.circuitInfo .circuitInfoContent li{
  list-style-type: none;
  margin-left: 3%;
}
</style>