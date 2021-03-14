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
          <h3>Test motricité fine<span> - réussi à 55%</span><span> - non validé</span></h3> 
        </div>
        <div class="motricityResultsHistory">
          <!-- J'ai fait quelques petites recherches quand on devra brancher ça sur la bdd on pourra faire avec v-for et des props-->
          <div v-for="tentative in motricity" :key="tentative.id" class="circuit">
            <TestTrackViewModal :ref="tentative.idParcours" :capture="tentative.testCapture" :idTest="tentative.idParcours"/>
            <h4>Circuit {{ tentative.idParcours + 1 }}</h4>
            <div class = "circuitInfo">
              <div @click="toggleModal(tentative.idParcours)" class="track-container">
                <i class="material-icons" size="large" color="lightgray">zoom_in</i>
                <svg class="wave" :style="{ bottom: - (90 - (tentative.score/100 * 90))+'px'}" width="264" height="173" viewBox="0 0 264 173" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g opacity="0.82">
                  <path d="M0 73.0446V28.727C52.8 5.09099 105.6 5.09099 158.4 28.727V73.0446H0Z" :fill="secondaryColor(tentative.score)"/>
                  <path d="M0 175V19.8634C52.8 29.7118 101.2 29.7118 145.2 19.8634C189.2 10.0151 228.8 9.03027 264 16.9089V175H0Z" :fill="primaryColor(tentative.score)"/>
                  </g>
                </svg>
                <img class="track" :src="trackImage(tentative.idParcours)">
                <img class="capture" :src="tentative.testCapture">
                <div class="score-number">
                  <span class="percent-score-int">{{ Math.trunc(tentative.score) }}</span>
                  <span class="percent-score-float">{{ ((tentative.score % 1).toFixed(2).toString()).slice(1) }}</span>
                  <span class="percent-sign">%</span>
                </div>
              </div>
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

          <!--<div class="circuit">-->
            <!--<h4>Circuit 1</h4>-->
            <!--<div class = "circuitInfo">-->
              <!--<img src="../assets/img-path.svg">-->
              <!--<div class="circuitInfoContent">-->
                <!--<ul>-->
                  <!--<li>Score : 90/100 </li>-->
                  <!--<li>Nombre d’obstacles touchés : 2</li>-->
                  <!--<li>Temps réalisé : 15 sec</li>-->
                  <!--<li>Circuit réussi : oui </li>-->
                <!--</ul>                -->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->
          <!--<div class="circuit">-->
            <!--<h4>Circuit 2</h4>-->
            <!--<div class = "circuitInfo">-->
              <!--<img src="../assets/img-path.svg">-->
              <!--<div class="circuitInfoContent">-->
                <!--<ul>-->
                  <!--<li>Score : 90/100 </li>-->
                  <!--<li>Nombre d’obstacles touchés : 2</li>-->
                  <!--<li>Temps réalisé : 15 sec</li>-->
                  <!--<li>Circuit réussi : oui </li>-->
                <!--</ul>                -->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->
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
import { db } from '../services/firebase'

import TestTrackViewModal from './TestTrackViewModal'

export default {
  name: 'PatientResults',
  components: { TestTrackViewModal },
  data() {
    return {
      motricity: [],
      patient: {}
    }
  },
  methods: {
    toggleModal(id){
      this.$refs[id][0].toggle()
    },
    download(){
      console.log("coucou")
    },
    trackImage(id) {
      //console.log(`../tests/motricity/paths/test${parseInt(id.idParcours)+1}_background.svg`)
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
    secondaryColor(score) {
      if (score >= 90)
        return '#75BE89'
      else if (score >= 60)
        return '#9EB056'
      else if (score >= 40)
        return '#E0832D'
      else if (score >= 15)
        return '#E0832D'
      else
        return '#A33425'
    },
    primaryColor(score) {
      if (score >= 90)
        return '#74DB63'
      else if (score >= 60)
        return '#B0CC41'
      else if (score >= 40)
        return '#D4BB5F'
      else if (score >= 15)
        return '#F0B747'
      else
        return '#E44B4B'
    }
  },
  mounted() {
    const motricity = []
    db.collection('patients').doc(this.$store.state.currentPatient.id).get()
      .then(docs => {
        this.patient = docs.data()
      })
    db.collection('tentatives').where('idPatient', '==', this.$store.state.currentPatient.id)
      .get()
      .then(docs => {
        docs.forEach(doc => {
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
  flex-wrap: wrap;
  width:96%;
  margin-left: 2%;
  padding-bottom: 2%;
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
.track-container {
  position: relative;
  width: 250px;
  overflow: hidden;
  border-radius: 10px;
  height: 180px;
  box-shadow: 0px 1px 5px 0px rgba(0,0,0,0.3);
}
.track-container img {
  position: absolute;
  width: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.track-container .wave {
  position: absolute;
  width: 100%;
  left: 50%;
  bottom: -20px;
  transform: translateX(-50%);
}

.track-container .score-number {
  position: absolute;
  bottom: 0;
  right: 10px;
  font-weight: bold;
  font-size: 2rem;
  color: white;
}
.track-container .score-number span.percent-score-int {
  font-size: 3.5rem;
}
.track-container .score-number span.percent-score-float {
  font-size: 1.5rem;
}
.track-container .score-number span {
  text-shadow: 0px 1px 5px rgba(0,0,0,0.3);
}
</style>
