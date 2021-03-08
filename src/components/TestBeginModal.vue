<template lang="html">
    <VsPopupCustom :active.sync="popupActivo" :button-close-hidden="true" :closeOnClickOutside="false" :title="title" class="test-modal">
        <div class="test-modal-content">
          <figure v-for="(instruction, index) in instructions" :key="index">
              <img :src="require('@/assets/' + instruction.img + '')" :alt="instruction.altImg" />
              <figcaption>{{ instruction.desc }}</figcaption>
          </figure>
        </div>
        <div class="test-modal-buttons">
            <vs-button id="btnTrainTest" @click="toggle(); $emit('train');" color="#9082FF">S'entraîner</vs-button>
            <vs-button id="btnStartTest" @click="toggle(); $emit('play');" color="#9082FF" icon="play_arrow">Commencer</vs-button>
        </div>
    </VsPopupCustom>
</template>

<script>
import VsPopupCustom from '@/components/VsPopupCustom.vue'

export default {
  name: 'TestBeginModal',
  components: {
    VsPopupCustom
  },
  props: {
    instructions: Array, 
    title: String
  },
  data() {
    return { 
        popupActivo: true
    }
  },
  methods: {
    toggle() {
      this.popupActivo = !this.popupActivo;
    }
  }
}
</script>

<style scoped>
.test-modal {
  text-align: center;
  font-family: Poppins;
  user-select: none;
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
  flex-wrap: wrap;
}
.test-modal-content > figure {
  width: 45%;
  display: flex;
  flex-direction: column;
  /*justify-content: space-around;*/
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
  flex-wrap: wrap;
}
.test-modal-buttons > button {
  margin: 10px;
  border-radius: 15px;
  padding: 10px 20px;
  height: 44px;
}

@media only screen and (max-width: 576px) {
  .test-modal-buttons > button {
    width: 100%;
  }
  .test-modal-buttons > button:nth-child(1) {
    margin-bottom: 10px;
  }
  .test-modal-content > figure {
    margin-bottom: 15px;
    width: 100%;
    max-width: 300px;
  }
}
</style>
