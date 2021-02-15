<template>
  <div id="motricity-container">
    <div class="test-bar">
      <span class="test-counter">{{ game.currentLevelNumber() }}/{{ game.totalLevelForCurrentType() }}</span>
      <vs-button
        @click="ToggleHelpModal()"
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
    <TestBeginModal :instructions="instructions" @train="train()" @play='play()' ref="TestBeginModal"/>
    <TestHelpModal :instructions="instructions" ref="TestHelpModal"/>
  </div>
</template>

<script>
import Game from "./motricityGame"
import TestBeginModal from '@/components/TestBeginModal.vue'
import TestHelpModal from '@/components/TestHelpModal.vue'

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
    doAfterSuccess() {
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
#motricity-container {
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
</style>
