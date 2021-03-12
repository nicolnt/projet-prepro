<template>
  <div id="capacity-container">
    <div class="test-bar">
      <span class="test-counter">{{ game.currentLevelNumber() }}/{{ game.totalLevelForCurrentType() }}</span>
      <vs-button
        @click="ToggleHelpModal"
        radius
        type="flat"
        icon="help"
        color="#9082FF"
      ></vs-button>
    </div>
    <div id="attention-capacity-test-content" class="hidden">
      <img src="" alt="">
      <vs-button radius icon="play_arrow" color="#9082FF" id="showImg" size="large" type="filled"></vs-button>
      <div id="choices" class="hidden">
        <h3>Qu'avez vous vu sur l'image ?</h3>
        <div v-for="answer in answers" :key="answer">
          <vs-checkbox size="large" v-model="form" class="choice" :vs-value="answer">{{answer}}</vs-checkbox>
        </div>
        <vs-button color="#9082FF" id="submit" type="filled" icon="done" v-on:click="submit(form)"> Valider</vs-button>
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

//import { db } from '../../services/firebase'
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
      form: []
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
      //console.log(this.game.level)
      this.game.onSubmit(form)
    },
    // adapter à notre test
    /* sendLastestTestToDB(level) {
      let game = this.game.gameData.testPaths[level]
      db.collection("tentatives").add({
        idPatient: this.$store.state.currentPatient.id,
        idTest: 'attentionCapacity',
        idParcours: level,
        patientTime: 100,
        testCapture: game.level.traceImage,
        dateTime: Date.now(),
        succeed: (game.level.score >= 0.5) ? true : false,
        score: game.level.score
      })
        .then(function(docRef) {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        })
    }, */
    doAfterSuccess() {
      console.log('success')
      if (this.game.state.doTraining === false) {
        // Level done (not trainings)
        //this.sendLastestTestToDB(this.game.state.currentLevel)
        console.log('enregistrer les données')
      }
      if (this.game.state.doTraining === false && this.game.currentLevelNumber() == this.game.totalLevelForCurrentType()) {
        //End test
        this.game.state.currentLevel = -1
        this.$emit("ToggleInfosModal");
      } else if (this.game.state.doTraining === true && this.game.currentLevelNumber() == this.game.totalLevelForCurrentType()) {
        //End training
        this.game.state.doTraining = false
        this.game.state.currentLevel = -1
        this.ToggleBeginModal()
      }
      this.game.switchToNextLevel();
    } 
  }
};
</script>

<style scoped>
#capacity-container {
  background: white;
  height: 100%;
  border-radius: 30px;
  width: 100%;
  overflow: hidden;
}
.test-bar {
  display: flex;
  position: absolute;
  top: 10px;
  right: 10px;
}
.test-bar > .test-counter {
  padding: 10px;
  line-height: 18px;
}
#attention-capacity-test-content img{
  width: 80%;
  margin: 0 auto;
  margin-top: 50vh;
  transform: translateY(-50%);
}
.hidden {
  display: none;
}
#showImg{
  position: absolute;
  top: 50%;
  left: 50%;
}
#choices {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  background-color: white;
  padding: 5%;
}
#choices > .choice {
  padding: 10px;
}
</style>
