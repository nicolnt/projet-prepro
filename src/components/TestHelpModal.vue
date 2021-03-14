<template lang="html">
    <VsPopupCustom :active.sync="popupActivo" :button-close-hidden="false" title="Motricité fine : instructions" class="test-modal">
        <div class="test-modal-content">
          <figure v-for="(instruction, index) in instructions" :key="index">
              <img :src="require('@/assets/' + instruction.img + '')" :alt="instruction.altImg" />
              <figcaption>{{ instruction.desc }}</figcaption>
          </figure>
        </div>
    </VsPopupCustom>
</template>

<script>
import VsPopupCustom from '@/components/VsPopupCustom.vue'

export default {
  name: 'TestHelpModal',
  components: {
    VsPopupCustom
  },
  props: {
    instructions: Array
  },
  data() {
    return { 
        popupActivo: false
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
  display: block;
  margin: 15px 0;
}
.test-modal >>> .vs-popup--close {
  position: absolute;
  right: 0;
  top: 0;
  margin-right: 0;
  margin-top: 0;
}
.test-modal-content {
  margin-bottom: 20px;
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
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

@media only screen and (max-width: 576px) {
  .test-modal-content > figure {
    margin-bottom: 15px;
    width: 100%;
    max-width: 300px;
  }
}
</style>
