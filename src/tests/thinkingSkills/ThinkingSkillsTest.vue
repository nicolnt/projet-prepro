<template>
  <div id="capacity-container">
    <div class="test-bar">
      <span class="test-counter" v-if="game.currentLevelNumber() != 0">{{ game.currentLevelNumber() }}/{{ game.totalLevelForCurrentType() }}</span>
      <vs-button
        @click="ToggleHelpModal"
        radius
        type="flat"
        icon="help"
        color="#9082FF"
      ></vs-button>
    </div>
    <div id="thinking-skills-test-content">
      <div id="choices" class="hidden">
        <h3>est à : ce que est à :</h3>
        <div id="checkboxesContener">
          <img v-for="n in 5" src="" :key="n" :alt="'Réponse '+n" />
        </div>
        <vs-button color="#9082FF" id="submitAnswers" type="filled" icon="done" v-on:click="submit(form)">Valider</vs-button>
      </div>
    </div>
    <TestBeginModal title="Capacités de raisonnement" :instructions="instructions" @train="train" @play='play' ref="TestBeginModal"/>
    <TestHelpModal title="Capacités de raisonnement : instructions" :instructions="instructions" ref="TestHelpModal"/>
  </div>
</template>

<script>
import Game from "./thinkingSkillsGame"
import TestBeginModal from '@/components/TestBeginModal.vue'
import TestHelpModal from '@/components/TestHelpModal.vue'

import { db } from '../../services/firebase'
require('firebase/auth')

export default {
  name: "thinkingSkillsTest",
  components: {
    TestBeginModal,
    TestHelpModal
  },
  data() {
    return {
      game: new Game(require("./data/thinkingSkillsData.json"), this.doAfterSuccess),
      instructions: [
        {
          img: 'tests_visuals/attentionCapacityTest_eye.jpg',
          altImg: '',
          desc: "Observez l'illustration présentée",
        },
        {
          img: 'tests_visuals/attentionCapacityTest_choice.jpg',
          altImg: '',
          desc: "Répondez à la question logique",
        }
      ],
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
      this.game.onSubmit(form)
      this.form = []
    },
    // adapter à notre test
    sendResultsToDB() {
      db.collection("test2").add({
        idPatient: this.$store.state.currentPatient.id,
        mistakeNb: this.game.userErrors,
        score: Math.floor(((this.game.score/20)*100)/6),
        dateTime: Date.now(),
        succeed: (this.game.score >= 50) ? true : false
      })
        .then(function(docRef) {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        })
    }, 
    doAfterSuccess() {
      console.log('success')
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
#attention-capacity-test-content {
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
#attention-capacity-test-content img{
  width: 100%;
}
.hidden {
  display: none;
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
