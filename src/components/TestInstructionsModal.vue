<template lang="html">
    <vs-popup :active.sync="popupActivo" :button-close-hidden="true" title="Instructions" class="test-modal">
        <div class="test-modal-content">
            <figure>
              <img src="../assets/tests_visuals/motricityTest_success.png" alt="Un doigt trace le chemin" />
              <figcaption>Tracez les formes, sans sortir de leurs contours et en un seul trait.</figcaption>
            </figure>
            <figure>
              <img src="../assets/tests_visuals/motricityTest_success.png" alt="Un doigt trace le chemin" />
              <figcaption>Évitez tous les obstacles sur votre tracé</figcaption>
            </figure>
        </div>
        <div class="test-modal-buttons">       
            <vs-button id="btnTrainTest" @click="toggle(); $emit('train'); popupActivo = false" color="#9082FF">S'entraîner</vs-button>
            <vs-button id="btnStartTest" @click="toggle(); $emit('play'); popupActivo = false" color="#9082FF" icon="play_arrow">Commencer</vs-button>
        </div>
    </vs-popup>
</template>

<script>
export default {
  name: 'TestInstructionsModal',
  data() {
    return { 
        popupActivo: true
    }
  },
  methods: {
    toggle() {
      this.popupActivo = !this.open;
    }
  }
}
</script>

<style scoped>
.test-modal {
  text-align: center;
  font-family: Poppins;
}
.test-modal >>> header {
  display: flex;
  background-color: #9082FF;
  color: #FFFFFF;
}
.test-modal >>> .vs-popup--content {
  margin: 15px 0;
}
.test-modal-content {
  margin-bottom: 20px;
  display: flex;
  justify-content: space-evenly;
}
.test-modal-content > figure {
  width: 45%;
}
.test-modal-content > figure > img {
  width: 100%;
}
.test-modal-content > figure > figcaption {
  text-align: left;
}
.test-modal-buttons {
  display: flex;
  justify-content: center;
}
.test-modal-buttons > button {
  margin: 0 10px;
  border-radius: 15px;
  padding: 10px 20px;
}
</style>
