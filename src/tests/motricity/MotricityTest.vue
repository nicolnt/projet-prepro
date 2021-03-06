<template>
  <div id="motricityContainer">
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
    <div class="canvasContainer">
      <canvas id="backgroundTrack"></canvas>
      <canvas id="traceCanvas"></canvas>
    </div>
    <canvas ref="canvas" id="pickerTrack"></canvas>
    <TestBeginModal title="Motricité fine" :instructions="instructions" @train="train" @play='play' ref="TestBeginModal"/>
    <TestHelpModal title="Motricité fine : instructions" :instructions="instructions" ref="TestHelpModal"/>
  </div>
</template>

<script>
import Game from "./motricityGame"
import TestBeginModal from '@/components/TestBeginModal.vue'
import TestHelpModal from '@/components/TestHelpModal.vue'

import { db, functions } from '../../services/firebase'
require('firebase/auth')

export default {
  name: "MotricityTest",
  components: {
    TestBeginModal,
    TestHelpModal
  },
  data() {
    return {
      game: new Game(require("./paths/motricityPaths.json"), this.doAfterSuccess),
      instructions: [
        {
          img: 'tests_visuals/motricityTest_success.jpg',
          altImg: 'Un utilisateur trace le chemin',
          desc: "Tracez les chemins, sans sortir de leurs contours et en un seul trait.",
        },
        {
          img: 'tests_visuals/motricityTest_failure.jpg',
          altImg: 'Un utilisateur passe sur un obstacle',
          desc: "Évitez tous les obstacles sur votre tracé",
        }
      ]
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
      this.game.beginTraining();
    },
    play() {
      this.game.beginTest();
    },
    sendLastestTestToDB(level) {
      let game = this.game.gameData.testPaths[level]
      db.collection("tentatives").add({
        idPatient: this.$store.state.currentPatient.id,
        idTest: 'motricity',
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
    },
    sendTeststoDB() {
      for(let i=0; i<this.game.gameData.testPaths.length; i++) {
        functions.httpsCallable('sendMotricityTestToDB')({
          patientId: this.$store.state.currentPatient.id,
          testId: 'motricity',
          levelId: i+1,
          captureImg: this.game.gameData.testPaths[i].level.traceImage,
          score: this.game.gameData.testPaths[i].level.score
        })
          .then(() => {
            console.log("Test sent");
          })
          .catch((error) => {
            console.error("Test not sent: ", error);
          })
      }
    },
    doAfterSuccess() {
      if (this.game.state.doTraining === false) {
        // Level done (not trainings)
        //this.sendLastestTestToDB(this.game.state.currentLevel)
      }
      if (this.game.state.doTraining === false && this.game.currentLevelNumber() == this.game.totalLevelForCurrentType()) {
        //End test
        this.game.switchToEnd()
        this.sendTeststoDB()
        this.$emit("ToggleInfosModal");
      } else if (this.game.state.doTraining === true && this.game.currentLevelNumber() == this.game.totalLevelForCurrentType()) {
        //End training
        this.game.switchToEnd()
        this.ToggleBeginModal()
      } else {
        // Not the end : next level
        this.game.switchToNextLevel()
      }
    }
  }
};
</script>

<style scoped>
#motricityContainer {
  background: white;
  height: 100%;
  border-radius: 30px;
  width: 100%;
  overflow: hidden;
}
canvas {
  border: none;
  height: 100%;
  width: 100%;
}
.canvasContainer {
  position: relative;
  height: 100%;
}
canvas#backgroundTrack {
  z-index: 0;
}
canvas#traceCanvas {
  z-index: 1;
  position: absolute;
  left: 0;
  top: 0;
}
canvas#pickerTrack {
  visibility: hidden;
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
</style>
