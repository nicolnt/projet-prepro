<template>
  <div id="thinkingSkillsContainer">
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
    <div id="thinkingSkillsContent">
      <div id="question" class="hidden">
        <h3>Quelle image correspond le mieux ?</h3>
        <div id="questionStatement">
          <div>
            <img id="statementEx1" src="" alt="Exemple 1" />
            <p>est à :</p>
            <img id="statementEx2" src="" alt="Exemple 2" />
          </div>
          <div>
            <p>ce que</p>
            <img id="statementQuestion" src="" alt="Question" />
            <p>est à :</p>
          </div>
        </div>
        <div id="questionAnswers">
            <label :for="'answer'+n" v-for="n in 5" :key="n">
              <input type="radio" :id="'answer'+n" :value="'answer'+n" v-model="picked">
              <img src="" :alt="'Réponse '+n" />
            </label>
        </div>
        <vs-button color="#9082FF" id="submitAnswers" type="filled" icon="done" v-on:click="submit(picked)">Valider</vs-button>
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
          desc: "Observez les illustrations présentées",
        },
        {
          img: 'tests_visuals/attentionCapacityTest_choice.jpg',
          altImg: '',
          desc: "Répondez à la question logique",
        }
      ],
      picked: 'answer1'
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
    },
    sendResultsToDB() {
      db.collection("test3").add({
        idPatient: this.$store.state.currentPatient.id,
        allResults: this.game.state.allResults,
        dateTime: Date.now(),
        succeed: (this.game.score >= 3) ? true : false
      })
        .then(function(docRef) {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        })
    }, 
    doAfterSuccess() {
      this.picked = 'answer1'
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
  transition: opacity .5s ease;
  opacity: 0;
  pointer-events: none;
}
#thinkingSkillsContainer {
  background: #FFFFFF;
  border-radius: 30px;
  overflow: hidden;
  width: 100%;
  height: 100%;
}
.testBar {
  display: flex;
  position: absolute;
  top: 10px;
  right: 10px;
}
.testBar > .testCounter {
  line-height: 18px;
  padding: 10px;
}
#thinkingSkillsContent {
  display: flex;
  align-items: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
  width: 100%;
  height: auto;
}
#question {
  position: absolute;
  top: 50%;
  left: 50%;
  background-color: white;
  border-radius : 10px;
  padding: 20px;
  transform: translateY(-50%) translateX(-50%);
  width: 85%;
  max-width: 750px;
}
#questionStatement, 
#questionAnswers {
  margin: 15px 0;
}
#questionStatement {
  background-color: #EDEDED;
  border-radius: 10px;
  padding: 10px;
}
#questionStatement > div {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px 0;
}
#questionStatement img {
  margin: 0 15px;
  width: 100%;
  padding: 10px;
  max-width: 100px;
  min-width: 50px;
}
#questionAnswers {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}
#questionAnswers > label {
  flex-basis: 20%;
  padding-right: 8px;
}
#questionAnswers > label:last-child {
  padding-right: 0;
}
#questionAnswers img {
  border: 2px solid transparent;
  cursor: pointer;
  padding: 10px;
  width: 100%;
  max-width: 150px;
  min-width: 70px;
}
#questionAnswers [type=radio] { 
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}
#questionAnswers [type=radio]:checked + img {
  border-color: #9082FF;
  border-radius: 15px;
}
#submitAnswers{
  border-radius: 15px;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px 20px;
}
h3{
  font-weight: 600;
}
</style>
