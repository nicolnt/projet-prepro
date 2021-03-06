<template>
  <div id="AttentionCapacityContainer">
    <div class="testBar">
      <span class="testCounter" v-if="game.currentLevelNumber() != 0">{{ game.currentLevelNumber() }}/{{ game.totalLevelForCurrentType() }}</span>
      <vs-button
        @click="ToggleHelpModal"
        radius
        type="flat"
        icon="help"
        color="#9082FF"
      ></vs-button>
    </div>
    <div id="AttentionCapacityContent" class="hidden">
      <img src="" alt="" class="blurred">
      <vs-button radius icon="play_arrow" color="#9082FF" id="showImg" size="large" type="filled"></vs-button>
      <div id="choices" class="hidden">
        <h3>Qu'avez vous vu sur l'image ?</h3>
        <div id="checkboxesContener">
          <vs-checkbox size="large" v-model="checkedNames" class="choice" v-for="answer in answers" :key="answer" :vs-value="answer">{{answer}}</vs-checkbox>
        </div>
        <vs-button color="#9082FF" id="submitAnswers" type="filled" icon="done" v-on:click="submit(checkedNames)">Valider</vs-button>
      </div>
    </div>
    <TestBeginModal title="Capacités attentionnelles" :instructions="instructions" @train="train" @play='play' ref="TestBeginModal"/>
    <TestHelpModal title="Capacités attentionnelles : instructions" :instructions="instructions" ref="TestHelpModal"/>
  </div>
</template>

<script>
import Game from "./attentionCapacityGame"
import TestBeginModal from '@/components/TestBeginModal.vue'
import TestHelpModal from '@/components/TestHelpModal.vue'

import { functions } from '../../services/firebase'
require('firebase/auth')

export default {
  name: "attentionCapacityTest",
  components: {
    TestBeginModal,
    TestHelpModal
  },
  data() {
    return {
      game: new Game(require("./data/attentionCapacityData.json"), this.doAfterSuccess),
      instructions: [
        {
          img: 'tests_visuals/attentionCapacityTest_eye.jpg',
          altImg: 'Un oeil symbolise l\'utilisateur qui observe l\'écran.',
          desc: "Observez attentivement la scène qui s’affiche sur l’écran.",
        },
        {
          img: 'tests_visuals/attentionCapacityTest_choice.jpg',
          altImg: 'L\'utilisateur choisit les bonnes propositions.',
          desc: "Choisissez parmi les propositions celles que vous pensez avoir vues sur l’image.",
        }
      ],
      answers : ["Automobile(s)","Piéton(s)","2 roues","Panneaux de signalisation","Feux","Vélo(s)"],
      checkedNames: []
    }
  },
  methods: {
    ToggleBeginModal() {
      this.$refs.TestBeginModal.toggle()
    },
    ToggleHelpModal() {
      this.$refs.TestHelpModal.toggle()
    },
    train() {
      this.game.beginTraining()
    },
    play() {
      this.game.beginTest()
    },
    submit(form) {
      this.game.onSubmit(form)
      this.form = []
    },
    sendResultsToDB() {
        functions.httpsCallable('sendAttentionTestToDB')({
          patientId: this.$store.state.currentPatient.id,
          userErrors: this.game.userErrors,
          score: Math.floor(((this.game.score/20)*100)/6),
        })
          .then(() => {
            console.log("Test sent");
          })
          .catch((error) => {
            console.error("Test not sent: ", error);
          })
      //db.collection("test2").add({
        //idPatient: this.$store.state.currentPatient.id,
        //mistakeNb: this.game.userErrors,
        //score: Math.floor(((this.game.score/20)*100)/6),
        //dateTime: Date.now(),
        //succeed: (Math.floor(((this.game.score/20)*100)/6) >= 50) ? true : false
      //})
        //.then(function(docRef) {
          //console.log("Document written with ID: ", docRef.id);
        //})
        //.catch(function(error) {
          //console.error("Error adding document: ", error);
        //})
    }, 
    doAfterSuccess() {
      if (this.game.state.doTraining === false && this.game.currentLevelNumber() == this.game.totalLevelForCurrentType()) {
        //End test
        this.game.switchToEnd()
        this.sendResultsToDB()
        this.$emit("ToggleInfosModal")
      } else if (this.game.state.doTraining === true && this.game.currentLevelNumber() == this.game.totalLevelForCurrentType()) {
        //End training
        this.game.switchToEnd()
        this.ToggleBeginModal()
      } else {
        // Not the end : next level
        this.game.switchToNextLevel();
      }
    } 
  }
};
</script>

<style scoped>
.hidden {
  display: none;
}
#capacityContainer {
  background: white;
  height: 100%;
  border-radius: 30px;
  width: 100%;
  overflow: hidden;
}
.testBar {
  display: flex;
  position: absolute;
  top: 10px;
  right: 10px;
}
.testBar > .testCounter {
  padding: 10px;
  line-height: 18px;
}
#AttentionCapacityContent {
  position: absolute;
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 55px 0;
  overflow: hidden;
}
#AttentionCapacityContent>img{
  width: 100%;
}
#showImg{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
}
#choices {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  background-color: white;
  border-radius : 10px;
  padding: 20px;
  width: 85%;
  max-width: 400px;
}
.blurred{
  filter: blur(0.8rem);
}
#submitAnswers{
  left: 50%;
  transform: translateX(-50%);
  border-radius: 15px;
  padding: 10px 20px;
}
#checkboxesContener{
  margin: 20px 0;
}
#checkboxesContener >>> .con-vs-checkbox{
  justify-content: left;
  margin-bottom: 8px;
}
#checkboxesContener >>> .con-slot-label{
  text-align: left;
}
#checkboxesContener >>> .con-vs-checkbox.vs-checkbox-large .vs-checkbox{
  min-width: 24px;
}
h3{
  font-weight: 600;
}
</style>
