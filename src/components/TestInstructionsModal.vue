<template lang="html">
    <vs-popup :active.sync="popupActivo" title="Instructions" id="instruction" button-close-hidden=true>
        <div id="instruction-content">
            <div>
                <img src="../assets/tests_visuals/motricityTest_success.png">
                <p>Tracez les formes, sans sortir de leurs contours et en un seul trait.</p>
            </div>
            <div>
                <img src="../assets/tests_visuals/motricityTest_success.png">
                <p>Évitez tous les obstacles sur votre tracé.</p>
            </div>
        </div>
        <div class="buttons">       
            <vs-button id="btnTrainTest" color="#9082FF">S'entraîner</vs-button>
            <vs-button id="btnStartTest" color="#9082FF" icon="play_arrow">Commencer</vs-button>
        </div>
    </vs-popup>
</template>

<script>
export default {
  name: 'TestInstructionsModal',
  data() {
    return { 
        popupActivo: false
    }
  },
  methods: {
    toggle() {
      this.popupActivo = !this.open;
    }
  }
}
</script>

<style lang="css">
#instruction {
  text-align: center;
}
#instruction-content {
  margin: 50px O;
  display: flex;
  justify-content: space-evenly;
}
#instruction-content > div {
  width: 45%;
}
img {
  height: 150px;
}
.buttons {
  display: flex;
  justify-content: center;
}
.buttons > button {
  margin: 1rem 0.5rem;
  border-radius: 16px;
  padding: .5rem 1.5rem;
}
</style>