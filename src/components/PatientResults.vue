<!-- PAGE PATIENT'S TESTS RESULTS -->
<template>
  <div class="patientResults">
    <a @click="$router.go(-1)"><i class="material-icons">arrow_back</i></a>
    <div class="patientResultsHeader">
      <h1>Résultats de {{ patient.firstName }} {{ patient.lastName }}</h1>
      <div class="patientResultsHeaderSubtitle">
        <h3>Test effectué le {{ (patient.dateCreation) ? this.getDate(patient.dateCreation.toDate()) : '' }}</h3>
        <!-- <vs-button color="#9082FF" type="filled" v-on:click="download" id="btnDownload" icon="get_app"> 
          Télécharger les résultats
        </vs-button> -->
      </div>
    </div>
    <div class="patientResultsContent">
      <p id="toHide">Aucun test n'a été effectué par ce patient pour le moment.</p>
      <div class="motricityResults results hidden">
        <div class="header">
          <h3>Test Motricité fine<span> - réussi à {{motricity.average.toFixed(2)}} %</span><span> - {{ (motricity.average >= 50) ? '': 'non' }} validé</span></h3> 
        </div>
        <div class="content">
          <div class="motricityResultsHistory">
            <div v-for="(tentative, index) in motricity.tentatives" :key="index" class="circuit">
              <TestTrackViewModal ref="motricity" :capture="tentative.captureImg" :idTest="index"/>
              <h4>Circuit {{ index + 1 }}</h4>
              <div class="circuitInfo">
                <WaveScore @click="toggleModal(index)" :score="tentative.score" showScore="true">
                  <img class="track" :src="trackImage(index)">
                  <img class="capture" :src="tentative.captureImg">
                  <div class="fade-overlay">
                    <i class="material-icons" size="large" color="lightgray">zoom_in</i>
                  </div>
                </WaveScore>
                <div class="circuitInfoContent">
                  <ul>
                    <li>Score : {{ tentative.score.toFixed(2) }}/100 </li>
                    <li>Circuit réussi : {{ (tentative.score >= 50) ? 'oui': 'non' }} </li>
                  </ul>                
                </div>
              </div>
            </div>
          </div>
          <h4 class="comment-title">Commentaire à propos du test <strong>Motricité fine</strong> :</h4>
          <ResultComment type="motricity"/>
        </div>
      </div>

       <div class="attentionCapacityResults results hidden">
        <div class="header">
          <h3>Test Capacités attentionnelles<span> - réussi à {{attentionCapacity.score}} %</span><span> -  {{ (attentionCapacity.succeed) ? '': 'non' }} validé</span></h3> 
        </div>
        <div class="content">
          <div class="attentionCapacityResultsHistory">
            <h3>Score :</h3>
            <WaveScore :score="attentionCapacity.score" showScore="true">
            </WaveScore>
            <h3>Nombre de fautes : {{attentionCapacity.mistakeNb}} </h3>
          </div>
          <h4 class="comment-title">Commentaire à propos du test <strong>Capacités attentionnelles</strong> :</h4>
          <ResultComment type="attentionCapacity"/>
        </div>
      </div>

     <div class="thinkingSkillsResults results hidden">
        <div class="header">
          <h3>Test Capacités de raisonnement<span> - {{ (thinkingSkills.succeed) ? '': 'non' }} validé</span></h3> 
        </div>
        <div class="content">
          <div class="thinkingSkillsResultsHistory">
            <div v-for="(smallTest, index) in thinkingSkills.allResults" :key="smallTest.id" class="circuit" id="imageThinkingDiv">
              <ThinkingSkillsViewModal ref="thinking" :idTest="index"/>
              <img :src="getImageThinkingSkillsResult(index)" @click="toggleThinking(index)" id="thinkingImg"/>
              <h4>Situation {{ index + 1 }} : {{ (smallTest) ? '' : 'non' }} réussie</h4>
            </div>
            <h3><strong>Bilan : test {{ (thinkingSkills.succeed) ? '' : 'non' }} réussi</strong></h3>
          </div>
          <h4 class="comment-title">Commentaire à propos du test <strong>Capacités de raisonnement</strong> :</h4>
          <ResultComment type="thinkingSkillsResults"/>
        </div>

      </div>

      <div class="globalComment">
        <div class="header">
          <h3>Commentaire global</h3>
        </div>
        <div class="content">
          <ResultComment type="global" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from '../services/firebase'

import WaveScore from './WaveScore'
import ResultComment from './ResultComment'
import TestTrackViewModal from './TestTrackViewModal'
import ThinkingSkillsViewModal from './ThinkingSkillsViewModal'

export default {
  name: 'PatientResults',
  components: { TestTrackViewModal, WaveScore, ResultComment, ThinkingSkillsViewModal },
  data() {
    return {
      attentionCapacity: {
        score : 0,
        mistakeNb : 0,
        succeed : false,
        allResults : []
      },
      thinkingSkills: {
        allResults : [],
        succeed : false,
        result : []
      },
      motricity: {
        tentatives: [],
        average : 0
      },
      patient: {},
      popupActive: false
    }
  },
  methods: {
    toggleModal(id){
      //this.$refs[id][0].toggle()
      this.$refs.motricity[id].toggle()
    },
    toggleThinking(index){
      this.$refs.thinking[index].toggleThinkingSkills()
      //if(this.$refs[index][1] === undefined) {
        //this.$refs[index][0].toggleThinkingSkills()
      //} else {
        //this.$refs[index][1].toggleThinkingSkills()
      //}
      
    },
    download(){
      // TODO
    },
    trackImage(id) {
      const image = require(`../tests/motricity/paths/test${id+1}_background.svg`)
      return image
    },
    getImageThinkingSkillsResult(id) {
      const image = require(`../assets/result_assets/thinkingSkills_screen_${id+1}.png`)
      return image
    },
    getDate(dateISO){ 
      let creationDate = new Date(dateISO)
      let month = creationDate.getMonth()
      month < 10 ? month = '0'+(month+1) : month = (month+1)
      const date = creationDate.getDate() +'/' + month + '/'+ creationDate.getFullYear()
      return date
    }
  },
  mounted() {
    db.collection('patients').doc(this.$store.state.currentPatient.id).get()
      .then(docs => {
        this.patient = docs.data()
        this.patient.id = docs.id
        db.collection(`patients/${docs.id}/motricityTest`)
          .get()
          .then(motricityRef => {
            motricityRef.forEach(motricityDoc => {
              const data = motricityDoc.data()
              data.score *= 100
              this.motricity.tentatives.push(data)
              document.querySelector('.motricityResults').classList.remove('hidden')
              document.querySelector('#toHide').classList.add('hidden')
            })
            this.motricity.average = this.motricity.tentatives.reduce((acc, curr) => acc += curr.score, 0) / this.motricity.tentatives.length
          })

      if (this.patient.attentionTest) {
        document.querySelector('.attentionCapacityResults').classList.remove('hidden')
        document.querySelector('#toHide').classList.add('hidden')
        this.attentionCapacity.score = this.patient.attentionTest.score
        this.attentionCapacity.mistakeNb = this.patient.attentionTest.mistakeNb
        this.attentionCapacity.succeed = this.patient.attentionTest.succeed
      }
      if (this.patient.thinkingTest) {
              document.querySelector('.thinkingSkillsResults').classList.remove('hidden')
              document.querySelector('#toHide').classList.add('hidden')
                this.thinkingSkills.allResults = this.patient.thinkingTest.allResults
                this.thinkingSkills.succeed = this.patient.thinkingTest.allResults          
      }

        // Add test3 results to data
        db.collection('test3').where('idPatient', '==', this.$store.state.currentPatient.id)
          .get()
          .then((docs) => {
            docs.forEach((doc) => {
              const data = doc.data() 
              this.thinkingSkills.result.push(data)
              document.querySelector('.thinkingSkillsResults').classList.remove('hidden')
              document.querySelector('#toHide').classList.add('hidden')
            })
            let recent = 0
            this.thinkingSkills.result.forEach( item => {
              if(item.dateTime > recent){
                recent = item.dateTime
              }
            })
            this.thinkingSkills.result.forEach( item => {
              if(item.dateTime === recent){
                this.thinkingSkills.allResults = item.allResults
                this.thinkingSkills.succeed = item.succeed
              }
            })
          })

      })
    // Add motricity test results to data
    //const motricity = []
    //db.collection('tentatives').where('idPatient', '==', this.$store.state.currentPatient.id)
    //.get()
    //.then((docs) => {
    //docs.forEach((doc) => {
    //const data = doc.data() 
    //data.score = (data.score * 100).toFixed(2)
    //switch(data.idTest) {
    //case 'motricity':
    //motricity.push(data)
    //break
    //}
    //document.querySelector('.motricityResults').classList.remove('hidden')
    //document.querySelector('#toHide').classList.add('hidden')
    //})
    //// Sort tests by idParcours
    //this.motricity.tentatives = motricity.sort((a, b) => {
    //return parseInt(a.idParcours) - parseInt(b.idParcours)
    //})
    //// Get the more recent result for each parcours
    //let temporary = []
    //for( let i = 0 ; i< 5; i++){
    //let recent = 0
    //this.motricity.tentatives.forEach( item => {
    //if (item.idParcours === i){
    //if(item.dateTime > recent){
    //recent = item.dateTime
    //}
    //}
    //})
    //this.motricity.tentatives.forEach(item =>{ 
    //if (item.idParcours === i){
    //if(item.dateTime === recent){
    //temporary.push(item)
    //}
    //}

    //})
    //}
    //this.motricity.tentatives = temporary
    //let average = 0
    //this.motricity.tentatives.forEach ( item => {
    //average += parseInt(item.score)
    //})
    //this.motricity.average = average / this.motricity.tentatives.length
    //})
    db.collection('comments').where('idPatient', '==', this.$store.state.currentPatient.id).get()
      .then(docs => {
        docs.forEach(doc => {
          const data = doc.data()
          if (data.idTest === 'motricity' && data.comment)
            this.motricity.comment = data.comment
          else
            this.motricity.commenting = true
        })
      })

    // Add attention capacity test results to data
    //if there are more than one result it displays the more recent
  }
}
</script>

<style scoped>
.patientResults {
  text-align: left;
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 5rem;
}
.patientResults a {
  cursor: pointer;
} 
.patientResultsContent {
  background-color : #F0F0F0;
  box-shadow: 0 4px 16px 0 rgba(0,0,0,.05);
  width: 98%;
  margin: 0 auto;
  margin-top: 1%;
  border-radius: 16px;
}

.results, .globalComment {
  background-color: white;
  box-shadow: 0 4px 16px 0 rgba(0,0,0,.05);
  border-radius: 16px;
  width: 95%;
  margin: 0 auto;
  text-align: left;
  margin-top:2%;
  margin-bottom: 50px;
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
.content {
  padding: 2%;
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
.motricityResultsHistory, .attentionCapacityResultsHistory, .test3ResultsHistory{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width:96%;
  padding-bottom: 2%;
}
.attentionCapacityResultsHistory, .test3ResultsHistory{
  flex-direction: column;
}
.attentionCapacityResultsHistory > * {
  margin: 1% 0;
}
.thinkingSkillsResultsHistory h3 {
  margin: 2% 0;
  text-align: center;
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
.hidden {
  display : none;
}
#imageThinkingDiv{
  display: flex;
  flex-direction: row;
  align-content: center;
  width: auto;
  margin: 10px;
}
#toHide{
  margin: 10px;
}
#thinkingImg{
  width: 250px;
}
</style>
