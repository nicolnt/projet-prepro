<template>
  <div id="motricity-container">
    <div class="test-bar">
      <span class="test-counter">{{ currentLevelNumber }}/{{ totalLevelForCurrentType }}</span>
      <vs-button @click="$emit('toggleHelp')" radius type="flat" icon="help" color="#9082FF"></vs-button>
    </div>
    <div class="canvasContainer">
      <canvas id="backgroundTrack"></canvas>
      <canvas id="traceCanvas"></canvas>
    </div>
	<canvas ref="canvas" id="pickerTrack"></canvas>
  </div>
</template>

<script>
import Game from '../../tests/motricity'

export default {
  name: 'MotricityTest',
  data() {
    return {
      game: new Game(require('../../tests/motricity.json'), this.myFunc),
    }
  },
  computed: {
    currentLevelNumber() {
        return this.game.state.currentLevel + 1
    },
    totalLevelForCurrentType() {
      if (this.game.state.trainingComplete === true)
        return this.game.gameData.tests.length
      else 
        return this.game.gameData.training.length
    }
  },
  methods: {
    myFunc() {
      console.log(this.game)
      this.game.switchToNextLevel()
    }
  },
  created: function() {
    this.$nextTick(function() {
      this.game.switchToNextLevel()
      //this.level.setupLevel(require('../../tests/path.svg'), this.myFunc,  this.$refs['canvas'].clientWidth, this.$refs['canvas'].clientHeight)
    })
  }
}
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
    border: 1px solid #999;
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
