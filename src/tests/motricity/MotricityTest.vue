<template>
  <div id="motricity-container">
    <div class="test-bar">
      <span class="test-counter">{{ game.currentLevelNumber() }}/{{ game.totalLevelForCurrentType() }}</span>
      <vs-button
        @click="$emit('ToggleInstructionsModal')"
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
  </div>
</template>

<script>
import Game from "./motricityGame";

export default {
  name: "MotricityTest",
  data() {
    return {
      game: new Game(require("./paths/motricityPaths.json"), this.doAfterSuccess),
    };
  },
  methods: {
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
        this.$emit("ToggleInstructionsModal");
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
