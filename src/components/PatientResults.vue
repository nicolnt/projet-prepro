<!-- PAGE PATIENT'S TESTS RESULTS -->
<template>
  <div class="patientResults">
    <a @click="$router.go(-1)"><i class="material-icons">arrow_back</i></a>
    <div class="patientResultsHeader">
      <h1>Résultats de {{ patient.firstName }} {{ patient.lastName }}- évaluation [VALIDATION]</h1>
      <div class="patientResultsHeaderSubtitle">
        <h3>Test effectué le {{ (patient.dateCreation) ? this.getDate(patient.dateCreation.toDate()) : '' }}</h3>
        <vs-button color="#9082FF" type="filled" v-on:click="download" id="btnDownload" icon="get_app">
          Télécharger les résultats
        </vs-button>
      </div>
    </div>
    <div class="patientResultsContent">
      <div class="motricityResults results">
        <div class="header">
          <h3>Test Motricité fine<span> - réussi à 55%</span><span> - non validé</span></h3> 
        </div>
        <div class="motricityResultsHistory">
          <!-- J'ai fait quelques petites recherches quand on devra brancher ça sur la bdd on pourra faire avec v-for et des props-->
          <div v-for="tentative in motricity" :key="tentative.id" class="circuit">
            <TestTrackViewModal :ref="tentative.idParcours" :capture="tentative.testCapture" :idTest="tentative.idParcours"/>
            <h4>Circuit {{ tentative.idParcours + 1 }}</h4>
            <div class="circuitInfo">
              <WaveScore @click="toggleModal(tentative.idParcours)" :score="tentative.score" showScore="true">
                <img class="track" :src="trackImage(tentative.idParcours)">
                <img class="capture" :src="tentative.testCapture">
                <div class="fade-overlay">
                  <i class="material-icons" size="large" color="lightgray">zoom_in</i>
                </div>
              </WaveScore>
              <div class="circuitInfoContent">
                <ul>
                  <li>Score : {{ tentative.score }}/100 </li>
                  <!-- <li>Nombre d’obstacles touchés : 2</li> -->
                  <!-- <li>Temps réalisé : 15 sec</li> -->
                  <li>Circuit réussi : {{ (tentative.score >= 50) ? 'oui': 'non' }} </li>
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

      <div class="attentionCapacityResults results">
        <div class="header">
          <h3>Test Capacités attentionnelles<span> - réussi à 55%</span><span> - non validé</span></h3> 
        </div>
        <div class="attentionCapacityResultsHistory">
          <h3>Score</h3>
          <WaveScore :score="attentionCapacity.score" showScore="true">
          </WaveScore>
          <h3>Nombre de fautes : {{ attentionCapacity.mistakeNb >= 50 }} </h3>
        </div>
        <h3>Commentaire à propos du test : <strong>Capacités attentionnelles</strong></h3>
        <div class ="attentionCapacityResultsComment">
          <textarea placeholder="Ajouter un commentaire"></textarea>
          <vs-button color="#9082FF" type="filled" id="btnAttentionCapacityComment">
            Enregistrer le commentaire
          </vs-button>
        </div> 
      </div>

      <div class="test3Results results">
        <div class="header">
          <h3>Test Comportement en situation complexe<span> - réussi à 55%</span><span> - non validé</span></h3> 
        </div>
        <div class="test3ResultsHistory">
          <!--<div v-for="tentative in motricity" :key="tentative.id" class="circuit">
            <img src="../../source en fonction du numéro de la situation" />
            <h4>Situation {{ numero }} : {{ réussite }} </h4>
          </div>
          <h3><strong>Bilan : test {{ réussite globale }} </strong></h3>-->
        </div>
        <h3>Commentaire à propos du test : <strong>Comportement en situation complexe</strong></h3>
        <div class ="test3ResultsComment">
          <textarea placeholder="Ajouter un commentaire"></textarea>
          <vs-button color="#9082FF" type="filled" id="btnTest3Comment">
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
import { db } from '../services/firebase'
require('firebase/auth')

import WaveScore from './WaveScore'
import TestTrackViewModal from './TestTrackViewModal'

export default {
  name: 'PatientResults',
  components: { TestTrackViewModal, WaveScore },
  data() {
    return {
      motricity: [],
      attentionCapacity: [],
      test3: [],
      patient: {}
    }
  },
  methods: {
    toggleModal(id){
      this.$refs[id][0].toggle()
    },
    download(){
      // TODO
    },
    trackImage(id) {
      const image = require(`../tests/motricity/paths/test${id+1}_background.svg`)
      return image
    },
    getDate(dateISO){ 
      let creationDate = new Date(dateISO)
      let month = creationDate.getMonth()
      month < 10 ? month = '0'+(month+1) : month = (month+1)
      const date = creationDate.getDate() +'/' + month + '/'+ creationDate.getFullYear()
      return date
    },
  },
  mounted() {
    db.collection('patients').doc(this.$store.state.currentPatient.id).get()
      .then(docs => {
        this.patient = docs.data()
      })
    // Add motricity test results to data
    const motricity = []
    db.collection('tentatives').where('idPatient', '==', this.$store.state.currentPatient.id)
      .get()
      .then((docs) => {
        docs.forEach((doc) => {
          const data = doc.data() 
          data.score = (data.score * 100).toFixed(2)
          switch(data.idTest) {
            case 'motricity':
              motricity.push(data)
              break
          }
        })
        // Sort tests by idParcours
        this.motricity = motricity.sort((a, b) => {
          return parseInt(a.idParcours) - parseInt(b.idParcours)
        })
      })
      
    // Add attention capacity test results to data
    const attentionCapacity = []
    db.collection('test2').where('idPatient', '==', this.$store.state.currentPatient.id)
      .get()
      .then((docs) => {
        console.log('hey test 2')
        docs.forEach((doc) => {
          console.log('hola test 2')
          const data = doc.data() 
          //data.score = (data.score * 100).toFixed(2)
          console.log(data)
          attentionCapacity.push(data)
        })
      })

    // Add test3 results to data
    const test3 = []
    db.collection('test3').where('idPatient', '==', this.$store.state.currentPatient.id)
      .get()
      .then((docs) => {
        console.log('hey test 3')
        docs.forEach((doc) => {
          console.log('hola test 3')
          const data = doc.data() 
          //data.score = (data.score * 100).toFixed(2)
          console.log(data)
          test3.push(data)
        })
      })
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
  padding-bottom: 10vh;
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
.globalCommentContent, .motricityResultsComment, .attentionCapacityResultsComment, .test3ResultsComment{
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  margin-left:2%;
  margin-top: 2%;
  padding-bottom: 2%;
}
.globalCommentContent textarea ,.motricityResultsComment textarea, .attentionCapacityResultsComment textarea, .test3ResultsComment textarea {
  width: 76%;
  height: 20vh;
  border: none;
  background-color: #F0F0F0;
  border-radius: 16px;
  padding: 10px;
}
.globalCommentContent #btnSaveGlobalComment, #btnMotricityComment, #btnAttentionCapacityComment, #btnTest3Comment{
  margin-left: 2%;
  width: 20%;
  border-radius: 16px;
}
.motricityResults h3, .attentionCapacityResults h3, .test3Results h3 {
  margin-left: 2%;
}
.motricityResultsHistory, .attentionCapacityResultsHistory{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width:96%;
  margin-left: 2%;
  padding-bottom: 2%;
}
.attentionCapacityResultsHistory{
  flex-direction: column;
}
.attentionCapacityResultsHistory > * {
  margin: 1% 0;
}
.circuit{
  width: 30%;
  min-width: 420px;
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
.circuitInfo .circuitInfoContent {
  margin-left: 10px;
  flex-grow: 1;
}
.wave-container {
  position: relative;
  width: 250px;
  overflow: hidden;
  border-radius: 10px;
  height: 180px;
  box-shadow: 0px 1px 5px 0px rgba(0,0,0,0.3);
  cursor: pointer;
}
.wave-container img {
  position: absolute;
  width: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.wave-container:hover .fade-overlay {
  display: block;
}

.wave-container .fade-overlay {
  display: none;
  position: absolute;
  width: 100%;
  height: 100%;
  background: #ffffff80;
}
.wave-container .fade-overlay .material-icons {
  position: absolute;
  width: 100%;
  top: 50%;
  transform: translateY(-50%);
  text-align: center;
  font-size: 6rem;
  color: white;
  text-shadow: 0px 1px 5px rgba(0,0,0,0.5);
}
</style>
